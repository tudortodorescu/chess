import pawn from "./piecesDetermine/pawn.js"
import knight from "./piecesDetermine/knight.js"
import rook from "./piecesDetermine/rook.js"
import { $, $$ } from '../utils/utils.js'
import { chessConfig } from '../config/chessConfig.config.js'
import { playerTurn } from '../services/playerTurn.service.js'

export const piecesDetermine = {
    determinations: {},
    
    determine() {
        this.resetDeterminations()
        
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

    //////////////////////////

    resetDeterminations() {
        this.determinations = {}
    },
    itereateDetermine( pieceBoxPosition, callbackFn ) {
        const determinationPositions = this.determinations[ pieceBoxPosition ]
        if ( !determinationPositions || !Object.keys( determinationPositions ).length ) return

        for ( const determinationPosition in  determinationPositions) {
            const pieceBoxElement = $( `#${ determinationPosition }` )
            callbackFn( pieceBoxElement )
        }
    },
    hasPiecePotential( pieceBoxPosition, determinationPosition ) {
        return this.determinations[ pieceBoxPosition ]?.[ determinationPosition ] ?? false
    },
    hasPiecePotentials( pieceBoxPosition ) {
        return !( 
            !this.determinations[ pieceBoxPosition ] ||
            !Object.keys( this.determinations[ pieceBoxPosition ] ).length
        )
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

window.piecesDetermine = piecesDetermine