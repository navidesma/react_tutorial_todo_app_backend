import { DataSource } from "typeorm";
import { Todo } from "./entities/Todo";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [Todo, User],
    migrations: [],
    subscribers: [],
});
