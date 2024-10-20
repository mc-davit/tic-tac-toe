let grid = document.querySelectorAll(".col");
let restart = document.getElementById("restart");
let fullReset = document.getElementById("reset");
let row = document.querySelector(".row");
let xWins = document.getElementById("x-count");
let oWins = document.getElementById("o-count");

let counter = 1;
let arrX = [];
let arrO = [];
const wins = [
    "0,1,2",
    "3,4,5",
    "6,7,8",
    "0,3,6",
    "1,4,7",
    "2,5,8",
    "0,4,8",
    "2,4,6"
];

function display(arg, el) {
    el.innerHTML = `<i class="fa-solid fa-${arg}"></i>`
}

function show() {
    if (counter%2) {
        display("x", this);
    } else {
        display("o", this);
    }
    this.removeEventListener("click", show);
    this.style.cursor = "auto";
    counter++;
    check();
}

function check() {
    arrX = [];
    arrO = [];
    grid.forEach((e, i) => {
        let first = e.firstChild
        if (first && first.classList.contains("fa-x")) {
            arrX.push(i)
        } 
        else if(first && first.classList.contains("fa-o")) {
            arrO.push(i)
        }
    })
    if(checkWin(arrX)) {
        row.innerHTML += `<p class="x-win">The X Won!!</p>`
        row.innerHTML += `<p class="again">Wanna Play Again?</p>`
        xWins.innerHTML++;
        disable();
    } else if(checkWin(arrO)) {
        row.innerHTML += `<p class="o-win">The O Won!!</p>`
        row.innerHTML += `<p class="again">Wanna Play Again?</p>`
        oWins.innerHTML++;
        disable();
    } else if(counter == 10) {
        row.innerHTML += `<p class="draw">The Game Is A Draw</p>`
        row.innerHTML += `<p class="again">Wanna Play Again?</p>`
        disable();
    }
}
function checkWin(arg) {
    arg.sort((a, b) => a - b);
    return wins.some(combo => {
        let win = combo.split(',').map(Number);
        return win.every(n => arg.includes(n));
    });
}

function disable() {
    grid.forEach(e => {
        e.removeEventListener("click", show);
        e.style.cursor = "auto";
    });
}

grid.forEach(e => {
    e.addEventListener("click", show);
});

function reset() {
    counter = 1;
    arrX = [];
    arrO = [];
    row.innerHTML = `
    <div class="col"></div>
            <div class="col"></div>
            <div class="col col3"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col col3"></div>
            <div class="col row3"></div>
            <div class="col row3"></div>
            <div class="col col3 row3"></div>
    `
    grid = document.querySelectorAll(".col");
    grid.forEach(e => {
        e.addEventListener("click", show)
        e.style.cursor = "pointer"
        e.innerHTML = '';
    });
}
restart.addEventListener("click", reset);
fullReset.addEventListener("click", ()=>{
    reset();
    xWins.innerHTML = 0;
    oWins.innerHTML = 0;
})