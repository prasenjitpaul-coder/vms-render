import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "visitors-photo",
    format: async (req, file) => "png",
    public_id: (req, file) =>
      file.originalname.split(".")[0].replace(/\s+/g, "_") + "-" + Date.now(),
  },
});

const upload = multer({ storage });

export default upload;
