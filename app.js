
// pieces images location
const piecesImages = {
    'white_pawn': 'WhitePawn.png',
    'white_rook': 'WhiteRook.png',
    'white_knight': 'WhiteKnight.png',
    'white_bishop': 'WhiteBishop.png',
    'white_king': 'WhiteKing.png',
    'white_queen': 'WhiteQueen.png',
    'black_pawn': 'BlackPawn.png',
    'black_rook': 'BlackRook.png',
    'black_knight': 'BlackKnight.png',
    'black_bishop': 'BlackBishop.png',
    'black_king': 'BlackKing.png',
    'black_queen': 'BlackQueen.png',
}

// initial positions
const initialGame = {
    'a8': 'black_rook',
    'b8': 'black_knight',
    'c8': 'black_bishop',
    'd8': 'black_queen',
    'e8': 'black_king',
    'f8': 'black_bishop',
    'g8': 'black_knight',
    'h8': 'black_rook',
    'a7': 'black_pawn',
    'b7': 'black_pawn',
    'c7': 'black_pawn',
    'd7': 'black_pawn',
    'e7': 'black_pawn',
    'f7': 'black_pawn',
    'g7': 'black_pawn',
    'h7': 'black_pawn',
    
    'a1': 'white_rook',
    'b1': 'white_knight',
    'c1': 'white_bishop',
    'd1': 'white_queen',
    'e1': 'white_king',
    'f1': 'white_bishop',
    'g1': 'white_knight',
    'h1': 'white_rook',
    'a2': 'white_pawn',
    'b2': 'white_pawn',
    'c2': 'white_pawn',
    'd2': 'white_pawn',
    'e2': 'white_pawn',
    'f2': 'white_pawn',
    'g2': 'white_pawn',
    'h2': 'white_pawn',
}

// utilities
const $ = query => document.querySelector( query )
const $$ = query => [ ...document.querySelectorAll( query ) ]

// config
const config = {
    chessTableSelector: '.chess-table',
    chessPieceSelector: '.piece-box',
    whitePlaysDown: false
}

// render
const piecesRender = {
    renderPieces() {
        this.placePieceBoxNumbers()
        this.placeWhiteDownOrUp()
        this.placePiecesInPosition()
    },
    placePieceBoxNumbers() {
        $$( config.chessPieceSelector ).map( element => {
            const spanElement = document.createElement( 'span' )
            spanElement.classList.add( 'position-text' )
            spanElement.innerHTML = element.getAttribute( 'id' )
            
            element.append( spanElement )
        })
    },
    placeWhiteDownOrUp() {
        const flexWrap = config.whitePlaysDown ? 'wrap' : 'wrap-reverse'
        $( config.chessTableSelector ).style.flexWrap = flexWrap
    },
    placePiecesInPosition() {
        for ( const piecePosition in initialGame ) {
            const pieceType = initialGame[ piecePosition ]
            const pieceImageLocation = piecesImages[ pieceType ]

            const imgElement = document.createElement( 'img' )
            imgElement.classList.add( 'piece' )
            imgElement.src = `./img/${ pieceImageLocation }`

            $( `#${ piecePosition }` ).append( imgElement )
        }
    }
}

addEventListener( 'DOMContentLoaded', _ => {
    piecesRender.renderPieces()
})
