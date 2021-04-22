import * as calc from "./calculator.js"

const RADIX = document.querySelector("#radix").id;
const SQUARE = document.querySelector("#square").id;
const PERCENT = document.querySelector("#percent").id;
const COMMA = ".";

const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const commaButton = document.querySelector("#comma");
const equalsButton = document.querySelector("#equals");

display.addEventListener("change", displayValueChanged);
display.addEventListener("transitionend", animateDisplayEnd);
clearButton.addEventListener("click", clearClicked);
commaButton.addEventListener("click", commaClicked);
equalsButton.addEventListener("click", equalsClicked);
document.querySelectorAll(".number").forEach(button => button.addEventListener("click", numberClicked));
document.querySelectorAll(".operator").forEach(button => button.addEventListener("click", operationClicked));
window.addEventListener("keydown", event => document.querySelector(`button[data-key=\"${event.key}\"]`)?.click());

let firstOperand = display.value;
let secondOperand = "";
let currentOperator = "";
let overwriteDisplay = false;

const calculate = () => calc.operate(parseFloat(firstOperand), parseFloat(secondOperand), calc.getOperatorByName(currentOperator));
const hasComma = number => number.indexOf(COMMA) !== -1;
const isOperatorSet = () => currentOperator !== "";
const isUnaryOperator = operator => operator === RADIX || operator === SQUARE || operator === PERCENT;
const isBinaryOperationComplete = () => firstOperand !== "" && secondOperand !== "" && isOperatorSet();
const isUnaryOperationComplete = () => firstOperand !== "" && isUnaryOperator(currentOperator);

function reset() {
    display.value = "0";
    firstOperand = display.value;
    secondOperand = "";
    currentOperator = "";
};

function writeToDisplay(write) {
    if (overwriteDisplay || (display.value === "0" && write !== COMMA)) display.value = "";
    display.value += write;
    display.dispatchEvent(new Event("change"));
}

function displayValueChanged() {
    if (isOperatorSet()) secondOperand = display.value;
    else firstOperand = display.value;
}

function evaluate() {
    if (isBinaryOperationComplete() || isUnaryOperationComplete()) {
        let result = calculate();
        if (result === null) {
            alert("You can't divide by zero!");
            result = 0;
        }
        reset();
        writeToDisplay(result);
        overwriteDisplay = true;
    }
}

function numberClicked(event) {
    const number = event.target.textContent;
    writeToDisplay(number);
    overwriteDisplay = false;
}

function commaClicked() {
    if (hasComma(display.value)) return;
    overwriteDisplay = false;
    writeToDisplay(COMMA);
}

function operationClicked(event) {
    overwriteDisplay = true;
    animateDisplay();
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

function animateDisplay() {
    display.classList.add("animate-display");
}

function animateDisplayEnd() {
    display.classList.remove("animate-display");
}