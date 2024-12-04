const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popupMessage');
const newGameButton = document.getElementById('newGameButton');

let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (cell.textContent || !gameActive) return;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    
    if (checkWin()) {
        gameActive = false;
        message.textContent = `Player ${currentPlayer} wins!`;
        highlightWinningCells();
        createConfetti();
        showPopup(`Player ${currentPlayer} wins!`);
    } else if (checkDraw()) {
        gameActive = false;
        message.textContent = "It's a draw!";
        showPopup("It's a draw!");
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function checkDraw() {
    return Array.from(cells).every(cell => cell.textContent);
}

function highlightWinningCells() {
    winningCombinations.forEach(combination => {
        if (combination.every(index => cells[index].textContent === currentPlayer)) {
            combination.forEach(index => {
                cells[index].classList.add('winner');
                addSparkles(cells[index]);
            });
        }
    });
}

function addSparkles(cell) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 0.5}s`;
        cell.appendChild(sparkle);
    }
}

function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti-container');
    document.body.appendChild(confettiContainer);

    const colors = ['#f0f', '#0ff', '#ff0', '#0f0', '#00f'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animation = `confetti-fall ${2 + Math.random() * 3}s linear forwards`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

function showPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = 'flex';
}

function hidePopup() {
    popup.style.display = 'none';
}

function restartGame() {
    const confettiContainer = document.querySelector('.confetti-container');
    if (confettiContainer) {
        confettiContainer.remove();
    }
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winner');
        const sparkles = cell.querySelectorAll('.sparkle');
        sparkles.forEach(sparkle => sparkle.remove());
    });
    hidePopup();
}

board.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', restartGame);

// Initialize the game
message.textContent = `Player ${currentPlayer}'s turn`;

