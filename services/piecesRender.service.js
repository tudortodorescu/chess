import { piecesImages } from '../config/piecesImages.config.js'
import { initialGame } from '../config/initialGame.config.js'
import { chessConfig } from '../config/chessConfig.config.js'
import { piecesHandle } from '../services/piecesHandle.service.js'

import { $, $$ } from '../utils/utils.js'

export const piecesRender = {
    renderPieces() {
        this.placePieceBoxNumbers()
        this.placeWhiteDownOrUp()
        this.placePiecesInPosition()
        this.addPiecesBoxListeners()
    },
    placePieceBoxNumbers() {
        $$( chessConfig.chessPieceSelector ).map( element => {
            const spanElement = document.createElement( 'span' )
            spanElement.classList.add( 'position-text' )
            spanElement.innerHTML = element.getAttribute( 'id' )
            
            element.append( spanElement )
        })
    },
    placeWhiteDownOrUp() {
        const flexWrap = chessConfig.whitePlaysDown ? 'wrap' : 'wrap-reverse'
        $( chessConfig.chessTableSelector ).style.flexWrap = flexWrap
    },
    placePiecesInPosition() {
        for ( const piecePosition in initialGame ) {
            const pieceType = initialGame[ piecePosition ]
            const pieceImageLocation = piecesImages[ pieceType ]

            const imgElement = document.createElement( 'img' )
            imgElement.classList.add( 'piece' )
            imgElement.setAttribute( 'piece-type', pieceType )
            imgElement.src = `./img/${ pieceImageLocation }`

            $( `#${ piecePosition }` ).append( imgElement )
        }
    },
    addPiecesBoxListeners() {
        $$( chessConfig.chessPieceSelector ).forEach( pieceBoxElement => {
           pieceBoxElement.addEventListener( 'mouseenter', _ => {
                piecesHandle.handlePieceMouseenter( pieceBoxElement )
            })
            pieceBoxElement.addEventListener( 'mouseleave', _ => {
                piecesHandle.handlePieceMouseleave( pieceBoxElement )
            })
            pieceBoxElement.addEventListener( 'click', _ => {
                piecesHandle.handlePieceClick( pieceBoxElement )
            })
        })
    }
}