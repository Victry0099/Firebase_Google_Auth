import express from "express";
import mongoose from "mongoose";
import { User } from "./model/userSchema.js";
import cors from "cors";
import router from "./routes/user.route.js";
import Authrouter from "./routes/auth.router.js";
import dotenv from "dotenv";
dotenv.config();

const options = {
  origin: " http://localhost:5173",
  methods: ["GET", "POST"],
  credential: true,
};

const app = express();
app.use(express.json());

const PORT = 5001;
app.use(cors(options));

mongoose
  .connect(process.env.MONGO_URL)
  .then((d) => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("error", err);
  });

app.get("/", (req, res) => {
  // console.log("home")
  res.status(200).json({ msg: "home page" });
});

app.use("/api", router);

app.use("/api/auth", Authrouter);

// app.use("/api/auth", Authrouter);

app.listen(PORT, (req, res) => [
  console.log(`server is runing is port number ${PORT}`),
]);
