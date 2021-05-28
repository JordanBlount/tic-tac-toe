const Player = (name, piece, turn) => {
    let _spaces = [];

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

    const isMyTurn = value => {
        return value === turn;
    } 

    return {
        getName,
        addSpace,
        getSpaces,
        getPiece,
        getTurn,
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

    let _spaces = doc.querySelectorAll("space");

    const getBoard = () => {
        return _board;
    }

    const setBoard = () => {
        _spaces.forEach(function(space) {
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
    // The winning combinations
    let _winningCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], 
                          [1, 4, 7], [2, 5, 8], [3, 6, 9], 
                          [1, 5, 9], [7, 5, 3]];

    let _currentTurn = 0;

    const init = () => {
        setTurn(player1, player2);
        gameboard.setBoard();
    }

    const setTurn = (player1, player2) => {
        // TODO: Check if range is equal to: 1 - 2
        let turn = Math.floor(Math.random() * (2 - 1) + 1) - 1;
        if(turn === 1) {
            player1.setTurn(turn);
            player2.setTurn(2);
        } else {
            player2.setTurn(turn);
            player1.setTurn(1);
        }
    }

    const makeMove = (x, y, space) => {
        let winner = getWinner(gameboard);
        if(winner !== false) {
            // TODO: Game over. Someone won.
        } 
        if(isTie()) {
            // TODO: Game over. Tied
        }
        if(x !== 0 && y !== 0) {
            if(gameboard.getBoard[x][y] === "") {
                addPiece(space, _playerTurn.getPiece(), x, y);
                _currentTurn();
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
    }

    const getWinner = (board) => {
        let p1Moves = player1.getSpaces();
        let p2Moves = player2.getSpaces();
        for (let i = 0; i < _winningCombos.length; i++) {
            let combo = _winningCombos[i];
            console.log(combo);
            if(combo.every(piece => p1Moves.includes(piece))) {
                console.log(p1Moves);
                console.log("Player 1 is the winner");
                return player1;
            }
            if(combo.every(piece => p2Moves.includes(piece))) {
                console.log(p2Moves);
                console.log("Player 2 is the winner");
                return player2;
            }
        }
        return false;
    }

    const isTie = () => {
        let p1Moves = player1.getSpaces();
        let p2Moves = player2.getSpaces();
        console.log(p1Moves);
        console.log(p2Moves);
        if(p1Moves.length >- 4 && p2Moves.length >= 4) {
            return true;
        } else {
            return false;
        }
    }

    const reset = () => {
        player1.getSpaces() = [];
        player2.getSpaces() = [];

        // Choose player who will start next game
        setTurn(player1, player2);

        // New game with same board?
        gameboard.reset();

        // Return to start menu
    }

    return {
        getWinner,
        isTie
    }
})();

const displayController = (function(doc) {

    const newScreen = () => {
        // Go back to home screen. This should happen once 
        // everything has been reset completely or if choosen
    }

    const reset = () => {
        
    }

    return {
       newScreen 
    }

})(document);

function start() {

}