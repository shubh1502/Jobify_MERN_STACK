import { body, validationResult } from "express-validator";
import { BadRequestError } from "../Errorhandling/CustomErrors.js";
import { JOB_STATUS, JOB_TYPE, USER_ROLE } from "../utils/constants.js";
import User from "../models/Usermodel.js";
const validationMiddleware = (validateBody) => {
  return [
    validateBody,
    (req, res, next) => {
      //   console.log(req, res);
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => {
          return error.msg;
        });
        throw new BadRequestError(errorMessage);
      }
      next();
    },
  ];
};

export const validateJobInput = validationMiddleware([
  body("company").notEmpty().withMessage("Company name is required"),
  body("position").notEmpty().withMessage("Position is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid Status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("Job Type is required"),
  body("jobLocation").notEmpty().withMessage("Job location is required"),
]);

export const validateUser = validationMiddleware([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  // body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
]);

export const validateLogin = validationMiddleware([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
]);

export const validateUpdateUserInput = validationMiddleware([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userID) {
        throw new Error("email already exists");
      }
    }),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("location").notEmpty().withMessage("location is required"),
]);
