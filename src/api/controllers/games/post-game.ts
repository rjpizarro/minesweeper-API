// VENDOR
import _ from 'lodash'
import express from 'express'
// @ts-ignore
import catchify from 'catchify'

// SERVICES
import createGame from '../../services/games/create-game'
import createBoard from '../../services/boards/create-board'
import updateGame from '../../services/games/update-game'

const postGameController = async (req: express.Request, res: express.Response) => {
    const userId = _.get(req, ['header', 'user', 'id'], null)
    const { rows, cols, mines } = req.body
    const [error, game] = await catchify(createGame(userId))

    if (error) {
        return res.status(400).json(error)
    }

    const gameId = game._id
    const [boardError, board] = await catchify(createBoard(rows, cols, mines, gameId))

    if (boardError) {
        return res.status(400).json(boardError)
    }

    const [gameWithBoardError] = await catchify(updateGame(gameId, { board: board._id }))

    if (gameWithBoardError) {
        return res.status(400).json(gameWithBoardError)
    }

    return res.status(200).json({
        _id: gameId,
        score: game.score,
        board: board
    })
}

export default postGameController