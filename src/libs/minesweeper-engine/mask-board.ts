import dotProp from 'dot-prop-immutable'
import { BoardType } from './common-types'
import {BoardValuesEnum} from './enums'

const maskBoard = (board: BoardType = []): BoardType => {
    return board.reduce((acc, row, idx) => {
        const maskedRow = row.map(value => {
            if (value === BoardValuesEnum.UNREVEALED_EMPTY_POSITION ||
                value === BoardValuesEnum.UNREVEALED_MINE_POSITION
            ) {
                return BoardValuesEnum.MASKED_POSITION
            } else {
                return value
            }
        })

        return dotProp.set(acc, [idx], maskedRow)
    }, board)
}

export default maskBoard