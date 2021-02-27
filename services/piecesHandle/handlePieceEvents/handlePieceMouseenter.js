import { playerTurn } from '../../../services/playerTurn.service.js'

export default {
    handlePieceMouseenter({ pieceBoxElement, pieceBoxPosition, pieceElement, pieceType }) {
        if ( 
            this.isPieceSelected() && 
            this.isNotOnPieceSelected( pieceBoxPosition )
        ) {
            /** handle position available to move */
            return
        }

        if ( this.isPieceSelected() ) {
            return
        }
        
        if ( !pieceElement ) {
            return
        }
        
        if ( playerTurn.isRightTurn( pieceType ) ) {
           this.setSelected( pieceBoxElement )
        }
    },
}