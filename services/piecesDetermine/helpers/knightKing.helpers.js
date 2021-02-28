import { alphPosIn } from '../../../config/alphabetPositions.config.js'
import { chessConfig } from '../../../config/chessConfig.config.js'
import { $, $$$ } from '../../../utils/utils.js'
import { playerTurn } from '../../playerTurn.service.js'

export default {
    generatePotentialDeterminations({ isWhitePiece, pieceBoxPosition, determinations }) {
        const col = +alphPosIn[ pieceBoxPosition[ 0 ] ]
        const row = +pieceBoxPosition[ 1 ]

        determinations.
            map( determinationFn => determinationFn( col, row ) ).
            filter( determinationPosition => {
                return this.filterPotentialDeterminations({ isWhitePiece, determinationPosition })  
            }).
            map( determinationPosition => {
                this.determinations[ pieceBoxPosition ][ determinationPosition ] = true
            })
    },
    filterPotentialDeterminations({ isWhitePiece, determinationPosition }) {
        const determinationPieceBox = $( `#${ determinationPosition }` )
        if ( !determinationPieceBox ) return false

        const determinationPiece = $$$( determinationPieceBox, chessConfig.chessPieceSelector )
        if ( !determinationPiece ) return true
        
        const determinationPieceType = determinationPiece.getAttribute( 'piece-type')
        const isBlackPieceDet = playerTurn.isBlackPiece( determinationPieceType )
        const isWhitePieceDet = playerTurn.isWhitePiece( determinationPieceType )

        if ( 
            isWhitePiece && isWhitePieceDet ||
            !isWhitePiece && isBlackPieceDet
        ) { 
            return false
        }

        return true
    }
}