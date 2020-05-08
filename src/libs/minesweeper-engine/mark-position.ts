import _ from 'lodash'
import dotProp from 'dot-prop-immutable'
import { BoardValuesEnum } from './enums'
import { BoardType } from './common-types'

const {
    QUESTION_MARK,
    BOMB_FLAGGED,
    BLANK_REVEALED_POSITION,
} = BoardValuesEnum

const markPosition = (
    row: number,
    col: number,
    board: BoardType,
    mark: BoardValuesEnum
) => {
    const currentValue = _.get(board, [row, col])

    if (typeof currentValue === 'number' || currentValue === BLANK_REVEALED_POSITION) {
        throw new Error(`Position already revealed`)
    }

    return dotProp.set(board, [row, col], mark)
}

export default markPosition