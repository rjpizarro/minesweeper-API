import checkAdjacentValues from '../check-adjacent-values'
import { AdjacentPositionEnum } from '../enums'

const mockBoard = [
    ["E", "M", "M", "E"],
    ["M", "E", "E", "E"],
    ["E", "E", "E", "E"],
    ["E", "E", "E", "E"],
]
const mockCallback = jest.fn()

describe('checkAdjacentValues', () => {
    it('should call a callback 8 times with params', () => {
        checkAdjacentValues(0, 0, mockBoard, mockCallback)

        expect(mockCallback).toHaveBeenCalledTimes(8)

        expect(mockCallback.mock.calls[0][0])
            .toStrictEqual({
                value: '',
                currentRowChecked: -1,
                currentColChecked: 0,
                position: AdjacentPositionEnum.UP
            })

        expect(mockCallback.mock.calls[1][0])
            .toStrictEqual({
                value: '',
                currentRowChecked: -1,
                currentColChecked: 1,
                position: AdjacentPositionEnum.UP_RIGHT
            })

        expect(mockCallback.mock.calls[2][0])
            .toStrictEqual({
                value: 'M',
                currentRowChecked: 0,
                currentColChecked: 1,
                position: AdjacentPositionEnum.RIGHT
            })

        expect(mockCallback.mock.calls[3][0])
            .toStrictEqual({
                value: 'E',
                currentRowChecked: 1,
                currentColChecked: 1,
                position: AdjacentPositionEnum.DOWN_RIGHT
            })

        expect(mockCallback.mock.calls[4][0])
            .toStrictEqual({
                value: 'M',
                currentRowChecked: 1,
                currentColChecked: 0,
                position: AdjacentPositionEnum.DOWN
            })

        expect(mockCallback.mock.calls[5][0])
            .toStrictEqual({
                value: '',
                currentRowChecked: 1,
                currentColChecked: -1,
                position: AdjacentPositionEnum.DOWN_LEFT
            })

        expect(mockCallback.mock.calls[6][0])
            .toStrictEqual({
                value: '',
                currentRowChecked: 0,
                currentColChecked: -1,
                position: AdjacentPositionEnum.LEFT
            })

        expect(mockCallback.mock.calls[7][0])
            .toStrictEqual({
                value: '',
                currentRowChecked: -1,
                currentColChecked: -1,
                position: AdjacentPositionEnum.UP_LEFT
            })
    })
});