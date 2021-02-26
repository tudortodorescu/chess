import { playerTurn } from '../services/playerTurn.service.js'

export const piecesHandle = {
    pieceSelected: null,

    get isPieceSelected() {
        return !!this.pieceSelected
    },

    changePieceSelected( pieceSelected ) {
        this.pieceSelected = pieceSelected
    },

    handlePieceMouseenter( pieceBoxElement ) {
        const pieceBoxPosition = pieceBoxElement.getAttribute( 'id' )

        if ( 
            this.pieceSelected ||
            pieceBoxPosition === this.pieceSelected 
        ) {
            /** handle position available to move */
            return
        }

        const pieceElement = pieceBoxElement.querySelector( '.piece' )

        if ( !pieceElement ) {
            return
        }

        const pieceType = pieceElement.getAttribute( 'piece-type' )

        if ( !playerTurn.isWrongTurn( pieceType ) ) {
            pieceBoxElement.classList.add( 'piece-selected' )
        }
    },

    handlePieceMouseleave( pieceBoxElement ) {
        const pieceBoxPosition = pieceBoxElement.getAttribute( 'id' )

        if ( pieceBoxPosition !== this.pieceSelected ) {
            pieceBoxElement.classList.remove( 'piece-selected' )
            pieceBoxElement.classList.remove( 'piece-not-allowed' )
        }
    },

    handlePieceClick( pieceBoxElement ) {
        const pieceBoxPosition = pieceBoxElement.getAttribute( 'id' )
        const pieceElement = pieceBoxElement.querySelector( '.piece' )

        if ( !pieceElement ) {
            return
        }

        if ( pieceBoxPosition === this.pieceSelected ) {
            this.pieceSelected = null
            pieceBoxElement.classList.remove( 'piece-selected' )
            return
        } 

        const pieceType = pieceElement.getAttribute( 'piece-type' )

        if ( !playerTurn.isWrongTurn( pieceType ) ) {
            this.changePieceSelected( pieceBoxPosition )
        }
        else if ( !this.pieceSelected ) {
            pieceBoxElement.classList.add( 'piece-not-allowed' )
        }
    }
}