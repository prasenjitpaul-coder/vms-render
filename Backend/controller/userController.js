import usermodel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    if (!username || !password || !email || !role) {
      return res.status(400).json({ status: false, message: "All fields are required" });
    }
    const allreadyuser = await usermodel.findOne({ email }).select("+password");
    if (allreadyuser) {
      return res.status(400).json({ status: false, message: "User Already Exist" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    await usermodel.create({
      email,
      username,
      role,
      password: hashedpassword,
    });
    res.status(201).json({ status: true, message: "User Created" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Something Went Wrong" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: false, message: "All Fields Required" });
  }
  const existuser = await usermodel.findOne({ email }).select("+password");
  if (!existuser) {
    return res.status(400).json({ success: false, message: "Register First" });
  }
  const IsMatch = await bcrypt.compare(password, existuser.password);
  if (!IsMatch) {
    return res.status(400).json({ success: false, message: "Password Wrong" });
  }
  const token = jwt.sign(
    {
      id: existuser._id,
      email: existuser.email,
      role: existuser.role,
    },
    process.env.TOKEN,
    { expiresIn: "30m" },
  );
  const refreshToken = jwt.sign(
    {
      id: existuser._id,
      email: existuser.email,
      role: existuser.role,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "1d" },
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,     // 🔥 MUST for localhost
  sameSite: "lax",   // 🔥 allows cross-origin (safe)
  path: "/"
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,     // 🔥 MUST for localhost
  sameSite: "lax",   // 🔥 allows cross-origin (safe)
  path: "/"
  });
  res
    .status(200)
    .json({
      success: true,
      token,
      role: existuser.role,
      message: "Login Successful",
    });
};

export const logout = (req, res) => {
  const hasToken = req.cookies.token;
  if (!hasToken) {
    return res.status(400).json({ status: false, message: "Allready Logout" });
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
  sameSite: "lax",
  path: "/"
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
   secure: false,
  sameSite: "lax",
  path: "/"
  });
  res.status(200).json({ status: true, message: "Logout Successfully" });
};

export const me = async (req, res) => {
  try {
    const user = await usermodel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ status: false, message: "No User Found" });
    }
    res.status(200).json({
      success: true,
      user:{
      username: user.username,
      role: user.role,
      email: user.email,
      verified: user.verified,}
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};
export const UserSearch = async (req, res) => {
  try {
    const { username, useremail, userrole } = req.query;
    let filter = {};
    if (username) {
      filter.username = { $regex: username, $options: "i" };
    }
    if (useremail) {
      filter.email = { $regex: useremail, $options: "i" };
    }
    if (userrole) {
      filter.role = { $regex: userrole, $options: "i" };
    }
    const users = await usermodel.find(filter);
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const user = await usermodel.find();
    if (!user)
      return res.status(400).json({
        success: false,
        messsage: "No User",
      });
    res.status(200).json({
      success: true,
      count: user.length,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usermodel.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User Found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const delUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usermodel.findByIdAndDelete(id);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "No User Found",
      });
    res.status(200).json({
      success: true,
      message: "User Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
