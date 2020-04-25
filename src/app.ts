require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import swaggerUI from 'swagger-ui-express'
import getEnvVars from '../envConfig'
import swaggerConfig from './api/docs/swagger-config'

//ROUTES
import {
    boardsRouter,
    gamesRouter,
    movesRouter,
    usersRouter,
} from './api/routes'

const {
    port,
    mongoConnect
} = getEnvVars()
const app: express.Application = express();

app.use(bodyParser.json())
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig, { explorer: true }))

app.use('/api', boardsRouter)
app.use('/api', gamesRouter)
app.use('/api', movesRouter)
app.use('/api', usersRouter)

mongoose.connect(`${mongoConnect}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(err => console.log(`Mongo connection error: ${err}`))

app.listen(port, function () {
    console.log(`App running on port ${port}`);
});
