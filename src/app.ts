import bodyParser from "body-parser";
import cors from "cors";
import Express from "express";
import hbs from "express-handlebars";
import path from "path";

import { Levels, log } from "./util/log";

const app = Express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.raw({
    inflate: true,
    limit: "10mb",
    type: "*/*"
}));

app.set("views", path.join(__dirname, "../public"));
app.engine(".hbs", hbs());
app.set("view engine", ".hbs");

app.use("*", (req, _, next) => {
    log(Levels.DEBUG, `${req.method} on ${req.originalUrl}`);
    next();
});

import landing from "./routes/landing";
app.use("/", landing);

import handle from "./routes/handle";
app.use("/", handle);

export default app;