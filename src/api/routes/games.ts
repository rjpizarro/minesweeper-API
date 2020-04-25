// VENDOR
import express from 'express';
import { routeNotImplemented } from '../../libs/middlewares'

// CONTROLLERS
import postGameController from '../controllers/games/post-game'

const gamesRouter: express.Router = express.Router();

gamesRouter.get('/games', routeNotImplemented);
gamesRouter.get('/games/:id', routeNotImplemented);
gamesRouter.post('/games', postGameController);
gamesRouter.patch('/games', routeNotImplemented);
gamesRouter.delete('/games/:id', routeNotImplemented);

export default gamesRouter;
