const LISTENER_KEYS = {
    "+": () => handleOperatorButton(SUM),
    "-": () => handleOperatorButton(SUBTRACTION),
    "*": () => handleOperatorButton(MULTIPLICATION),
    "/": () => handleOperatorButton(DIVISION),
    ",": () => handleCommaButton(),
    ".": () => handleCommaButton(),
    "Enter": () => handleResultButton(),
    "Escape": () => handleClearButton(),
    "Backspace": () => handleCancelEntry()
}

document.addEventListener("keydown", e => {
    if(e.key !== " " && Number.isInteger(Number(e.key)))
        return handleNumericButton(Number(e.key));

    if(typeof LISTENER_KEYS[e.key] === "function")
        LISTENER_KEYS[e.key]();
});