import express from "express";
import dotenv from "dotenv";
import Comment from "../models/Comment.js";

dotenv.config();
const router = express.Router();

router.post("/new", async (req, res) => {
  const comm = new Comment(req.body);
  try {
    const savedcomm = await comm.save();
    res.status(200).json(savedcomm);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/all", async (req, res) => {
  try {
    const allcomm = await Comment.find();
    res.status(200).json(allcomm);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/:id", async(req,res) => {
//     let user = await User.find({ isActive:true });
//     if (user) {
//         try{
//         const allcomm = await Comment.find({userid:user._id})
//         res.status(200).json(allcomm)
//         }catch (err) {
//             res.status(500).send("comment error!")
//         }
//     }
//     else {
//         res.status(500).send("no such user found");
//     }
// })

export default router;
