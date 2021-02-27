import { playerTurn } from '../../../services/playerTurn.service.js'
import { $ } from '../../../utils/utils.js'
import { piecesDetermine } from '../../piecesDetermine.service.js'

export default {
    handlePieceClick({ pieceBoxElement, pieceBoxPosition, pieceElement, pieceType }) {
        if ( !pieceElement ) {
            return
        }
        if ( 
            this.isPieceSelected() && 
            this.isNotOnPieceSelected( pieceBoxPosition )
        ) {
            return
        }

        if ( this.isOnPieceSelected( pieceBoxPosition ) ) {
            this.resetPieceSelected()
            this.removeReady( pieceBoxElement )
            this.removePiecePotentials( pieceBoxPosition )
            
            return
        } 

        if ( playerTurn.isRightTurn( pieceType ) ) {
            this.changePieceSelected( pieceBoxPosition )
            this.setReady( pieceBoxElement )
            this.setPiecePotentials( pieceBoxPosition )
        }
        else if ( !this.isPieceSelected() ) {
            this.setNotAllowed( pieceBoxElement )
        }
    },

    ////////////////////////

    setPiecePotentials( pieceBoxPosition ) {
        piecesDetermine.itereateDetermine( pieceBoxPosition, this.setPotential )
    },
    removePiecePotentials( pieceBoxPosition ) {
        piecesDetermine.itereateDetermine( pieceBoxPosition, this.removePotential )
    }
}