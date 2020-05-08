import dotProp from 'dot-prop-immutable'
import { BoardType } from './common-types'
import {BoardValuesEnum} from './enums'

const revealMines = (board: BoardType = []): BoardType => {
    return board.reduce((acc, row, idx) => {
        const revealedRow = row.map(value => {
            if (value === BoardValuesEnum.UNREVEALED_MINE_POSITION) {
                return BoardValuesEnum.BOMB_REVEALED_POSITION
            } else {
                return value
            }
        })

        return dotProp.set(acc, [idx], revealedRow)
    }, board)
}

export default revealMines