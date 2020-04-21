// VENDOR
import express from 'express';
import { routeNotImplemented } from '../../libs/middlewares'

const boardsRouter: express.Router = express.Router();

boardsRouter.get('/boards', routeNotImplemented);
boardsRouter.get('/boards/:id', routeNotImplemented);
boardsRouter.post('/boards', routeNotImplemented);
boardsRouter.patch('/boards', routeNotImplemented);
boardsRouter.delete('/boards/:id', routeNotImplemented);

export default boardsRouter;