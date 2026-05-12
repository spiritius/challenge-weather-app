import express from "express";
import "dotenv/config";
import path from "path";
import appRouter from "./routes";
import { errorHandler } from "./middlewares/error-handler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(appRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
