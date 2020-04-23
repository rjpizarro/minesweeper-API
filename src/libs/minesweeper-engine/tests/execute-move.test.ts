import executeMove from '../execute-move'
import recursivelyRevealSquares from '../recursively-reveal-squares'

const mockBoard = [
    ["E", "M", "M", "E"],
    ["M", "E", "E", "E"],
    ["E", "E", "E", "E"],
    ["E", "E", "E", "E"],
]

const expectedOutputBoardOnEmptyPositionSelected = [
    [2, "M", "M", "E"],
    ["M", "E", "E", "E"],
    ["E", "E", "E", "E"],
    ["E", "E", "E", "E"],
]

const expectedOutputBoardOnMinePositionSelected = [
    ["E", "X", "M", "E"],
    ["M", "E", "E", "E"],
    ["E", "E", "E", "E"],
    ["E", "E", "E", "E"],
]

jest.mock('../recursively-reveal-squares', () => jest.fn())
recursivelyRevealSquares.mockReturnValueOnce(expectedOutputBoardOnEmptyPositionSelected)

describe('executeMove', () => {
    it('should call recursivelyRevealSquares 1 time when the selected position is an empty space', () => {
        const nextBoard = executeMove(0, 0, mockBoard)

        expect(recursivelyRevealSquares).toHaveBeenCalledTimes(1)
        expect(nextBoard).toStrictEqual(expectedOutputBoardOnEmptyPositionSelected)
    })

    it('should NOT call recursivelyRevealSquares when the selected position is a mine', () => {
        const nextBoard = executeMove(0, 1, mockBoard)

        expect(recursivelyRevealSquares).not.toHaveBeenCalled()
        expect(nextBoard).toStrictEqual(expectedOutputBoardOnMinePositionSelected)
    })
});