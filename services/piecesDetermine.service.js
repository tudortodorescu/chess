import pawn from "./piecesDetermine/pawn.js"
import knight from "./piecesDetermine/knight.js"
import rook from "./piecesDetermine/rook.js"
import { $, $$, ucase } from '../utils/utils.js'
import { chessConfig } from '../config/chessConfig.config.js'
import { playerTurn } from '../services/playerTurn.service.js'

export const piecesDetermine = {
    determinations: {},

    determine() {
        for ( const pieceBoxElement of $$( chessConfig.chessPieceBoxSelector ) ) {
            const pieceElement = pieceBoxElement.querySelector( chessConfig.chessPieceSelector )
            if ( !pieceElement ) continue
            
            const pieceBoxPosition = pieceBoxElement.getAttribute( 'id' )
            const pieceType = pieceElement?.getAttribute( 'piece-type' ) ?? null
            const isWhitePiece = playerTurn.isWhitePiece( pieceType )
            const pieceSingleType = pieceType.replace( 'white_', '' ).replace( 'black_', '' )
            
            this[ pieceDetermineConfig[ pieceSingleType ] ]?.({ 
                pieceBoxElement, 
                pieceElement, 
                pieceType,  
                isWhitePiece,
                pieceBoxPosition
            })
        }
    },

    itereateDetermine( pieceBoxPosition, callbackFn ) {
        const determinationPositions = this.determinations[ pieceBoxPosition ]
        if ( !determinationPositions || !Object.keys( determinationPositions ).length ) return

        for ( const determinationPosition in  determinationPositions) {
            const pieceBoxElement = $( `#${ determinationPosition }` )
            callbackFn( pieceBoxElement )
        }
    },

    ...pawn,
    ...knight,
    ...rook,
}

const pieceDetermineConfig = {
    'pawn': 'determinePawn',
    'knight': 'determineKnight',
    'rook': 'determineRook',
}