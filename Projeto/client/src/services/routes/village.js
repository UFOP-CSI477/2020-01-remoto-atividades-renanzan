import api from '../api';

export function getVillage(id) {
    return new Promise((resolve, reject) => {
        api.get(`/village/${id}`)
            .then(resolve)
            .catch(reject);
        });
}

export function getResources(id) {
    return new Promise((resolve, reject) => {
        api.get(`/village/${id}/refresh-resources`)
            .then(resolve)
            .catch(reject);
    });
}