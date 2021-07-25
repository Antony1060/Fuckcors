import Express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';

const app = Express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.raw({
    inflate: true,
    limit: "10mb",
    type: "*/*"
}))

app.use("/", Express.static(__dirname + "/../public"));

import handle from './routes/handle'
app.use("/", handle);

export default app