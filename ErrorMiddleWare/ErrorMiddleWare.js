import { StatusCodes } from "http-status-codes";

const errorMiddleWare = (err, req, res, next) => {
  console.log(err);
  const statuscode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(statuscode).json({ message: err.message });
};

export default errorMiddleWare;
