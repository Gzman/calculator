import { operate, getOperatorByName } from "./calculator.js"

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

const calculate = () => operate(parseInt(firstNumber), parseInt(secondNumber), getOperatorByName(operator));

// const isUnaryOperator = (operator) => operator === "square" || operator === "radix";

const roundNumber = number => Math.round(number * 100) / 100;

function evaluate() {
    if (firstNumber !== "" && secondNumber !== "" && operator !== "") {
        let result = roundNumber(calculate());
        console.log("result", result);
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
    if (operator === "") {
        if (firstNumber === "0" || isEvaluationDisplayed) {
            firstNumber = "";
            isEvaluationDisplayed = false;
        }
        firstNumber += number;
        display.value = firstNumber;
    }
    else {
        secondNumber += number;
        display.value = secondNumber;
    }
}

function operationClicked(event) {
    operator = event.target.id;
    console.log(operator);
    evaluate();
}

function clearClicked() {
    reset();
}

function equalsClicked() {
    evaluate();
}