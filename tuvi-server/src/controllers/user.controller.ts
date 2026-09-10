import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const users = await userService.getUsers();
    res.status(200).json();
  } catch (error) {
    next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;
    // const newUser = await userService.createUser(name, email);
    res.status(201).json();
  } catch (error) {
    next(error);
  }
};

export default { getAllUsers, createUser };
