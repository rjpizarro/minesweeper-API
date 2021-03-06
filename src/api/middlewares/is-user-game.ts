import _ from 'lodash'
// @ts-ignore
import catchify from 'catchify'
import express from 'express'

// SERVICES
import findGame from '../services/games/find-one-game-by'

const isUserGame = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userId = _.get(req, ['user', '_id'], null)
    const gameId = _.get(
        req,
        ['body', 'gameId'],
        _.get(req, ['params', 'id'], null)
    )

    if (gameId) {
        const [error, game] = await catchify(findGame({_id: gameId}))

        if (error) {
            return res.status(400).json({
                title: 'Error',
                code: 400,
                message: error.message,
                stack: error.stack
            })
        }

        if (game && game.player) {
            if (String(game.player) === String(userId)) {
                next()
            } else {
                return res.status(401).json({
                    title: 'Unauthorized',
                    code: 401,
                    message: "The user doesn't have the rights to play the selected game",
                })
            }
        } else {
            next()
        }
    } else {
        next()
    }
}

export default isUserGame
