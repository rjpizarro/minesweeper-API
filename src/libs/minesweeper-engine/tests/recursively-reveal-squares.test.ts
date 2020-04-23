import recursivelyRevealSquares from '../recursively-reveal-squares'
import checkAdjacentValues from '../check-adjacent-values'
import {AdjacentPositionEnum, BoardValuesEnum} from '../enums'

const mockBoard = [
    ["E", "M", "M"],
    ["M", "E", "E"],
    ["E", "E", "E"],
]

const expectedOutputBoardWithMinesAround = [
    [2, "M", "M"],
    ["M", "E", "E"],
    ["E", "E", "E"],
]

const expectedOutputBoardWithBlankSpaces = [
    ["E","M","M"],
    ["M", 3, 2],
    ["E", 1, "B"]
]


jest.mock('../check-adjacent-values')

beforeEach(() => {
    checkAdjacentValues.mockClear()
})

describe('recursivelyRevealSquares', () => {
    it('should reveal a number indicator if a mine were found around', () => {

        checkAdjacentValues.mockImplementation((row, col, board, cb) => {
            cb({value: ''})
            cb({value: ''})
            cb({value: BoardValuesEnum.UNREVEALED_MINE_POSITION})
            cb({value: BoardValuesEnum.UNREVEALED_EMPTY_POSITION})
            cb({value: BoardValuesEnum.UNREVEALED_MINE_POSITION})
            cb({value: ''})
            cb({value: ''})
            cb({value: ''})
        })

        const nextBoard = recursivelyRevealSquares(0, 0, mockBoard)

        expect(checkAdjacentValues).toHaveBeenCalledTimes(1)
        expect(nextBoard).toStrictEqual(expectedOutputBoardWithMinesAround)
    })


    it('should reveal a Blank squares until a mine is found around', () => {
        // each mock implementation should take care the changes in the board from the previous one
        checkAdjacentValues
            //row: 2, col: 2
            .mockImplementationOnce((row, col, board, cb) => {
                cb({value: BoardValuesEnum.UNREVEALED_EMPTY_POSITION})
                cb({value: ''})
                cb({value: ''})
                cb({value: ''})
                cb({value: ''})
                cb({value: ''})
                cb({value: BoardValuesEnum.UNREVEALED_EMPTY_POSITION})
                cb({value: BoardValuesEnum.UNREVEALED_EMPTY_POSITION})
            })
            // recursive check
            .mockImplementationOnce((row, col, board, cb) => {
                cb({value: BoardValuesEnum.UNREVEALED_EMPTY_POSITION, currentRowChecked: 1, currentColChecked: 2})
                cb({value: BoardValuesEnum.UNREVEALED_EMPTY_POSITION, currentRowChecked: 1, currentColChecked: 3})
                cb({value: BoardValuesEnum.UNREVEALED_EMPTY_POSITION, currentRowChecked: 2, currentColChecked: 3})
                cb({value: BoardValuesEnum.UNREVEALED_EMPTY_POSITION, currentRowChecked: 3, currentColChecked: 3})
                cb({value: BoardValuesEnum.UNREVEALED_EMPTY_POSITION, currentRowChecked: 3, currentColChecked: 2})
                cb({value: BoardValuesEnum.UNREVEALED_EMPTY_POSITION, currentRowChecked: 3, currentColChecked: 1})
                cb({value: BoardValuesEnum.UNREVEALED_EMPTY_POSITION, currentRowChecked: 2, currentColChecked: 1})
                cb({value: BoardValuesEnum.UNREVEALED_EMPTY_POSITION, currentRowChecked: 1, currentColChecked: 1})
            })
            //row: 1, col: 2
            .mockImplementationOnce((row, col, board, cb) => {
                cb({value: BoardValuesEnum.UNREVEALED_MINE_POSITION})
                cb({value: ''})
                cb({value: ''})
                cb({value: ''})
                cb({value: BoardValuesEnum.BLANK_REVEALED_POSITION})
                cb({value: BoardValuesEnum.UNREVEALED_EMPTY_POSITION})
                cb({value: BoardValuesEnum.UNREVEALED_EMPTY_POSITION})
                cb({value: BoardValuesEnum.UNREVEALED_MINE_POSITION})
            })
            // row: 2, col: 1
            .mockImplementationOnce((row, col, board, cb) => {
                cb({value: BoardValuesEnum.UNREVEALED_EMPTY_POSITION})
                cb({value: 2})
                cb({value: BoardValuesEnum.BLANK_REVEALED_POSITION})
                cb({value: ''})
                cb({value: ''})
                cb({value: ''})
                cb({value: BoardValuesEnum.UNREVEALED_EMPTY_POSITION})
                cb({value: BoardValuesEnum.UNREVEALED_MINE_POSITION})
            })
            // row: 1, col: 1
            .mockImplementationOnce((row, col, board, cb) => {
                cb({value: BoardValuesEnum.UNREVEALED_MINE_POSITION})
                cb({value: BoardValuesEnum.UNREVEALED_MINE_POSITION})
                cb({value: 2})
                cb({value: BoardValuesEnum.BLANK_REVEALED_POSITION})
                cb({value: 1})
                cb({value: BoardValuesEnum.UNREVEALED_EMPTY_POSITION})
                cb({value: BoardValuesEnum.UNREVEALED_MINE_POSITION})
                cb({value: BoardValuesEnum.UNREVEALED_EMPTY_POSITION})
            })


        const nextBoard = recursivelyRevealSquares(2, 2, mockBoard)

        expect(checkAdjacentValues).toHaveBeenCalledTimes(5)
        expect(nextBoard).toStrictEqual(expectedOutputBoardWithBlankSpaces)
    })
});