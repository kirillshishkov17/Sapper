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

    setInterval(() => {
        sec.src = nums[secCount];
        secCount++;
    
        if (secCount > 9) {
            secCount = 0;
        }
    }, 1000);

    setInterval(() => {
        secDecade.src = nums[secDecadeCount];
        secDecadeCount++;
    
        if (secDecadeCount > 9) {
            secDecadeCount = 0;
        }
    }, 10000);

    setInterval(() => {
        min.src = nums[minCount];
        minCount++;
    
        if (minCount > 9) {
            minCount = 0;
        }
    }, 100000);
}

export default timeCounter;