import express from 'express';
import { authOnlyUser } from '../middleware/auth.js';
import { deleteUser, getSingleUser, updateUser } from '../controller/userController.js';
import { updateUserValidator } from '../validators/user.validator.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.use("/", authOnlyUser);

router.get("/me", getSingleUser);

router.patch("/", updateUserValidator, validate, updateUser)

router.delete("/",deleteUser)

export default router;
