import express from 'express'
import { executeMove, maskBoard, prettifyBoard } from '../../../libs/minesweeper-engine'

const mockBoard = [
    ["E", "M", "M", "E"],
    ["M", "E", "E", "E"],
    ["E", "E", "E", "E"],
    ["E", "E", "E", "E"],
]

const postMoveController = (req: express.Request, res: express.Response) => {
    const { body } = req
    const { row, col, showBoard } = body
    const nextBoard = executeMove(row, col, mockBoard)
    const maskedBoard = maskBoard(nextBoard)
    const prettyBoard = prettifyBoard(maskedBoard)

    let response = {
        prettyBoard,
    }

    if (showBoard) {
       response = Object.assign(
           {},
           response,
           {
               board: nextBoard,
               cheatBoard: prettifyBoard(nextBoard)
           }
       )
    }

    res.status(200).json(response)
}

export default postMoveController