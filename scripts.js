const Player = (name, piece) => {
    let _spaces = [];
    let turn = 0;


    const addSpace = (piece) => {
        return _spaces.push(piece);
    }

    const getSpaces = () => {
        return _spaces;
    }

    const getName = () => {
        return name;
    }

    const getPiece = () => {
        return piece;
    }

    const getTurn = () => {
        return turn;
    }

    const setTurn = (x) => {
        turn = x;
    }

    const isMyTurn = value => {
        return value === turn;
    } 

    return {
        getName,
        addSpace,
        getSpaces,
        getPiece,
        getTurn,
        setTurn,
        isMyTurn
    }
}

let player1 = Player("Player 1", "X", 1);
let player2 = Player("Player 2", "O", 2);

// Game Board
// 1 2 3
// 4 5 6
// 7 8 9

// DEBUG
function tie() {
    player1.addSpace(1)
    player1.addSpace(5);
    player1.addSpace(6);
    player1.addSpace(7);
    player1.addSpace(8);

    player2.addSpace(2);
    player2.addSpace(3);
    player2.addSpace(9);
    player2.addSpace(4);
    if(game.getWinner(gameboard.getBoard()) == false) {
        if(game.isTie()) {
            console.log("IT'S A TIE")
        }
    }
}

// DEBUG
function test() {
    player1.addSpace(4);
    player1.addSpace(7);
    player1.addSpace(8);

    player2.addSpace(2);
    player2.addSpace(3);
    player2.addSpace(6);
    player2.addSpace(5);
    game.getWinner(gameboard.getBoard());
}


const gameboard = (function(doc) {   
    // let _board = [[1, 2, 3], 
    //              [4, 5, 6], 
    //              [7, 8, 9]];
    let _board = [[],[],[]];

    let _spaces = doc.querySelectorAll(".space");

    const getBoard = () => {
        return _board;
    }

    const setBoard = () => {
        console.log(_spaces);
        _spaces.forEach(space => {
            let x = space.dataset.x;
            let y = space.dataset.y;
            space.addEventListener('click', game.makeMove(x, y, space));
        });
    }

    const addPiece = (space, sign, x, y) => {
        let mark = document.createElement("p");
        mark.textContent = sign;
        mark.classList.add(sign)
        space.appendChild(sign);   
        _board[x][y] = sign;     
    }

    const reset = () => {
        _board = [[],[],[]]; 
        setBoard();
    }

    return {
        getBoard, 
        setBoard,
        addPiece
    }
})(document);


const game = (function(player1, player2) {
    let _winningCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], 
                          [1, 4, 7], [2, 5, 8], [3, 6, 9], 
                          [1, 5, 9], [7, 5, 3]];

    let _currentTurn = 0;

    const init = () => {
        setTurn(player1, player2);
        gameboard.setBoard();
    }

    const setTurn = (player1, player2) => {
        let min = Math.ceil(1);
        let max = Math.floor(2);
        let turn = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log("Turn " + turn);
        if(turn === 1) {
            player1.setTurn(turn);
            player2.setTurn(2);
            displayController.setDisplay(`${player1.getName} is first!`);
        } else {
            player2.setTurn(turn);
            player1.setTurn(1);
            displayController.setDisplay(`${player1.getName} is first!`);
        }
    }

    const makeMove = (x, y, space) => {
        console.log("Able to click");
        let winner = getWinner(gameboard);
        if(winner !== false) {
            // TODO: Game over. Someone won.
        } else if (isTie()) {
            // TODO: Game over. Tied
        }
        if(x !== 0 && y !== 0) {
            console.log("REACHED");
            console.log(gameboard.getBoard())
            if(gameboard.getBoard()[x][y] === "") {
                addPiece(space, _playerTurn.getPiece(), x, y);
                _changeTurn();
            }
        }
    }

    const _playerTurn = () => {
        return player1.getTurn === _currentTurn ? player1 : player2;
    }

    const _changeTurn = () => {
        if(_currentTurn === 1) {
            _currentTurn = 2;
        } else {
            _currentTurn = 1;
        }
        displayController.setDisplay(`${_currentTurn === player1.getTurn() ? player1.getName()
        : player2.getName()}'s turn!`);
    }

    const getWinner = (board) => {
        let p1Moves = player1.getSpaces();
        let p2Moves = player2.getSpaces();
        for (let i = 0; i < _winningCombos.length; i++) {
            let combo = _winningCombos[i];
            if(combo.every(piece => p1Moves.includes(piece))) {
                return player1;
            }
            if(combo.every(piece => p2Moves.includes(piece))) {
                return player2;
            }
        }
        return false;
    }

    const isTie = () => {
        let p1Moves = player1.getSpaces();
        let p2Moves = player2.getSpaces();
        if(p1Moves.length >- 4 && p2Moves.length >= 4) {
            return true;
        } else {
            return false;
        }
    }

    const reset = () => {
        player1.getSpaces() = [];
        player2.getSpaces() = [];

        // New game with same board?
        gameboard.reset();
        displayController.reset();
        // Return to start menu
    }

    return {
        getWinner,
        makeMove,
        isTie,
        init
    }
})(player1, player2);

const displayController = (function(doc) {
    let _newGameScreen = doc.querySelector('.game-selection');

    let _playerBoard = doc.querySelector('.player-board');
    let _display = doc.querySelector('.display');
    let _board = doc.querySelector('.board');
    let _gameBtns = doc.querySelector('.btns');

    let _opponent = doc.querySelector('.opponent');
    let _start = doc.querySelector('.start-btn');

    const gameSetup = () => {
        _opponent.addEventListener('click', _changeOpponent);
        _start.addEventListener('click', _startGame);       
    }

    const openNewGameScreen = () => {
        // Go back to home screen. This should happen once 
        // everything has been reset completely or if choosen
        _newGameScreen.style.display = "block";

        _playerBoard.style.display = "none";
        _display.style.display = "none";
        _board.style.display = "none";
        _gameBtns.style.display = "none";

        _opponent.addEventListener('click', _changeOpponent);
        _start.addEventListener('click', _startGame);
    }

    const openGameScreen = () => {
        _newGameScreen.style.display = "none";

        _playerBoard.style.display = "flex";
        _display.style.display = "block";
        _board.style.display = "grid";
        _gameBtns.style.display = "block";   

        _opponent.removeEventListener('click', _changeOpponent);     
        _start.removeEventListener('click', _startGame);     
    }

    const setDisplay = text => {
        _display.textContent = text;
    }

    const displayWinner = () => {
        _display.classList.add('won');
    }

    const reset = () => {
        setDisplay('');
        _display.classList.remove('won');           
    }

    const _changeOpponent = () => {
        let name = _opponent.textContent.toUpperCase();
        console.log(name);
        if(name === "PLAYER 2") {
            _opponent.textContent = "AI";
        } else {
            _opponent.textContent = "Player 2";
        }
    }

    const _startGame = () => {
        openGameScreen();
        game.init();
    }

    return {
       gameSetup,
       openNewGameScreen,
       openGameScreen,
       setDisplay,
       displayWinner 
    }

})(document);

function start() {
    displayController.openNewGameScreen();
}

