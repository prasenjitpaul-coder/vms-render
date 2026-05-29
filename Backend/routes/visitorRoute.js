import { visitor } from "../controller/visitorController.js";

import express from "express";
import upload from "../utils/upload.js";

const route = express.Router();

route.post("/upload", upload.single("photo"), visitor);

export default route;