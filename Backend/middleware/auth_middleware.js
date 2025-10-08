import jwt from "jsonwebtoken";
import User from "../models/user_model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No access token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid or expired token" });
    }
};


// ✅ Role-based access control middlewares

//for admin only
export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res
    .status(403)
    .json({ message: "Access denied - Admins only" });
};

//for owner only
export const ownerRoute = (req, res, next) => {
  if (req.user && req.user.role === "owner") {
    return next();
  }
  return res
    .status(403)
    .json({ message: "Access denied - Owners only" });
};

//for user only - could be handled using the protectedRoute ,but to be used more freely
export const userRoute = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    return next();
  }
  return res
    .status(403)
    .json({ message: "Access denied - Users only" });
};


// ✅ Generic role-based middleware (flexible for combined roles)
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: `Access denied - Only for ${roles.join(", ")}` });
    }
    next();
  };
};
