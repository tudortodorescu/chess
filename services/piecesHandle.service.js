import handlePieceEventsMethods from './piecesHandle/handlePieceEvents.methods.js'
import handlePieceStatesMethods from './piecesHandle/handlePieceStates.methods.js'

export const piecesHandle = {
    pieceSelectedPosition: null,

    isPieceSelected() {
        return !!this.pieceSelectedPosition
    },
    changePieceSelected( pieceSelectedPosition ) {
        this.pieceSelectedPosition = pieceSelectedPosition
    },
    resetPieceSelected() {
        this.pieceSelectedPosition = null
    },
    isOnPieceSelected( pieceBoxPosition ) {
        return pieceBoxPosition === this.pieceSelectedPosition 
    },
    isNotOnPieceSelected( pieceBoxPosition ) {
        return !this.isOnPieceSelected( pieceBoxPosition )
    },

    ///////////////////////

    ...handlePieceEventsMethods,
    ...handlePieceStatesMethods,
}

