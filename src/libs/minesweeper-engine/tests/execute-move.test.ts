import executeMove from '../execute-move'
import recursivelyRevealSquares from '../recursively-reveal-squares'
import markPosition from '../mark-position'
import {BoardValuesEnum} from '../enums'

const mockBoard = [
    ["E", "M", "M", "E"],
    ["M", "E", "E", "E"],
    ["E", "E", "E", "E"],
    ["E", "E", "E", "E"],
]

jest.mock('../recursively-reveal-squares', () => jest.fn())
jest.mock('../mark-position', () => jest.fn())

describe('executeMove', () => {
    it('should call recursivelyRevealSquares 1 time when the selected position is an empty space', () => {
        const expectedOutput = [
            [2, "M", "M", "E"],
            ["M", "E", "E", "E"],
            ["E", "E", "E", "E"],
            ["E", "E", "E", "E"],
        ]

        recursivelyRevealSquares.mockReturnValueOnce(expectedOutput)

        const nextBoard = executeMove(0, 0, mockBoard)

        expect(recursivelyRevealSquares).toHaveBeenCalledTimes(1)
        expect(nextBoard).toStrictEqual(expectedOutput)
    })

    it('should throw an exception when the selected position is a mine', () => {
        expect(() => executeMove(0, 1, mockBoard)).toThrow()
    })

    it('should throw an error when the selected position is already revealed', () => {
        const mockBoard = [
            [2, "M", "M", "E"],
            ["M", "E", "E", "E"],
            ["E", "E", "E", "E"],
            ["E", "E", "E", "B"],
        ]

        expect(() => executeMove(0, 0, mockBoard)).toThrowError("Position already revealed. Please select other value.")
        expect(() => executeMove(3, 3, mockBoard)).toThrowError("Position already revealed. Please select other value.")
    })

    it('should call markPosition when receive a value argument', () => {
        const expectedOutput = [
            ["F", "M", "M", "E"],
            ["M", "E", "E", "E"],
            ["E", "E", "E", "E"],
            ["E", "E", "E", "E"],
        ]
        markPosition.mockReturnValueOnce(expectedOutput)

        const nextBoard = executeMove(0, 0, mockBoard, BoardValuesEnum.BOMB_FLAGGED)

        expect(markPosition).toHaveBeenCalledTimes(1)
        expect(markPosition).toHaveBeenCalledWith(0, 0, mockBoard, BoardValuesEnum.BOMB_FLAGGED)
        expect(nextBoard).toStrictEqual(expectedOutput)
    })
});