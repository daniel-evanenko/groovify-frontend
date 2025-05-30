import express from 'express';
import bodyParser from 'body-parser';
import { DEFAULT_PORT } from './utils/constants.js';
import stationsRouter from './routers/stationsApi.js';
import tracksRouter from './routers/tracksApi.js';
import youtubeRouter from './routers/youtubeApi.js';
import { handleEnvTypeRun } from './utils/serverUtils.js';

const app = express();

app.use(handleEnvTypeRun());
app.use(bodyParser.json());
app.use(express.json());

app.use(stationsRouter);
app.use(tracksRouter);
app.use(youtubeRouter);

const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => console.log(`Server is up and running on port ${port}`));
