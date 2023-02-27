// Исходные данные
const width = 16;                   // Количество ячеек по горизонатли
const height = 16;                  // Количество ячеек по вертикали
const cellsCount = width * height;  // Количество ячеек на поле
const bombCount = 40;               // Количество бомб в игре

// Вызываем функцию старта игры
startGame()


// Функция старта игры
function startGame() {
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

    // Обработчик событий при клике (ПКМ) на кнопку
    field.addEventListener('contextmenu', (event) => {
        const index = cells.indexOf(event.target);
        const column = index % width;
        const row = Math.floor(index / width);

        // Убирает контекстное меню при нажатии ПКМ
        if(event.preventDefault != undefined)
            event.preventDefault();

        flag(row, column);
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
        cell.disabled = true;

        // Условие победы
        openedCount--;
        if (openedCount <= bombCount) {
            alert('Вы победили!')
            return;
        }

        const count = getCount(row, column);

        if (isBomb(row, column)) {
            cell.style.backgroundPosition = '-85px 33px';
            alert('Вы проиграли!')
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
        cell.style.backgroundPosition = '-34px 33px';
    }
}