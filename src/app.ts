require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import swaggerUI from 'swagger-ui-express'
import swaggerConfig from './api/docs/swagger-config'

//ROUTES
import {
    authRouter,
    boardsRouter,
    gamesRouter,
    movesRouter,
    usersRouter,
} from './api/routes'

import getEnvVars from '../envConfig'
import { errorHandler, jwtHandler } from './api/middlewares'

const {
    port,
    mongoURI,
} = getEnvVars()
const app: express.Application = express();

app.use(bodyParser.json())
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig))

app.use('/api', authRouter)
app.use('/api', jwtHandler, boardsRouter)
app.use('/api', jwtHandler, gamesRouter)
app.use('/api', jwtHandler, movesRouter)
app.use('/api', usersRouter)
app.use(errorHandler)

mongoose.connect(`${mongoURI}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(err => console.log(`Mongo connection error: ${err}`))

app.listen(port, function () {
    console.log(`App running on port ${port}`);
});
