// VENDOR
import express from 'express';
import { routeNotImplemented } from '../../libs/middlewares'

const usersRouter: express.Router = express.Router();

usersRouter.get('/users', routeNotImplemented);
usersRouter.get('/users/:id', routeNotImplemented);
usersRouter.post('/users', routeNotImplemented);
usersRouter.patch('/users', routeNotImplemented);
usersRouter.delete('/users/:id', routeNotImplemented);

export default usersRouter;