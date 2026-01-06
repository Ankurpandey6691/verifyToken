import multer from "multer";

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "profile_pic") {
            cb(null, "uploads/images/profiles/");
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + req.user.user_name + "_" + "." + file.mimetype.split("/")[1])
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images allowed"));
    }
}

export const imageUpload = multer({ storage: imageStorage, fileFilter, limits: 1024 * 1024 * 2 });

