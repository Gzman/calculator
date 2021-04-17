
export function operate(a, b, operator) {
    return operator(a, b);
}

export const addition = (a, b) => a + b;

export const subtraction = (a, b) => a - b;

export const multiplication = (a, b) => a * b;

export const division = (a, b) => a / b;

export const square = (a) => a**2;

export const radix = (a) => Math.radix(a);

