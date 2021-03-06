const calcBody = document.querySelectorAll(".calc-body");
const calcOperator = document.querySelector(".calc-operator");
const calcValue = document.querySelector(".calc-value");
const calcNext = document.querySelector(".calc-next");

const INITIAL_TOTAL = 0;

const calc = {
    value: null,
    nextValue: null,
    operator: null,
    isOperator: false,
};

function reset() {
    calc.value = null;
    calc.nextValue = null;
    calc.operator = null;
    calc.isOperator = false;
}

const isNumber = (value) => value.match(/[0-9]/);

function renderCalcValue() {
    calcValue.textContent = +calc.value || INITIAL_TOTAL;
    calcNext.textContent = +calc.nextValue || null;
}

function renderCalcOperator() {
    calcOperator.textContent = calc.operator;
}

// operator is - + = ...
function calculationNumber(operator) {
    switch (operator) {
        case "-": {
            calc.value = +calc.value - +calc.nextValue;
            calc.nextValue = null;
            return calc;
        }
        case "+": {
            calc.value = +calc.value + +calc.nextValue;
            calc.nextValue = null;
            return calc;
        }
        case "x": {
            calc.value = +calc.value * +calc.nextValue;
            calc.nextValue = null;
            return calc;
        }
        case "/": {
            calc.value = +calc.value / +calc.nextValue;
            calc.nextValue = null;
            return calc;
        }
        case "%": {
            calc.value = +calc.value % +calc.nextValue;
            calc.nextValue = null;
            return calc;
        }
        case "^": {
            calc.value = (+calc.value) ** +calc.nextValue;
            calc.nextValue = null;
            return calc;
        }
        default: {
            return calc;
        }
    }
}

function inputCalcValue(value) {
    if (calc.value) {
        calc.nextValue = (calc.nextValue ?? "") + value;
        renderCalcValue();
    }

    // calc.value === 0
    if (!calc.value) {
        reset();
        calc.value = value;
        renderCalcValue();
        renderCalcOperator();
    }
}

function inputOperator(value) {
    if (calc.nextValue && calc.value) {
        calculationNumber(calc.operator ?? value);
        renderCalcValue();
    }
    calc.operator = value;
    renderCalcOperator();
}

// operator ????????? ????????? ?????? ???
function isOperatorReady(value) {
    if (isNumber(value)) {
        inputCalcValue(value);
    }
    if (!isNumber(value)) {
        inputOperator(value);
    }
}

// operator ????????? ????????? ??? ??????
function isOperatorNotReady(value) {
    if (isNumber(value)) {
        calc.value = (calc.value ?? "") + value;
        renderCalcValue();
    }

    if (!isNumber(value)) {
        calc.operator = value;
        calc.isOperator = true;
        renderCalcOperator();
    }
}

function allReset() {
    reset();
    renderCalcValue();
    renderCalcOperator();
}

function printFinish() {
    if (!calc.operator) return;

    if (calc.nextValue) {
        calculationNumber(calc.operator);
    }
    calc.operator = null;
    calc.isOperator = false;
    renderCalcValue();
    renderCalcOperator();
}

function handleClickCalcNumber(e) {
    const { value } = e.target;

    // ?????????
    if (value === "AC") {
        allReset();
        return;
    }

    // '=' ?????? ???  ??????
    if (value === "=") {
        printFinish();
        return;
    }

    // ?????? ????????? or ??????
    if (calc.isOperator) {
        isOperatorReady(value);
    } else {
        isOperatorNotReady(value);
    }
}

function addEventCalcButton() {
    calcBody.forEach((bodyNode) => {
        const buttonNode = bodyNode.querySelectorAll("button");

        buttonNode.forEach((button) => {
            button.addEventListener("click", handleClickCalcNumber);
        });
    });
}

function init() {
    renderCalcValue();
    addEventCalcButton();
}

init();
