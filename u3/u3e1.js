// T4. Trabajo con API
// U3. Peticiones PUT / PATCH con Fetch
// Enunciado disponible en u3e1.md / Enunciat disponible a u3e1.md

// Escribe aquí tu solución / escriviu aquí la vostra solució:


// A. Copiamos la clase ReqRes del ejercicio anterior y la ampliamos

class ReqRes {

    // Propiedades estaticas con las URLs de los endpoints
    static API_URL = 'https://reqres.in/api';
    static ENDPOINT_REGISTER = '/register';
    static ENDPOINT_LOGIN = '/login';
    static ENDPOINT_USERS = '/users';

    // B. Nuevo endpoint a nivel de usuario individual
    static ENDPOINT_USER = '/users/{id}';

    // Propiedad session
    session = {
        token: null,
        email: null,
        userId: null
    };

    // Metodo register
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

    // Metodo onRegister
    onRegister(data) {
        if (!data || data.error) {
            return `ERROR_REGISTER. ${data ? data.error : ''}`;
        }
        this.session.userId = data.id;
        this.session.token = data.token;
    }

    // Metodo login
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

    // Metodo onLogin
    onLogin(data) {
        if (!data || data.error) {
            return `ERROR_LOGIN. ${data ? data.error : ''}`;
        }
        this.session.token = data.token;
    }

    // Metodo getUserList
    getUserList(page = 1, perPage = 6) {
        const url = `${ReqRes.API_URL}${ReqRes.ENDPOINT_USERS}?page=${page}&per_page=${perPage}`;
        return fetch(url, {
            method: 'GET'
        }).then(response => response.json());
    }

    // C. Metodo updateFullUser - PUT para actualizar todos los campos del usuario
    updateFullUser(id, email, firstName, lastName, avatarUrl) {
        // Si falta algun parametro, devolvemos error
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

    // D. Metodo updateUserName - PATCH para actualizar solo el nombre del usuario
    updateUserName(id, firstName, lastName) {
        // Si falta algun parametro, devolvemos error
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

}

export {
    ReqRes
};