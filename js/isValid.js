// Не позволяет уйти за границы игрового поля
function isValid(row, column, height, width) {
    return row >= 0
        && row < height
        && column >= 0
        && column < width;
}

export default isValid;