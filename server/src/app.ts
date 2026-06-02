import express from "express";
import "dotenv/config";
import path from "path";
import cors from "cors";
import appRouter from "./routes";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(cors());

app.use(appRouter);

app.use(errorHandler);

app.listen(Number(port), host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
