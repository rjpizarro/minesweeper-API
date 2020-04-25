// VENDOR
import express from 'express';

// CONTROLLERS
import loginUserController from '../controllers/auth/login'
import postUserController from '../controllers/users/post-user'

const authRouter: express.Router = express.Router();

authRouter.post('/auth/login', loginUserController);
authRouter.post('/auth/register', postUserController);

export default authRouter;