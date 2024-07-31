import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { AppDataSource } from "../ormconfig";

const userRepository = AppDataSource.getRepository(User);

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.sendStatus(401);
        }

        const decodedToken = jwt.verify(token, "your_secret_key") as {
            username: string;
            id: number;
        };

        if (!decodedToken) {
            res.status(401).json({ detail: "Not Authenticated" });
        }

        const user = await userRepository.findOne({
            where: { id: decodedToken.id },
        });
        if (!user) {
            res.status(401).json({ detail: "Not Authenticated" });
            return;
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ detail: "Not Authenticated", data: err });
    }
};
