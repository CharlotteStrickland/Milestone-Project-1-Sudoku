// Load boards manually
const easy = [
    "4--15-7-231-----899753---4--3---892--8-935--4-------58---5-4------8--4--1247--86-",
    "468159732312476589975382146537648921281935674649217358893564217756821493124793865"
];
const normal = [
    "--4---7838--376-5---3-8-6-2--7-6-9242-81----59-6-----868---9-4-41----23-----1----",
    "564921783821376459793584612157863924248197365936245178682739541419658237375412896"
];
const hard = [
    "31--------7--------8---297------5-6-739-----2----2-----9--71----57-836------6-7-1",
    "316897245972456183485312976241735869739648512568129437694571328157283694823964751"
];

// Create variables
var timer;
var timeRemaining;
var selectedNum;
var selectedTile;
var disableSelect;

window.onload = function() {
    // Run startgame function when button is clicked
    id("start-btn").addEventListener("click", startGame);
    // Add event listener to each number container
    for (let i = 0; i < id("number-container").children.length; i++) {
        id("number-container").children[i].addEventListener("click", function() {
            // If selecting is not disabled
            if (!disableSelect) {
                // If number is already selected
                if (this.classList.contains("selected")) {
                    // Then remove the selection
                    this.classList.remove("selected");
                    selectedNum = null;
                } else {
                    // Deslect all other numbers
                    for (let i = 0; i < 9; i++) {
                        id("number-container").children[i].classList.remove("selected");
                    }
                    // Select it and update selectedNum variable
                    this.classList.add("selected");
                    selectedNum = this;
                    updateMove();
                }
            }
        });
    }
}

function startGame() {
    // Choose board difficulty
    let board;
    if (id("diff-1").checked) board = easy[0];
    else if (id("diff-2").checked) board = normal[0];
    else board = hard[0];
    // Enable selecting numbers and tiles
    disableSelect = false;
    // Create board based on difficulty
    generateBoard(board);
    // Start the timer
    startTimer();
    // Set theme based on input
    if (id("theme-1").checked) {
        qs("body").classList.remove("dark");
    } else {
        qs("body").classList.add("dark");
    }
    // Show the number container
    id("number-container").classList.remove("hidden");
}

function startTimer() {
    // Set time remaining based on input
    if (id("time-1").checked) timeRemaining = 180;
    else if (id("time-2").checked) timeRemaining = 300;
    else timeRemaining = 600;
    // Set timer for first second
    id("timer").textContent = timeConversion(timeRemaining);
    // Set timer to update every second
    timer = setInterval(function() {
        timeRemaining --;
        // If no time remaining end the game
        if (timeRemaining === 0) endGame();
        id("timer").textContent = timeConversion(timeRemaining);
    }, 1000)
}
// Converts seconds into string of MM:SS format
function timeConversion(time) {
    let minutes = Math.floor(time /60);
    if (minutes < 10) minutes = "0" + minutes;
    let seconds = time % 60;
    if (seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
}

function generateBoard(board) {
    // Clear any previous boards
    clearPrevious();
    // Let used to increment tile ids
    let idCount = 0;
    // Create 81 tiles
    for (let i = 0; i < 81; i++) {
        let tile = document.createElement("p");
        // If tile isn't supposed to be blank
        if (board.charAt(i) != "-") {
            // Set tile text to correct number
            tile.textContent = board.charAt(i);
        } else {
            // Add click event listener to tile
            tile.addEventListener("click", function() {
                // If selecting is not disabled
                if (!disableSelect) {
                    if (tile.classList.contains("selected")) {
                       tile.classList.remove("selected");
                       selectedTile = null;
                    } else {
                        for (let i = 0; i < 81; i++) {
                            qsa(".tile")[i].classList.remove("selected");
                        }
                        //Add selection and update variable
                        tile.classList.add("selected");
                        selectedTile = tile;
                        updateMove();
                    }
                } 
            });
        }
        // Assign tile id
        tile.id = idCount;
        // Increment for next tile
        idCount ++;
        // Add tile class to all tiles
        tile.classList.add("tile");
        if ((tile.id > 17 && tile.id < 27) || (tile.id > 44 & tile.id < 54)) {
            tile.classList.add("bottomBorder");
        }
        if ((tile.id + 1) % 9 == 3 || (tile.id + 1) % 9 == 6) {
            tile.classList.add("rightBorder");
        }
        // Add tiles to board
        id("board").appendChild(tile);
    }
}

function updateMove() {
    // If a tile and number is selected
    if (selectedTile && selectedNum) {
        // Set the tile to the correct number
        selectedTile.textContent = selectedNum.textContent;
        // If the number matches the corresponding number in the solution key
        if (checkCorrect(selectedTile)) {
           selectedTile.classList.remove("selected");
           selectedNum.classList.remove("selected");
           selectedNum = null;
           selectedTile = null;
           //Check if board is completed
           if (checkDone()) {
            endGame();
           }
           // If the number doesn't match solution key
        } else {
            // Disable selecting new numbers for one second
            disableSelect = true;
            // Make the tile turn red
            selectedTile.classList.add("incorrect");
            // Run in one second
            setTimeout(function() {
                if (timer === 0) {
                    endGame();
                } else {
                    disableSelect = false;
                }
                selectedTile.classList.remove("incorrect");
                selectedTile.classList.remove("selected");
                selectedNum.classList.remove("selected");
                //Clear the tiles text and clear selected variables
                selectedTile.textContent = "";
                selectedTile = null;
                selectedNum = null;
            }, 1000);
        }
    }
}

function checkDone() {
    let tiles = qsa(".tile");
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].textContent === "") return false;
    }
    return true;
}

function endGame() {
    disableSelect = true;
    clearTimeout(timer);
    if (timeRemaining === 0) {
        id("timer").textContent = "You Lost!";
    } else {
        id("timer").textContent = "You Won!";
    }
}

function checkCorrect(tile) {
    // Select solution based on difficulty chosen on board
    let solution;
    if (id("diff-1").checked) solution = easy[1];
    else if (id("diff-2").checked) solution = normal[1];
    else solution = hard[1];
    // If tile number is equal to solutions number
    if (solution.charAt(tile.id) === tile.textContent) return true;
    else return false;
}

function clearPrevious() {
    // Access all of the tiles
    let tiles = qsa(".tile");
    // Remove each tile
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].remove();
    }
    // If there is a timer clear it
    if (timer) clearTimeout(timer);
    // Deselect any numbers
    for (let i = 0; i < id("number-container").children.length; i++) {
        id("number-container").children[i].classList.remove("selected");
    }
    // Clear selected variables
    selectedTile = null;
    selectedNum = null;
}

// Helper Functions
function id(id) {
    return document.getElementById(id);
}

function qs(selector) {
    return document.querySelector(selector);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}