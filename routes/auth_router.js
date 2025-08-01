import { Router } from "express";
import {
  register,
  login,
  getAllUsers,
  logout,
} from "../components/AuthController.js";
import {
  validateLogin,
  validateUser,
} from "../ErrorMiddleWare/validationMiddleware.js";
const router = Router();

router.get("/", getAllUsers);
router.post("/register", validateUser, register);
router.post("/login", validateLogin, login);
router.get("/logout", logout);

export default router;
