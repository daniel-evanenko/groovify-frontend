import { Router } from 'express';
import { getTracksController } from '../controllers/tracksController.js';

const tracksRouter = Router();
tracksRouter.get('/tracks', getTracksController);

export default tracksRouter;
