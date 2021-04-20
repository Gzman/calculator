
export function operate(a, b, operator) {
    return operator(a, b);
}

export function getOperatorByName(name) {
    switch (name) {
        case plus.name: return plus;
        case minus.name: return minus;
        case times.name: return times;
        case divide.name: return divide;
        case square.name: return square;
        case radix.name: return radix;
    }
}

const plus = (a, b) => a + b;

const minus = (a, b) => a - b;

const times = (a, b) => a * b;

const divide = (a, b) => a / b;

const square = (a) => a ** 2;

const radix = (a) => Math.sqrt(a);