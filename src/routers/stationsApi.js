import { Router } from 'express';
import { getStations, createNewUserStation, getStation, removeStation } from "../controllers/stationsController.js";
import { getNextTrackContoller, getPreviousTrackContoller } from '../controllers/tracksController.js';

const stationsRouter = Router();
stationsRouter.get('/stations', getStations);
stationsRouter.get('/station/:id', getStation);
stationsRouter.post('/stations/create', createNewUserStation)
stationsRouter.delete('/station/:id', removeStation)
stationsRouter.get('/stations/:stationId/:trackId/prev', getPreviousTrackContoller)
stationsRouter.get('/stations/:stationId/:trackId/next', getNextTrackContoller)

export default stationsRouter;