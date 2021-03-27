import api from '../api';

export function register(username, password, email) {
    return new Promise((resolve, reject) => {
        api.post('/auth/register', { username, password, email })
            .then(resolve)
            .catch(reject);
    });
}

export function authenticate(username, password, persist) {
    return new Promise((resolve, reject) => {
        api.post('/auth/authenticate', { username, password, persist })
            .then(resolve)
            .catch(reject);
    });
}

export function validate(token) {
    return new Promise((resolve, reject) => {
        api.post('/auth/validate', { token })
            .then(resolve)
            .catch(reject);
    });
}