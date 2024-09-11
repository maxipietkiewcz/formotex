import express from "express";
import cors from "cors";
import morgan from "morgan";
import db from "../config/db";
import { PORT } from "../config/conf";

export class Server {
  private app: express.Application;
  private port: string | undefined;

  constructor() {
    this.app = express();
    this.port = PORT;
    this.middlewares();
    this.routes();
    this.listen();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan("dev"));
  }

  routes() {}

  listen() {
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }
}
