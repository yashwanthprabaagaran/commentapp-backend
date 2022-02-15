import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();
const router = express.Router();
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log(err);
  });

router.get("/", (req, res) => {
  res.send("From User Router");
});

router.post("/register", async (req, res) => {
  // Check if this user already exisits
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("That user already exisits!");
  } else {
    // Insert the new user if they do not exist yet
    user = new User({
      email: req.body.email,
      password: req.body.password,
      secret: req.body.secret,
    });
    await user.save();
    res.send(user);
  }
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    if (user.password == req.body.password) {
      const update = { isActive: true };
      await user.updateOne(update);
      res.status(200).send(`user logged in!`);
    } else res.status(400).send("wrong credentials!");
  } else res.send("error");
});

router.post("/logout", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user.isActive == true) {
    const update = { isActive: false };
    await user.updateOne(update);
    res.status(200).send(`user logged out!`);
  } else res.status(400).send("error!");
});

export default router;
