const Player = (name, mark) => {

    const getName = () => name;

    const getMark = () => {
        return mark;
    }

    return {
        getName,
        getMark
    }
}

const game = (function() {

    let _winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];

    // Start as nothing
    let _player1 = null;
    let _player2 = null;

    let _player2Turn = false;

    const start = () => {
        _player1 = Player("Player 1", "x");
        _player2 = Player("Player 2", "o");
        gameBoard.setBoard();
        display.setTurn(_player2Turn);
    }

    const _getTurn = () => {
        return _player2Turn;
    }

    const getPlayer = (num) => {
        return num === 1 ? _player1 : _player2;
    } 

    const changeTurns = () => {
        if(!_player2Turn) {
            _player2Turn = true;
        } else {
            _player2Turn = false;
        }
    }

    //place mark
    //check for winner
    //check for draw
    //end game
    const makeMove = (space) => {
        // whose turn is it
        const player = _player2Turn === false ? _player1 : _player2;

        // place mark
        gameBoard.addMark(space, player);

        // check for winner
        if(checkIfWon(player)) {
            console.log("You won!");
        }
        
        // change turns
        changeTurns();
        display.setTurn(_getTurn());
    }

    const checkIfWon = (player) => {
        let mark = player.getMark();
        let spaces = gameBoard.getSpaces();
        return  _winningCombos.some(comb => {
            return comb.every(index => {
                return spaces[index].classList.contains(mark);
            })     
        });
    }   

    return {
        start,
        makeMove
    }   

})();


const gameBoard = (function(doc) {
    let _spaces = doc.querySelectorAll('[data-space]');

    const getSpaces = () => _spaces;

    const spaceClicked = (e) => {
        const space = e.target;
        game.makeMove(space);
    }

    const addMark = (space, player) => {
        space.classList.add(player.getMark());
    }

    const setBoard = () => {
        _spaces.forEach(space => {
            space.addEventListener('click', spaceClicked, {once: true});
        });
    }

    return {
        getSpaces,
        addMark,
        setBoard
    }
})(document);


const display = (function(doc) {

    let _player1 = doc.getElementById("player1");
    let _player2 = doc.getElementById("player2");

    // Welcome Screen

    // Game Screen

    // Result Screen

    const setTurn = (turn) => {
        _player1.classList.remove('myTurn');
        _player2.classList.remove('myTurn');
        if(turn) {
            _player2.classList.add('myTurn');
        } else {
            _player1.classList.add('myTurn');
        }
    }

    return {
        setTurn
    }

})(document);

start();

function start() {
    game.start();
}


// const getWinner = (board) => {
//     let p1Moves = player1.getSpaces();
//     let p2Moves = player2.getSpaces();
//     for (let i = 0; i < _winningCombos.length; i++) {
//         let combo = _winningCombos[i];
//         if(combo.every(piece => p1Moves.includes(piece))) {
//             return player1;
//         }
//         if(combo.every(piece => p2Moves.includes(piece))) {
//             return player2;
//         }
//     }
//     return false;
// }

// const isTie = () => {
//     let p1Moves = player1.getSpaces();
//     let p2Moves = player2.getSpaces();
//     if(p1Moves.length >- 4 && p2Moves.length >= 4) {
//         return true;
//     } else {
//         return false;
//     }
// }