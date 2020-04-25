// VENDOR
import express from 'express';

// CONTROLLERS
import postMoveController from '../controllers/moves/post-move'

// LIBS
import { isUserGame, routeNotImplemented } from '../middlewares'

const movesRouter: express.Router = express.Router();

movesRouter.get('/moves', routeNotImplemented);
movesRouter.get('/moves/:id', routeNotImplemented);
movesRouter.post('/moves', isUserGame, postMoveController);
movesRouter.patch('/moves', routeNotImplemented);
movesRouter.delete('/moves/:id', routeNotImplemented);

export default movesRouter;