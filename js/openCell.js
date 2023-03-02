import { isFlag } from "./rightClick.js";

let closedCell = 256; // Всего ячеек на игровом поле
let stopTimer = false; // Меняется, если попали на бомбу

// Функция открытия ячейки
function open(row, column, height, width, cells, bombs, openedCount, isFirstClick, bombCount) {
    if (!isValid(row, column, height, width)) return;

    const smile = document.querySelector('.smile');
    const index = row * width + column;
    let cell = cells[index];

    if (isFirstClick) {
        closedCell = openedCount;
        timeCounter();
    }

    // Если это первый клик и попалась бомба
    if (isBomb(row, column, bombs, height, width) && isFirstClick) {
        let allowedIndexes = [...Array(256).keys()].filter(n => !bombs.includes(n));
        let myIndex = bombs.indexOf(index);

        if (myIndex !== -1) {
            bombs.splice(myIndex, 1);
            let item = allowedIndexes[Math.floor(Math.random()*allowedIndexes.length)];
            bombs.push(item);
        }

        isFirstClick = false;
        open(row, column, height, width, cells, bombs, openedCount, isFirstClick, bombCount);
        return;
    }

    if (cell.disabled === true) return;

    // Попали на флажок?
    if (isFlag(index)) {
        return;
    } else {
        cell.disabled = true;
    }

    // Победа, если была открыта последняя ячейка без бомбы
    closedCell--;

    if (closedCell <= bombCount && !isBomb(row, column, bombs, height, width)) {
        smile.style.backgroundImage = 'url(../img/smile_win.png)';
        stopTimer = true;
        
        for (let i = 0; i < cells.length; i++) {
            cells[i].disabled = true;
        }
    }

    const count = getCount(row, column, bombs, height, width);

    // Попали на бомбу?
    if (isBomb(row, column, bombs, height, width)) {
        stopTimer = true;

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
        isFirstClick = false;
        return;
    }

    if (count === 0) {
        cell.style.backgroundImage = 'url(../img/zero_cell.png)';
        isFirstClick = false;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                open(row + j, column + i, height, width, cells, bombs, openedCount, isFirstClick, bombCount);
            }
        }
        return;
    }
}

                            /* ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ*/

// Не позволяет уйти за границы игрового поля
function isValid(row, column, height, width) {
    return row >= 0
        && row < height
        && column >= 0
        && column < width;
}

// Проверка на наличие бомбы в ячейке
function isBomb(row, column, bombs, height, width) {
    if (!isValid(row, column, height, width)) return false;

    const index = row * width + column;
    return bombs.includes(index);
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

// Считает количество бомб вокруг ячейки
function getCount(row, column, bombs, height, width) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (isBomb(row + j, column + i, bombs, height, width)) {
                count++;
            }
        }
    }
    return count;
}

// Массив картинок с цифрами
const nums = [
    'img/0.png',
    'img/1.png', 
    'img/2.png', 
    'img/3.png', 
    'img/4.png', 
    'img/5.png', 
    'img/6.png', 
    'img/7.png', 
    'img/8.png', 
    'img/9.png' 
]



// Логика секундомера
function timeCounter() {
    const sec = document.querySelector('#sec3');
    const secDecade = document.querySelector('#sec2');
    const min = document.querySelector('#sec1');
    let secCount = 1;
    let secDecadeCount = 1;
    let minCount = 1;

    const secondNum = setInterval(() => {

        if (secCount > 9) {
            secCount = 0; 
        }

        if (stopTimer) {
            clearInterval(secondNum);
            return;
        }

        sec.src = nums[secCount];
        secCount++;
    }, 1000);

    const decadeNum =  setInterval(() => {
        if (secDecadeCount > 9) {
            secDecadeCount = 0; 
        }

        if (stopTimer) {
            clearInterval(decadeNum);
            return;
        }

        secDecade.src = nums[secDecadeCount];
        secDecadeCount++;
    }, 10000);

    const hundredNum =  setInterval(() => {
        if (minCount > 9) {
            minCount = 0; 
        }

        if (stopTimer) {
            clearInterval(hundredNum);
        }

        min.src = nums[minCount];
        minCount++;
    }, 100000);



    // Обнуление таймера при старте новой игры
    const smile = document.querySelector('.smile');
    smile.addEventListener('click', () => {
        clearInterval(secondNum);
        clearInterval(decadeNum);
        clearInterval(hundredNum);
        sec.src = 'img/0.png';
        secDecade.src = 'img/0.png';
        min.src = 'img/0.png';
        stopTimer = false;
    })
}

export default open;