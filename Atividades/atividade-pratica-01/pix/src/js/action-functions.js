this.balance = 1000;
this.balanceHistory = [];
this.contacts = {};

function transfer(nickname, value, key) {
    var bank;

    if(checkContactExists(key))
        bank = getContact(key).bank;
    else {
        bank = this.getRandomBank();
        
        newContact(nickname, key, bank);
        refreshContactList();
    }

    this.balance -= value;
    refreshBalance();

    balanceHistory.push({
        date: new Date(),
        key,
        bank: {
            code: bank.code,
            name: bank.fullName
        },
        value: Number(parseFloat(value).toFixed(2))
    });
}

function newContact(nickname, key, bank) {
    this.contacts[String(key)] = { nickname, bank };
}

function getContact(key) {
    return this.contacts[key];
}

function checkContactExists(key) {
    return Boolean(this.contacts[key]);
}