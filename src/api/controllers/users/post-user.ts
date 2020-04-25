import express from 'express'
// @ts-ignore
import catchify from 'catchify'

import createUser from '../../services/users/create-user'
import findUser from '../../services/users/find-user-by'

const postUserController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { username, password } = req.body

    if (!username) return next(new Error("Username is required"))
    if (!password) return next(new Error("Password is required"))

    const [error, user] = await catchify(findUser({username: username}))

    if (user || error) {
        if (error) {
            return next(error)
        }

        return next(new Error("Username already exists"))
    }

    const [newUserError, newUser] = await catchify(createUser(username, password))

    if (newUserError) {
        return next(newUserError)
    }

    console.log(">>", newUser)

    return res.status(200).json({
        _id: newUser._id,
        username: newUser.username,
        createdAt: newUser.createdAt,

    })
}

export default postUserController