function getDisplay() {
    return document.getElementById("display-result");
}

function getHistory() {
    return document.getElementById("display-history");
}

function appendValue(value) {
    const display = getDisplay();
    
    if(display.innerText.startsWith("0"))
        display.innerText = null;

    display.innerText += String(value).replace(".", ",");

    return display.innerText;
}

function setValueDisplay(value) {
    const display = getDisplay();

    display.innerText = String(value).replace(".", ",");
}

function resetDisplay() {
    const display = getDisplay();

    display.innerText = "0";
}

function checkDisplayContains(value) {
    const display = getDisplay();

    return (display.innerText.indexOf(value) < 0);
}

function setHistory(value) {
    const displayHistory = getHistory();

    displayHistory.innerText = String(value).replace(".", ",");
}