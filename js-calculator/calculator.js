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

function insertToCalcValue() {
    calcValue.textContent = calc.value || INITIAL_TOTAL;
    calcNext.textContent = calc.nextValue;
}

function insertToCalcOperator() {
    calcOperator.textContent = calc.operator;
}

// operator is - + = ...
function calculationNumber(operator = calc.operator) {
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
        calc.nextValue = (calc.nextValue || "") + value;
        insertToCalcValue();
    }

    // calc.value === 0
    if (!calc.value) {
        reset();
        calc.value = value;
        insertToCalcValue();
        insertToCalcOperator();
        return;
    }
}

function inputOperator(value) {
    if (calc.nextValue && calc.value) {
        if (calc.operator) {
            calculationNumber();
            insertToCalcValue();
        } else {
            calculationNumber(value);
            insertToCalcValue();
        }
    }
    calc.operator = value;
    insertToCalcOperator();
}

// operator 입력이 처음이 아닐 때
function isOperatorReady(value) {
    if (isNumber(value)) {
        inputCalcValue(value);
    }
    if (!isNumber(value)) {
        inputOperator(value);
    }
}

// operator 입력이 처음일 때 호출
function isOperatorNotReady(value) {
    if (isNumber(value)) {
        calc.value = (calc.value || "") + value;
        insertToCalcValue();
    }

    if (!isNumber(value)) {
        calc.operator = value;
        calc.isOperator = true;
        insertToCalcOperator();
    }
}

function allReset() {
    reset();
    insertToCalcValue();
    insertToCalcOperator();
}

function printFinish() {
    if (!calc.operator) return;
    if (calc.nextValue) {
        calculationNumber();
        calc.nextValue = null;
    }
    calc.operator = null;
    calc.isOperator = false;
    insertToCalcValue();
    insertToCalcOperator();
}

function handleClickCalcNumber(e) {
    const { value } = e.target;

    // 초기화
    if (value === "AC") {
        allReset();
        return;
    }

    // '=' 누를 시  출력
    if (value === "=") {
        printFinish();
        return;
    }

    // 이외 연산자 or 숫자
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
    insertToCalcValue();
    addEventCalcButton();
}

init();
