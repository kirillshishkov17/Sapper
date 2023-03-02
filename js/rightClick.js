import { plusBombCounter, minusBombCounter} from "./bombCounter.js";

let flagsCount = 40; // Зависит от количества бомб
let flagsArray = [];
let questionMarkArray = [];

const rightClick = (index, cell, openedCount, bombCount) => {
    if (openedCount <= bombCount) return;

    if (questionMarkArray.includes(index)) {
        let deleteQuestionMarkIndex = questionMarkArray.indexOf(index);
        if (deleteQuestionMarkIndex !== -1) {
            questionMarkArray.splice(deleteQuestionMarkIndex, 1);
        }
        emptyMark(cell);
        return;
    }

    if (!flagsArray.includes(index)) {

        if (flagsCount <= 0) return;

        flagsCount--;
        flagsArray.push(index);
        flagMark(cell);
        minusBombCounter();

        // Победа, если последним дейтсивем поставлен последний флаг
        // if (openedCount <= bombCount && flagsCount <= 0) {
        //     const smile = document.querySelector('.smile');
        //     smile.style.backgroundImage = 'url(../img/smile_win.png)';
        //     flagsCount = bombCount;
        //     alert('WIN!!!');
        // }
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
        plusBombCounter();
        return;
    }
}

// Отрисовывает флаг при ПКМ (Правая Кнопка Мыши)
function flagMark(cell) {
    if (cell.disabled === true) return;
    cell.style.backgroundImage = 'url(../img/flag.png)';
    // cell.disabled = false;
}

// Отрисовывает вопросительный знак при ПКМ
function QuestionMark(cell) {
    if (cell.disabled === true) return;
    cell.style.backgroundImage = 'url(../img/question_mark.png)';
}

// Отрисовывает закрытую ячейку при ПКМ
function emptyMark(cell) {
    if (cell.disabled === true) return;
    cell.style.backgroundImage = 'url(../img/closed_cell.png)';
}

// Восстановление исходного количества флажков при начале новой игры
const smile = document.querySelector('.smile');
smile.addEventListener('click', () => {
    flagsCount = 40;
})

function isFlag(index) {
    return flagsArray.includes(index);
}

export default rightClick;
export { isFlag };