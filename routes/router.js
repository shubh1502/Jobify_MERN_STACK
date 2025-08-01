import { Router } from "express";
import { validateJobInput } from "../ErrorMiddleWare/validationMiddleware.js";
const router = Router();

import {
  getAllJobs,
  getSingleJob,
  createJob,
  EditJob,
  deleteJob,
  stats,
} from "../components/jobController.js";

router.route("/").get(getAllJobs).post(validateJobInput, createJob);

router.route("/stats").get(stats);

router
  .route("/:id")
  .get(getSingleJob)
  .patch(validateJobInput, EditJob)
  .delete(deleteJob);

export default router;
