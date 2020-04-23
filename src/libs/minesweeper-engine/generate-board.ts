import { BoardType } from './common-types'
import { BoardValuesEnum } from './enums'

const generateBoard = (rows: number, cols: number, mines: number): BoardType => {
    let availablePositions = rows * cols
    let board = []

    if (availablePositions <= mines) {
        throw new Error("There is not available positions to place all mines.")
    }

    for (let i = 0; i < rows; i++) {
        let row = []
        for (let j = 0; j < cols; j++) {
            row.push(BoardValuesEnum.UNREVEALED_EMPTY_POSITION)
        }
        board.push(row)
        row = []
    }

    while (mines > 0) {
        const rowCord = Math.floor(Math.random() * rows)
        const colCord = Math.floor(Math.random() * cols)

        if (board[rowCord][colCord] !== BoardValuesEnum.UNREVEALED_MINE_POSITION) {
            board[rowCord][colCord] = BoardValuesEnum.UNREVEALED_MINE_POSITION

            mines--
        }
    }

    return board
}

export default generateBoard