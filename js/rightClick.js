let flagsCount = 2; // Зависит от количества бомб
let flagsArray = [];
let questionMarkArray = [];

const rightClick = (index, cell, openedCount, bombCount) => {

    if (questionMarkArray.includes(index)) {
        let deleteQuestionMarkIndex = questionMarkArray.indexOf(index);
        if (deleteQuestionMarkIndex !== -1) {
            questionMarkArray.splice(deleteQuestionMarkIndex, 1);
        }
        emptyMark(cell);
        return;
    }

    if (!flagsArray.includes(index)) {
        flagsCount--;
        flagsArray.push(index);
        flagMark(cell);

        // Победа, если последним дейтсивем поставлен последний флаг
        if (openedCount <= bombCount && flagsCount <= 0) {
            const smile = document.querySelector('.smile');
            smile.style.backgroundPosition = '-82px 59px';
            flagsCount = bombCount;
            alert('WIN!!!');
        }
        return;
    }

    if (flagsArray.includes(index)) {
        flagsCount++;
        let deleteFlagIndex = flagsArray.indexOf(index);
        if (deleteFlagIndex !== -1) {
            flagsArray.splice(deleteFlagIndex, 1);
        }

        questionMarkArray.push(index);
        QuestionMark(cell);
        return;
    }
}

// Отрисовывает флаг при ПКМ (Правая Кнопка Мыши)
function flagMark(cell) {
    if (cell.disabled === true) return;
    cell.style.backgroundPosition = '-34px 33px';
}

// Отрисовывает вопросительный знак при ПКМ
function QuestionMark(cell) {
    if (cell.disabled === true) return;
    cell.style.backgroundPosition = '-51px 33px';
}

// Отрисовывает закрытую ячейку при ПКМ
function emptyMark(cell) {
    if (cell.disabled === true) return;
    cell.style.backgroundPosition = '0 33px';
}

// Восстановление исходного количества флажков при начале новой игры
const smile = document.querySelector('.smile');
smile.addEventListener('click', () => {
    flagsCount = 2;
})

export default rightClick;
export { flagsCount };