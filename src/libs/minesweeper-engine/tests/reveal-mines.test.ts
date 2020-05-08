import revealMines from '../reveal-mines'
import maskBoard from '../mask-board'

const mockBoard = [
    ["E", "M", "M", "E"],
    ["M", "E", "E", "E"],
    ["E", "E", 2, "E"],
    ["E", "E", "E", "E"],
]


const expectedBoard = [
    ["E", "X", "X", "E"],
    ["X", "E", "E", "E"],
    ["E", "E", 2, "E"],
    ["E", "E", "E", "E"],
]

describe('revealMines', () => {
    it('should reveal all mines in a board', () => {
        const revealedBoard = revealMines(mockBoard)

        expect(revealedBoard).toStrictEqual(expectedBoard)
    })

    it('should return an empty array if no argument were provided', () => {
        const revealedBoard = revealMines()

        expect(revealedBoard).toStrictEqual([])
    })
});