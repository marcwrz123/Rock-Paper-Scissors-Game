// Result
const resultsContainer = document.getElementById('container__juego'); 
const roundWinner = document.getElementById('round__result');
const resultPlayer1Item = document.getElementById('result__player1__item');
const resultPlayer2Item = document.getElementById('result__player2__item');
const resultImg1 = document.getElementById('result__player1__img');
const resultImg2 = document.getElementById('result__player2__img');
const winnerOutput = document.querySelectorAll('.container__ganador');   //defines the winner
// Score Board
const scorePlayer1 = document.getElementById('jugador1__contador');
const scorePlayer2 = document.getElementById('jugador2__contador');
const playBtn = document.getElementById('play-btn');
const restartBtn = document.getElementById('restart-btn');
// Select
const gameItems = document.getElementById('juego-items');
//dialog
const dialogContainer = document.getElementById('dialog-element');
const fondo = document.getElementById('fondo');
const dialogResultPlayer1 = document.getElementById('dialog__player1__result');
const dialogResultPlayer2 = document.getElementById('dialog__player2__result');
const dialogResultWinner= document.getElementById('dialog__result__winner');
// Players scores
let scorePlayer = 0;
let scoreBot = 0;
let isWin = false;
// items images paths
const itemsUrl = {
    rock: 'assets/piedra.svg',
    paper: 'assets/papel.svg',
    scissor: 'assets/tijera.svg',
};

// Update score every round on scoreboard
const updateScores = (scoreP, scoreB) => {
    // In case it reaches the goal
    if (scoreP === 5) {
        winnerOutput[0].innerText = 'GANADOR';
        isWin = true;
    } else if (scoreB === 5) {
        winnerOutput[1].innerText = 'GANADOR';
        isWin = true;
    }
    scorePlayer1.innerText = scoreP;
    scorePlayer2.innerText = scoreB;
    return isWin;
}

// items results of each round
const updateResults = (playerResult, botResult) => {
    // names
    resultPlayer1Item.innerText = playerResult;
    resultPlayer2Item.innerText = botResult;
    // images
    resultImg1.src = itemsUrl[playerResult];
    resultImg2.src = itemsUrl[botResult];
}
// Random select bot item
const selectRandomItem = () => {
    const itemOptions = ['rock', 'paper', 'scissor'];
    const randomIndex = Math.floor(Math.random() * itemOptions.length);
    return itemOptions[randomIndex];
}
// Reset all the values and innerTexts in the game
const resetGame = () => {
    resultsContainer.style.display = 'none';
    updateResults('', '');
    updateScores(0, 0);
    winnerOutput[0].innerText = '';
    winnerOutput[1].innerText = '';
    scorePlayer = 0;
    scoreBot = 0;
    isWin = false;
    dialogResultPlayer1.innerText = '';
    dialogResultPlayer2.innerText = '';
}

// Open the dialog and disables the background
const openDialog = () => {
    fondo.style.display = 'block';
    document.body.style.overflow = 'hidden';    //desactivate page scroll
    dialogContainer.style.display = 'flex';
}
const closeDialog = () => {
    dialogContainer.style.display = 'none';
    document.body.style.overflow = 'scroll';
    fondo.style.display = 'none';
}
// Changes the button start to restart
const changeBtns = () => {
    if (window.getComputedStyle(playBtn).display !== 'none') {
        playBtn.style.display = 'none';
        restartBtn.style.display = 'inline';
        gameItems.disabled = true;
        gameItems.style.cursor = 'default';
    }
}

// Play button
playBtn.addEventListener('click', () => {
    // Change results to block if none
    if (window.getComputedStyle(resultsContainer).display === 'none') resultsContainer.style.display = 'block';
    
    const playerInput = gameItems.value;    //player value 
    const botInput = selectRandomItem();    //bot value
    updateResults(playerInput, botInput);
    
    //round winner checker;
    if (playerInput === 'rock' && botInput === 'scissor'
        || playerInput === 'scissor' && botInput === 'paper' 
        || playerInput === 'paper' && botInput === 'rock'
    ){
        scorePlayer++;
        roundWinner.innerText = 'Player 1 Wins Round';
    } else if (playerInput !== botInput) {
        scoreBot++;
        roundWinner.innerText = 'Player 2 Wins Round';
    } else {
        roundWinner.innerText = 'Draw';
    }
    
    const gameOver = updateScores(scorePlayer, scoreBot);   //chekes if someones reaches 5 points
    
    if (gameOver) {
        // Update Dialog inner texts
        dialogResultPlayer1.innerText = scorePlayer;
        dialogResultPlayer2.innerText = scoreBot;
        dialogResultWinner.innerText = scorePlayer === 5 ? 'Player 1 is the winner' : 'Player 2 is the winner';
        openDialog();
    }
});
// Restart button
restartBtn.addEventListener('click', () => {
    document.getElementById('dialog__results').style.display = 'none'
    openDialog();
});

// Dialog buttons
document.getElementById('dialog__yes').addEventListener('click', () => {
    document.getElementById('dialog__results').style.display = 'block';

    playBtn.style.display = 'inline';
    restartBtn.style.display = 'none';
    gameItems.disabled = false;
    gameItems.style.cursor = 'pointer';
    resetGame();
    closeDialog();
});
document.getElementById('dialog__no').addEventListener('click', () => {
    closeDialog();
    changeBtns();
});
document.getElementById('close-btn').addEventListener('click', () => {
    closeDialog();
    changeBtns();
});