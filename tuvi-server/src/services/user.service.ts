import User from "../models/user.model";

const getUsers = async () => {
  return await User.find();
};

const createUser = async (name: string, email: string) => {
  const newUser = new User({ name, email });
  return await newUser.save();
};

export default { getUsers, createUser };
