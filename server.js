import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import createErrors from "http-errors";
dotenv.config();
import morgan from "morgan";

import todoRoutes from "./routes/api/todoRoutes.js";

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use("/api", todoRoutes);

app.use(async (req, res, next) => {
  next(createErrors.NotFound("This route does not exist"));
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

const { PORT, MONGO_URL, DB_NAME } = process.env;
const port = PORT || 5000;

mongoose
  .connect(MONGO_URL, {
    dbName: DB_NAME,
    useNewUrlParser: true,
  })
  .then(() => {
    return app.listen(port, () => {
      console.log(`Server running on port ${port}....`);
    });
  })
  .then((res) => console.log(`Development at ${res.url}`))
  .catch((err) => {
    process.exit(1), console.log(err), console.log("Mongodb disconnected");
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

mongoose.connection.on("error", (error) => {
  console.log(error.message);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose  is disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
