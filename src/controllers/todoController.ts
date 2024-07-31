import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Todo } from "../entities/Todo";

const todoRepository = AppDataSource.getRepository(Todo);

export const createTodo = async (req: Request, res: Response) => {
    const todo = todoRepository.create({ ...req.body, creator: req.user });
    const result = await todoRepository.save(todo);
    res.send({ ...result, creator: undefined });
};

export const getTodos = async (req: Request, res: Response) => {
    const todos = await todoRepository.find({ where: { creator: req.user } });
    res.send(todos);
};

export const getTodo = async (req: Request, res: Response) => {
    const todo = await todoRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!todo) return res.sendStatus(404);
    res.send(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
    const todo = await todoRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!todo) return res.sendStatus(404);
    todoRepository.merge(todo, req.body);
    const result = await todoRepository.save(todo);
    res.send(result);
};

export const deleteTodo = async (req: Request, res: Response) => {
    const result = await todoRepository.delete(req.params.id);
    if (!result.affected) return res.sendStatus(404);
    res.sendStatus(204);
};
