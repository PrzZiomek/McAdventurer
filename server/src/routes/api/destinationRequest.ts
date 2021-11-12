import express, { NextFunction, Request, Response } from "express";


export const destinationRequest = (req: Request, res: Response) => {
    const reqBody = req.body;
    console.log(reqBody); 
    res.status(200).json({
      message: "ponggg",
    })   
}