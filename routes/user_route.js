import { Router } from "express";
import {
  getCurrentUser,
  getApplicationStat,
  updateUser,
} from "../components/UserController.js";
import { validateUpdateUserInput } from "../ErrorMiddleWare/validationMiddleware.js";
import upload from "../ErrorMiddleWare/multerMiddleware.js";

const router = Router();

router.get("/current", getCurrentUser);
router.get("/application", getApplicationStat);
router.patch(
  "/update-user",
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);

export default router;
