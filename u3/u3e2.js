// T4. Trabajo con API
// U3. Peticiones DELETE con Fetch
// Enunciado disponible en u3e2.md / Enunciat disponible a u3e2.md

// Escribe aquí tu solución / escriviu aquí la vostra solució:

// A. Copiamos la clase ReqRes de u3e1.js y añadimos deleteUser

class ReqRes {

    static API_URL = 'https://reqres.in/api';
    static ENDPOINT_REGISTER = '/register';
    static ENDPOINT_LOGIN = '/login';
    static ENDPOINT_USERS = '/users';
    static ENDPOINT_USER = '/users/{id}';

    session = {
        token: null,
        email: null,
        userId: null
    };

    register(email, pwd) {
        if (!email) {
            return Promise.resolve({
                error: 'Missing email or username'
            });
        }
        if (!pwd) {
            return Promise.resolve({
                error: 'Missing password'
            });
        }
        this.session.email = email;
        return fetch(`${ReqRes.API_URL}${ReqRes.ENDPOINT_REGISTER}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password: pwd
            })
        }).then(response => response.json());
    }

    onRegister(data) {
        if (!data || data.error) {
            return `ERROR_REGISTER. ${data ? data.error : ''}`;
        }
        this.session.userId = data.id;
        this.session.token = data.token;
    }

    login(email, pwd) {
        if (!email) {
            return Promise.resolve({
                error: 'Missing email or username'
            });
        }
        if (!pwd) {
            return Promise.resolve({
                error: 'Missing password'
            });
        }
        this.session.email = email;
        return fetch(`${ReqRes.API_URL}${ReqRes.ENDPOINT_LOGIN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password: pwd
            })
        }).then(response => response.json());
    }

    onLogin(data) {
        if (!data || data.error) {
            return `ERROR_LOGIN. ${data ? data.error : ''}`;
        }
        this.session.token = data.token;
    }

    getUserList(page = 1, perPage = 6) {
        const url = `${ReqRes.API_URL}${ReqRes.ENDPOINT_USERS}?page=${page}&per_page=${perPage}`;
        return fetch(url, {
            method: 'GET'
        }).then(response => response.json());
    }

    updateFullUser(id, email, firstName, lastName, avatarUrl) {
        if (!id || !email || !firstName || !lastName || !avatarUrl) {
            return Promise.resolve({
                error: 'Some user fields are missing'
            });
        }
        const url = `${ReqRes.API_URL}${ReqRes.ENDPOINT_USER.replace('{id}', id)}`;
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                first_name: firstName,
                last_name: lastName,
                avatar: avatarUrl
            })
        }).then(response => response.json());
    }

    updateUserName(id, firstName, lastName) {
        if (!id || !firstName || !lastName) {
            return Promise.resolve({
                error: 'Some user fields are missing'
            });
        }
        const url = `${ReqRes.API_URL}${ReqRes.ENDPOINT_USER.replace('{id}', id)}`;
        return fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName
            })
        }).then(response => response.json());
    }

    // B. Metodo deleteUser - DELETE para eliminar un usuario por id
    deleteUser(id) {
        // El id debe existir y ser un entero positivo
        if (!id || !Number.isInteger(id) || id <= 0) {
            return Promise.resolve({
                error: 'User id is missing or is not valid'
            });
        }

        const url = `${ReqRes.API_URL}${ReqRes.ENDPOINT_USER.replace('{id}', id)}`;

        return fetch(url, {
            method: 'DELETE'
        });
    }

}

export {
    ReqRes
};