import { alphPosIn, alphPosOut } from '../../config/alphabetPositions.config.js'
import { chessConfig } from '../../config/chessConfig.config.js'
import { $, $$$ } from '../../utils/utils.js'
import { playerTurn } from '../playerTurn.service.js'

export default {
    determinePawn({ isWhitePiece, pieceBoxPosition }) {
        this.determinePawnWhiteBlack( isWhitePiece, { pieceBoxPosition })
        this.cleanDetermineWhiteBlackPawn( isWhitePiece, { pieceBoxPosition })
    },

    ///////////////////////

    determinePawnWhiteBlack(isWhitePiece = true, { pieceBoxPosition }) {
        const col = +alphPosIn[ pieceBoxPosition[ 0 ] ]
        const row = +pieceBoxPosition[ 1 ]
    
        if ( row === ( isWhitePiece ? 8 : 1 ) ) return

        const determination0 = `${alphPosOut[ col ]}${ row + ( isWhitePiece ? 1 : -1 ) }`
        this.determinations[ pieceBoxPosition ][ determination0 ] = true

        if ( row === ( isWhitePiece ? 2 : 7 ) ) {
            const determination1 = `${alphPosOut[ col ]}${ isWhitePiece ? 4 : 5 }`
            this.determinations[ pieceBoxPosition ][ determination1 ] = true
        }

        const potentialpos2 = col - 1
        const potentialpos3 = col + 1

        if  (potentialpos2 > 0 && potentialpos2 < 9) {
            const determination2 = `${ alphPosOut[ potentialpos2 ] }${ row + ( isWhitePiece ? 1 : -1 ) }`
            this.determinations[ pieceBoxPosition ][ determination2 ] = true
        }
        if  (potentialpos3 > 0 && potentialpos3 < 9) {
            const determination3 = `${ alphPosOut[ potentialpos3 ] }${ row + ( isWhitePiece ? 1 : -1 ) }`
            this.determinations[ pieceBoxPosition ][ determination3 ] = true
        }
    },
    cleanDetermineWhiteBlackPawn(isWhitePiece = true, { pieceBoxPosition }) {
        const col = +alphPosIn[ pieceBoxPosition[ 0 ] ]
        const row = +pieceBoxPosition[ 1 ]

        for ( const determinationPosition in this.determinations[ pieceBoxPosition ] ) {
            const detCol = +alphPosIn[ determinationPosition[ 0 ] ]
            const detRow = +determinationPosition[ 1 ]

            const determinationPieceBoxElement = $( `#${ determinationPosition }` )
            const determinationPiece = $$$( determinationPieceBoxElement, chessConfig.chessPieceSelector )
            
            if ( !determinationPiece ) {
                if ( col !== detCol ) {
                    delete this.determinations[ pieceBoxPosition ][ determinationPosition ]
                }
                continue
            }
            
            const determinationPieceType = determinationPiece.getAttribute( 'piece-type')
            const isBlackPieceDet = playerTurn.isBlackPiece( determinationPieceType )
            const isWhitePieceDet = playerTurn.isWhitePiece( determinationPieceType )
                
            if ( col === detCol ) {
                if (detRow === ( isWhitePiece ? 3 : 6 ) ) {
                    const determination0 = `${ determinationPosition[ 0 ] }${ isWhitePiece ? 4 : 5 }`
                    delete this.determinations[ pieceBoxPosition ][ determination0 ]
                }

                delete this.determinations[ pieceBoxPosition ][ determinationPosition ]
            }
            else if ( 
                isWhitePiece && isWhitePieceDet ||
                !isWhitePiece && isBlackPieceDet
            ) {
                delete this.determinations[ pieceBoxPosition ][ determinationPosition ]
            }
        }
    }
}
