import express from "express";
import { verifyrole, verifytoken } from "../middleware/verify.js";
import {
  getAllUser,
  getUserById,
  delUserById,
  UserSearch,
} from "../controller/userController.js";
getAllUser;
const route = express.Router();
route.get("/search",UserSearch)
route.get("/", getAllUser);
route.get("/:id",verifytoken, verifyrole("admin"), getUserById);
route.delete("/:id", delUserById);

export default route;
