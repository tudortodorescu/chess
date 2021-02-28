import { playerTurn } from "./playerTurn.service.js"
import { chessConfig } from "../config/chessConfig.config.js"
import { piecesDetermine } from "./piecesDetermine.service.js"
import { $, $$ } from "../utils/utils.js"

export const checkMate = {
    isKingCurrentlyOnCheck() {
        const kingPiecePosition = this.getKingPiecePosition()
        const determinationPositions = this.getOpossitePiecesPositions()

        return this.isPiecePositionCheck({ determinationPositions, piecePosition: kingPiecePosition })
    },

    cleanKingsUnavailablePositions({ isWhite = true }) {
        const kingPiecePosition = this.getKingPiecePosition({ isWhite })
        const determinationPositions = this.getOpossitePiecesPositions({ isWhite })
        const kingsDeterminationPositions = Object.keys( piecesDetermine.determinations[ kingPiecePosition ] )
    
        const oppositeDeterminations = [ ...new Set( Object.values( determinationPositions ).
            map( determinations => Object.keys( determinations ) ).flat() ) ]

        kingsDeterminationPositions.
            filter( kingDeterminationPosition => {
                return oppositeDeterminations.includes( kingDeterminationPosition )
            }).
            forEach( kingDeterminationPosition => {
                delete piecesDetermine.determinations[ kingPiecePosition ][ kingDeterminationPosition ]
            })
    },

    //////////////////////////////////

    isPiecePositionCheck({ determinationPositions, piecePosition }) {
        return Object.values( determinationPositions ).
            reduce( ( isCheck, determinations ) => {
                const isPositionOnCheck = Object.keys( determinations ).includes( piecePosition )
                return isCheck || isPositionOnCheck
            }, false)
    },
    getKingPiecePosition({ isWhite }) {

        const kingPieceBoxElement = $( `[piece-type="${ isWhite ? 'white' : 'black' }_king"]` ).
            closest( chessConfig.chessPieceBoxSelector )

        const kingPiecePosition = kingPieceBoxElement.getAttribute( 'id' )

        return kingPiecePosition
    },
    getOpossitePiecesPositions({ isWhite }) {
        return $$( chessConfig.chessPieceSelector ).
            filter( pieceElement => {
                const pieceType = pieceElement.getAttribute( 'piece-type' )
                
                if ( isWhite ) {
                    return playerTurn.isBlackPiece( pieceType )
                }
                else {
                    return playerTurn.isWhitePiece( pieceType )
                }
            }).
            map( pieceElement => {
                return pieceElement.
                    closest( chessConfig.chessPieceBoxSelector ).
                    getAttribute( 'id' )
            })
            .reduce( ( obj, piecePosition) => {
                obj[ piecePosition ] = piecesDetermine.determinations[ piecePosition ]
                return obj
            }, {})
    }
}

window.checkMate = checkMate
