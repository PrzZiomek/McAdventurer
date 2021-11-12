import cors from 'cors';
import express, { NextFunction, Request, Response } from "express";
import path from 'path';
import { destinationRequest } from './routes/api/destinationRequest';


const app = express();
const port = process.env.PORT || 3000;
 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false})); 
app.use(express.static(path.join(__dirname, "public")));


app.use((_: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

app.use(destinationRequest)

app.listen(port, () => { 
  console.log(`Serverrrrr start!`);
});

