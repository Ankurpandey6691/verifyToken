import express from 'express';
import { loginUser, registerUser } from '../controller/userController.js';
import { createUserValidator } from '../validators/user.validator.js';
import validate from '../middleware/validate.js';
const router = express.Router();

router.post("/register",createUserValidator,validate, registerUser)
router.post("/login", loginUser)

export default router;
