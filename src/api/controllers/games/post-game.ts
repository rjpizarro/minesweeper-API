// VENDOR
import _ from 'lodash'
import express from 'express'
// @ts-ignore
import catchify from 'catchify'

// SERVICES
import createGame from '../../services/games/create-game'
import createBoard from '../../services/boards/create-board'
import updateGame from '../../services/games/update-game'

const postGameController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = _.get(req, ['user', '_id'], null)
    const { rows, cols, mines } = req.body
    const [error, game] = await catchify(createGame(userId))

    if (error) {
        return next(error)
    }

    const gameId = game._id
    const [boardError, board] = await catchify(createBoard(rows, cols, mines, gameId))

    if (boardError) {
        return next(boardError)
    }

    const [gameWithBoardError] = await catchify(updateGame(gameId, { board: board._id }))

    if (gameWithBoardError) {
        return next(gameWithBoardError)
    }

    return res.status(200).json({
        _id: gameId,
        player: game.player || null,
        score: game.score,
        board: board
    })
}

export default postGameController