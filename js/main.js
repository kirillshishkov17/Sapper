import rightClick from "./rightClick.js";
import open from "./openCell.js";


// Исходные данные
const width = 16;                   // Количество ячеек по горизонатли
const height = 16;                  // Количество ячеек по вертикали
const cellsCount = width * height;  // Количество ячеек на поле
let startBombCount = 40;            // Количество бомб в игре
let isNewGame = false;
let isFirstClick = true;
let openedCount = cellsCount;
let bombCount = startBombCount;  

// Генерация бомб
let bombs = [...Array(256).keys()]
.sort(() => Math.random() - 0.5)
.slice(0, bombCount);

// Вызываем функцию старта игры
startGame();


// Перезапускает игру при клике по смайлику
const smile = document.querySelector('.smile');
smile.addEventListener('mouseup', () => {
    smile.style.backgroundPosition = '0px -24.2px';
    startNewGame();
}) 

smile.addEventListener('mousedown', () => {
    smile.style.backgroundPosition = '-27.5px -24.2px';
})

// Функция старта игры
function startGame() {

    const field = document.querySelector('.field');
    field.innerHTML = '<button></button>'.repeat(cellsCount)
    const cells = [...field.children];

    // Обработчик события при клике (ЛКМ) по ячейке
    field.addEventListener('click', (event) => {
        if (openedCount <= bombCount) return;

        const index = cells.indexOf(event.target);
        const column = index % width;
        const row = Math.floor(index / width);

        // При клике за пределами игрового поля
        if (event.target.tagName !== 'BUTTON') {
            return;
        }

        // При клике по ячейке
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
        smile.style.backgroundPosition = '85px -24.2px';
    })

    field.addEventListener('mouseup', () => {
        if (openedCount <= bombCount) return;
        smile.style.backgroundPosition = '0px -24.2px';
    })

    // Обработчик событий при клике (ПКМ) по ячейке
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
        cell.style.backgroundPosition = '0px -51px';
    });

    bombs = [...Array(256).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, bombCount);

    isNewGame = true;
    rightClick(0, 0, 0, 0, isNewGame);
    isNewGame = false;
    isFirstClick = true;
    bombCount = startBombCount;
}