import { playerTurn } from '../../../services/playerTurn.service.js'
import { piecesDetermine } from '../../piecesDetermine.service.js'

export default {
    handlePieceMouseenter({ pieceBoxElement, pieceBoxPosition, pieceElement, pieceType }) {
        if ( checkMate.gameOver ) {
            return
        }
        
        if ( 
            this.isPieceSelected() && 
            this.isNotOnPieceSelected( pieceBoxPosition )
        ) {
            const hasPiecePotential = piecesDetermine.hasPiecePotential( this.pieceSelectedPosition, pieceBoxPosition )
            if ( hasPiecePotential ) {
                this.setPointer( pieceBoxElement )
            }
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