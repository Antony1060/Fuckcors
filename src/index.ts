import Express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';

import { config } from 'dotenv';
config()

const PORT = process.env.PORT || 8080;

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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});