import _ from 'lodash'
import { BoardType } from './common-types'
import { BoardValuesEnum } from './enums'

const allMinesDetected = (board: BoardType, flagsPosition: number[][] = []) => {
    let minesInBoard = 0
    let minesFound = 0
    let rowIndex = 0
    let colIndex = 0

    while ( rowIndex < board.length ) {
        let currentRow = board[rowIndex]

        if (currentRow[colIndex] === BoardValuesEnum.UNREVEALED_MINE_POSITION) {
            minesInBoard++
        }

        colIndex++

        if (colIndex === currentRow.length) {
            colIndex = 0
            rowIndex++
        }
    }

    for (let flagsPlacedKey in flagsPosition) {
        const [row, col] = flagsPosition[flagsPlacedKey]

        if (_.get(board, [row, col]) === BoardValuesEnum.UNREVEALED_MINE_POSITION) {
            minesFound++
        }
    }

    return minesInBoard === minesFound
}

export default allMinesDetected