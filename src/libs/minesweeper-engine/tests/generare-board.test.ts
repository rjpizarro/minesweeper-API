import generateBoard from '../generate-board'
import { BoardValuesEnum } from '../enums'

describe('generateBoard', () => {
    it('should generate a board with the right amount of rows, cols, mines and empty spaces', () => {
        const board = generateBoard(5, 7, 10)
        let totalMines = 0
        let totalEmptySpaces = 0

        expect(board.length).toEqual(5)

        for (let rowKey in board) {
            const row = board[rowKey]

            expect(row.length).toEqual(7)

            for (let colKey in row) {
                const col = row[colKey]

                if (col === BoardValuesEnum.UNREVEALED_MINE_POSITION) {
                    totalMines++
                } else if (col === BoardValuesEnum.UNREVEALED_EMPTY_POSITION) {
                    totalEmptySpaces++
                }
            }
        }

        expect(totalEmptySpaces).toEqual(25) // (rows * col) - mines
        expect(totalMines).toEqual(10)
    })

    it('should place mines randomly', () => {
        const board1 = generateBoard(5, 7, 10)
        const board2 = generateBoard(5, 7, 10)
        const board3 = generateBoard(5, 7, 10)

        expect(board1).not.toStrictEqual(board2)
        expect(board1).not.toStrictEqual(board3)
        expect(board2).not.toStrictEqual(board3)
    })

    it('should thrown an error when there is not enough positions to place mines', () => {
        expect(() => generateBoard(5, 7, 36))
            .toThrowError('There is not available positions to place all mines.')

        expect(() => generateBoard(5, 7, 35))
            .toThrowError('There is not available positions to place all mines.')
    })
});