import express from 'express'
import bodyParser from 'body-parser';

//ROUTES
import {
    boardsRouter,
    gamesRouter,
    movesRouter,
    usersRouter,
} from './api/routes'

const app: express.Application = express();

app.use(bodyParser.json())

app.use('/api', boardsRouter)
app.use('/api', gamesRouter)
app.use('/api', movesRouter)
app.use('/api', usersRouter)

app.listen(8000, function () {
    console.log('App running on port 8000');
});
