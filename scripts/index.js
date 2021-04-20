import * as calc from "./calculator.js"

const RADIX = document.querySelector("#radix").id;
const SQUARE = document.querySelector("#square").id;
const PERCENT = document.querySelector("#percent").id;
const COMMA = ".";

const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const commaButton = document.querySelector("#comma");
const equalsButton = document.querySelector("#equals");

clearButton.addEventListener("click", clearClicked);
commaButton.addEventListener("click", commaClicked);
equalsButton.addEventListener("click", equalsClicked);
document.querySelectorAll(".number").forEach(button => button.addEventListener("click", numberClicked));
document.querySelectorAll(".operator").forEach(button => button.addEventListener("click", operationClicked));
window.addEventListener("keydown", (event) => document.querySelector(`button[data-key=\"${event.key}\"]`)?.click());

let firstNumber = display.value;
let secondNumber = "";
let currentOperator = "";
let isEvaluationDisplayed = false;

const reset = () => {
    display.value = "0";
    firstNumber = display.value;
    secondNumber = "";
    currentOperator = "";
};
const calculate = () => calc.operate(parseFloat(firstNumber), parseFloat(secondNumber), calc.getOperatorByName(currentOperator));
const isOperatorSet = () => currentOperator !== "";
const isUnaryOperator = operator => operator === RADIX || operator === SQUARE || operator === PERCENT;
const isBinaryOperationComplete = () => firstNumber !== "" && secondNumber !== "" && isOperatorSet();
const isUnaryOperationComplete = () => firstNumber !== "" && isUnaryOperator(currentOperator);
const hasComma = number => number.indexOf(COMMA) !== -1;

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
        if (append !== COMMA && (firstNumber === "0" || isEvaluationDisplayed)) {
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
    if (hasComma(display.value)) return;
    isEvaluationDisplayed = false;
    appendToDisplay(COMMA);
}

function operationClicked(event) {
    const operator = event.target.id;
    if (isUnaryOperator(operator)) {
        currentOperator = operator;
        evaluate();
    } else {
        evaluate();
        currentOperator = operator;
    }
}

function clearClicked() {
    reset();
}

function equalsClicked() {
    evaluate();
}