import cors from "cors";
import { routes } from "./routes";
import { dataSource } from "./utils/datasource";
import express from "express";

export const app = express();
app.use(
  express.json(),
  cors({ origin: ["http://127.0.0.1:5173", "http://127.0.0.1:4173"] }),
  express.urlencoded({ extended: true })
);

const start = async (): Promise<void> => {
  try {
    await dataSource.initialize();
  } catch (error: any) {
    throw new Error("Error while trying to connecting to database");
  }
  console.log("Successfully connected to the database");
  app.listen(5000, () => {
    console.log("Server started successfully");
    routes();
  });
};

start().catch(() => {
  throw new Error("Unable to start the app");
});
