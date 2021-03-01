
export const playerTurn = {
    whosTurn: 'white',

    get isWhiteTurn() {
        return this.whosTurn === 'white'
    },
    get isBlackTurn() {
        return this.whosTurn === 'black'
    },

    changeTurn() {
        if ( this.isWhiteTurn ) {
            this.whosTurn = 'black'
        }
        else if ( this.isBlackTurn ) {
            this.whosTurn = 'white'
        }
    },
    isWrongTurn( pieceType ) {
        if ( 
            this.isWhiteTurn &&
            this.isBlackPiece( pieceType )
        ) {
            return true
        }
        else if ( 
            this.isBlackTurn &&
            this.isWhitePiece( pieceType )
        ) {
            return  true
        }

        return false
    },
    isRightTurn( pieceType ) {
        return !this.isWrongTurn( pieceType )
    },
    isWhitePiece( pieceType ) {
        return !!pieceType.match(/white_/)
    },
    isBlackPiece( pieceType ) {
        return !!pieceType.match(/black_/)
    }
}

window.playerTurn = playerTurn
