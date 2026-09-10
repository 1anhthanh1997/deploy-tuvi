import express from "express";
import userController from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);
userRouter.post("/create-user", userController.createUser);

export default userRouter;
