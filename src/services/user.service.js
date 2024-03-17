import { User } from "../models/user.model.js";

export function createUser(data) {
  const { username, email, password } = data;

  try {
    const user = User.create({ username, email, password });
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

export function findUserByUsername(username) {
  try {
    const user = User.findOne({ username });
    return user;
  } catch (error) {
    throw new Error(error);
  }
}
