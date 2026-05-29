import jwt from "jsonwebtoken";

export const verifytoken = (req, res, next) => {
  // const authHeader = req.headers.authorization;
  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //     return res.status(401).json({ status: false, message: "No token provided" });
  // }

  // const token = authHeader.split(" ")[1];
  // try {
  //     const decoded = jwt.verify(token, process.env.TOKEN);
  //     req.user = decoded;
  //     next();
  // } catch (error) {
  //     return res.status(500).json({ status: false, message: "Invalid token" })
  // }
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No Token Provided",
      });
    }
    const decoded = jwt.verify(token, process.env.TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export const verifyrole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(400).json({
        status: false,
        message: "Access Denied",
      });
    }
    next();
  };
};
