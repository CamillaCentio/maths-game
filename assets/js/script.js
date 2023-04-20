let currentOperation = "";
let currentScore = 0;
let score = 0;

let buttons = document.getElementsByTagName("button");
for (let button of buttons) {
    button.addEventListener("click", function() {
        if (this.getAttribute("data-type") === "submit") {
            checkAnswer();
        } else {
            let gameType = this.getAttribute("data-type");
            runGame(gameType);
        }
    }); 
}

/** This function makes it possible to press any of the four buttons to start the game */
function startGame(operation) {
    currentOperation = operation;
    generateQuestion();
}

function runGame(operation) {
    if (operation) {
        startGame(operation);
        document.getElementById("answer-box").value = "";
        document.getElementById("answer-box").focus();
    }
}
/** Generates a question with two random numbers */
function generateQuestion() {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;

    if (currentOperation === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (currentOperation === "multiplication") {
        displayMultiplicationQuestion(num1, num2);
    } else if (currentOperation === "subtraction") {
        displaySubtractQuestion(num1, num2);
    } else if (currentOperation === "division") {
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`Unknown game type ${currentOperation}`);
        throw `Unknown game type ${currentOperation}. Aborting!`;
    }
}

function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    let correctAnswerElement = document.getElementById("correct-answer");
    let messageElement = document.getElementById("message-container");

    if (correctAnswerElement && messageElement) {
        if (isCorrect) {
            correctAnswerElement.style.display = "none";
            incrementScore();
            document.getElementById("answer-box").value = "";
            document.getElementById("answer-box").focus();

            messageElement.innerText = "Congratulations, you got it right!";
            messageElement.style.color = "green";
            messageElement.style.display = "block";
        } else {
            correctAnswerElement.textContent = `Sorry, that was not correct. The correct answer was: ${calculatedAnswer[0]}!`;
            correctAnswerElement.style.display = "block";
            incrementWrongAnswer();
        }
    }

    if (currentOperation) {
        runGame(calculatedAnswer[1]);
    }
}






function restartGame() {
    document.getElementById("score").innerText = "0";
    document.getElementById("incorrect").innerText = "0";

    if (currentOperation) {
        runGame(currentOperation);
    }
}


function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiplication"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtraction"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. aborting!`;
    }
}


function incrementScore() {
    let scoreElement = document.getElementById("score");
    if (scoreElement) {
        let oldScore = parseInt(scoreElement.innerText);
        scoreElement.innerText = ++oldScore;
    }
}

function incrementWrongAnswer() {
    let incorrectElement = document.getElementById("incorrect");
    if (incorrectElement) {
        let oldScore = parseInt(incorrectElement.innerText);
        incorrectElement.innerText = ++oldScore;
    }
}


function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "-";
}

function displayMultiplicationQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 * operand2;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "/";
}