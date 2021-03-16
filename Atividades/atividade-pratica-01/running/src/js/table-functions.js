var entrys = [];

const startTable = document.getElementById("running-table");
const registrationForm = document.getElementById("registration-form");

registrationForm.addEventListener("submit", e => {
    e.preventDefault();

    const tbody = startTable.getElementsByTagName("tbody")[0];

    startTableHead();
    clearRows(tbody);

    const start = document.getElementById("start").value;
    const competitor = document.getElementById("competitor").value;
    const time = document.getElementById("time").value;

    entrys.push({ start, competitor, time });

    entrys = entrys.sort((a, b) => (a.start - b.start) || (a.time - b.time));

    entrys.forEach(entry => {
        addRow(tbody, [entry.start, entry.competitor, entry.time])
    });
});

function handleCalculate() {
    const tbody = startTable.getElementsByTagName("tbody")[0];

    resultTableHead();
    clearRows(tbody);

    entrys = entrys.sort((a, b) => (a.time - b.time) || (a.start - b.start));

    var bestTime = entrys[0].time;

    entrys.forEach((entry, index) => {
        var position;
        var result;

        if(entry.time === bestTime) {
            position = 1;
            result = "Winner!";
        } else {
            position = index + 1;
            result = "-";
        }

        addRow(tbody, [position, entry.start, entry.competitor, entry.time, result]);
    });
}

function handleReset() {
    const thead = startTable.getElementsByTagName("thead")[0];
    const tbody = startTable.getElementsByTagName("tbody")[0];

    entrys = [];

    clearRows(thead);
    clearRows(tbody);
}

function startTableHead() {
    const thead = startTable.getElementsByTagName("thead")[0];

    clearRows(thead);

    addRow(thead, ["Start", "Competitor", "Time (seconds)"], true);
}

function resultTableHead() {
    const thead = startTable.getElementsByTagName("thead")[0];

    clearRows(thead);

    addRow(thead, ["Position", "Start", "Competitor", "Time (seconds)", "Result"], true);
}

function addRow(target, cells, th) {
    const row = target.insertRow();

    cells.forEach(cell => {
        var cellEl;

        if(th)
            cellEl = document.createElement("th");
        else
            cellEl = document.createElement("td");

        cellEl.innerText = cell;

        row.appendChild(cellEl);
    });
}

function clearRows(target) {
    const rows = target.getElementsByTagName("tr");

    if(rows.length > 0)
        Array.from(rows).forEach(row => row.remove());
}