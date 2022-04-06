const gameboard = (() => {
  const gameArr = [];
  return {gameArr};
})();

const displayController = (() => {
  const renderDisplay = (arr) => {
    arr.forEach((e, i) => {
      const div = document.getElementById(i);
      div.textContent = e;
    });
  };
  return {renderDisplay};
})();

const player = (marker) => {
  const getMarker = () => marker;
  return {getMarker};
};

const game = (() => {
  const p1 = player('X');
  const p2 = player('O');
  let currentPlayer = p1;
  function markBox(e) {
    const i = e.target.id;
    gameboard.gameArr[i] = currentPlayer.getMarker();
    displayController.renderDisplay(gameboard.gameArr);
    changePlayer();
  }
  function checkGame() {
    if (checkWin() || checkEnd()) {
      endGame();
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
  function endGame() {
    const content = document.querySelector('.content');
    const h1 = document.createElement('h1');
    h1.textContent = 'Game Over';
    content.appendChild(h1);
    for (let i = 0; i < 9; i++) {
      const div = document.getElementById(i);
      div.removeEventListener('click', markBox, {once : true});
      div.removeEventListener('click', checkGame, {once : true});
    }
  }
  function changePlayer() {
    if (currentPlayer === p1) {
      currentPlayer = p2;
    } else {
      currentPlayer = p1;
    }
  }
  const setBoxListeners = (() => {
    for (let i = 0; i < 9; i++) {
      const div = document.getElementById(i);
      div.addEventListener('click', markBox, {once : true});
      div.addEventListener('click', checkGame, {once : true});
    }
  })();
  
  displayController.renderDisplay(gameboard.gameArr);
})();

