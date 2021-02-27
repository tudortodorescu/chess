import handlePieceEventsMethods from './piecesHandle/handlePieceEvents.methods.js'
import handlePieceStatesMethods from './piecesHandle/handlePieceStates.methods.js'

export const piecesHandle = {
    pieceSelected: null,

    isPieceSelected() {
        return !!this.pieceSelected
    },
    changePieceSelected( pieceSelected ) {
        this.pieceSelected = pieceSelected
    },
    resetPieceSelected() {
        this.pieceSelected = null
    },
    isOnPieceSelected( pieceBoxPosition ) {
        return pieceBoxPosition === this.pieceSelected 
    },
    isNotOnPieceSelected( pieceBoxPosition ) {
        return pieceBoxPosition !== this.pieceSelected
    },

    ///////////////////////

    ...handlePieceEventsMethods,
    ...handlePieceStatesMethods,
}

