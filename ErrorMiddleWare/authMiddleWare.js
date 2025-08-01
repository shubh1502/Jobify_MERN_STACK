import { UnauthenticatedError } from "../Errorhandling/CustomErrors.js";
import { verifyJWT } from "../utils/jwtToken.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  try {
    const { userID, user } = verifyJWT(token);
    req.user = { userID, user };
    console.log(req.user);
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};
