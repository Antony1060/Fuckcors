import { config } from 'dotenv';

import app from './app';
import { Levels, log } from './util/log';
config()

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    log(Levels.INFO, `Server listening on port ${PORT}`);
});