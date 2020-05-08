import markPosition from '../mark-position'
import {BoardValuesEnum} from '../enums'
import prettifyBoard from '../prettify-board'

const mockBoard = [
    ["E", "M", "M", 1],
    ["M", "E", 2, 1],
    ["E", "F", "B", "E"],
    ["?", "E", "E", "E"],
]

describe('markPosition', () => {
    it(`should add a ${BoardValuesEnum.BOMB_FLAGGED} to flag a mine`, () => {
        const expectedFlaggedBoard = [
            ["E", "M", "M", 1],
            ["M", "E", 2, 1],
            ["E", "F", "B", "F"],
            ["?", "E", "E", "E"],
        ]
        const board = markPosition(2, 3, mockBoard, BoardValuesEnum.BOMB_FLAGGED)

        expect(board).toStrictEqual(expectedFlaggedBoard)
    })

    it(`should add a ${BoardValuesEnum.QUESTION_MARK} to the board`, () => {
        const expectedQuestionBoard = [
            ["E", "M", "M", 1],
            ["M", "E", 2, 1],
            ["E", "F", "B", "?"],
            ["?", "E", "E", "E"],
        ]
        const board = markPosition(2, 3, mockBoard, BoardValuesEnum.QUESTION_MARK)

        expect(board).toStrictEqual(expectedQuestionBoard)
    })

    it("should change a flag for a question mark", () => {
        const expectedBoard = [
            ["E", "M", "M", 1],
            ["M", "E", 2, 1],
            ["E", "?", "B", "E"],
            ["?", "E", "E", "E"],
        ]
        const board = markPosition(2, 1, mockBoard, BoardValuesEnum.QUESTION_MARK)

        expect(board).toStrictEqual(expectedBoard)
    })

    it("should change a question mark for a flag", () => {
        const expectedBoard = [
            ["E", "M", "M", 1],
            ["M", "E", 2, 1],
            ["E", "F", "B", "E"],
            ["F", "E", "E", "E"],
        ]
        const board = markPosition(3, 0, mockBoard, BoardValuesEnum.BOMB_FLAGGED)

        expect(board).toStrictEqual(expectedBoard)
    })

    it("should thrown an error when try to add place a mark in a position already revealed", () => {
        expect(() => markPosition(2, 2, mockBoard, BoardValuesEnum.BOMB_FLAGGED)).toThrowError()
        expect(() => markPosition(0, 3, mockBoard, BoardValuesEnum.BOMB_FLAGGED)).toThrowError()
    })
});