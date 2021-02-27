
const classesSelectors = {
    'pieceSelected': 'piece-selected',
    'pieceNotAllowed': 'piece-not-allowed',
    'pieceReady': 'piece-ready',
    'piecePotential': 'piece-potential',
    'piecePointer': 'piece-pointer',
};

const methodsSelectors = [
    { 'set': 'add' },
    { 'remove': 'remove' }
]

export default (_ => {
    const handlePieceStatesMethods = {}
    
    for ( const classkey in classesSelectors ) {
        const methodName = classkey.replace( 'piece', '' )
        
        methodsSelectors.map( value => {
            const methodSelector = `${ Object.keys( value )[ 0 ] }${ methodName }`
            const classMethodSelector = `${ Object.values( value )[ 0 ] }`

            handlePieceStatesMethods[ methodSelector ] = pieceBoxElement => {
                pieceBoxElement.classList[ classMethodSelector ]( classesSelectors[ classkey ] )
            }
        })
    }

    return handlePieceStatesMethods
})()
