// Исходные данные
const width = 16;                   // Количество ячеек по горизонатли
const height = 16;                  // Количество ячеек по вертикали
const cellsCount = width * height;  // Количество ячеек на поле
const bombCount = 40;               // Количество бомб в игре

// Вызываем функцию старта игры
startGame()


// Функция старта игры
function startGame() {
    const smile = document.querySelector('.smile');
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
        smile.style.backgroundPosition ='-55px 59px'
    })

    field.addEventListener('mouseup', () => {
        smile.style.backgroundPosition ='-1px 59px'
    })

    smile.addEventListener('mousedown', () => {
        smile.style.backgroundPosition = '-28px 59px';
    })

    smile.addEventListener('mouseup', () => {
        smile.style.backgroundPosition ='-1px 59px';
    })

    // Обработчик событий при клике (ПКМ) на кнопку
    field.addEventListener('contextmenu', (event) => {
        const index = cells.indexOf(event.target);
        const column = index % width;
        const row = Math.floor(index / width);

        // При клике за пределами игрового поля
        if (event.target.tagName !== 'BUTTON') {
            return;
        }

        // Убирает контекстное меню при нажатии ПКМ
        // if(event.preventDefault != undefined) {
        //     event.preventDefault();
        // }

        flag(row, column)
    })

    // Обработчик событий при клике на смайлик
    smile.addEventListener('click',() => {
        console.log('Work!'); // !!! Убрать после отладки
        startGame();
    });

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
        cell.disabled = true;

        // Условие победы
        openedCount--;
        if (openedCount <= bombCount) {
            alert('Вы победили!')
            return;
        }

        const count = getCount(row, column);

        // Попали на бомбу?
        if (isBomb(row, column)) {

            // Показываем все бомбы на поле
            for (let i = 0; i < 16; i++) {
                for (let j = 0; j < 16; j++) {
                    let index = j * width + i;

                    if (bombs.includes(index)) {
                        cells[index].style.backgroundPosition = '-85px 33px';
                        cells[index].disabled = true;
                    } else {
                        cells[index].disabled = true;
                    }
                }
            }

            // Красным выделяем ту, на которую нажал пользователь
            cell.style.backgroundPosition = '-102px 33px';

            // Меняем смайлик при проигрыше
            smile.style.backgroundPosition ='30px 59px';

            return;
        }

        if (count !== 0) {
            cell.style.backgroundPosition = showMinesCount(count);
            return;
        }

        if (count === 0) {
            cell.style.backgroundPosition = '-17px 33px';

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
                res = '0px 16px'
                break;
            case 2:
                res = '-17px 16px'
                break;
            case 3:
                res = '-34px 16px'
                break;
            case 4:
                res = '-51px 16px'
                break;
            case 5:
                res = '-68px 16px'
                break;
            case 6:
                res = '-85px 16px'
                break;
            case 7:
                res = '-102px 16px'
                break;
            case 8:
                res = '-119px 16px'
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

    // Ставит флаг при нажатии ПКМ
    function flag(row, column) {
        const index = row * width + column;
        const cell = cells[index];
        
        if (cell.disabled === true) return;

        cell.style.backgroundPosition = '-34px 33px';
    }

    // Ставит вопросительный знак при нажатии ПКМ
    // function QuestionMark(row, column) {
    //     const index = row * width + column;
    //     const cell = cells[index];

    //     if (cell.disabled === true) return;

    //     cell.style.backgroundPosition = '-51px 33px';
    // }
}