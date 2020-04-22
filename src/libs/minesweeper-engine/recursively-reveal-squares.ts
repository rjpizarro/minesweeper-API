import _ from 'lodash'
import dotProp from 'dot-prop-immutable'
import checkAdjacentValues from './check-adjacent-values'
import { BoardType } from './common-types'
import { BoardValuesEnum } from './enums'

const recursivelyRevealSquares = (row: number, col: number, board: BoardType): BoardType => {
    let nextBoard = board
    let bombsAround: number = 0

    checkAdjacentValues(row, col, board, ({ value }) => {
        if (value === BoardValuesEnum.UNREVEALED_MINE_POSITION) {
            bombsAround++
        }
    })

    if (bombsAround === 0 ) {
        nextBoard = dotProp.set(nextBoard, [row, col], BoardValuesEnum.BLANK_REVEALED_POSITION)

        // if the selected square doesn't have a bomb around, check for the adjacent squares
        checkAdjacentValues(
            row,
            col,
            board,
            ({
                 value,
                 currentRowChecked,
                 currentColChecked,
            }) => {
                const isInBoardBoundaries = (
                    currentRowChecked !== null && currentRowChecked >= 0 && currentRowChecked < board.length &&
                    currentColChecked !== null && currentColChecked < _.get(board, [currentRowChecked, 'length'])
                )

                // if some adjacent square doesn't have a bomb around, reveal the square.
                if (isInBoardBoundaries && value === BoardValuesEnum.UNREVEALED_EMPTY_POSITION) {
                    nextBoard = recursivelyRevealSquares(currentRowChecked, currentColChecked, nextBoard)
                }
            }
        )

        return nextBoard

    } else {
        // if the square have a bomb around, show the number
        return dotProp.set(nextBoard, [row, col], bombsAround)
    }
}

export default recursivelyRevealSquares