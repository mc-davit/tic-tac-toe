let grid = document.querySelectorAll(".col");
let button = document.querySelector("button");
let row = document.querySelector(".row");

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
    el.innerHTML = `<div class="${arg}"><i class="fa-solid fa-${arg}"></i></div>`
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
        if (first && first.classList.contains("x")) {
            arrX.push(i)
        } 
        else if(first && first.classList.contains("o")) {
            arrO.push(i)
        }
    })
    if(checkWin(arrX)) {
        row.innerHTML += `<p class="x-win">The X Player Won!!</p>`
        row.innerHTML += `<p class="again">Wanna Play Again?</p>`
        disable();
        button.addEventListener("click", reset);
    } else if(checkWin(arrO)) {
        row.innerHTML += `<p class="o-win">The O Player Won!!</p>`
        row.innerHTML += `<p class="again">Wanna Play Again?</p>`
        disable();
        button.addEventListener("click", reset);
    } else if (counter == 10) {
    row.innerHTML += `<p class="draw">The Game Is A Draw</p>`
    row.innerHTML += `<p class="again">Wanna Play Again?</p>`
    disable();
    button.addEventListener("click", reset);
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
    <div class="col"><div class=""></div></div>
            <div class="col"><div class=""></div></div>
            <div class="col col3"><div class=""></div></div>
            <div class="col"><div class=""></div></div>
            <div class="col"><div class=""></div></div>
            <div class="col col3"><div class=""></div></div>
            <div class="col row3"><div class=""></div></div>
            <div class="col row3"><div class=""></div></div>
            <div class="col col3 row3"><div class=""></div></div>
    `
    grid = document.querySelectorAll(".col");
    grid.forEach(e => {
        e.addEventListener("click", show)
        e.style.cursor = "pointer"
        e.innerHTML = '';
    });
}
button.addEventListener("click", reset);
