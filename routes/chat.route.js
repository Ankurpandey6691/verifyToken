import express from 'express';
import { authOnlyUser } from '../middleware/auth.js';
import { accessChat, createGroupChat, getMessages, getMyChats, sendMessage } from '../controller/chat.controller.js';

const router = express.Router();

router.use("/", authOnlyUser);

router.get("/", getMyChats);

router.post("/access", accessChat);

router.post("/send-message", sendMessage);

router.get("/my-messages/:chatId", getMessages);

router.post("/create-group" , createGroupChat);

export default router;
