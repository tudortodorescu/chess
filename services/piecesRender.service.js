import { piecesImages } from '../config/piecesImages.config.js'
import { initialGame } from '../config/initialGame.config.js'
import { potentialGame } from '../config/potentialGame.config.js'
import { chessConfig } from '../config/chessConfig.config.js'
import { piecesHandle } from '../services/piecesHandle.service.js'
import { piecesDetermine } from '../services/piecesDetermine.service.js'
import { $, $$ } from '../utils/utils.js'

export const piecesRender = {
    renderPieces() {
        const gameSetup = chessConfig.useInitialGame ? initialGame : potentialGame

        this.placePieceBoxNumbers()
        this.placeWhiteDownOrUp()
        this.placePiecesInPosition( gameSetup )
        this.addPiecesBoxListeners()
        this.piecesDetermine()
    },
    placePieceBoxNumbers() {
        $$( chessConfig.chessPieceBoxSelector ).map( pieceBoxElement => {
            const spanElement = document.createElement( 'span' )
            spanElement.classList.add( 'position-text' )
            spanElement.innerHTML = pieceBoxElement.getAttribute( 'id' )
            
            pieceBoxElement.append( spanElement )
        })
    },
    placeWhiteDownOrUp() {
        const flexWrap = chessConfig.whitePlaysDown ? 'wrap' : 'wrap-reverse'
        $( chessConfig.chessTableSelector ).style.flexWrap = flexWrap
    },
    placePiecesInPosition( gameSetup ) {
        for ( const piecePosition in gameSetup ) {
            const pieceType = gameSetup[ piecePosition ]
            const pieceImageLocation = piecesImages[ pieceType ]

            const imgElement = document.createElement( 'img' )
            imgElement.classList.add( 'piece' )
            imgElement.setAttribute( 'piece-type', pieceType )
            imgElement.src = `./img/${ pieceImageLocation }`

            $( `#${ piecePosition }` ).append( imgElement )
        }
    },
    addPiecesBoxListeners() {
        $$( chessConfig.chessPieceBoxSelector ).forEach( pieceBoxElement => {
            const pieceBoxPosition = pieceBoxElement.getAttribute( 'id' )
            const pieceElement = pieceBoxElement.querySelector( chessConfig.chessPieceSelector )
            const pieceType = pieceElement?.getAttribute( 'piece-type' ) ?? null

            const handleParams = {
                pieceBoxElement,
                pieceBoxPosition,
                pieceElement,
                pieceType
            }

            pieceBoxElement.addEventListener( 'mouseenter', _ => {
                piecesHandle.handlePieceMouseenter( handleParams )
            })
            pieceBoxElement.addEventListener( 'mouseleave', _ => {
                piecesHandle.handlePieceMouseleave( handleParams )
            })
            pieceBoxElement.addEventListener( 'click', _ => {
                piecesHandle.handlePieceClick( handleParams )
            })
        })
    },
    piecesDetermine() {
        piecesDetermine.determine()
    }
}

window.piecesDetermine = piecesDetermine