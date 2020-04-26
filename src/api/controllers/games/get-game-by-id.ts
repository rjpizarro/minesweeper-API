// VENDOR
import express from 'express'
// @ts-ignore
import catchify from 'catchify'

// SERVICES
import findGame from '../../services/games/find-one-game-by'

const getGameByIdController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id } = req.params

    const [error, game] = await catchify(findGame({_id: id}))

    if (error) {
        return next(error)
    }

    return res.status(200).json(game)
}

export default getGameByIdController