import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../ormconfig";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = userRepository.create({ ...req.body, password: hashedPassword });
    const result = await userRepository.save(user);
    res.send({ ...result, password: undefined });
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await userRepository.findOneBy({ username });
    if (!user) return res.sendStatus(401);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.sendStatus(401);

    const token = jwt.sign({ username: user.username, id: user.id }, "your_secret_key", {
        expiresIn: "1h",
    });
    res.json({ token, firstName: user.firstName, lastName: user.lastName });
};

export const editUser = async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;
    const user = await userRepository.findOneBy({ id: req.user.id });
    if (!user) return res.sendStatus(404);

    if (user.id !== req.user.id) {
        res.status(403);
        return;
    }

    user.firstName = firstName;
    user.lastName = lastName;
    userRepository.save(user);

    res.json({ firstName, lastName });
};
