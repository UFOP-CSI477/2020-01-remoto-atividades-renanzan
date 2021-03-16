var currentOperator = null;
var number = null;
var lastNumber = null;
var result = null;

function setNumber(value) {
    number = parseFloat(String(value).replace(",", "."));
}

function setCurrentOperator(operator) {
    currentOperator = operator;
    return calculate();
}

function calculate() {
    console.log("Calculate");
    console.log("number", number, currentOperator, "result", result);
    
    const currentNumber = number || Number(lastNumber);

    if(!currentNumber && currentOperator !== SQUARE_ROOT)
        return;

    resetResult();

    switch(currentOperator) {
        case SUM:
            console.log({ currentNumber });
            result += currentNumber;
            break;
        case SUBTRACTION:
            if(!result) {
                result = number;
                break;
            }

            result -= currentNumber;
            break;
        case MULTIPLICATION:
            result *= currentNumber;
            break;
        case DIVISION:
            if(result === 1) {
                result = currentNumber;
                break;
            }

            if(!number) {
                number = 1;
            }

            result /= currentNumber;
            break;
        case SQUARE_ROOT:
            result = Math.sqrt(number || result);
            break;
    }

    if(number)
        lastNumber = number;

    number = null;

    console.log("result", result);
    console.log("\n\n\n");

    return parseFloat(result.toFixed(4));
}

function resetResult() {
    if(typeof result === "number")
        return;

    if(currentOperator === SUM || currentOperator === SUBTRACTION)
        return result = 0;

    return result = 1;
}

function resetCalculator() {
    currentOperator = null;
    number = null;
    result = null;
}

function resetCalculatorEntry() {
    number = null;

    console.log({
        currentOperator,
        number,
        result
    });
}

function getLastNumber() {
    return lastNumber;
}

function getOperator() {
    return currentOperator;
}