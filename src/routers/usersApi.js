import { Router } from 'express';
import { getUserController, getUserStationsController, toggleLikedTrackController, toggleSavedStation } from '../controllers/usersController.js';

const usersRouter = Router();
usersRouter.get('/users', getUserController);
usersRouter.get('/users/stations', getUserStationsController)
usersRouter.put('/users/savedStation', toggleSavedStation)
usersRouter.put('/users/:userId/toggle-track/:trackId', toggleLikedTrackController)


export default usersRouter;
