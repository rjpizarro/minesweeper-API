// VENDOR
import express from 'express';

// CONTROLLERS
import loginUserController from '../controllers/auth/login'
import registerUserController from '../controllers/auth/register'

const authRouter: express.Router = express.Router();

authRouter.post('/auth/login', loginUserController);
authRouter.post('/auth/register', registerUserController);

export default authRouter;