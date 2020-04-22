import { BoardType } from './common-types'

const prettifyBoard = (board: BoardType = []): string[] => {
    return board.map(row => row.join(','))
}

export default prettifyBoard