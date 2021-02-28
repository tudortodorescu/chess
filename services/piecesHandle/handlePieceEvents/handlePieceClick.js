import { playerTurn } from '../../../services/playerTurn.service.js'
import { checkMate } from '../../checkMate.service.js'
import { piecesDetermine } from '../../piecesDetermine.service.js'
import handlePieceMovingHelpers from '../helpers/handlePieceMoving.helpers.js'

export default {
    handlePieceClick({ pieceBoxElement, pieceBoxPosition, pieceElement, pieceType }) {
        const { pieceSelectedPosition } = this
        const hasPiecePotential = piecesDetermine.hasPiecePotential( pieceSelectedPosition, pieceBoxPosition )
        
        if ( hasPiecePotential ) {
            if ( 
                checkMate.cantMoveDueToCheck({ pieceSelectedPosition, pieceBoxPosition })
            ) {
                console.log( 'cant move there', pieceBoxElement )
                this.setNotAllowed( pieceBoxElement )
                
                return
            }
            
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

    setPiecePotentials( pieceBoxPosition ) {
        piecesDetermine.itereateDetermine( pieceBoxPosition, this.setPotential )
    },
    removePiecePotentials( pieceBoxPosition ) {
        piecesDetermine.itereateDetermine( pieceBoxPosition, this.removePotential )
    },
    hasPiecePotentials( pieceBoxPosition ) {
        return piecesDetermine.hasPiecePotentials( pieceBoxPosition )
    },

    ...handlePieceMovingHelpers
}