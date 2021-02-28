
import { piecesDetermine } from "./piecesDetermine.service.js"
import { $, $$$, deepclone } from '../utils/utils.js'
import { chessConfig } from "../config/chessConfig.config.js"
import { playerTurn } from "./playerTurn.service.js"


export const checkMate = {
    cantMoveDueToCheck({ pieceSelectedPosition, pieceBoxPosition }) {

        const pieceBoxElementSelected = $( `#${ pieceSelectedPosition }` )
        const pieceElementSelected = $$$( pieceBoxElementSelected, chessConfig.chessPieceSelector )
        
        const clonedPieceElement = pieceElementSelected.cloneNode()
        const tempPieceBoxElement = $( `#${ pieceBoxPosition }` )
        const tempPieceElement = $$$( tempPieceBoxElement, chessConfig.chessPieceSelector )
        if ( tempPieceElement ) document.body.append( tempPieceElement )
        
        tempPieceBoxElement.append( clonedPieceElement )
        pieceElementSelected.remove()
        
        //////////

        const isWhiteTurn = playerTurn.isWhiteTurn

        let kingPiecePosition = checkMate.getKingPiecePosition({ isWhitePiece: isWhiteTurn })
        if ( kingPiecePosition === pieceSelectedPosition ) {
            kingPiecePosition = pieceBoxPosition
        }

        //////////

        const newDeterminations = deepclone( piecesDetermine.determinations )
        piecesDetermine.determinationsSelector = 'potentialDeterminations'
        piecesDetermine.determinations = newDeterminations

        delete piecesDetermine.determinations[ pieceSelectedPosition ]
        piecesDetermine.determinations[ pieceBoxPosition ] = {}
    
        const pieceBoxPositionsObject = Object.
            keys( piecesDetermine.determinations ).
            map( pieceBoxPosition_ => {
            
                //////////
                
                const pieceBoxElement = $( `#${ pieceBoxPosition_ }` )
                const pieceElement = $$$( pieceBoxElement, chessConfig.chessPieceSelector )
                const pieceType = pieceElement?.getAttribute( 'piece-type' ) ?? null
                const isWhitePiece = playerTurn.isWhitePiece( pieceType )
                const isBlackPiece = playerTurn.isBlackPiece( pieceType )
                const pieceSingleType = pieceType.replace( 'white_', '' ).replace( 'black_', '' )

                if (
                    ( isWhiteTurn && !isBlackPiece ) ||
                    ( !isWhiteTurn && !isWhitePiece )
                ) {
                    return null
                }

                return { 
                    pieceSingleType,
                    isWhitePiece,
                    pieceBoxPosition: pieceBoxPosition_
                }
            })
            .filter( item => !!item)

        piecesDetermine.determine( pieceBoxPositionsObject )

        ///////////////

        pieceBoxElementSelected.append( clonedPieceElement )
        if ( tempPieceElement ) tempPieceBoxElement.append( tempPieceElement )
        
        //////////////////////

        const result = [
            ...new Set( Object.values( piecesDetermine.determinations ).
                map( determinations => Object.keys( determinations ) ).flat() )
        ].includes( kingPiecePosition )

        piecesDetermine.determinationsSelector = 'currentDeterminations'
        piecesDetermine.determine()

        return result
    },
    getKingPiecePosition({ isWhitePiece = true }) {

        const kingPieceBoxElement = $( `[piece-type="${ isWhitePiece ? 'white' : 'black' }_king"]` ).
            closest( chessConfig.chessPieceBoxSelector )

        const kingPiecePosition = kingPieceBoxElement.getAttribute( 'id' )

        return kingPiecePosition
    }
}

window.checkMate = checkMate
