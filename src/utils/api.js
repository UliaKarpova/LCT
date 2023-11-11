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
}
const api = new Api({
    url: 'http://94.139.254.101:8010',
    headers: {
      "Content-Type": "application/json",
    }
});

export default api;
