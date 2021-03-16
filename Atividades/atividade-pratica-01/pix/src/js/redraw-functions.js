function resetInputs() {
    document.getElementById("nickname").value = "";
    document.getElementById("value").value = "";
    document.getElementById("pix-key").value = "";
}

function refreshBalance() {
    const balanceEl = document.getElementById("balance");

    balanceEl.innerText = String(parseFloat(this.balance).toFixed(2)).replace(".", ",");
}

function refreshHistory() {
    const historyTableEl = document.getElementById("history-table");
    const tbody = historyTableEl.getElementsByTagName("tbody")[0];

    clearRows(tbody);

    this.balanceHistory.forEach(entry => {
        const entryDate = new Date(entry.date);

        const date = entryDate.toLocaleDateString("pt-BR", {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
        });

        const hour = entryDate.toLocaleTimeString("pt-BR");
        const value = `R$ ${String(parseFloat(entry.value).toFixed(2)).replace(".", ",")}`;

        addRow(tbody, [date, hour, entry.key, entry.bank.code, entry.bank.name, value]);
    });
}

function addRow(target, cells) {
    const row = target.insertRow();

    cells.forEach(cell => {
        const cellEl = row.insertCell();
        cellEl.innerText = cell;
    });
}

function clearRows(target) {
    const rows = target.getElementsByTagName("tr");

    if(rows.length > 0)
        Array.from(rows).forEach(row => row.remove());
}

function refreshContactList() {
    const contactListEl = document.getElementById("contact-list");

    clearContactList(contactListEl);
    drawContactInList(contactListEl);
}

function clearContactList(target) {
    const items = target.getElementsByTagName("li");

    if(items.length > 0)
        Array.from(items).forEach(item => item.remove());
}

function drawContactInList(target) {
    Object.keys(this.contacts).forEach(key => {
        const item = document.createElement("li")
        const span = document.createElement("span");
        const button = document.createElement("input");

        span.setAttribute("nickname", this.contacts[key].nickname);

        button.value = String(this.contacts[key].nickname).substring(0, 2).toUpperCase();
        button.nickname = this.contacts[key].nickname;
        button.type = "button";
        button.onclick = () => handleContact(this.contacts[key].nickname, key);

        target.appendChild(item);
        item.appendChild(span);
        span.appendChild(button);
    });
}