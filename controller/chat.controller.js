import chatModel from "../models/chat.model.js"
import MessageModel from "../models/message.model.js"
import userModel from "../models/user.model.js"
import { getIo } from "../webSocket/socket.js";


// one and one chat option created-
export const accessChat = async (req, res) => {
    const { receiverId } = req.body;
    const myId = req.user._id;
    try {

        if (!receiverId) {
            return res.status(400).json({ success: false, data: null, message: "receiverId required" });
        }

        let receiver = await userModel.findById(receiverId).select("user_name email profile_pic bio mobile");
        receiver = receiver.toObject();

        let chat = await chatModel.findOne({
            isGroup: false,
            members: { $all: [myId, receiverId], $size: 2 },
        }).populate("members last_message");


        if (chat) {
            chat = chat.toObject();
            chat.receiver = receiver;
            return res.status(200).json({ success: true, data: chat, message: "success" });
        }

        let newChat = await chatModel.create({
            members: [myId, receiverId],
        });
        newChat = newChat.toObject();

        newChat.receiver = receiver;
        res.status(201).json({ success: true, data: newChat, message: "success" });

    } catch (error) {
        res.status(500).json({ success: false, data: null, message: error.message });
    }
};


/**
 * Get My Chats
 */
export const getMyChats = async (req, res) => {
    try {
        const chats = await chatModel.find({
            members: req.user._id,
        })
            .populate("members last_message")
            .sort({ updatedAt: -1 });

        res.json({ success: true, data: chats, message: "success" });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: error.message });
    }
};


/**
 * Create Group Chat
 */
export const createGroupChat = async (req, res) => {
    const { members, groupName } = req.body;

    if (!members || members.length < 2) {
        return res.status(400).json({ success: false, data: null, message: "At least 2 users required" });
    }

    try {

        const groupChat = await chatModel.create({
            members: [...members, req.user._id],
            isGroup: true,
            group_name: groupName,
            group_admin: req.user._id,
        });

        res.status(201).json({ success: true, data: groupChat, message: "group created" });

    } catch (error) {
        res.status(500).json({ success: false, data: null, message: error.message });
    }
};


/**
 * Get Messages of a Chat
 */
export const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await MessageModel.find({ chatId })
            .limit(100)
            .sort({ createdAt: 1 })
            .populate("sender", "user_name email");

        res.json({ success: true, data: messages, message: "success" });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: error.message });
    }
};


/**
 * Send Messagea
 */
export const sendMessage = async (req, res) => {
    const { chatId, message } = req.body;

    try {

        let getMessage = await MessageModel.create({
            chatId,
            sender: req.user._id,
            message,
        });

        getMessage = getMessage.toObject();

        getMessage.sender = req.user

        await chatModel.findByIdAndUpdate(chatId, {
            last_message: getMessage._id,
        });

        let io = getIo();

        io.to(chatId).emit("newMessage", getMessage);

        res.status(201).json({ success: true, data: getMessage, message: "message Sent" });

    } catch (error) {
        res.status(500).json({ success: false, data: null, message: error.message });
    }
};
