import { playerTurn } from '../../../services/playerTurn.service.js'

export default {
    handlePieceMouseleave({ pieceBoxElement, pieceBoxPosition, pieceElement, pieceType }) {
        if ( this.isNotOnPieceSelected( pieceBoxPosition ) ) {
            this.removeSelected( pieceBoxElement )
            this.removeNotAllowed( pieceBoxElement )
        }
    },
}
