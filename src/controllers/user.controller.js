import bcrypt from "bcrypt";
import { createUserReqSchema } from "../utils/validations/user.validation.js";
import { createUser } from "../services/user.service.js";

export async function createUserHandler(req, res) {
  const { error, value } = createUserReqSchema.validate(req);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  const { username, email, password } = value.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({ username, email, password: hashedPassword });

  return res
    .status(200)
    .json({ success: true, message: "User created successfully", user });
}
