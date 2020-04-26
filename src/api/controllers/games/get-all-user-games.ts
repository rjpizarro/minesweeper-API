// VENDOR
import _ from 'lodash'
import express from 'express'
// @ts-ignore
import catchify from 'catchify'

// SERVICES
import createGame from '../../services/games/create-game'
import createBoard from '../../services/boards/create-board'
import updateGame from '../../services/games/update-game'
import findGamesBy from '../../services/games/find-games-by'

const getAllUserGamesController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = _.get(req, ['user', '_id'], null)

    if (!userId) {
        return res.status(200).json([])
    }

    const [error, games] = await catchify(findGamesBy({player: userId}))

    if (error) {
        return next(error)
    }

    return res.status(200).json(games)
}

export default getAllUserGamesController