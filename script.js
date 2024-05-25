const message = document.querySelector('.message');
const button = document.querySelector('button');
const gameArea = document.querySelector('.gameArea');
const results = document.querySelector('.results');
const directions = document.querySelector('.directions');
let playArea = {};
let count = 0;

var showMessage = (notification) => message.innerHTML = `<h3>${notification}</h3>`;

var showBox = () => playArea.timer = setTimeout(myBox, random(4000));

var random = (number) => Math.floor(Math.random() * number);

// Pick a random hex color

var getColor = () => "#" + Math.random().toString(16).substring(2, 8);


var myBox = () => {
    //create a shape element
    let element = document.createElement('div');
    element.classList.add('box');

    let mars = margin();

    element.style.top = random(mars[0]) + 'px';
    element.style.left = random(mars[1]) + 'px';
    element.style.backgroundColor = getColor();
    element.start = new Date().getTime();
    element.addEventListener('click', hit);
    gameArea.appendChild(element);
}

//Adjust top margin and left margin so circle is not on the edge

var margin = () => {

    let maxHeight = gameArea.clientHeight;
    maxHeight = (maxHeight <= 100) ? (maxHeight + 200) : (maxHeight - 200);

    let maxWidth = gameArea.clientWidth;
    maxWidth = (maxWidth <= 100) ? (maxWidth + 200) : (maxWidth - 200);

    return [maxHeight, maxWidth];
}


var hit = (e) => {

    let maxDuration = 1;

    let end = new Date().getTime();  // Element creation complete and displayed
    let start = e.target.start;  // Element clicked

    let duration = (end - start) / 1000;

    clearTimeout(playArea.timer);

    showMessage(`It took you  ${duration} seconds to click`);

    if (duration > maxDuration) {
        gameArea.children[0].remove();
        results.innerHTML = `Too Slow! <span id="loser">You Lose!</span> Your score is ${count}.<br> Click the start button to play again!`;
        resetGame();
    } else {
        gameArea.children[0].remove();
        playArea.timer = setTimeout(myBox, random(4000));
        count++;
        if (count === 15) {
            results.innerHTML = `You reached ${count}! <span id="winner">You win!</span> <br> Click start to Play again.`;
            resetGame();
        } else {
            results.innerHTML = `Score: ${count} of 15`;
        }
    }
}

var resetGame = () => {
    clearTimeout(playArea.timer);
    button.style.display = 'inline-block';
    button.style.margin = "5em"
}

showMessage('Click Start to Begin!');

button.addEventListener('click', () => {
    //start game & hide the button
    button.style.display = 'none';
    directions.style.display = 'none';
    results.innerHTML = '';
    count = 0;
    //notify user of start
    showMessage('Starting...');

    showBox();
})