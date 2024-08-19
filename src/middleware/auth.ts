import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }
    
    try {
      jwt.verify(token, process.env.TOKEN_SECRET as string)
      return next();
    }
    catch(e){
      res.status(401).json({message: "Bad Token"})
    }
};

export { authenticateToken };