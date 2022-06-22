//Load boards from file or manually

// const easy = [
//     "--4-6-9-8",
//     "--2---4--",
//     "1-69435-2",
//     "497-5---1",
//     "-21--7---",
//     "568-1----",
//     "---12-653",

//     "754261938",
//     "932785416",
//     "186943572",
//     "497658321",
//     "321497865",
//     "568312794",
//     "615839247",
//     "243576189",
//     "879124653"
// ];

// const normal = [
//     "--1---642",
//     "-5--86-71",
//     "---271-9-",
//     "--3---216",
//     "9---13-84",
//     "----6--37",
//     "---------",
//     "6--3--1-8",
//     "-2----76-",

//     "781935642",
//     "259486371",
//     "346271895",
//     "573849216",
//     "962713584",
//     "814562937",
//     "138627459",
//     "697354128",
//     "425198763"
// ];

// const medium = [
//     "24-39----",
//     "---56--3-",
//     "---------",
//     "-2------9",
//     "5--2---6-",
//     "8-941---7",
//     "4-2----8-",
//     "---97-42-",
//     "-5---2--3",

//     "245397618",
//     "187564932",
//     "936821574",
//     "321756849",
//     "574289361",
//     "869413257",
//     "492135786",
//     "613978425",
//     "758642193"
// ];

// const hard = [
//     "-6---4--3",
//     "1--------",
//     "---23--4-",
//     "-----6-9-",
//     "---------",
//     "-82-4-1--",
//     "--64-----",
//     "--1--8725",
//     "------4--",

//     "268794513",
//     "143685972",
//     "579231648",
//     "317526894",
//     "954817236",
//     "682943157",
//     "726459381",
//     "491368725",
//     "835172469"
// ];

var numSelected = null;
var tileSelected = null;
var timer;
var timeRemaining;
var disableSelect;

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
   // id("reset-btn").addEventListener("click", setGame);
   setGame();
}

// function setGame() {
//     //choose difficulty
//     let board;
//     if (id("diff-1").clicked) board = easy[0];
//     else if (id("diff-2").clicked) board = normal[0];
//     else if (id("diff-3").clicked) board = medium[0];
//     else (id("diff-4").clicked) board = hard[0];
//     disableSelect = false;
//     // Create board based on difficulty
//     generateBoard(board);
// }

// function generateBoard(board) {
//     // Clear any previous boards
//     clearPrevious();
//     //Let used to increment tile ids
//     let idCount = 0;
//     //Create 9x9 board
//     for (let i = 1; i<=9; i++) {
//         //Create a new paragraph element
//         let tile = document.createElement("p");
//         // If tile is 
//         if (board.charAt(i) != "-") {
//             tile.textContent = board.charAt(i);
//         } else {
//             //Add click event listener to tile
//         }
//         //Assign tile id
//         tile.id = idCount;
//         idCount ++;
//         tile.classList.add("tile");
//         if ((tile.id >17 && tile.id <27) || ()) {

//         }
//     }

// }

// function clearPrevious() {
//     // Access all tiles
//     let tiles = qsa(".tile");
//     // Remove each tile
//     for (let i = 0; i < tiles.length; i++) {
//         tiles[i].remove();
//     }
//     // If there is a timer clear it
//     if (timer) clearTimeout(timer);
//     // Deselect any numbers
//     for (let i = 0; i < id("number-container").children.length; i++) {
//         id("number-container").children[i].classList.remove("clicked");
//     }
//     // Clear selected variables
//     tileSelected = null;
//     numSelected = null;
// }

// // Helper Functions
// function id(id) {
//     return document.getElementById(id);
// }

// function qs(selector) {
//     return document.querySelector(selector);
// }

// function qsa(selector) {
//     return document.querySelectorAll(selector);
// }

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

