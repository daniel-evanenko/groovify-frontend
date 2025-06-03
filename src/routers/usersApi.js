import { Router } from 'express';
import { getUserController, getUserStationsController, toggleSavedStation } from '../controllers/usersController.js';

const usersRouter = Router();
usersRouter.get('/users', getUserController);
usersRouter.get('/users/stations', getUserStationsController)
usersRouter.put('/users/savedStation', toggleSavedStation)


export default usersRouter;
