// VENDOR
import bcrypt from 'bcrypt'
// @ts-ignore
import catchify from 'catchify'
import express from 'express'
import jwt from 'jsonwebtoken'

// LIBS
import getEnvVars from '../../../../envConfig'

// SERVICES
import findUser from '../../services/users/find-user-by'

const { accessToken } = getEnvVars()

const loginUserController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { username, password } = req.body

    if (!username) return next(new Error("Username is required"))
    if (!password) return next(new Error("Password is required"))

    const [error, user] = await catchify(findUser({username: username}))

    if (!user || error) {
        if (error) {
            return next(error)
        }

        return next(new Error("A user with that username does not exists"))
    }

    const [bcryptError, validPassword] = await catchify(bcrypt.compare(password, user.password))

    if (bcryptError) {
        return next(bcryptError)
    }

    if (!validPassword) {
        return next(new Error("Password don't match"))
    }

    // @ts-ignore
    const jwtToken = jwt.sign({_id: user._id, username: user.username }, accessToken)

    return res.status(200).json({
        _id: user._id,
        username: user.username,
        createdAt: user.createdAt,
        token: jwtToken
    })
}

export default loginUserController