import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./ormconfig";
import todoRoutes from "./routes/todoRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./docs/swagger";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());

app.use("/api", todoRoutes);
app.use("/api/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.log(error));
