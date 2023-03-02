import rightClick from "./rightClick.js";
import timeCounter from "./timeCounter.js";
import open from "./openCell.js";


// Исходные данные
const width = 16;                   // Количество ячеек по горизонатли
const height = 16;                  // Количество ячеек по вертикали
const cellsCount = width * height;  // Количество ячеек на поле
const bombCount = 40;                // Количество бомб в игре

// Вызываем функцию старта игры
startGame();


// Перезапускает новую игру при клике на смайлик
const smile = document.querySelector('.smile');
smile.addEventListener('mouseup', () => {
    smile.style.backgroundImage = 'url(../img/smile.png)';
    console.log('Work!'); // !!! Удалить после отладки

    startGame();
}) 

smile.addEventListener('mousedown', () => {
    smile.style.backgroundImage = 'url(../img/smile_press.png)';
})

// Функция старта игры
function startGame() {

    const field = document.querySelector('.field');
    field.innerHTML = '<button></button>'.repeat(cellsCount)
    const cells = [...field.children];
    let openedCount = cellsCount;
    let isFirstClick = true;

    // Генерация бомб
    let bombs = [...Array(256).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, bombCount);

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
            timeCounter();
            open(row, column, height, width, cells, bombs, openedCount, isFirstClick, bombCount);
            isFirstClick = false;
        }
        open(row, column, height, width, cells, bombs, openedCount, isFirstClick, bombCount);
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

        rightClick(index, cell, openedCount, bombCount);
    })
}