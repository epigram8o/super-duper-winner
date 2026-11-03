const display = document.getElementById('display');
let expression = '0';
let justEvaluated = false;

function updateDisplay() {
  display.textContent = expression;
}

function resetIfError() {
  if (expression === 'Error') {
    expression = '0';
  }
}

function appendNumber(value) {
  resetIfError();

  if (justEvaluated) {
    expression = '0';
    justEvaluated = false;
  }

  if (expression === '0' && value !== '.') {
    expression = value;
  } else {
    expression += value;
  }

  updateDisplay();
}

function appendDecimal() {
  resetIfError();

  if (justEvaluated) {
    expression = '0';
    justEvaluated = false;
  }

  const lastOperatorIndex = Math.max(
    expression.lastIndexOf('+'),
    expression.lastIndexOf('-'),
    expression.lastIndexOf('*'),
    expression.lastIndexOf('/'),
  );

  const currentNumber = lastOperatorIndex === -1 ? expression : expression.slice(lastOperatorIndex + 1);

  if (!currentNumber.includes('.')) {
    expression += '.';
  }

  updateDisplay();
}

function appendOperator(operator) {
  resetIfError();

  if (justEvaluated) {
    justEvaluated = false;
  }

  if (expression === '0' && operator === '-') {
    expression = '-';
    updateDisplay();
    return;
  }

  const lastChar = expression.slice(-1);
  const operators = ['+', '-', '*', '/'];

  if (operators.includes(lastChar)) {
    expression = expression.slice(0, -1) + operator;
  } else {
    expression += operator;
  }

  updateDisplay();
}

function deleteLast() {
  if (expression.length <= 1) {
    expression = '0';
  } else {
    expression = expression.slice(0, -1);
  }

  updateDisplay();
}

function clearAll() {
  expression = '0';
  justEvaluated = false;
  updateDisplay();
}

function evaluateExpression() {
  const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');

  try {
    const result = Function(`"use strict"; return (${sanitized});`)();

    if (!Number.isFinite(result)) {
      expression = 'Error';
    } else {
      expression = Number.isInteger(result) ? String(result) : Number(result.toFixed(10)).toString();
    }
  } catch {
    expression = 'Error';
  }

  justEvaluated = true;
  updateDisplay();
}

const buttons = document.querySelectorAll('.btn');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const { value, action } = button.dataset;

    if (value !== undefined) {
      const isNumber = /^[0-9]$/.test(value);
      const isOperator = ['+', '-', '*', '/'].includes(value);

      if (isNumber) {
        appendNumber(value);
      } else if (value === '.') {
        appendDecimal();
      } else if (isOperator) {
        appendOperator(value);
      }

      return;
    }

    switch (action) {
      case 'clear':
        clearAll();
        break;
      case 'delete':
        deleteLast();
        break;
      case 'equals':
        evaluateExpression();
        break;
      default:
        break;
    }
  });
});

window.addEventListener('keydown', (event) => {
  const key = event.key;

  if (/^[0-9]$/.test(key)) {
    appendNumber(key);
  } else if (key === '.') {
    appendDecimal();
  } else if (['+', '-', '*', '/'].includes(key)) {
    appendOperator(key);
  } else if (key === 'Enter' || key === '=') {
    evaluateExpression();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearAll();
  }
});
