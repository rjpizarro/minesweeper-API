import _ from 'lodash'
import dotProp from 'dot-prop-immutable'
import recursivelyRevealSquares from './recursively-reveal-squares'
import { BoardType } from './common-types'
import { BoardValuesEnum } from './enums'
import markPosition from './mark-position'

const executeMove = (
    row: number,
    col: number,
    board: BoardType,
    value?: BoardValuesEnum
): BoardType => {
    const squareValue = _.get(board, [row, col])

    if (typeof squareValue === 'number' || squareValue === BoardValuesEnum.BLANK_REVEALED_POSITION) {
        throw new Error("Position already revealed. Please select other value.")
    }

    if (value) {
        return markPosition(row, col, board, value)
    }

    if (squareValue === BoardValuesEnum.UNREVEALED_MINE_POSITION) {
        throw dotProp.set(board, [row, col], BoardValuesEnum.BOMB_REVEALED_POSITION)
    } else {
        return recursivelyRevealSquares(row, col, board)
    }
}

export default executeMove