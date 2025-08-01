import { StatusCodes } from "http-status-codes";

import User from "../models/Usermodel.js";
import { hashPassword } from "../utils/hashPassword.js";
import { UnauthenticatedError } from "../Errorhandling/CustomErrors.js";
import comparePass from "../utils/comaprePass.js";
import createJWT from "../utils/jwtToken.js";

export const register = async (req, res) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";
  const newHashPass = await hashPassword(req.body.password);
  req.body.password = newHashPass;
  const newUser = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "ser created" });
};

export const login = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser) {
    throw new UnauthenticatedError(`Invalid email`);
  }
  const isPasswordCorrect = comparePass(
    req.body.password,
    existingUser.password
  );
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = createJWT({
    userID: existingUser._id,
    user: existingUser.role,
  });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "Login Successful" });
};

export const getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  res.status(StatusCodes.OK).json(allUsers);
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logout" });
};
