import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { Levels, log } from "./util/log";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    log(Levels.INFO, `Server listening on port ${PORT}`);
});