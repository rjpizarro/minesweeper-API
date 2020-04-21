// VENDOR
import express from 'express';
import { routeNotImplemented } from '../../libs/middlewares'

const gamesRouter: express.Router = express.Router();

gamesRouter.get('/games', routeNotImplemented);
gamesRouter.get('/games/:id', routeNotImplemented);
gamesRouter.post('/games', routeNotImplemented);
gamesRouter.patch('/games', routeNotImplemented);
gamesRouter.delete('/games/:id', routeNotImplemented);

export default gamesRouter;
