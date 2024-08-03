import { z } from "zod";

export const todoSchema = z.object({
    title: z.string().nonempty("Title is required"),
});

export const todoUpdateSchema = z.object({
    title: z.string().nonempty("Title is required").optional(),
    is_done: z.boolean().optional(),
});

export const userSchema = z.object({
    firstName: z.string().nonempty("firstName is required"),
    lastName: z.string().nonempty("lastName is required"),
    username: z.string().nonempty("Username is required"),
    password: z.string().nonempty("Password is required"),
});

export const loginSchema = z.object({
    username: z.string().nonempty("firstName is required"),
    password: z.string().nonempty("Password is required"),
});

export const editUserSchema = z.object({
    firstName: z.string().nonempty("firstName is required"),
    lastName: z.string().nonempty("lastName is required"),
});
