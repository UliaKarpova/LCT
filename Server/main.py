import math
from flask import Flask, jsonify, request, Response
import pandas as pd
from pymongo import MongoClient, results
from bson.objectid import ObjectId
import schedule
import time
from bson.json_util import dumps
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb://localhost:27017/")
db = client["Sovcom"]
collection = db["OfficesData"]
users = db["Users"]
tasks = db["TaskData"]
employees = db["Employees"]

df = pd.read_excel('data/data.xlsx', sheet_name=0)

records = df.to_dict('records')

for record in records:
    if pd.notnull(record['Координаты']):
        coords = record['Координаты'].split(',')
        record['Координаты'] = {'lat': float(coords[0].strip()), 'lon': float(coords[1].strip())}
    collection.insert_one(record)

df = pd.read_excel('data/data.xlsx', sheet_name=1)

records = df.to_dict('records')

for record in records:
    tasks.insert_one(record)

df = pd.read_excel('data/data.xlsx', sheet_name=2)

records = df.to_dict('records')

for record in records:
    if pd.notnull(record['Координаты офиса']):
        coords = record['Координаты офиса'].split(',')
        record['Координаты офиса'] = {'lat': float(coords[0].strip()), 'lon': float(coords[1].strip())}
    employees.insert_one(record)

results = []

offices = collection.find()

db["HighPriority"].drop()
db["MediumPriority"].drop()
db["LowPriority"].drop()

for office in offices:
    if (
            'Кол-во выданных карт' in office and
            'Когда подключена точка?' in office and
            'Карты и материалы доставлены?' in office and
            'Кол-во дней после выдачи последней карты' in office and
            'Кол-во одобренных заявок' in office):

        cards_issued = office['Кол-во выданных карт']
        connection_time = office['Когда подключена точка?']
        materials_delivered = office['Карты и материалы доставлены?']
        days_since_last_card = office['Кол-во дней после выдачи последней карты']
        num_approved_requests = office['Кол-во одобренных заявок']
        approval_ratio = cards_issued / num_approved_requests if num_approved_requests != 0 else 0

        office["status"] = 0

        if (days_since_last_card > 14 or (days_since_last_card > 7 and num_approved_requests > 0)):
            office["PriorityReason"] = "Выезд на точку для стимулирования выдач"
            db["HighPriority"].insert_one(office)
        elif approval_ratio < 0.5 and cards_issued > 0:
            office["PriorityReason"] = "Обучение агента"
            db["MediumPriority"].insert_one(office)
        elif connection_time == "вчера" or materials_delivered == "нет":
            office["PriorityReason"] = "Доставка карт и материалов"
            db["LowPriority"].insert_one(office)

assignment_criteria = {
  'Синьор': {'max_tasks': 2, 'collections': ['HighPriority', 'MediumPriority', 'LowPriority']},
  'Мидл': {'max_tasks': 4, 'collections': ['MediumPriority', 'LowPriority']},
  'Джун': {'max_tasks': 5, 'collections': ['LowPriority']}
}

employees = list(db['Employees'].find())

for employee in employees:
    assigned_offices = []
    total_tasks = 0
    for collection_name in assignment_criteria[employee['Грейд']]['collections']:
        while total_tasks < assignment_criteria[employee['Грейд']]['max_tasks']:
            office = db[collection_name].find_one_and_delete({})
            if office:
                office['_id'] = office['_id']
                assigned_offices.append(office)
                total_tasks += 1
            else:
                break
    db['Employees'].update_one({'_id': employee['_id']}, {'$set': {'assigned_offices': assigned_offices}})

def move_completed_tasks():
    employees = db["Employees"].find()

    completed_offices_ids = []

    for employee in employees:
        offices = employee.get('assigned_offices', [])
        remaining_offices = [office for office in offices if office['status'] != 3]

        completed_offices = [office for office in offices if office['status'] == 3]

        for office in completed_offices:
            if db['Done'].find_one({'_id': ObjectId(office['_id'])}) is None:
                db['Done'].insert_one(office)

        db["Employees"].update_one({'_id': ObjectId(employee['_id'])}, {'$set': {'assigned_offices': remaining_offices}})

        completed_offices_ids.extend([ObjectId(office['_id']) for office in completed_offices])

        print(completed_offices_ids)

    for priority in ["HighPriority", "MediumPriority", "LowPriority"]:
        db[priority].delete_many({'_id': {'$in': completed_offices_ids}})

# move_completed_tasks()

@app.route('/login', methods=['POST'])
def login():
    req_data = request.get_json()
    username = req_data.get('username')
    password = req_data.get('password')

    user = users.find_one({"username": username, "password": password})

    if user:
        return jsonify({'message': 'Успешный вход'}), 200
    else:
        return jsonify({'message': 'Неправильное имя пользователя или пароль'}), 401


