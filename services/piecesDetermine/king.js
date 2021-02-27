
import { alphPosOut } from '../../config/alphabetPositions.config.js'

export default {
    determineKing({ isWhitePiece, pieceBoxPosition }) {
        this.generatePotentialDeterminations({ isWhitePiece, pieceBoxPosition, determinations: kingDeterminations })
    },
    
}

const kingDeterminations = [
    (col, row) => `${ alphPosOut[ col ]}${ row - 1 }`, 
    (col, row) => `${ alphPosOut[ col - 1 ]}${ row - 1 }`,
    (col, row) => `${ alphPosOut[ col + 1 ]}${ row - 1 }`,
    
    (col, row) => `${ alphPosOut[ col ]}${ row + 1 }`, 
    (col, row) => `${ alphPosOut[ col - 1 ]}${ row + 1 }`,
    (col, row) => `${ alphPosOut[ col + 1 ]}${ row + 1 }`,

    (col, row) => `${ alphPosOut[ col - 1 ]}${ row }`, 
    (col, row) => `${ alphPosOut[ col + 1 ]}${ row }`,

]
