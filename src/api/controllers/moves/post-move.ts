// VENDOR
// @ts-ignore
import catchify from 'catchify'
import express from 'express'
import _ from 'lodash'

// LIBS
import {
    allMinesDetected,
    calculateScore,
    executeMove,
    maskBoard,
    prettifyBoard, revealMines
} from '../../../libs/minesweeper-engine'

// SERVICES
import updateBoard from '../../services/boards/update-board-by-id'
import updateGame from '../../services/games/update-game'
import findGame from '../../services/games/find-one-game-by'
import {BoardValuesEnum} from '../../../libs/minesweeper-engine/enums'

const postMoveController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { body } = req
    const { gameId, row, col, showBoard, value } = body

    const [error, game] = await catchify(findGame({_id: gameId}))

    if (error) {
        return next(error)
    }

    if (!game) {
        return next(new Error('Game not found.'))
    }

    if (game.finishedAt) {
        return next(new Error('Cannot perform a move in a finished game.'))
    }

    const [populateError, gameWithBoard] = await catchify(game.populate('board').execPopulate())

    if (populateError) {
        return next(populateError)
    }

    const originalBoard = gameWithBoard.board
    const lastMove = _.last(originalBoard.moves)
    let board = originalBoard.matrix

    if (row >= board.length || col >= board[0].length ) {
        return next(new Error(`Move out of bounds. Max row value: ${board.length - 1}. Max col value: ${board[0].length - 1}`))
    }

    if (lastMove) {
        // @ts-ignore
        board = lastMove.matrixCreated
    }

    let nextBoard = [];
    let gameOver = false

    try {
        let nextValue = value

        if (nextValue === BoardValuesEnum.RESET_POSITION) {
            nextValue = _.get(originalBoard, ['matrix', row, col])
        }

        nextBoard = executeMove(row, col, board, nextValue)
    } catch (error) {
        if (error.message) {
            return next(error)
        } else if (Array.isArray(error)) { // it is not an error, is a mine explosion
            gameOver = true
            nextBoard = error
        }
    }

    const [updateError, updatedBoard] = await catchify(
        updateBoard(
            originalBoard._id,
            {
                $push: {
                    moves: {
                        rowSelected: row,
                        colSelected: col,
                        matrixCreated: nextBoard,
                        value,
                        createdAt: new Date()
                    }
                }
            }
        )
    )

    if (updateError) {
        return next(updateError)
    }

    const maskedBoard = maskBoard(nextBoard)
    const prettyBoard = prettifyBoard(maskedBoard)

    let response = {
        col,
        row,
        value,
        prettyBoard,
        maskedBoard,
    }

    if (showBoard) {
        response = Object.assign(
            {},
            response,
            {
                cheatBoard: prettifyBoard(nextBoard),
                board: nextBoard
            }
        )
    }

    if (gameOver) {
        await catchify(
            updateGame(gameId, {
                finishedAt: new Date()
            })
        )

        response = Object.assign(
            {},
            {
                gameOver: true,
                message: "BOOOOM! :'( Oops, game over",
                revealedBoard: revealMines(nextBoard)
            },
            response,
        )
    } else {
        const gameComplete = allMinesDetected(nextBoard)

        if (gameComplete) {
            const { rows, cols, mines, moves} = updatedBoard
            const score = calculateScore(rows, cols, mines, moves.length)

            await catchify(
                updateGame(gameId, {
                    score: score,
                    finishedAt: new Date()
                })
            )

            response = Object.assign(
                {},
                {
                    gameOver: true,
                    message: `Congrats!! You found all the mines! :D. Your score is ${score}`
                },
                response,
            )
        }
    }

    res.status(200).json(response)
}

export default postMoveController