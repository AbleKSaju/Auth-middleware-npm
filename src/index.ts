import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'; 
import * as dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
    console.log("AUTH MIDDLEWARE");
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Authorization header required' });
    }
    try {
        const token: string = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.ACCESS_SECRET_KEY!);
        req.decodedTokenData = decode;
        console.log("Token verified");
        next();
    } catch (err) {
        console.error("Error in authMiddleware:", err);
        return res.status(401).json({ error: 'Invalid access token' });
    }
};

export { authMiddleware };