
export default {
    handlePieceMouseleave({ pieceBoxElement, pieceBoxPosition }) {
        if ( checkMate.gameOver ) {
            return
        }
        
        if ( this.isNotOnPieceSelected( pieceBoxPosition ) ) {
            this.removeSelected( pieceBoxElement )
            this.removeNotAllowed( pieceBoxElement )
            this.removePointer( pieceBoxElement )
        }
    },
}
