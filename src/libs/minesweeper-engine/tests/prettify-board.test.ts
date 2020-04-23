import prettifyBoard from '../prettify-board'

const mockBoard = [
    ["E", "M", "M", "E"],
    ["M", "E", "E", "E"],
    ["E", "E", "E", "E"],
    ["E", "E", "E", "E"],
]

const expectedPrettifiedMockBoard = [
    "E,M,M,E",
    "M,E,E,E",
    "E,E,E,E",
    "E,E,E,E",
]

describe('prettifyBoard', () => {
    it('should show a board in a prettier and legible way', () => {
        const prettifiedBoard = prettifyBoard(mockBoard)

        expect(prettifiedBoard).toStrictEqual(expectedPrettifiedMockBoard)
    })

    it('should return an empty array when no board were provided', () => {
        const prettifiedBoard = prettifyBoard()

        expect(prettifiedBoard).toStrictEqual([])
    })
});