
export default {
    determineQueen({ isWhitePiece, pieceBoxPosition }) {
        this.determineQueenWhiteBlack( isWhitePiece, { pieceBoxPosition })
    },
    determineQueenWhiteBlack( isWhitePiece, { pieceBoxPosition }) {
        this.determineBishop({ isWhitePiece, pieceBoxPosition })
        this.determineRook({ isWhitePiece, pieceBoxPosition })
    }
}