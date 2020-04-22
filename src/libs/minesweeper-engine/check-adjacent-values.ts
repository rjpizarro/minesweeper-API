import _ from 'lodash'
import { BoardType } from './common-types'
import { AdjacentPositionEnum } from './enums'

type AdjacentValuesType = {
    value: string,
    currentRowChecked: number,
    currentColChecked: number,
    position: AdjacentPositionEnum
}

const positions = [
    AdjacentPositionEnum.UP,
    AdjacentPositionEnum.UP_RIGHT,
    AdjacentPositionEnum.RIGHT,
    AdjacentPositionEnum.DOWN_RIGHT,
    AdjacentPositionEnum.DOWN,
    AdjacentPositionEnum.DOWN_LEFT,
    AdjacentPositionEnum.LEFT,
    AdjacentPositionEnum.UP_LEFT,
]

const checkAdjacentValues =  (
    row: number,
    col: number,
    board: BoardType,
    callback: (data: AdjacentValuesType) => void
) => {
    for (let key in positions) {
        const position: AdjacentPositionEnum = positions[key]
        let adjacentSquareValue: string = ''
        let currentRowChecked: number
        let currentColChecked: number

        switch (position) {
            case AdjacentPositionEnum.UP:
                currentRowChecked = row - 1
                currentColChecked = col

                break;
            case AdjacentPositionEnum.UP_RIGHT:
                currentRowChecked = row - 1
                currentColChecked = col + 1

                break;
            case AdjacentPositionEnum.RIGHT:
                currentRowChecked = row
                currentColChecked = col + 1

                break;
            case AdjacentPositionEnum.DOWN_RIGHT:
                currentRowChecked = row + 1
                currentColChecked = col + 1

                break;
            case AdjacentPositionEnum.DOWN:
                currentRowChecked = row + 1
                currentColChecked = col

                break;
            case AdjacentPositionEnum.DOWN_LEFT:
                currentRowChecked = row + 1
                currentColChecked = col - 1

                break;
            case AdjacentPositionEnum.LEFT:
                currentRowChecked = row
                currentColChecked = col - 1

                break;
            case AdjacentPositionEnum.UP_LEFT:
                currentRowChecked = row - 1
                currentColChecked = col - 1

                break;
            default:
                currentColChecked = -1
                currentRowChecked = -1
        }

        if (currentRowChecked >= 0 && currentColChecked >= 0) {
            adjacentSquareValue = _.get(board, [currentRowChecked, currentColChecked])
        }

        callback({
            value: adjacentSquareValue,
            currentRowChecked: currentRowChecked,
            currentColChecked: currentColChecked,
            position: position
        })
    }
}

export default checkAdjacentValues