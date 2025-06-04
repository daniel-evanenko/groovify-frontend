import { Router } from 'express';
import { queryStations, createNewUserStation, getStation, removeStation, updateStation, addTrackToStation, removeTrackFromStation } from "../controllers/stationsController.js";
import { getNextTrackContoller, getPreviousTrackContoller } from '../controllers/tracksController.js';

const stationsRouter = Router();

stationsRouter.get('/stations', queryStations);
stationsRouter.get('/station/:id', getStation);
stationsRouter.put('/station/:id', updateStation)
stationsRouter.post('/stations/create', createNewUserStation)
stationsRouter.delete('/station/:id', removeStation)
stationsRouter.get('/stations/:stationId/:trackId/prev', getPreviousTrackContoller)
stationsRouter.get('/stations/:stationId/:trackId/next', getNextTrackContoller)
stationsRouter.put('/stations/:stationId/addTrack/:trackId', addTrackToStation)
stationsRouter.delete('/stations/:stationId/removeTrack/:trackId', removeTrackFromStation)

export default stationsRouter;