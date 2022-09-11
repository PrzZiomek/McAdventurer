import cors from 'cors';
import express, { NextFunction, Request, Response } from "express";
import * as mongoDB from "mongodb";
import path from 'path'; 
import  compression from "compression";
import mongoose from "mongoose" ;

import { apiRoutes } from './routes/api/main'; 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.json());
app.use(express.urlencoded({extended: false})); 
app.use(express.static(path.join(__dirname, "public")));
app.use(compression({ threshold: 512 }));
 

app.use((_: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

app.use(apiRoutes);

mongoose.connect(process.env.MONGO_URL!)
  .then(async () =>{ 
      console.log("connect to mongoDB");
  })
  .catch((err) => console.log(err));

app.listen(port, () => { 
  console.log(`Serverrrrr start on `, port);
});      


