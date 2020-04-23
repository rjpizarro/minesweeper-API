import maskBoard from '../mask-board'

const mockBoard = [
    ["E", "M", "M", "E"],
    ["M", "E", "E", "E"],
    ["E", "E", "E", "E"],
    ["E", "E", "E", "E"],
]

const completelyMaskedBoard = [
    ["[]", "[]", "[]", "[]"],
    ["[]", "[]", "[]", "[]"],
    ["[]", "[]", "[]", "[]"],
    ["[]", "[]", "[]", "[]"],
]

const mockBoardWithValues = [
    [2, "M", "M", "E"],
    ["X", "E", "E", "E"],
    ["E", "?", "E", "E"],
    ["B", "E", "M", "E"],
]

const maskedBoardWithValues = [
    [2, "[]", "[]", "[]"],
    ["X", "[]", "[]", "[]"],
    ["[]", "?", "[]", "[]"],
    ["B", "[]", "[]", "[]"],
]

describe('maskBoard', () => {
    it('should mask a board completely when the board is pristine', () => {
        const maskedBoard = maskBoard(mockBoard)

        expect(maskedBoard).toStrictEqual(completelyMaskedBoard)
    })

    it('should leave numbers, blank spaces, flags, questions mark without being mask', () => {
        const maskedBoard = maskBoard(mockBoardWithValues)

        expect(maskedBoard).toStrictEqual(maskedBoardWithValues)
    })

    it('should return an empty array if no argument were provided', () => {
        const maskedBoard = maskBoard()

        expect(maskedBoard).toStrictEqual([])
    })
});