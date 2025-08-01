import { StatusCodes } from "http-status-codes";
import User from "../models/Usermodel.js";
import Job from "../models/jobModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const getCurrentUser = async (req, res) => {
  console.log(req.user);
  const user = await User.findOne({ _id: req.user.userID });
  const userwtpass = user.toJSON();
  //
  res.status(StatusCodes.OK).json({ user: userwtpass });
};

export const getApplicationStat = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  console.log(req);
  const updateUserBody = req.body;
  // console.log(updateUserBody);
  delete updateUserBody.password;
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    updateUserBody.avatar = response.secure_url;
    updateUserBody.avatarPublicId = response.public_id;
  }
  const updateUser = await Job.findByIdAndUpdate(
    req.user.userID,
    updateUserBody
  );
  if (req.file && updateUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updateUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: updateUser });
};
