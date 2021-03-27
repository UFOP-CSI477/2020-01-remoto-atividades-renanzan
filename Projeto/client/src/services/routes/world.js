import api from '../api';

export function generateWorld(size, gradient, perlin) {
    return new Promise((resolve, reject) => {
        api.get(`/world/generate`, { params: { size, gradient, perlin } })
            .then(resolve)
            .catch(reject);
        });
}

export function saveWorld(info, grid) {
    return new Promise((resolve, reject) => {
        api.post('/world/store', { info, grid })
            .then(resolve)
            .catch(reject);
    });
}

export function listWorld() {
    return new Promise((resolve, reject) => {
        api.get('/world')
            .then(resolve)
            .catch(reject);
    });
}

export function getWorld(id) {
    return new Promise((resolve, reject) => {
        api.get(`/world/${id}`)
            .then(resolve)
            .catch(reject);
    });
}