var numSelected = null;
var tileSelected = null;
var timer;
var timeRemaining;
var errors = 0;


var board = [
    "--1---642",
    "-5--86-71",
    "---271-9-",
    "--3---216",
    "9---13-84",
    "----6--37",
    "---------",
    "6--3--1-8",
    "-2----76-"
]

var solution = [
    "781935642",
    "259486371",
    "346271895",
    "573849216",
    "962713584",
    "814562937",
    "138627459",
    "697354128",
    "425198763"
]

window.onload = function () {
    setGame();
}

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id = "1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

   // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}

function startTimer() {
    // Sets time remaining based on input
    if (id("time-1").checked) timeRemaining = 180;
    else if (id("time-2").checked) timeRemaining = 300;
    else timeRemaining = 600;
    // Sets timer for first second
    id("timer").textContent = timeConversion(timer);
    // Set timer to update every second
    time = setInterval(function() {
      timeRemaining --;
      // If no time remaining end the game
      if (timeRemaining === 0) endGame();
      id("timer").textContent = timeConversion(timeRemaining);
}, 1000)
}
// Converts seconds into string of MM:SS format
function timeConversion(time) {
    let minutes = Math.floor(time /60);
    if (minutes <10) minutes = "0" + minutes;
    let seconds = time % 60;
    if (seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
}