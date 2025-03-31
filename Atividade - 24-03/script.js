document.addEventListener('DOMContentLoaded', function() {
    const calculator = document.getElementById('calculator');
    
    calculator.style.width = '320px';
    calculator.style.margin = '50px auto';
    calculator.style.padding = '25px';
    calculator.style.backgroundColor = '#f5f5f5';
    calculator.style.borderRadius = '12px';
    calculator.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
    calculator.style.fontFamily = 'Arial, sans-serif';
    
    const display = document.createElement('div');
    display.id = 'display';
    display.style.width = 'calc(100% - 20px)';
    display.style.height = '70px';
    display.style.backgroundColor = '#fff';
    display.style.marginBottom = '25px';
    display.style.borderRadius = '8px';
    display.style.display = 'flex';
    display.style.justifyContent = 'flex-end';
    display.style.alignItems = 'center';
    display.style.padding = '0 15px';
    display.style.fontSize = '28px';
    display.style.overflow = 'hidden';
    display.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.1)';
    display.textContent = '0';
    
    calculator.appendChild(display);
    
    const keyboard = document.createElement('div');
    keyboard.style.display = 'grid';
    keyboard.style.gridTemplateColumns = 'repeat(4, 1fr)';
    keyboard.style.gridGap = '12px';
    
    const buttons = [
        { text: 'AC', class: 'function', colSpan: 1 },
        { text: '+/-', class: 'function', colSpan: 1 },
        { text: '%', class: 'function', colSpan: 1 },
        { text: '÷', class: 'operator', colSpan: 1 },
        { text: '7', class: 'number', colSpan: 1 },
        { text: '8', class: 'number', colSpan: 1 },
        { text: '9', class: 'number', colSpan: 1 },
        { text: '×', class: 'operator', colSpan: 1 },
        { text: '4', class: 'number', colSpan: 1 },
        { text: '5', class: 'number', colSpan: 1 },
        { text: '6', class: 'number', colSpan: 1 },
        { text: '-', class: 'operator', colSpan: 1 },
        { text: '1', class: 'number', colSpan: 1 },
        { text: '2', class: 'number', colSpan: 1 },
        { text: '3', class: 'number', colSpan: 1 },
        { text: '+', class: 'operator', colSpan: 1 },
        { text: '0', class: 'number', colSpan: 2 },
        { text: '.', class: 'number', colSpan: 1 },
        { text: '=', class: 'operator', colSpan: 1 }
    ];
    
    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.textContent = btn.text;
        button.style.gridColumn = btn.colSpan === 2 ? 'span 2' : 'span 1';
        button.style.height = '60px';
        button.style.border = 'none';
        button.style.borderRadius = '8px';
        button.style.fontSize = '20px';
        button.style.cursor = 'pointer';
        button.style.transition = 'all 0.2s';
        button.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        
        if (btn.class === 'number') {
            button.style.backgroundColor = '#fff';
            button.style.color = '#333';
            button.addEventListener('mouseover', () => button.style.backgroundColor = '#f0f0f0');
            button.addEventListener('mouseout', () => button.style.backgroundColor = '#fff');
        } else if (btn.class === 'operator') {
            button.style.backgroundColor = '#ff9500';
            button.style.color = '#fff';
            button.addEventListener('mouseover', () => button.style.backgroundColor = '#e68600');
            button.addEventListener('mouseout', () => button.style.backgroundColor = '#ff9500');
        } else {
            button.style.backgroundColor = '#d4d4d2';
            button.style.color = '#333';
            button.addEventListener('mouseover', () => button.style.backgroundColor = '#c4c4c2');
            button.addEventListener('mouseout', () => button.style.backgroundColor = '#d4d4d2');
        }
        
        button.addEventListener('click', () => handleButtonClick(btn.text));
        keyboard.appendChild(button);
    });
    
    calculator.appendChild(keyboard);
    
    let currentValue = '0';
    let previousValue = null;
    let operation = null;
    let resetDisplay = false;
    
    function updateDisplay() {
        display.textContent = currentValue;
    }
    
    function handleButtonClick(value) {
        if (value >= '0' && value <= '9') {
            handleNumber(value);
        } else if (value === '.') {
            handleDecimal();
        } else if (value === 'AC') {
            handleClear();
        } else if (value === '+/-') {
            handleToggleSign();
        } else if (value === '%') {
            handlePercentage();
        } else if (['+', '-', '×', '÷'].includes(value)) {
            handleOperator(value);
        } else if (value === '=') {
            handleEquals();
        }
        
        updateDisplay();
    }
    
    function handleNumber(number) {
        if (currentValue === '0' || resetDisplay) {
            currentValue = number;
            resetDisplay = false;
        } else {
            currentValue += number;
        }
    }
    
    function handleDecimal() {
        if (resetDisplay) {
            currentValue = '0.';
            resetDisplay = false;
            return;
        }
        
        if (!currentValue.includes('.')) {
            currentValue += '.';
        }
    }
    
    function handleClear() {
        currentValue = '0';
        previousValue = null;
        operation = null;
    }
    
    function handleToggleSign() {
        currentValue = (parseFloat(currentValue) * -1).toString();
    }
    
    function handlePercentage() {
        currentValue = (parseFloat(currentValue) / 100).toString();
    }
    
    function handleOperator(op) {
        if (operation !== null && !resetDisplay) {
            calculate();
        }
        
        previousValue = currentValue;
        operation = op;
        resetDisplay = true;
    }
    
    function handleEquals() {
        if (operation === null || resetDisplay) return;
        
        calculate();
        operation = null;
        resetDisplay = true;
    }
    
    function calculate() {
        let result;
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);
        
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                result = prev / current;
                break;
            default:
                return;
        }
        
        currentValue = result.toString();
    }
});