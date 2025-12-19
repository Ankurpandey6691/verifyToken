import { Schema, model } from "mongoose";

const userSchema = new Schema({
    user_name: {
        type: String,
        required: [true, "User Name is Required"],
        trim: true,
        lowerCase: true,
        minLength: [2, "Invalid Name"],
        maxLength: [32, "Invalid Name"]
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
            },
            message: props => `${props.value} is not a valid email`
        },
        required: [true, "email Id is required"],
        unique: true
    },
    mobile: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /(0|91)?[6-9][0-9]{9}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },

        required: [true, "mobile is required"],
    },
    date_of_birth: {
        type: Date,
        default: null
    },
    password: {
        type: String,
        required: [true, "password must required"],
    },
    address: {
        type: String,
        trim: true,
        default: ""
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: '{VALUE} is not supported'
        }
    },
    profile_pic: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        trim: true,
        maxLength: [100, "Maximum limit exceed"],
        default: "Hi there I am Using Chat app"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const userModel = model("users", userSchema);

export default userModel;