import pawn from "./piecesDetermine/pawn.js"
import knight from "./piecesDetermine/knight.js"
import rook from "./piecesDetermine/rook.js"
import bishop from "./piecesDetermine/bishop.js"
import queen from "./piecesDetermine/queen.js"
import { $, $$ } from '../utils/utils.js'
import { chessConfig } from '../config/chessConfig.config.js'
import { playerTurn } from '../services/playerTurn.service.js'
import king from "./piecesDetermine/king.js"
import knightKingHelpers from "./piecesDetermine/helpers/knightKing.helpers.js"

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
            
            this.determinations[ pieceBoxPosition ] = {}

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

    ...knightKingHelpers,
    ...pawn,
    ...knight,
    ...rook,
    ...bishop,
    ...queen,
    ...king,
}

const pieceDetermineConfig = {
    'pawn': 'determinePawn',
    'knight': 'determineKnight',
    'rook': 'determineRook',
    'bishop': 'determineBishop',
    'queen': 'determineQueen',
    'king': 'determineKing',
}

window.piecesDetermine = piecesDetermine