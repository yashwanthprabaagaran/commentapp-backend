import express from "express";
import cors from "cors";
import userrouter from "./routes/user.js";
import commentrouter from "./routes/comment.js";

const app = express();
app.listen(5000, () => {
  console.log("Listening at 5000");
});

app.use(express.json());
app.use(cors());
app.use("/api/user", userrouter);
app.use("/api/comment", commentrouter);
