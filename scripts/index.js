import * as calc from "./calculator.js"

const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const commaButton = document.querySelector("#comma");
const equalsButton = document.querySelector("#equals");

clearButton.addEventListener("click", clearClicked);
commaButton.addEventListener("click", commaClicked);
equalsButton.addEventListener("click", equalsClicked);
document.querySelectorAll(".number").forEach(button => button.addEventListener("click", numberClicked));
document.querySelectorAll(".operator").forEach(button => button.addEventListener("click", operationClicked));

let firstNumber = display.value;
let secondNumber = "";
let operator = "";
let isEvaluationDisplayed = false;

const reset = () => {
    display.value = "0";
    firstNumber = display.value;
    secondNumber = "";
    operator = "";
};
const calculate = () => calc.operate(parseFloat(firstNumber), parseFloat(secondNumber), calc.getOperatorByName(operator));
const isOperatorSet = () => operator !== "";
const isBinaryOperationComplete = () => firstNumber !== "" && secondNumber !== "" && isOperatorSet();
const isUnaryOperationComplete = () => firstNumber !== "" && (operator === "radix" || operator === "square" || operator === "percent");
const hasComma = number => number.indexOf(".") !== -1;

function evaluate() {
    if (isBinaryOperationComplete() || isUnaryOperationComplete()) {
        let result = calculate();
        if (result === null) {
            alert("You can't divide by zero!");
            result = 0;
        }
        reset();
        firstNumber = result;
        display.value = firstNumber;
        isEvaluationDisplayed = true;
    }
}

function appendToDisplay(append) {
    if (isOperatorSet()) {
        secondNumber += append;
        display.value = secondNumber;
    }
    else {
        if (firstNumber === "0" || isEvaluationDisplayed) {
            firstNumber = "";
            isEvaluationDisplayed = false;
        }
        firstNumber += append;
        display.value = firstNumber;
    }
}

function numberClicked(event) {
    const number = event.target.textContent;
    appendToDisplay(number);
}

function commaClicked() {
    if(hasComma(display.value)) return;
    const comma = ".";
    appendToDisplay(comma);
}

function operationClicked(event) {
    operator = event.target.id;
    evaluate();
}

function clearClicked() {
    reset();
}

function equalsClicked() {
    evaluate();
}