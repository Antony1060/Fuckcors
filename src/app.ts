import { hostname } from 'os'

import Express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = Express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.raw({
    inflate: true,
    limit: "10mb",
    type: "*/*"
}))

app.use("/", Express.static(__dirname + "/../public", {
    setHeaders: (res) => {
        // if we're in kubernetes, we put it in headers, because why not
        if(process.env.KUBERNETES_SERVICE_HOST)
            res.header("Kubernetes-Pod", hostname())
    }
}));

import handle from './routes/handle'
app.use("/", handle);

export default app