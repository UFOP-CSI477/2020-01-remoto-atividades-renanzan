const BASE_URL = "https://brasilapi.com.br/api";

function getAllBanks() {
    return new Promise((resolve, reject) => {
        fetch(`${BASE_URL}/banks/v1`, {
            method: "get"
        })
        .then(res => {
            res.json()
            .then(resolve)
            .catch(reject)
        })
        .catch(reject);
    });
}

function getBankByCode(code) {
    return new Promise((resolve, reject) => {
        fetch(`${BASE_URL}/banks/v1/${code}`, {
            method: "get"
        }).then(res => {
            res.json()
            .then(resolve)
            .catch(reject)
        })
        .catch(reject);
    });
}