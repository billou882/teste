// Navigation entre les pages
function switchPage(page) {
  document.getElementById('pageMessages').classList.add('hidden');
  document.getElementById('pageBeReal').classList.add('hidden');
  document.getElementById('pageAmis').classList.add('hidden');

  const buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  if (page === 'messages') {
    document.getElementById('pageMessages').classList.remove('hidden');
    document.getElementById('headerTitle').textContent = '💬 Tchat & Jeux';
    buttons[0].classList.add('active');
  } else if (page === 'bereal') {
    document.getElementById('pageBeReal').classList.remove('hidden');
    document.getElementById('headerTitle').textContent = '⚡ BeReal Friends';
    buttons[1].classList.add('active');
  } else if (page === 'amis') {
    document.getElementById('pageAmis').classList.remove('hidden');
    document.getElementById('headerTitle').textContent = '🤝 Amis & QR Codes';
    buttons[2].classList.add('active');
  }
}

// Fonction de tchat simple
function sendMessage() {
  const input = document.getElementById('msgInput');
  const chatBox = document.getElementById('chatBox');

  if (input.value.trim() !== '') {
    const msg = document.createElement('div');
    msg.className = 'message sent';
    msg.textContent = input.value;
    chatBox.appendChild(msg);
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// Reagissez aux posts BeReal
function addReaction(emoji) {
  alert(`Vous avez réagi avec ${emoji} !`);
}

// LOGIQUE DU MINI-JEU (Morpion fluide sans lag)
let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

function makeMove(index) {
  if (boardState[index] === '' && gameActive) {
    boardState[index] = currentPlayer;
    const cells = document.querySelectorAll('.cell');
    cells[index].textContent = currentPlayer;

    if (checkWin()) {
      document.getElementById('gameStatus').textContent = `🎉 Victoire du Joueur (${currentPlayer}) !`;
      gameActive = false;
      return;
    }

    if (!boardState.includes('')) {
      document.getElementById('gameStatus').textContent = "Match nul ! 🤝";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('gameStatus').textContent = `Tour du Joueur (${currentPlayer})`;
  }
}

function checkWin() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winConditions.some(condition => {
    return condition.every(index => boardState[index] === currentPlayer);
  });
}

function resetGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  document.getElementById('gameStatus').textContent = 'Tour du Joueur 1 (X)';
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}
