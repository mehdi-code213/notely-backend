import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByUsername } from "../services/user.service.js";
import {
  userLoginReqSchema,
  userRefreshReqSchema,
} from "../utils/validations/auth.validation.js";

export async function userLoginHandler(req, res) {
  const { error, value } = userLoginReqSchema.validate(req);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  const { username, password } = value.body;

  const user = await findUserByUsername(username);
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "user does not exist" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res
      .status(400)
      .json({ success: false, message: "invalid password" });
  }

  const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
  const refreshToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

  res.cookie("refresh_token", refreshToken);

  return res.status(200).json({
    success: true,
    message: "logged in successfully",
    accessToken,
  });
}

export async function userRefreshHandler(req, res) {
  const { error, value } = userRefreshReqSchema.validate(req);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  const { refresh_token: refreshToken } = value.cookies;

  const decrypted = jwt.verify(refreshToken, process.env.SECRET_KEY);
  if (!decrypted) {
    return res
      .status(400)
      .json({ success: false, message: "invalid refresh token" });
  }

  const accessToken = jwt.sign(decrypted, process.env.SECRET_KEY);

  res.status(200).json({ success: true, accessToken });
}
