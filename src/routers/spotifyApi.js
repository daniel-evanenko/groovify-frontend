import { Router } from 'express';
import { getSpotifyPlaylist } from "../controllers/spotifyController.js";

const spotifyRouter = Router();
spotifyRouter.get('/spotify', getSpotifyPlaylist);

export default spotifyRouter;
