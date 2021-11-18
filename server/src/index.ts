import cors from 'cors';
import express, { NextFunction, Request, Response } from "express";
import path from 'path'; 

import { destinationRequest } from './controlers/api/destinationRequest';
import { callWikiApi } from './middleware/callWikiApi';
import { apiRoutes } from './routes/api/main';
import { db } from "./util/database";


//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const port = process.env.PORT || 3000;

//db.execute("SELECT * FROM destinations")
 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false})); 
app.use(express.static(path.join(__dirname, "public")));


app.use((_: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

//app.use(apiRoutes)

app.use("/api/destination", destinationRequest)
app.use("/api/destination", callWikiApi);

app.listen(port, () => { 
  console.log(`Serverrrrr start!`);
});

