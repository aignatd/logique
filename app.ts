require('dotenv').config();

import express from 'express';
import timeout from 'connect-timeout';

import { createRouter } from 'express-file-routing';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors({origin : "*"}));

createRouter(app, {
  directory: path.join(__dirname, "routes"),
  additionalMethods: ["custom"]
});

app.use(async (err: any, req: any, res: any, next: any) => {
  if(err) {
    console.log('Error ->', err);
    next(err);
  }

  app.use(timeout(120000));
  app.use(haltOnTimedout);

  function haltOnTimedout(req: any, res: any, next: any){
    if (!req.timedout)
      next();
  };

  next();
});

app.listen(process.env.SERVER_PORT || 3000, () => {
   console.log("Server started on port 11011");
})