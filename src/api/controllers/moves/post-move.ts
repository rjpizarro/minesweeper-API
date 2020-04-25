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
    prettifyBoard
} from '../../../libs/minesweeper-engine'

// SERVICES
import findBoardByGameId from '../../services/boards/get-board-by-game-id'
import updateBoard from '../../services/boards/update-board-by-id'
import updateGame from '../../services/games/update-game'

const postMoveController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { body } = req
    const { gameId, row, col, showBoard, value } = body
    const [error, boardData] = await catchify(findBoardByGameId(gameId))

    if (error) {
        return next(error)
    }

    let board = boardData.matrix
    const lastMove = _.last(boardData.moves)

    if (lastMove) {
        // @ts-ignore
        board = lastMove.matrixCreated
    }

    let nextBoard;
    let gameOver = false

    try {
        nextBoard = executeMove(row, col, board, value)
    } catch (mineExplosion) {
        gameOver = true
        nextBoard = mineExplosion
    }

    const [updateError, updatedBoard] = await catchify(
        updateBoard(
            boardData._id,
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
            response,
            { message: "BOOOOM! :'( Oops, game over" },
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
                { message: `Congrats!! You found all the mines! :D. Your score is ${score}` },
                response,
            )
        }
    }

    res.status(200).json(response)
}

export default postMoveController