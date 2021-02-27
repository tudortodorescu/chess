import { chessConfig } from '../../../config/chessConfig.config.js'
import { playerTurn } from '../../../services/playerTurn.service.js'
import { $ } from '../../../utils/utils.js'
import { piecesDetermine } from '../../piecesDetermine.service.js'
import { piecesRender } from '../../piecesRender.service.js'

export default {
    handlePieceClick({ pieceBoxElement, pieceBoxPosition, pieceElement, pieceType }) {
        const hasPiecePotential = piecesDetermine.hasPiecePotential( this.pieceSelectedPosition, pieceBoxPosition )
        if ( hasPiecePotential ) {
            this.handleMovingThePiece({ pieceBoxElement, pieceElement })
            return
        }

        if ( !pieceElement ) {
            return
        }
        if ( 
            this.isPieceSelected() && 
            this.isNotOnPieceSelected( pieceBoxPosition )
        ) {
            return
        }

        if ( 
            this.isOnPieceSelected( pieceBoxPosition )
        ) {
            this.resetPieceSelected()
            this.removeReady( pieceBoxElement )
            this.removePiecePotentials( pieceBoxPosition )
            
            return
        } 

        if ( 
            playerTurn.isRightTurn( pieceType )
        ) {
        
            if ( this.hasPiecePotentials( pieceBoxPosition )) {
                this.changePieceSelected( pieceBoxPosition )
                this.setReady( pieceBoxElement )
                this.setPiecePotentials( pieceBoxPosition )
            } else {
                this.setNotAllowed( pieceBoxElement )    
            }
            
            return
        }
        else if ( !this.isPieceSelected() ) {
            this.setNotAllowed( pieceBoxElement )
            return
        }
    },

    ////////////////////////

    handleMovingThePiece({ pieceBoxElement, pieceElement }) {
        if ( pieceElement ) {
            pieceElement.remove()
        }

        const pieceBoxElementSelected = $( `#${ this.pieceSelectedPosition }` )
        const pieceElementSelected = pieceBoxElementSelected.querySelector( chessConfig.chessPieceSelector )
        pieceBoxElement.append( pieceElementSelected )

        this.removeReady( pieceBoxElementSelected )
        this.removeSelected( pieceBoxElementSelected )
        this.removePiecePotentials( this.pieceSelectedPosition )
        this.removeReady( pieceBoxElementSelected )
        this.resetPieceSelected()
        
        playerTurn.changeTurn()
        piecesDetermine.determine()
        piecesRender.resetPiecesBoxListeners()
        piecesRender.addPiecesBoxListeners()

    },

    ////////////////////////

    setPiecePotentials( pieceBoxPosition ) {
        piecesDetermine.itereateDetermine( pieceBoxPosition, this.setPotential )
    },
    removePiecePotentials( pieceBoxPosition ) {
        piecesDetermine.itereateDetermine( pieceBoxPosition, this.removePotential )
    },
    hasPiecePotentials( pieceBoxPosition ) {
        return piecesDetermine.hasPiecePotentials( pieceBoxPosition )
    }
}