import { Router } from 'express';
import { getStations } from "../controllers/stationsController.js";

const stationsRouter = Router();
stationsRouter.get('/stations', getStations);

export default stationsRouter;
