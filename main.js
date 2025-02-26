const inputContainer = document.querySelector(".input-container");
const display = document.querySelector(".display");
let resultDisplayed = false;

function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    if (num2 === 0 && num1 !== 0){
        alert("You cannot divide by 0");
        clearDisplay();
        return;
    }
    return num1/num2;
}

function modulo(num1, num2){
    return num1%num2;
}

let num1;
let num2;
let operator;

function operate(operator, num1, num2){
    num1 = +num1;
    num2 = +num2;
    switch(operator){
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        case "%":
            return modulo(num1, num2);
        default:
            return 0;
    }
}

function addToDisplay(str){
   display.textContent += str;
}

// filter function
function filterInput(str){
    // make sure chosen input follows rules
    if (!checkIfInputFollowsRules(str)){
        return;
    }
    // list of operators and numbers
    const operators = "+-%/+x";
    const numbers = "0123456789";
    // previous input
    const currentDisplay = display.textContent.split(" ");
    const previousDisplayInput = currentDisplay.at(-1);
    if (operators.includes(str)){
        resultDisplayed = false;
        addToDisplay(` ${str}`)
    }
    else if (numbers.includes(str)) {
        if (resultDisplayed){
            resultDisplayed = false;
            display.textContent = "";
        }

        if (checkIfDisplayIsZero() || display.textContent === ""){
            display.textContent = '';
            addToDisplay(str);
        }
        else if (!Number.isNaN(+previousDisplayInput)){
            addToDisplay(str);
        }
        else {
            addToDisplay(` ${str}`);
        }
    }
    else if (str === "AC"){
        clearDisplay();
    }
    else if (currentDisplay.length === 3 && str === "="){
        const num1 = currentDisplay[0];
        const num2 = currentDisplay[2];
        const operator = currentDisplay[1];
        const result = operate(operator, num1, num2);
        display.textContent = "";
        addToDisplay(result);
        resultDisplayed = true;
    }
    else if (str === "+/-"){
        if (!checkIfDisplayIsZero() && !Number.isNaN(+previousDisplayInput)){
            const num = Number.parseFloat(previousDisplayInput);
            if (currentDisplay.length === 1){
                display.textContent = "";
                addToDisplay(`${-1*num}`);
            }
            else {
                const newResult = currentDisplay.slice(0, -1).join(" ") + " " + `${-1*num}`
                display.textContent = "";
                addToDisplay(newResult);
            }
        }
    }
}

// make sure input follows the rules
function checkIfInputFollowsRules(str){
    const operators = "+-%/+x";
    // see what is currently displayed
    const currentDisplay = display.textContent.split(" ");
    const lastInput = currentDisplay.at(-1);

    // return false if display is empty and operator is chosen
    if (checkIfDisplayIsZero() && operators.includes(str)){
        return false;  
    }
    // return false if previous input is an operator and current input is an operator
    else if (operators.includes(lastInput) && operators.includes(str)){
        return false;
    }
    // return false if previous input is an operator and 0 is chosen
    else if (operators.includes(lastInput) && str === "0"){
        return false;
    }
    else if (checkIfDisplayIsZero() && str === "0"){
        return false;
    } else if (currentDisplay.length === 3  && operators.includes(str)){
        return false;
    }

    return true;
}

function clearDisplay(){
    resultDisplayed = false;
    display.textContent = "0";
}

function checkIfArrayIsEmpty(arr){
    if (arr.length === 1 && arr[0] === ""){
        return true;
    }
    return arr.length === 0;
}

function checkIfDisplayIsZero(){
    const current = display.textContent;
    return (current.length === 1 && current ===  "0")
}

inputContainer.addEventListener("click", e => {
    console.log(e.target.textContent);
    const str = e.target.textContent;
    filterInput(str);
});
