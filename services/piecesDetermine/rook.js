import { alphPosIn, alphPosOut } from '../../config/alphabetPositions.config.js'
import { chessConfig } from '../../config/chessConfig.config.js'
import { $, $$$ } from '../../utils/utils.js'
import { playerTurn } from '../playerTurn.service.js'

export default {
    determineRook({ isWhitePiece, pieceBoxPosition }) {
        this.determineRookWhiteBlack( isWhitePiece, { pieceBoxPosition })
        this.cleanDetermineWhiteBlackRook( isWhitePiece, { pieceBoxPosition })
    },
    determineRookWhiteBlack( isWhitePiece = true, { pieceBoxPosition }) {
        const col = +alphPosIn[ pieceBoxPosition[ 0 ] ]
        const row = +pieceBoxPosition[ 1 ]

        for ( let i = 1; i <= 8; i++ ) {
            const determination0 = `${alphPosOut[ i ]}${ row }`
            const determination1 = `${alphPosOut[ col ]}${ i }`
            
            if ( determination0 !== pieceBoxPosition ) {
                this.determinations[ pieceBoxPosition ][ determination0 ] = true
            }

            if ( determination1 !== pieceBoxPosition ) {
                this.determinations[ pieceBoxPosition ][ determination1 ] = true
            }
        }
    },

    ////////////////////////////////////

    cleanDetermineWhiteBlackRook( isWhitePiece = true, { pieceBoxPosition }) {
        const col = +alphPosIn[ pieceBoxPosition[ 0 ] ]
        const row = +pieceBoxPosition[ 1 ]

        let shouldDeleteDeterminations = { value: false }
        for ( let detRow = row + 1; detRow <= 8; detRow++ ) {
            const determinationPosition = `${alphPosOut[ col ]}${ detRow }`
            this.cleanIncomingPiecesRook({ isWhitePiece, shouldDeleteDeterminations, pieceBoxPosition, determinationPosition }) 
        }

        shouldDeleteDeterminations = { value: false }
        for ( let detRow = row - 1; detRow >= 1; detRow-- ) {
            const determinationPosition = `${alphPosOut[ col ]}${ detRow }`
            this.cleanIncomingPiecesRook({ isWhitePiece, shouldDeleteDeterminations, pieceBoxPosition, determinationPosition }) 
        }

        shouldDeleteDeterminations = { value: false }
        for ( let detCol = col + 1; detCol <= 8; detCol++ ) {
            const determinationPosition = `${alphPosOut[ detCol ]}${ row }`
            this.cleanIncomingPiecesRook({ isWhitePiece, shouldDeleteDeterminations, pieceBoxPosition, determinationPosition }) 
        }

        shouldDeleteDeterminations = { value: false }
        for ( let detCol = col - 1; detCol >= 1; detCol-- ) {
            const determinationPosition = `${alphPosOut[ detCol ]}${ row }`
            this.cleanIncomingPiecesRook({ isWhitePiece, shouldDeleteDeterminations, pieceBoxPosition, determinationPosition }) 
        }
        
    },
    cleanIncomingPiecesRook({ isWhitePiece, shouldDeleteDeterminations, pieceBoxPosition, determinationPosition }) {
        if ( shouldDeleteDeterminations.value ) {
            delete this.determinations[ pieceBoxPosition ][ determinationPosition ]
            return
        }

        const determinationPieceBoxElement = $( `#${ determinationPosition }` ) 
        const determinationPiece = $$$( determinationPieceBoxElement, chessConfig.chessPieceSelector )
        
        if ( !determinationPiece ) return

        const determinationPieceType = determinationPiece.getAttribute( 'piece-type')
        const isBlackPieceDet = playerTurn.isBlackPiece( determinationPieceType )
        const isWhitePieceDet = playerTurn.isWhitePiece( determinationPieceType )
        
        shouldDeleteDeterminations.value = true

        if ( 
            isWhitePiece && isBlackPieceDet ||
            !isWhitePiece && isWhitePieceDet
        ) { 
            return
        }

        delete this.determinations[ pieceBoxPosition ][ determinationPosition ]
    }
}
