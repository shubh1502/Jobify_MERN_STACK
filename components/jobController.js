import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import Jobs from "../models/jobModel.js";
//custom error
import {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  UnauthenticatedError,
} from "../Errorhandling/CustomErrors.js";

import mongoose from "mongoose";

// local data

// import { nanoid } from "nanoid";
// const jobs = [
//   { id: nanoid(), company: "Apple", Job: "Front-End" },
//   { id: nanoid(), company: "Samsung", Job: "Front-End" },
// ];

// get all jobs
export const getAllJobs = async (req, res) => {
  // console.log(req.user);
  console.log(req.query);
  const { search, JobStatus, JobType, sort, page } = req.query;
  // console.log(search);
  const queryObject = {
    createdBy: req.user.userID,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search } },
      { company: { $regex: search } },
    ];
  }
  if (JobStatus && JobStatus !== "all") {
    queryObject.JobStatus;
  }
  if (JobType && JobType !== "all") {
    queryObject.JobStatus;
  }

  const sort_by = {
    newest: "createdAt",
    oldest: "-createdAt",
    "a-z": "position",
    "z-a": "-position",
  };
  // console.log(queryObject);

  const page_UI = Number(page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const totalJobs = await Jobs.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);
  const jobs = await Jobs.find(queryObject)
    .sort(sort_by[sort])
    .skip(skip)
    .limit(10);
  res.status(StatusCodes.OK).json({ totalJobs, numOfPages, page_UI, jobs });
};

//   get single job
export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Jobs.findById(id);
  if (!job) throw new NotFoundError(`no job with id ${id}`);
  res.status(StatusCodes.OK).json({ job });
};

// create job
export const createJob = async (req, res) => {
  // const { company, position } = req.body;
  // console.log(req.user);
  req.body.createdBy = req.user.userID;
  const job = await Jobs.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

//   edit job
export const EditJob = async (req, res) => {
  const { id } = req.params;
  const updateJob = await Jobs.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updateJob) throw new BadRequestError(`No such job found`);
  res
    .status(StatusCodes.OK)
    .json({ message: "job Modified", data: { updateJob } });
};

//   delete job
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const deleteJob = await Jobs.findByIdAndDelete(id);
  if (!deleteJob) throw new NotFoundError(`no job with id ${id}`);

  res.status(StatusCodes.OK).json({ msg: "job deleted", job: deleteJob });
};

export const stats = async (req, res) => {
  let stats = await Jobs.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userID) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  // console.log(stats);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    // console.log(acc);
    acc[title] = count;
    // console.log(acc);
    return acc;
  }, {});
  const defaultValue = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyStats = await Jobs.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userID) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  console.log(monthlyStats);
  res.status(StatusCodes.OK).json({ defaultValue, monthlyStats });
};
