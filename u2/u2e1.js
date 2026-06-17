// T4. Trabajo con API
// U2. Peticiones GET y POST con Fetch
// Enunciado disponible en u2e1.md / Enunciat disponible a u2e1.md

// Escribe aquí tu solución / escriviu aquí la vostra solució:

// A. Clase ReqRes
class ReqRes {

    // B. Propiedades estaticas con las URLs de los endpoints
    static API_URL = 'https://reqres.in/api';
    static ENDPOINT_REGISTER = '/register';
    static ENDPOINT_LOGIN = '/login';
    static ENDPOINT_USERS = '/users';

    // C. Propiedad session inicializada con valores nulos
    session = {
        token: null,
        email: null,
        userId: null
    };

    // D. Metodo register - hace POST al endpoint de registro
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

    // E. Metodo onRegister - procesa la respuesta del registro
    onRegister(data) {
        if (!data || data.error) {
            return `ERROR_REGISTER. ${data ? data.error : ''}`;
        }

        this.session.userId = data.id;
        this.session.token = data.token;
    }

    // F. Metodo login - hace POST al endpoint de login
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

    // G. Metodo onLogin - procesa la respuesta del login
    onLogin(data) {
        if (!data || data.error) {
            return `ERROR_LOGIN. ${data ? data.error : ''}`;
        }

        this.session.token = data.token;
    }

    // H. Metodo getUserList - hace GET al endpoint de usuarios con paginacion
    getUserList(page = 1, perPage = 6) {
        const url = `${ReqRes.API_URL}${ReqRes.ENDPOINT_USERS}?page=${page}&per_page=${perPage}`;

        return fetch(url, {
            method: 'GET'
        }).then(response => response.json());
    }

}

// I. Exportacion
export {
    ReqRes
};