import { Router } from 'express';
import { getStations, createNewUserStation } from "../controllers/stationsController.js";

const stationsRouter = Router();
stationsRouter.get('/stations', getStations);
stationsRouter.post('/stations/create', createNewUserStation)

export default stationsRouter;
