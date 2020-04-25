// @ts-ignore
import catchify from 'catchify'
import express from 'express'
import jwt from 'jsonwebtoken'

// LIBS
import getEnvVars from '../../../envConfig'

const { accessToken } = getEnvVars()

const jwtHandler = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        // @ts-ignore
        const [error, user] = await catchify(jwt.verify(token, accessToken))

        if (error) {
            return res.status(403)
        }

        // @ts-ignore
        req.user = user;
    }

    next();
}

export default jwtHandler
