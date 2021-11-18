import express, { NextFunction, Request, Response } from "express";
import { read, readSync } from "fs";


export const destinationRequest = (req: Request, res: Response, next: NextFunction) => {
  const reqBody = req.body;
  res.status(200).json({
    message: "ponggg",
  });
  res.locals.destinationName = reqBody.destination.name;
  next()
}