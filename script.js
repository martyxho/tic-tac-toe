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
  function markBox(i) {
    gameboard.gameArr[i] = currentPlayer.getMarker();
    displayController.renderDisplay(gameboard.gameArr);
    changePlayer();
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
      div.addEventListener('click', markBox.bind(null, i), {once : true});
    }
  })();
  
  displayController.renderDisplay(gameboard.gameArr);
})();

