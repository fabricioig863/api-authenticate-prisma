import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'


export function ensureAuthenticated(request: Request ,response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if(!authToken) {
    return response.status(401).json({
      message: "Token is missing"
    })
  }

  const [, token] = authToken.split(" ");

  try {
    verify(token, "750209f5-c29d-43d6-9c10-a63cbc807f67");

    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Token invalid",
    })
  }
}