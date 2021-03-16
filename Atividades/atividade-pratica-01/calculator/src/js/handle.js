var handledValue = "";
var historyCalculator = "";
var currentResult = "";

function handleClearButton() {
    handledValue = "";
    historyCalculator = "";
    currentResult = "";
    
    resetDisplay();
    setHistory("");
    resetCalculator();
}

function handleCancelEntry() {
    historyCalculator = historyCalculator.slice(0, (handledValue.length * -1));
    handledValue = "";

    setHistory(historyCalculator);
    setValueDisplay("0");
    resetCalculatorEntry();
}

function handleNumericButton(value) {
    if(handledValue === "")
        resetDisplay();

    updateDisplay(value);
    updateHistory(value);

    setNumber(handledValue);
}

function handleCommaButton() {
    if(!checkDisplayContains(","))
        return;
        
    handledValue += ",";
    appendValue(",");
    updateHistory(",");
}

function handleOperatorButton(operator) {    
    if(currentResult !== "") {
        historyCalculator = currentResult;
        setHistory(currentResult);
    }

    const updatedValue = setCurrentOperator(operator);

    if(operator === SQUARE_ROOT) {
        setHistory(OPERATION_SIGN[operator] + (handledValue || currentResult) + " =");

        currentResult = updatedValue;
        handledValue = "";
        setValueDisplay(updatedValue);

        return;
    } else
        updateHistory(" " + OPERATION_SIGN[operator] + " ");
    
    handledValue = "";
    // setValueDisplay(updatedValue);
}

function handleResultButton() {
    var temp = currentResult;
    const result = calculate();

    lastResult = currentResult;
    currentResult = result;
    handledValue = "";
    setValueDisplay(result);

    if(String(historyCalculator).indexOf("=") < 0)
        updateHistory(" =");
    else
        setHistory(temp + "+" + getLastNumber() + " =");
}

function updateHistory(value) {
    if(String(historyCalculator).startsWith("0"))
        historyCalculator = "";

    historyCalculator += value;

    setHistory(historyCalculator);
}

function updateDisplay(value) {
    handledValue += value;

    appendValue(value);
}