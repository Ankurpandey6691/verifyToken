import express from 'express';
import { authOnlyUser } from '../middleware/auth.js';
import { deleteUser, getSingleUser, updateUser, uploadDp } from '../controller/userController.js';
import { updateUserValidator } from '../validators/user.validator.js';
import validate from '../middleware/validate.js';
import { imageUpload } from '../config/multer.config.js';

const router = express.Router();

router.use("/", authOnlyUser);

router.get("/me", getSingleUser);

router.patch("/", updateUserValidator, validate, updateUser)

router.patch("/upload-dp", imageUpload.single("profile_pic"), uploadDp)

router.delete("/",deleteUser)

export default router;
