import _ from 'lodash'
import dotProp from 'dot-prop-immutable'
import recursivelyRevealSquares from './recursively-reveal-squares'
import { BoardType } from './common-types'
import { BoardValuesEnum } from './enums'

const executeMove = (row: number, col: number, board: BoardType): BoardType => {
    const squareValue = _.get(board, [row, col])

    if (squareValue === BoardValuesEnum.UNREVEALED_MINE_POSITION) {
        return dotProp.set(board, [row, col], BoardValuesEnum.BOMB_REVEALED_POSITION)
    } else {
        return recursivelyRevealSquares(row, col, board)
    }
}

export default executeMove