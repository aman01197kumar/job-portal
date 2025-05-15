import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") {
      cb(null, "uploads/user_profile_imgs/");
    } else if (file.fieldname === "resume") {
      cb(null, "uploads/resume/");
    } else {
      cb(new Error("Unexpected field"));
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });
