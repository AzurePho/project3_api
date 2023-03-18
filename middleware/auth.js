import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../consts.js";
import User from "../models/user.js";

async function auth(req, res, next) {
  const rawToken = req.headers.authorization;

  if (!rawToken) {
    return res.status(403).json({ messsage: "No token provided" });
  }
  const token = rawToken.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const foundUser = await User.findById(decoded.id).select(
      "id userName email role"
    );

    if (!foundUser) {
      return res
        .status(403)
        .json({ message: "User associated with token does not exist" });
    }
    req.currentUser = foundUser;
    next();
  } catch (err) {
    next(err);
  }
}

export default auth;
