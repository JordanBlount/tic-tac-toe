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
        _player2Turn = false;
        _player1 = Player("Player 1", "x");
        _player2 = Player("Player 2", "o");
        gameBoard.setBoard();
        display.setTurn(_player2Turn);
        display.closeResultScreen();
        display.resetButton();
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
            gameOver(player, false);
        // check for draw
        } else if (isDraw()) {
            gameOver(player, true);
        } else {
            changeTurns();
            display.setTurn(_getTurn());
        }
    }

    const gameOver = (player, isDraw) => {
        display.openResultScreen(player, isDraw);    
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
    
    const isDraw = () => {
        return [...gameBoard.getSpaces()].every(space => {
            return space.classList.contains(_player1.getMark()) 
            || space.classList.contains(_player2.getMark());
        });
    }

    const getMarks = () => {
        return [_player1.getMark(), _player2.getMark()];
    }

    return {
        start,
        makeMove,
        getMarks
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
            space.classList.remove(game.getMarks()[0]);
            space.classList.remove(game.getMarks()[1]);
            space.removeEventListener('click', spaceClicked);
            console.log("TEST");
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

    let resultMessage = doc.getElementById("result-message");
    let resultScreen = doc.getElementById("result-screen");
    let resetBtn = doc.getElementById("reset");

    // Welcome Screen
    const openWelcomeScreen = () => {
        // This needs to get the player name and
        // if the player is playing against a computer


    }

    // Game Screen

    // Result Screen
    const openResultScreen = (player, draw) => {
        if(draw) {
            resultMessage.innerHTML = "Issa draw!"
        } else {
            resultMessage.innerHTML = `${player.getName()} won!`
        }
        resultScreen.classList.add('show');
    }

    const closeResultScreen = () => {
        resultMessage.innerHTML = "If you seeing this, you playing";
        resultScreen.classList.remove('show');
    }

    const setTurn = (turn) => {
        _player1.classList.remove('myTurn');
        _player2.classList.remove('myTurn');
        if(turn) {
            _player2.classList.add('myTurn');
        } else {
            _player1.classList.add('myTurn');
        }
    }
    
    const resetButton = () => {
        // I tried to declare this without writing the
        // entire function out and it would mess up complete
        // resetBtn.addEventListener('click', game.start());
        // It seems that this will automatically call the method
        // at least one time before instead of just listening
        resetBtn.addEventListener('click', function() {
            game.start();
        });
    }

    return {
        setTurn,
        openResultScreen,
        closeResultScreen,
        resetButton
    }

})(document);

start();

function start() {
    game.start();
}