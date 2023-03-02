import isValid from './isValid.js';

// Проверка на наличие бомбы в ячейке
function isBomb(row, column, bombs, height, width) {
    if (!isValid(row, column, height, width)) return false;

    const index = row * width + column;
    return bombs.includes(index);
}

export default isBomb;