import { Router } from 'express';
import { getTracksController, getTrackUrlController } from '../controllers/tracksController.js';

const tracksRouter = Router();
tracksRouter.get('/tracks', getTracksController);
tracksRouter.get('/tracks/:id', getTrackUrlController);

export default tracksRouter;
