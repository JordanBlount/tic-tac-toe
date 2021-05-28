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

const Game = (player1, player2) => {
    // The winning combinations
    let winningCombs = [[1, 2, 3], [4, 5, 6], [7, 8, 9], 
                    [1, 4, 7], [2, 5, 8], [3, 7, 9], 
                    [1, 5, 9,], [7, 5, 3]];

    let currentTurn = 0;

    const setTurn = (player1, player2) => {
        let turn = Math.floor(Math.random() * (2 - 1) + 1) - 1;
        if(turn === 1) {
            player1.setTurn(turn);
            player2.setTurn(2);
        } else {
            player2.setTurn(turn);
            player1.setTurn(1);
        }
    }
}