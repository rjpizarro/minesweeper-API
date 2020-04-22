// VENDOR
import express from 'express';
import { routeNotImplemented } from '../../libs/middlewares'

// CONTROLLERS
import postMoveController from '../controllers/moves/post-move'

const movesRouter: express.Router = express.Router();

movesRouter.get('/moves', routeNotImplemented);
movesRouter.get('/moves/:id', routeNotImplemented);
movesRouter.post('/moves', postMoveController);
movesRouter.patch('/moves', routeNotImplemented);
movesRouter.delete('/moves/:id', routeNotImplemented);

export default movesRouter;