@app.route('/offices', methods=['GET'])
def get_offices():
    offices = []
    for office in collection.find({}):
        office.pop("_id")
        offices.append(office)
    return jsonify(offices)


@app.route('/offices/<string:office_id>', methods=['DELETE'])
def get_office(office_id):
    office_data = collection.find_one({'_id': ObjectId(office_id)})
    office_data['_id'] = str(office_data['_id'])
    if office_data:

        return jsonify(office_data), 200
    else:
        return jsonify({'message': 'office not found'}), 404


@app.route('/offices', methods=['POST'])
def post_office():
    office_data = request.get_json()
    if office_data:
        collection.insert_one(office_data)
        return jsonify({'message': 'office created successfully'}), 200
    else:
        return jsonify({'message': 'invalid request'}), 400


@app.route('/offices/<string:office_id>', methods=['PATCH'])
def patch_office(office_id):
    office_data = request.get_json()
    if office_data:
        collection.update_one({'_id': ObjectId(office_id)}, {'$set': office_data})
        return jsonify({'message': 'office updated successfully'}), 200
    else:
        return jsonify({'message': 'invalid request'}), 400


@app.route('/users', methods=['GET'])
def get_users():
    users_data = users.find()
    result = []
    for user in users_data:
        user['_id'] = str(user['_id'])
        result.append(user)
    return jsonify(result), 200


@app.route('/users', methods=['POST'])
def post_user():
    user_data = request.get_json()
    if user_data:
        users.insert_one(user_data)
        return jsonify({'message': 'user created successfully'}), 201
    else:
        return jsonify({'message': 'invalid request'}), 400


@app.route('/users/<string:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user_data = users.find_one_and_delete({'_id': ObjectId(user_id)})
    if user_data:
        user_data['_id'] = str(user_data['_id'])
        return jsonify(user_data), 200
    else:
        return jsonify({'message': 'user not found'}), 404


@app.route('/users/<string:user_id>', methods=['PATCH'])
def patch_user(user_id):
    user_data = request.get_json()
    if user_data:
        users.update_one({'_id': ObjectId(user_id)}, {'$set': user_data})
        return jsonify({'message': 'user updated successfully'}), 200
    else:
        return jsonify({'message': 'invalid request'}), 400


@app.route('/taskTypes', methods=['GET'])
def get_task_types():
    task_types = tasks.find()
    result = []
    for task_type in task_types:
        task_type['_id'] = str(task_type['_id'])
        result.append(task_type)
    return jsonify(result), 200


@app.route('/taskTypes/<string:tasktype_id>', methods=['PATCH'])
def patch_task_type(tasktype_id):
    task_type_data = request.get_json()
    if task_type_data:
        tasks.update_one({'_id': ObjectId(tasktype_id)}, {'$set': task_type_data})
        return jsonify({'message': 'task type updated successfully'}), 200
    else:
        return jsonify({'message': 'invalid request'}), 400


@app.route('/taskTypes/<string:tasktype_id>', methods=['DELETE'])
def delete_task_type(tasktype_id):
    task_type_data = tasks.find_one_and_delete({'_id': ObjectId(tasktype_id)})
    if task_type_data:
        task_type_data['_id'] = str(task_type_data['_id'])
        return jsonify(task_type_data), 200
    else:
        return jsonify({'message': 'task type not found'}), 404


@app.route('/taskTypes', methods=['POST'])
def post_task_type():
    task_type_data = request.get_json()
    if task_type_data:
        tasks.insert_one(task_type_data)
        return jsonify({'message': 'task type created successfully'}), 201
    else:
        return jsonify({'message': 'invalid request'}), 400


@app.route('/status', methods=['POST'])
def update_status():
    data = request.get_json()
    employee_id = data['employee_id']
    office_id = data['office_id']
    new_status = data['new_status']

    employee_id = ObjectId(employee_id)
    office_id = ObjectId(office_id)

    employee = db['Employees'].find_one({"_id": employee_id})

    if not employee:
        return jsonify({"error": "Employee not found"}), 404

    offices = employee.get('assigned_offices', [])
    for office in offices:
        if office['_id'] == office_id:
            office['status'] = new_status

    employee['assigned_offices'] = offices

    db.Employees.update_one({'_id': employee_id}, {'$set': employee})
    return jsonify({"success": "Office status updated"}), 200

@app.route('/completed', methods=['GET'])
def handle_tasks():
    move_completed_tasks()
    return "Completed tasks have been moved!"

@app.route('/employees', methods=['GET'])
def get_employees():
    employees = list(db["Employees"].find())
    return Response(dumps(employees, ensure_ascii=False), mimetype='application/json')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8010, debug=True)
