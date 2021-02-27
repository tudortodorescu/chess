
export default {
    handlePieceMouseleave({ pieceBoxElement, pieceBoxPosition }) {
        if ( this.isNotOnPieceSelected( pieceBoxPosition ) ) {
            this.removeSelected( pieceBoxElement )
            this.removeNotAllowed( pieceBoxElement )
            this.removePointer( pieceBoxElement )
        }
    },
}
