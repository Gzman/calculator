import * as calculator from "./calculator.js"

const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector("#equals");

clearButton.addEventListener("click", clearClicked);
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

const calculate = () => calculator.operate(parseInt(firstNumber), parseInt(secondNumber), calculator.getOperatorByName(operator));
const isOperatorSet = () => operator !== "";
const isBinaryOperationComplete = () => firstNumber !== "" && secondNumber !== "" && isOperatorSet();
const isUnaryOperationComplete = () => firstNumber !== "" && (operator === "radix" || operator === "square");
const roundNumber = number => Math.round(number * 1000) / 1000;

function evaluate() {
    if (isBinaryOperationComplete() || isUnaryOperationComplete()) {
        let result = roundNumber(calculate());
        if (result === Infinity) {
            alert("You can't divide by zero!");
            result = 0;
        }
        reset();
        firstNumber = result;
        display.value = firstNumber;
        isEvaluationDisplayed = true;
    }
}

function numberClicked(event) {
    const number = event.target.textContent;
    if (isOperatorSet()) {
        secondNumber += number;
        display.value = secondNumber;
    }
    else {
        if (firstNumber === "0" || isEvaluationDisplayed) {
            firstNumber = "";
            isEvaluationDisplayed = false;
        }
        firstNumber += number;
        display.value = firstNumber;
    }
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