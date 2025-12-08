let state = JSON.parse(window.localStorage.getItem('state'));
if(!state) {
    state = {
        topicIndex: null,
        wordIndex: null
    }
    
}


let currentWord = null; //выбранное слово
let wordLetters = [];
let errorScore = 0;
let succesScore = 0;

const alphabet = 'абвгдеёжзиклмнопрстуфхцчшщьъэюя'
const topics = ['Города', 'Транспорт', 'Спорт'];

const words = {
    'Города': ['минск', 'москва', 'париж', 'рим'],
    'Транспорт': ['автомобиль', 'самолет', 'телега', 'трамвай'],
    'Спорт': ['футбол', 'шахматы', 'керлинг', 'теннис']
}


const gameElements = {
    topic: document.getElementById('game-topic'),
    word: document.querySelector('.word'),
    letters: document.querySelector('.letters'),
    hungman: [
        document.getElementById('kran'),
        document.getElementById('head'),
        document.getElementById('body'),
        document.getElementById('left-hand'),
        document.getElementById('right-hand'),
        document.getElementById('left-leg'),
         document.getElementById('right-leg'),
    ]
}

function init() {
    let topicIndex = state.topicIndex !== null? state.topicIndex : rand(0, topics.length - 1);
    let wordsSet = state.wordIndex !== null ? state.wordIndex : words[topics[topicIndex]];
    let wordIndex = rand(0, wordsSet.length - 1);

    currentWord = wordsSet[wordIndex];

    gameElements.topic.innerText = topics[topicIndex];

    for(let i = 0; i < currentWord.length; i++) {
        let span = document.createElement('span');
        span.classList.add('word-letter');

        gameElements.word.append(span);

        let wordLetter = {
            letter: currentWord[i],
            element: span
        }

        wordLetters.push(wordLetter);
    }

    for(let i = 0; i < alphabet.length; i++) {
        let button = document.createElement('button');
        button.classList.add('letter');
        button.innerText = alphabet[i];

        button.onclick = () => {
            checkletter(alphabet[i]);
            // button.disabled = true;
            button.onclick = null;
        }

        gameElements.letters.append(button);
    }

}

function* showHungPartGenerator() {
        for(let i = 0; i< gameElements.hungman.length; i++) {
            gameElements.hungman[i].style.display = 'block';
            yield;
        }
    }

    let showHungPart = showHungPartGenerator();

function checkletter (letter) {
    let indexes = [];
    while(true) {
        let pos = 0;
        let indexes = []
        let foundPos = currentWord.indexOf(letter, pos);

        if(foundPos == -1) {
            break;
        }

        indexes.push(foundPos);
        pos = foundPos + 1;
    }

    if(indexes.length > 0) {
        //отображаем буквы 
       for(let index of indexes) {
        wordLetters[index].element.innerText = wordLetters[index].letter;
        succesScore++;
       }
       
       if(succesScore == currentWord.length) {
        gameOver('Вы выиграли!');
       }
       

    } else {
        // изменить картинку
       showHungPart.next();
       errorScore++;

       if(errorScore >= gameElements.hungman.length) {
        gameOver('Вы проиграли');
       }
    }

}

function gameOver(message) {
    let gameOver = document.querySelector('.game-over');
    gameOver.innerText = message;
    gameOver.classList.add('active');

    // setTimeoutA(() => {
    //    location.reload();
    // },3000)
}

function rand(min,max) {
    min = Math.ceil(min); // Округляет min в большую сторону
    max = Math.floor(max); // Округляет max в меньшую сторону
    return Math.floor(Math.random() * (max - min + 1)) + min;

}

init();

