// VENDOR
// @ts-ignore
import catchify from 'catchify'

// LIBS
import { generateBoard } from '../../../libs/minesweeper-engine'

// MODELS
import Boards from '../../models/boards'

const createBoard = async (rows: number, cols: number, mines: number, gameId: string ) => {
    const boardMatrix = generateBoard(rows, cols, mines)
    const newBoard = {
        cols,
        rows,
        mines,
        matrix: boardMatrix,
        moves: [],
        belongsToGame: gameId
    }

    const [error, board] = await catchify(Boards.create(newBoard))

    if (error) {
        throw error
    }

    return board
}

export default createBoard