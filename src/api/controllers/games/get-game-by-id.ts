// VENDOR
import _ from 'lodash'
import express from 'express'
// @ts-ignore
import catchify from 'catchify'

// SERVICES
import findGame from '../../services/games/find-one-game-by'
import { maskBoard, revealMines } from '../../../libs/minesweeper-engine'

const getGameByIdController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id } = req.params

    const [error, game] = await catchify(findGame({_id: id}))

    if (error) {
        return next(error)
    }

    const [populateError, gameWithBoard] = await catchify(game.populate('board').execPopulate())

    if (populateError) {
        return next(populateError)
    }

    const board = _.get(gameWithBoard, 'board.matrix', [])
    const lastMove = _.last(gameWithBoard.board.moves)

    if (lastMove) {
        // @ts-ignore
        board = lastMove.matrixCreated
    }

    let response = {
        player: gameWithBoard.player,
        score: gameWithBoard.score,
        finishedAt: gameWithBoard.finishedAt,
        deletedAt: gameWithBoard.deletedAt,
        createdAt: gameWithBoard.createdAt,
        updatedAt: gameWithBoard.updatedAt,
        maskedBoard: maskBoard(board),
    }

    if (gameWithBoard.finishedAt) {
        response = Object.assign(
            {},
            response,
            { revealedBoard: revealMines(board) }
        )
    }

    return res.status(200).json(response)
}

export default getGameByIdController