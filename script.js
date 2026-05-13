let display = document.getElementById('display');
let currentValue = '';
let previousValue = '';
let operator = null;
let shouldResetDisplay = false;

function appendNumber(num) {
    if (shouldResetDisplay) {
        display.value = num;
        shouldResetDisplay = false;
    } else {
        if (num === '.' && display.value.includes('.')) {
            return;
        }
        display.value += num;
    }
    currentValue = display.value;
}

function appendOperator(op) {
    if (display.value === '' && op !== '-') {
        return;
    }
    
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }
    
    previousValue = display.value;
    operator = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === null || previousValue === '' || display.value === '') {
        return;
    }
    
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(display.value);
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                display.value = 'Error';
                shouldResetDisplay = true;
                operator = null;
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    display.value = Math.round(result * 100000000) / 100000000;
    currentValue = display.value;
    operator = null;
    previousValue = '';
    shouldResetDisplay = true;
}

function clearDisplay() {
    display.value = '';
    currentValue = '';
    previousValue = '';
    operator = null;
    shouldResetDisplay = false;
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
    currentValue = display.value;
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});