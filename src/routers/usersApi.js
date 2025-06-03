import { Router } from 'express';
import { getUserController, getUserStationsController } from '../controllers/usersController.js';

const usersRouter = Router();
usersRouter.get('/users', getUserController);
usersRouter.get('/users/stations', getUserStationsController)

export default usersRouter;
