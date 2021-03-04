
import handlePieceClick from './handlePieceEvents/handlePieceClick.js'
import handlePieceMouseenter from './handlePieceEvents/handlePieceMouseenter.js'
import handlePieceMouseleave from './handlePieceEvents/handlePieceMouseleave.js'

export default {
    ...handlePieceClick,
    ...handlePieceMouseenter,
    ...handlePieceMouseleave,
}
