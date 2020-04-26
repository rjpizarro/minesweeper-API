// VENDOR
import express from 'express';
import {isUserGame, routeNotImplemented} from '../middlewares'

// CONTROLLERS
import postGameController from '../controllers/games/post-game'
import getAllUserGamesController from '../controllers/games/get-all-user-games'

const gamesRouter: express.Router = express.Router();

gamesRouter.get('/games', getAllUserGamesController);
gamesRouter.get('/games/:id', isUserGame, routeNotImplemented);
gamesRouter.post('/games', postGameController);
gamesRouter.patch('/games', routeNotImplemented);
gamesRouter.delete('/games/:id', routeNotImplemented);

export default gamesRouter;
