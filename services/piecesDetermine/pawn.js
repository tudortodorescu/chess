import { alphPosIn, alphPosOut } from '../../config/alphabetPositions.config.js'
import { chessConfig } from '../../config/chessConfig.config.js'
import { $ } from '../../utils/utils.js'
import { playerTurn } from '../playerTurn.service.js'

export default {
    determinePawn({ pieceBoxElement, pieceElement, pieceType, isWhitePiece, pieceBoxPosition }) {
        this.determinations[ pieceBoxPosition ] = {}

        if ( isWhitePiece ) { 
            this.determineWhitePawn({ pieceBoxPosition }) 
            this.cleanDetermineWhitePawn({ pieceBoxPosition })
        } else {
            this.determineBlackPawn({ pieceBoxPosition })
            this.cleanDetermineWBlackPawn({ pieceBoxPosition })
        }
    },

    determineWhitePawn({ pieceBoxPosition }) {
        const col = +alphPosIn[ pieceBoxPosition[ 0 ] ]
        const row = +pieceBoxPosition[ 1 ]
    
        if ( row === 8 ) return

        this.determinations[ pieceBoxPosition ][ `${alphPosOut[ col ]}${ row + 1 }` ] = true

        if ( row === 2) {
            this.determinations[ pieceBoxPosition ][ `${alphPosOut[ col ]}4` ] = true
        }

        const potentialpos1 = col - 1
        const potentialpos2 = col + 1

        if  (potentialpos1 > 0 && potentialpos1 < 9) {
            const determination1 = `${ alphPosOut[ potentialpos1 ] }${ row + 1 }`
            this.determinations[ pieceBoxPosition ][ determination1 ] = true
        }
        if  (potentialpos2 > 0 && potentialpos2 < 9) {
            const determination2 = `${ alphPosOut[ potentialpos2 ] }${ row + 1 }`
            this.determinations[ pieceBoxPosition ][ determination2 ] = true
        }
    },
    cleanDetermineWhitePawn({ pieceBoxPosition }) {
        // if ( pieceBoxPosition !== 'd2' ) return

        const col = +alphPosIn[ pieceBoxPosition[ 0 ] ]
        const row = +pieceBoxPosition[ 1 ]

        for ( const determinationPosition in this.determinations[ pieceBoxPosition ] ) {
            const detCol = +alphPosIn[ determinationPosition[ 0 ] ]
            const detRow = +determinationPosition[ 1 ]

            const determinationPiece = $( `#${ determinationPosition }` ).querySelector( chessConfig.chessPieceSelector )
            if ( !determinationPiece ) {
                if ( col !== detCol ) {
                    delete this.determinations[ pieceBoxPosition ][ determinationPosition ]
                }
                continue
            }
            
            const determinationPieceType = determinationPiece.getAttribute( 'piece-type')
            const isBlackPieceDet = playerTurn.isBlackPiece( determinationPieceType )
                
            if ( col === detCol ) {
                if (detRow === 3 ) {
                    delete this.determinations[ pieceBoxPosition ][ `${ determinationPosition[ 0 ] }4` ]
                }

                delete this.determinations[ pieceBoxPosition ][ determinationPosition ]
            }
            else if ( !isBlackPieceDet ) {
                delete this.determinations[ pieceBoxPosition ][ determinationPosition ]
            }

            // console.log({ determinationPieceType, determinationPosition })
        }
    },

    determineBlackPawn({ pieceBoxPosition }) {
        
    },
    cleanDetermineWBlackPawn({ pieceBoxPosition }) {

    }
}
