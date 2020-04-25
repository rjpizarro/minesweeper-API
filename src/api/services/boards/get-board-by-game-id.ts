// VENDOR
// @ts-ignore
import catchify from 'catchify'

// MODELS
import Boards, { BoardInterface } from '../../models/boards'

const findBoardByGameId = async (gameId: string): Promise<BoardInterface>  => {
    const [error, board] = await catchify(Boards.findOne({ belongsToGame: gameId }))

    if (error) {
        throw error
    }

    return board
}

export default findBoardByGameId