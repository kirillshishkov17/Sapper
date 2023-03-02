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

const sec = document.querySelector('#sec3');
const secDecade = document.querySelector('#sec2');
const min = document.querySelector('#sec1');
let secCount = 1;
let secDecadeCount = 1;
let minCount = 1;

// Логика секундомера
function timeCounter() {
    const secondNum = setInterval(() => {
        sec.src = nums[secCount];
        secCount++;

        if (secCount > 9) {
            secCount = 0; 
        }

        if (isStop) {
            clearInterval(secondNum);
        }
    }, 1000);

    const decadeNum =  setInterval(() => {
        secDecade.src = nums[secDecadeCount];
        secDecadeCount++;

        if (secDecadeCount > 9) {
            secDecadeCount = 0; 
        }
    }, 10000);

    const hudredNum =  setInterval(() => {
        min.src = nums[minCount];
        minCount++;

        if (minCount > 9) {
            minCount = 0; 
        }
    }, 100000);



    // Обнуление таймера при старте новой игры
    const smile = document.querySelector('.smile');
    smile.addEventListener('click', () => {
        secCount = 1;
        secDecadeCount = 1;
        minCount = 1;
        clearInterval(secondNum);
        clearInterval(decadeNum);
        clearInterval(hudredNum);
        sec.src = 'img/0.png';
        secDecade.src = 'img/0.png';
        min.src = 'img/0.png';
    })
}