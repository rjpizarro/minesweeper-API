import express from 'express'
// @ts-ignore
import catchify from 'catchify'

import createUser from '../../services/users/create-user'

const postUserController = async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body
    console.log(">> POST USER", username)

    const [error, user] = await catchify(createUser(username, password))

    if (error) {
        return res.status(400).json(error)
    }

    return res.status(200).json(user)
}

export default postUserController