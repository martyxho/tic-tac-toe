const gameboard = (() => {
  const gameArr = ['X','X', 'X', 'O', 'O', 'O', 'X', 'O', 'X'];

  return {gameArr};
})();

const displayController = (() => {
  const container = document.querySelector('.container');
  const renderDisplay = (arr) => {
    arr.forEach((e, i) => {
      const div = document.getElementById(i);
      div.textContent = e;
    });
  };
  
  return {renderDisplay};
})();

const game = (() => {
  displayController.renderDisplay(gameboard.gameArr);
})();

const player = () => {

};