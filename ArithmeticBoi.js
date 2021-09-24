var currentResult;
var points = 0;
var rounds = 0;
var level = 1;
var plus = true;
var minus = false;
var times = false;
var divided = false;

function askMathProblem() {
    // startet das Spiel und jede weitere Runde
    // zudem werden Aufgaben durch die Funktion gestellt
    var firstNumber;
    var secondNumber;
    var operator;
    var mathProblem;

    resetInputFieldColor("input");
    // Inhalt des Eingabefeldes wieder resetten damit eine neue Runde gestartet werden kann
    document.getElementById("input").value = "";

    rounds++;
    if (points > level * 5) {
        level++;
    }

    // Aufgabe und Operator random generieren
    var firstNumber = Math.round(Math.random() * level * 5 + 0.5);
    var secondNumber = Math.round(Math.random() * level * 5 + 0.5);
    var operator = generateRandomOperator();

    switch (operator) {
        case 1:
            mathProblem = firstNumber + " + " + secondNumber + " = ";
            currentResult = firstNumber + secondNumber;
            break;
        case 2:
            if (firstNumber < secondNumber) {
                tempValue = firstNumber;
                firstNumber = secondNumber;
                secondNumber = tempValue;
            }
            mathProblem = firstNumber + " - " + secondNumber + " = ";
            currentResult = firstNumber - secondNumber;
            break;
        case 3:
            mathProblem = firstNumber + " * " + secondNumber + " = ";
            currentResult = firstNumber * secondNumber;
            break;
        case 4:
            mathProblem = firstNumber + " : " + secondNumber + " = ";
            currentResult = firstNumber / secondNumber;
            break;

        default:
            alert("Es wurde kein Operator gefunden.");
    }

    document.getElementById("Frage").innerHTML = mathProblem;
    document.getElementById("Level").innerHTML = "Level " + level;
    document.getElementById("Points").innerHTML = "Points " + points;
    document.getElementById("Rounds").innerHTML = " Rounds " + rounds;
}

function generateRandomOperator() {
    do {
        result = Math.round(Math.random() * 4 + 0.5);

    } while (result == 1 && !this.plus || result == 2 && !this.minus || result == 3 && !this.times || result == 4 && !this.divided);

    return result;
}

function checkInput() {
    // prüft die Eingabe des Spielers
    // bei richtigem Ergebnis Steigerung der Punkte

    var currentInput = document.getElementById("input").value;
    
    console.log("inputted Value " + document.getElementById("input").value);

    if (currentInput == currentResult) {
        document.getElementById("input").style.background = "#60c78b";
        points++;
    } else {
        document.getElementById("input").style.background = "#ff6060";
    }

    setTimeout(askMathProblem, 500);

    return false;
}

function resetInputFieldColor(id) {
    document.getElementById(id).style.background = "white";
}

function saveGameState() {
    localStorage.setItem("Points", points);
    localStorage.setItem("Rounds", rounds);
    localStorage.setItem("Level", level);
    alert("Saved Game State...");
}

function loadGameState() {
    if (localStorage.getItem("Level")) {
        points = parseInt(localStorage.getItem("Points"));
        rounds = parseInt(localStorage.getItem("Rounds"));
        level = parseInt(localStorage.getItem("Level"));
        askMathProblem();
        alert("Save Game loaded...")
    }
}

function deleteGameState() {
    localStorage.clear();
    points = 0;
    rounds = 0;
    level = 1;
    askMathProblem();
}

function toggleOperator(button) {
    if (button.style.backgroundColor == "white") {
        button.style.background = "#e083b6";
    } else {
        button.style.background = "white";
    }

    selectOperator(button.innerHTML, button);
}

function isOperationSelected(id) {
    var button = document.getElementById(id);
    return (button.style.backgroundColor != "white");
}

function selectOperator(operator, button) {
    switch (operator) {
        case "+":
            if (plus && !minus && !times && !divided) {
                var message = alert("At least one operator must be switched on.");
                button.style.background = "#e083b6";
                return;
            } else {
                if (!plus) {
                    plus = true;

                } else if (plus) {
                    plus = false;
                }
            }
            break;
        case "-":
            if (!plus && minus && !times && !divided) {
                var message = alert("At least one operator must be switched on.");
                button.style.background = "#e083b6";
                return;
            } else {
                if (!minus) {
                    minus = true;

                } else if (minus) {
                    minus = false;
                }
            }
            break;
        case "*":
            if (!plus && !minus && times && !divided) {
                var message = alert("At least one operator must be switched on.");
                button.style.background = "#e083b6";
                return;
            } else {
                if (!times) {
                    times = true;

                } else if (times) {
                    times = false;
                }
            }
            break;
        case ":":
            if (!plus && !minus && !times && divided) {
                var message = alert("At least one operator must be switched on.");
                button.style.background = "#e083b6";
                return;
            } else {
                if (!divided) {
                    divided = true;

                } else if (divided) {
                    divided = false;
                }
            }
            break;
    }
}