import * as express from "express";
import { User } from "../entities/User";

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}
