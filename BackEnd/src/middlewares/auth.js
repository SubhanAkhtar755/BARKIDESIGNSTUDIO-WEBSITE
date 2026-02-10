import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const authMiddleware = (req, res, next) => {
  try {
    let token;

    // 1) Check cookie
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // 2) Fallback to header
    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") token = parts[1];
    }

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
