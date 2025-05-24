import express from 'express';
import { DEFAULT_PORT } from './utils/constants.js';
import spotifyRouter from './routers/spotifyApi.js';
import youtubeRouter from './routers/youtubeApi.js';
import { handleEnvTypeRun } from './utils/serverUtils.js';

const app = express();

app.use(handleEnvTypeRun());
app.use(express.json())

app.use(spotifyRouter);
app.use(youtubeRouter);

const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => console.log(`Server is up and running on port ${port}`));
