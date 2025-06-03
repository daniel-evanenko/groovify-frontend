import { Router } from 'express';
import { getUserController } from '../controllers/usersController.js';

const usersRouter = Router();
usersRouter.get('/users', getUserController);

export default usersRouter;
