import {geocoderKey} from "../config/keys.js";

class Api {
    constructor(config) {
        this._url = config.url/*/employees'*/;
        this._headers = config.headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res;
    }

    getEmployees = () => {
        return fetch(`${this._url}/employees_tasks`, {
            method: 'GET'
            // headers: this._headers
        }).then(res => {
            return res.json();
        });
    }

    getOffices = () => {
        return fetch(`${this._url}/offices`, {
            method: 'GET'
        }).then(res => {
            return res.json();
        });
    }

    
    getTasksStatus = () => {
        return fetch(`${this._url}/get_tasks_status`, {
            method: 'GET'
        }).then(res => {
            return res.json();
        });
    }

    getTasks = () => {
        return fetch(`${this._url}/employees_tasks`, {
            method: 'GET'
        }).then(res => {
            return res.json();
        });
    }

    createUser = (data) => {
        return fetch(`${this._url}/users`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(res => {
            return res;
        });
    }

    login = (data) => {
        return fetch(`${this._url}/login`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(this._getResponseData);
    }

    getUser = id => {
        return fetch(`${this._url}/users/${id}`).then(this._getResponseData);
    }

    updateStatus = (userId, taskId, nextStatus) => {
        return fetch(`${this._url}/status`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                employee_id: userId,
                office_id: taskId,
                new_status: nextStatus
            })
        }).then(this._getResponseData);
    }
}
const api = new Api({
    url: 'http://94.139.254.101:8010',
    headers: {
      "Content-Type": "application/json",
    }
});

export const getCoordinates = async (address) => {
    try {
        const res = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${geocoderKey}&geocode=${address}&format=json`);
        const data = await res.json()
        const coords = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
        return coords.split(' ').reverse().map(coord => Number(coord))
    }
    catch (err) {
        throw new Error(`Ошибка запроса координат: ${err}`)
    }

}


export default api;
