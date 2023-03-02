import { isFlag } from "./rightClick.js";

// Функция открытия ячейки
function open(row, column, height, width, cells, bombs, openedCount, isFirstClick, bombCount) {
    if (!isValid(row, column, height, width)) return;

    const smile = document.querySelector('.smile');
    const index = row * width + column;
    let cell = cells[index];

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
    openedCount--;
    
    if (openedCount <= bombCount && !isBomb(row, column, bombs, height, width)) {
        smile.style.backgroundImage = 'url(../img/smile_win.png)';
        alert('Вы победили!');
    }

    const count = getCount(row, column, bombs, height, width);

    // Попали на бомбу?
    if (isBomb(row, column, bombs, height, width)) {

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

export default open;