// VENDOR
import express from 'express';
import { routeNotImplemented } from '../middlewares'

// CONTROLLERS
import postUserController from '../controllers/users/post-user'

const usersRouter: express.Router = express.Router();

usersRouter.get('/users', routeNotImplemented);
usersRouter.get('/users/:id', routeNotImplemented);
usersRouter.post('/users', postUserController);
usersRouter.patch('/users', routeNotImplemented);
usersRouter.delete('/users/:id', routeNotImplemented);

export default usersRouter;