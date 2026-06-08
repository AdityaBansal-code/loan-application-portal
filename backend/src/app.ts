import express from "express";
import cors from "cors";

import applicationRoutes from "./routes/applicationRoutes.js"

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", applicationRoutes);

export default app;