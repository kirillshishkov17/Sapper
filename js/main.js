import rightClick from "./rightClick.js";
import open from "./openCell.js";


// Исходные данные
const width = 16;                   // Количество ячеек по горизонатли
const height = 16;                  // Количество ячеек по вертикали
const cellsCount = width * height;  // Количество ячеек на поле
let bombCount = 4;                // Количество бомб в игре
let isNewGame = false;
let isFirstClick = true;
let openedCount = cellsCount;

// Генерация бомб
let bombs = [...Array(256).keys()]
.sort(() => Math.random() - 0.5)
.slice(0, bombCount);

// Вызываем функцию старта игры
startGame();


// Перезапускает новую игру при клике на смайлик
const smile = document.querySelector('.smile');
smile.addEventListener('mouseup', () => {
    smile.style.backgroundImage = 'url(../img/smile.png)';
    startNewGame();
}) 

smile.addEventListener('mousedown', () => {
    smile.style.backgroundImage = 'url(../img/smile_press.png)';
})

// Функция старта игры
function startGame() {

    const field = document.querySelector('.field');
    field.innerHTML = '<button></button>'.repeat(cellsCount)
    const cells = [...field.children];
    // let openedCount = cellsCount;

    // // Генерация бомб
    // let bombs = [...Array(256).keys()]
    //     .sort(() => Math.random() - 0.5)
    //     .slice(0, bombCount);

    // Обработчик события при клике (ЛКМ) на кнопку
    field.addEventListener('click', (event) => {
        if (openedCount <= bombCount) return;

        const index = cells.indexOf(event.target);
        const column = index % width;
        const row = Math.floor(index / width);

        // При клике за пределами игрового поля
        if (event.target.tagName !== 'BUTTON') {
            return;
        }

        // При клике на кнопку
        if (isFirstClick) {
            open(row, column, height, width, cells, bombs, openedCount, isFirstClick, bombCount);
            isFirstClick = false;
            return;
        }
        open(row, column, height, width, cells, bombs, openedCount, isFirstClick, bombCount);
        return;
    })

    // Обработчики изменяющие смайл на время клика по закрытой ячейке
    field.addEventListener('mousedown', (event) => {
        if (openedCount <= bombCount) return;
        smile.style.backgroundImage = 'url(../img/smile_fear.png)'
    })

    field.addEventListener('mouseup', () => {
        if (openedCount <= bombCount) return;
        smile.style.backgroundImage = 'url(../img/smile.png)'
    })

    // Обработчик событий при клике (ПКМ) на кнопку
    field.addEventListener('contextmenu', (event) => {
        const index = cells.indexOf(event.target);
        let cell = cells[index];

        // При клике за пределами игрового поля
        if (event.target.tagName !== 'BUTTON') {
            return;
        }

        // Убирает контекстное меню при нажатии ПКМ
        if(event.preventDefault != undefined) {
            event.preventDefault();
        }

        if (cell.disabled === true) return;

        rightClick(index, cell, openedCount, bombCount, isNewGame);
    })
}

function startNewGame() {
    const field = document.querySelector('.field');
    const cells = [...field.children];
    cells.forEach(cell => {
        cell.disabled = false;
        cell.style.backgroundImage = 'url(../img/closed_cell.png)';
    });

    bombs = [...Array(256).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, bombCount);

    isNewGame = true;
    rightClick(0, 0, 0, 0, isNewGame);
    isNewGame = false;
    isFirstClick = true;
    bombCount = 4; // !!! При изменении количества бомб изменить и этот параметр


    // let openedCount = cellsCount;
    // let isFirstClick = true;
}