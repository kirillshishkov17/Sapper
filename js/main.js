// Исходные данные
const width = 16;                   // Количество ячеек по горизонатли
const height = 16;                  // Количество ячеек по вертикали
const cellsCount = width * height;  // Количество ячеек на поле
const bombCount = 40;               // Количество бомб в игре

// Вызываем функцию начала игры
startGame()


// Функция создающее пустое игровое поле
function startGame() {
    const field = document.querySelector('.field');
    field.innerHTML = '<button></button>'.repeat(cellsCount)
    const cells = [...field.children];

    // Генерация бомб
    const bombs = [...Array(256).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, bombCount);

    // Обработчик события клика на кнопку
    field.addEventListener('click', (event) => {
        const index = cells.indexOf(event.target);
        const column = index % width; // !!! Есть вопросы к правильности подсчёта !!!
        const row = Math.floor(index / width); // !!! Есть вопросы к правильности подсчёта !!!

        // При клике за пределами игрового поля
        if (event.target.tagName !== 'BUTTON') {
            return;
        }

        // При клике на кнопку
        open(row, column);
    })

    // Проверка на наличие бомбы в ячейке
    function isBomb(row, column) {
        if (!isValid(row, column)) return false;

        const index = row * width + column;
        return bombs.includes(index);
    }

    // Функция открытия ячейки
    function open(row, column) {
        const index = row * width + column;
        const cell = cells[index];
        cell.style.backgroundPosition = isBomb(row, column) ? '-85px 33px' : getMinesCount(row, column);
    }

    // Считает количество бомб вокруг ячейки и находим соответствующую картинку на спрайте
    function getMinesCount(row, column) {
        let count = 0;
        let res ='';

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (isBomb(row + j, column + i)) {
                    count++;
                }
            }
        }

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
            case 0:
                res = '-17px 33px'
                break;     
        }

        return res;
    }

    function isValid(row, column) {
        return row >= 0
            && row < height
            && column >= 0
            && column < width;
    }
}