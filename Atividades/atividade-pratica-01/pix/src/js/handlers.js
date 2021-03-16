
function handleTrasfer() {
    const nickname = document.getElementById("nickname").value;
    const value = document.getElementById("value").value;
    const key = document.getElementById("pix-key").value;

    if(!nickname || !value || !key)
        return console.warn("Invalid values");
    
    if(checkContactExists(key))
        if(getContact(key).nickname !== nickname)
            return console.warn("Invalid contact");

    if((this.balance - value) <= 0)
        return console.warn("Insufficient funds");

    transfer(nickname, value, key);
    refreshBalance();
    refreshHistory();

    resetInputs();
}

function handleContact(nickname, key) {
    document.getElementById("nickname").value = nickname;
    document.getElementById("pix-key").value = key;
}