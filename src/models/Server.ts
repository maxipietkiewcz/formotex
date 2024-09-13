import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "../config/db";
import { PORT } from "../config/conf";
import authRouter from "../routes/auth.routes";
import userRouter from "../routes/user.routes";
import equipaemntRouter from "../routes/equipament.routes";

export class Server {
  private app: express.Application;
  private port: string | undefined;

  constructor() {
    this.app = express();
    this.port = PORT;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/users", userRouter);
    this.app.use("/api/equipament", equipaemntRouter);
  }

  async listen() {
    await connectDB();

    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }
}
