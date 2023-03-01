let count = 40;
const unit = document.querySelector('#unit');
const decade = document.querySelector('#decade');

function plusBombCounter() {
    count++;
    unit.src = array.find(x => x.count === count).secondNum;
    decade.src = array.find(x => x.count === count).firstNum;
}

function minusBombCounter() {
    count--;
    unit.src = array.find(x => x.count === count).secondNum;
    decade.src = array.find(x => x.count === count).firstNum;
}

// Обнуления счётчика при старте новой игры
const smile = document.querySelector('.smile');
smile.addEventListener('mouseup', () => {
    decade.src = 'img/4.png';
    unit.src = 'img/0.png';
    count = 40;
})

const array = [
    {
        count: 0,
        firstNum :'img/0.png',
        secondNum :'img/0.png'
    },
    {
        count: 1,
        firstNum :'img/0.png',
        secondNum :'img/1.png'
    },
    {
        count: 2,
        firstNum :'img/0.png',
        secondNum :'img/2.png'
    },
    {
        count: 3,
        firstNum :'img/0.png',
        secondNum :'img/3.png'
    },
    {
        count: 4,
        firstNum :'img/0.png',
        secondNum :'img/4.png'
    },
    {
        count: 5,
        firstNum :'img/0.png',
        secondNum :'img/5.png'
    },
    {
        count: 6,
        firstNum :'img/0.png',
        secondNum :'img/6.png'
    },
    {
        count: 7,
        firstNum :'img/0.png',
        secondNum :'img/7.png'
    },
    {
        count: 8,
        firstNum :'img/0.png',
        secondNum :'img/8.png'
    },
    {
        count: 9,
        firstNum :'img/0.png',
        secondNum :'img/9.png'
    },
    {
        count: 10,
        firstNum :'img/1.png',
        secondNum :'img/0.png'
    },
    {
        count: 11,
        firstNum :'img/1.png',
        secondNum :'img/1.png'
    },
    {
        count: 12,
        firstNum :'img/1.png',
        secondNum :'img/2.png'
    },
    {
        count: 13,
        firstNum :'img/1.png',
        secondNum :'img/3.png'
    },
    {
        count: 14,
        firstNum :'img/1.png',
        secondNum :'img/4.png'
    },
    {
        count: 15,
        firstNum :'img/1.png',
        secondNum :'img/5.png'
    },
    {
        count: 16,
        firstNum :'img/1.png',
        secondNum :'img/6.png'
    },
    {
        count: 17,
        firstNum :'img/1.png',
        secondNum :'img/7.png'
    },
    {
        count: 18,
        firstNum :'img/1.png',
        secondNum :'img/8.png'
    },
    {
        count: 19,
        firstNum :'img/1.png',
        secondNum :'img/9.png'
    },
    {
        count: 20,
        firstNum :'img/2.png',
        secondNum :'img/0.png'
    },
    {
        count: 21,
        firstNum :'img/2.png',
        secondNum :'img/1.png'
    },
    {
        count: 22,
        firstNum :'img/2.png',
        secondNum :'img/2.png'
    },
    {
        count: 23,
        firstNum :'img/2.png',
        secondNum :'img/3.png'
    },
    {
        count: 24,
        firstNum :'img/2.png',
        secondNum :'img/4.png'
    },
    {
        count: 25,
        firstNum :'img/2.png',
        secondNum :'img/5.png'
    },
    {
        count: 26,
        firstNum :'img/2.png',
        secondNum :'img/6.png'
    },
    {
        count: 27,
        firstNum :'img/2.png',
        secondNum :'img/7.png'
    },
    {
        count: 28,
        firstNum :'img/2.png',
        secondNum :'img/8.png'
    },
    {
        count: 29,
        firstNum :'img/2.png',
        secondNum :'img/9.png'
    },
    {
        count: 30,
        firstNum :'img/3.png',
        secondNum :'img/0.png'
    },
    {
        count: 31,
        firstNum :'img/3.png',
        secondNum :'img/1.png'
    },
    {
        count: 32,
        firstNum :'img/3.png',
        secondNum :'img/2.png'
    },
    {
        count: 33,
        firstNum :'img/3.png',
        secondNum :'img/3.png'
    },
    {
        count: 34,
        firstNum :'img/3.png',
        secondNum :'img/4.png'
    },
    {
        count: 35,
        firstNum :'img/3.png',
        secondNum :'img/5.png'
    },
    {
        count: 36,
        firstNum :'img/3.png',
        secondNum :'img/6.png'
    },
    {
        count: 37,
        firstNum :'img/3.png',
        secondNum :'img/7.png'
    },
    {
        count: 38,
        firstNum :'img/3.png',
        secondNum :'img/8.png'
    },
    {
        count: 39,
        firstNum :'img/3.png',
        secondNum :'img/9.png'
    },
    {
        count: 40,
        firstNum :'img/4.png',
        secondNum :'img/0.png'
    },
]

export { plusBombCounter, minusBombCounter};