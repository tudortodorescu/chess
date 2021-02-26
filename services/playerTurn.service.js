
export const playerTurn = {
    whosTurn: 'white',

    get isWhite() {
        return this.whosTurn === 'white'
    },
    get isBlack() {
        return this.whosTurn === 'black'
    },

    changeTurn() {
        if ( this.isWhite ) {
            this.whosTurn = 'black'
        }
        else if ( this.isBlack ) {
            this.whosTurn = 'white'
        }
    },
    isWrongTurn( pieceType ) {
        const isPieceWhite = !!pieceType.match(/white_/)

        if ( this.isWhite && !isPieceWhite ) {
            return true
        }
        else if ( this.isBlack && isPieceWhite ) {
            return  true
        }

        return false
    }
}
