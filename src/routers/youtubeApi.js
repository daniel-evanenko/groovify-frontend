import { Router } from 'express';
import { getTrackToPlay } from '../controllers/youtubeController.js';

const youtubeRouter = Router();
youtubeRouter.get('/youtube', getTrackToPlay);

export default youtubeRouter;
