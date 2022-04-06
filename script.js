const gameboard = (() => {
  const gameArr = [];
  const wipe = () => gameArr.length = 0;
  return {gameArr, wipe};
})();

const displayController = (() => {
  const renderDisplay = (arr) => {
    arr.forEach((e, i) => {
      const div = document.getElementById(i);
      div.textContent = e;
    });
  };
  const wipe = () => {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(e => e.textContent = '');
  }
  return {renderDisplay, wipe};
})();

const player = (marker) => {
  const getMarker = () => marker;
  function setName(name) { 
    this.name = name;
  }
  function getName() {
    return this.name;
  };
  return {getMarker, getName, setName};
};

const game = (() => {
  const p1 = player('X');
  const p2 = player('O');
  let currentPlayer;
  let winner;
  function startGame() {
    const p1Name = document.getElementById('p1').value;
    const p2Name = document.getElementById('p2').value;
    p1.setName(p1Name);
    p2.setName(p2Name);
    currentPlayer = p1;
    setBoxListeners();
    const h1 = document.getElementById('message');
    h1.textContent = `${p1.getName()} vs ${p2.getName()} Game Start`;
    wipe();
  }
  function wipe() {
    gameboard.wipe();
    displayController.wipe();
  }
  function changePlayer() {
    if (currentPlayer === p1) {
      currentPlayer = p2;
      winner = p1;
    } else {
      currentPlayer = p1;
      winner = p2;
    }
  }
  function markBox(e) {
    const i = e.target.id;
    gameboard.gameArr[i] = currentPlayer.getMarker();
    displayController.renderDisplay(gameboard.gameArr);
    changePlayer();
  }
  function checkGame() {
    const win = checkWin();
    if (win || checkEnd()) {
      endGame(win);
    } 
  }
  function checkWin() {
    const gArr = gameboard.gameArr;
    let checks = [[0 , 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < checks.length; i++) {
      if (checkRow(gArr, checks[i][0], checks[i][1], checks[i][2])) {
        return true;
      } 
    }
    return false;
  }
  function checkRow(arr, a, b, c) {
    if (arr[a] == undefined || arr[b] == undefined || arr[c] == undefined) {
      return false;
    }
    const result = (arr[a] == arr[b] && arr[b] == arr[c])
    return result;
  }
  function checkEnd() {
    return Object.values(gameboard.gameArr).length === 9;
  }
  function endGame(win) {
    const h1 = document.getElementById('message');
    h1.textContent = win ? 
      `Game Over. ${winner.getName()} wins!`
      : `Game Over. It's a draw!`;
    removeBoxListeners();
  }
  function setBoxListeners() {
    for (let i = 0; i < 9; i++) {
      const div = document.getElementById(i);
      div.addEventListener('click', markBox, {once : true});
      div.addEventListener('click', checkGame, {once : true});
    }
  };
  function removeBoxListeners() {
    for (let i = 0; i < 9; i++) {
      const div = document.getElementById(i);
      div.removeEventListener('click', markBox, {once : true});
      div.removeEventListener('click', checkGame, {once : true});
    }
  }
  const setStartListener = (() => {
    const start = document.getElementById('start');
    start.addEventListener('click', startGame);
  })();
})();

