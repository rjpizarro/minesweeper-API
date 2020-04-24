require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser';
import mongoose, {Schema} from 'mongoose'
import getEnvVars from '../envConfig'

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

app.use('/api', boardsRouter)
app.use('/api', gamesRouter)
app.use('/api', movesRouter)
app.use('/api', usersRouter)

mongoose.connect(`${mongoConnect}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(err => console.log(`Mongo connection error: ${err}`))

app.listen(port, function () {
    console.log(`App running on port ${port}`);
});
