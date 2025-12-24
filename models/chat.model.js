import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    isGroup: {
        type: Boolean,
        default: false
    },
    group_name: {
        type: String,
        trim: true,
    },
    group_icon: {
        type: String,
        trim: true,
    },
    group_admin: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },

    last_message: {
        type: Schema.Types.ObjectId,
        ref: "messages"
    },
    // unread count per user
    unreadCounts: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: "users",
            },
            count: {
                type: Number,
                default: 0,
            },
        },
    ],


}, { timestamps: true });

export default model("chats", chatSchema);