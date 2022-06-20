
var numSelected = null;
var tileSelected = null;

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

window.onload = function() {
    setGame();
}

function setGame() {
    // Digits 1-9
    for (let i = 1; i<=9; i++) {
        //<div id = "1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);

    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c=0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}
