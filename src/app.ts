import bodyParser from "body-parser";
import cors from "cors";
import Express from "express";
import { hostname } from "os";

import { Levels, log } from "./util/log";

const app = Express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.raw({
    inflate: true,
    limit: "10mb",
    type: "*/*"
}));

app.use("*", (req, _, next) => {
    log(Levels.DEBUG, `${req.method} on ${req.originalUrl}`);
    next();
});

app.use("/", Express.static(__dirname + "/../public", {
    setHeaders: (res) => {
        // if we're in kubernetes, we put it in headers, because why not
        if(process.env.KUBERNETES_SERVICE_HOST)
            res.header("Kubernetes-Pod", hostname());
    }
}));

import handle from "./routes/handle";
app.use("/", handle);

export default app;