import { operate, getOperatorByName } from "./calculator.js"

const FIRST = 0;
const SECOND = 1;
const OPERATOR = 2;

let currentIndex = 0;
let inputs = ["", "", ""];
let result = "";

const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const clearButton = document.querySelector(".clear");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");

const resetInput = () => {
    inputs = ["", "", ""];
    currentIndex = 0;
};
const resetResult = () => result = "";
const clearDisplay = () => display.value = 0;
const displayNumber = (number) => display.value = number;
const isFirstNumberSet = () => inputs[FIRST].length > 0;
const isSecondNumberSet = () => inputs[SECOND].length > 0;
const isOperatorSet = () => inputs[OPERATOR].length > 0;
const isInputComplete = () => isFirstNumberSet() && isSecondNumberSet() && isOperatorSet();
const isInputEvalueted = () => result.length > 0 && isFirstNumberSet() && isSecondNumberSet();

function calculate() {
    const first = parseInt(inputs[FIRST]);
    const second = parseInt(inputs[SECOND]);
    const operator = getOperatorByName(inputs[OPERATOR]);
    return operate(first, second, operator);
}

function numberClicked(event) {
    if (isOperatorSet()) {
        displayNumber("");
    }
    if (isInputEvalueted()) {
        resetInput();
        resetResult();
        currentIndex = FIRST;
    }
    const number = event.target.textContent;
    inputs[currentIndex] += number;
    displayNumber(inputs[currentIndex]);
}

const evaluateInput = () => {
    resetResult();
    result += calculate();
    displayNumber(result);
}

function operationClicked(event) {
    console.log(this.name, inputs);
    if (isFirstNumberSet()) {
        currentIndex = SECOND;
    }
    if (isInputComplete()) {
        evaluateInput();
    }
    if (isInputEvalueted()) {
        resetInput();
        inputs[FIRST] += result;
        resetResult();
        currentIndex = SECOND;
    }
    const operator = event.target.id;
    inputs[OPERATOR] = operator;
}

function clearClicked() {
    clearDisplay();
    resetInput();
}

function equalsClicked() {
    if (isInputComplete()) {
        evaluateInput();
    }
}

numberButtons.forEach(button => button.addEventListener("click", numberClicked));
operatorButtons.forEach(button => button.addEventListener("click", operationClicked));
clearButton.addEventListener("click", clearClicked);
equalsButton.addEventListener("click", equalsClicked);