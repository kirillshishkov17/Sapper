import rightClick from "./rightClickLogic.js";
import { flagsCount, isFlag } from "./rightClickLogic.js";
import countdown from "./countdown.js";

// Исходные данные
const width = 16;                   // Количество ячеек по горизонатли
const height = 16;                  // Количество ячеек по вертикали
const cellsCount = width * height;  // Количество ячеек на поле
const bombCount = 40;                // Количество бомб в игре
let play = true;                    // Игра запускается при загрузке страницы, когда на

// Добавление счётчика оставшихся бомб
// const bombCounter = document.querySelector('.bombCounter');
// bombCounter.innerHTML = bombCount;

// Вызываем функцию старта игры
startGame();


// Перезапускает новую игру при клике на смайлик
const smile = document.querySelector('.smile');
smile.addEventListener('mouseup', () => {
    smile.style.backgroundImage = 'url(../img/smile.png)';
    console.log('Work!'); // !!! Удалить после отладки
    play = true;
    bombCounter.innerHTML = bombCount;

    startGame();
}) 

smile.addEventListener('mousedown', () => {
    smile.style.backgroundImage = 'url(../img/smile_press.png)';
})

// Функция старта игры
function startGame() {

    // Перезапускает игру при клике по смайлику
    if (play === false) {
        play = !play;
        return;
    }

    const field = document.querySelector('.field');
    field.innerHTML = '<button></button>'.repeat(cellsCount)
    const cells = [...field.children];
    let openedCount = cellsCount;

    // Генерация бомб
    const bombs = [...Array(256).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, bombCount);        

    // Обработчик события при клике (ЛКМ) на кнопку
    field.addEventListener('click', (event) => {
        const index = cells.indexOf(event.target);
        const column = index % width;
        const row = Math.floor(index / width);

        // При клике за пределами игрового поля
        if (event.target.tagName !== 'BUTTON') {
            return;
        }

        // При клике на кнопку
        open(row, column);
    })

    // Обработчики изменяющие смайл на время клика по закрытой ячейке
    field.addEventListener('mousedown', (event) => {
        smile.style.backgroundImage = 'url(../img/smile_fear.png)'
    })

    field.addEventListener('mouseup', () => {
        smile.style.backgroundImage = 'url(../img/smile.png)'
    })

    // Обработчик событий при клике (ПКМ) на кнопку
    field.addEventListener('contextmenu', (event) => {
        const index = cells.indexOf(event.target);
        const cell = cells[index];

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

    // Проверка на наличие бомбы в ячейке
    function isBomb(row, column) {
        if (!isValid(row, column)) return false;

        const index = row * width + column;
        return bombs.includes(index);
    }

    // Функция открытия ячейки
    function open(row, column) {
        if (!isValid(row, column)) return;

        const index = row * width + column;
        const cell = cells[index];

        if (cell.disabled === true) return;

        // Попали на флажок?
        if (isFlag(index)) {
            return;
        } else {
            cell.disabled = true;
        }

        // Победа, если последней ячейкой была открыта ячейка без бомбы, а флаги уже расставлены
        openedCount--;
        
        if (openedCount <= bombCount && flagsCount <= 0) {
            smile.style.backgroundImage = 'url(../img/smile_win.png)';
            alert('Вы победили!');
        }

        const count = getCount(row, column);

        // Попали на бомбу?
        if (isBomb(row, column)) {

            // Показываем все бомбы на поле
            for (let i = 0; i < 16; i++) {
                for (let j = 0; j < 16; j++) {
                    let index = j * width + i;

                    if (bombs.includes(index)) {
                        if (isFlag(index)) {
                            cells[index].style.backgroundImage = 'url(../img/bomb_flag.png)';
                            cells[index].disabled = true;
                        } else {
                            cells[index].style.backgroundImage = 'url(../img/bomb.png)';
                            cells[index].disabled = true;
                        }
                    } else {
                        cells[index].disabled = true;
                    }
                }
            }

            // Красным выделяем ту, на которую нажал пользователь
            cell.style.backgroundImage = 'url(../img/bomb_red.png)';

            // Меняем смайлик при проигрыше
            smile.style.backgroundImage = 'url(../img/smile_dead.png)';

            return;
        }

        if (count !== 0) {
            cell.style.backgroundImage = showMinesCount(count);
            return;
        }

        if (count === 0) {
            cell.style.backgroundImage = 'url(../img/zero_cell.png)';

            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    open(row + j, column + i);
                }
            }
            return;
        }
    }

    // Считает количество бомб вокруг ячейки
    function getCount(row, column) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (isBomb(row + j, column + i)) {
                    count++;
                }
            }
        }
        return count;
    }

    // Находит картинку на спрайте соответствующую количеству бомб вокруг
    function showMinesCount(count) {
        let res ='';

        switch(count) {
            case 1:
                res = 'url(../img/one_cell.png)'
                break;
            case 2:
                res = 'url(../img/two_cell.png)'
                break;
            case 3:
                res = 'url(../img/three_cell.png)'
                break;
            case 4:
                res = 'url(../img/four_cell.png)'
                break;
            case 5:
                res = 'url(../img/five_cell.png)'
                break;
            case 6:
                res = 'url(../img/six_cell.png)'
                break;
            case 7:
                res = 'url(../img/seven_cell.png)'
                break;
            case 8:
                res = 'url(../img/eight_cell.png)'
                break;  
        }

        return res;
    }

    // Не позволяет уйти за границы игрового поля
    function isValid(row, column) {
        return row >= 0
            && row < height
            && column >= 0
            && column < width;
    }
}