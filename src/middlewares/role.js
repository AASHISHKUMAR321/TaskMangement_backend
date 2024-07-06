import userModel from "../models/userModel.js";

const role = (roles) => {
  return async (req, res, next) => {
    console.log(req.result)
    const user = await userModel.findOne({ email: req.result.email });
    if (!roles.includes(user.role)) {
      return res
        .status(401)
        .json({ message: "your are not authorized to access this route" });
    }
    next();
  };
};

export default role;
