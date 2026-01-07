import { hashPassword, verifyPassword } from "../config/bcrypt.config.js";
import { generateToken } from "../config/jwt.config.js";
import userModel from "../models/user.model.js";
import fs from "fs";

// login user api
export async function loginUser(req, res, next) {
    let { user_name, password } = req.body;
    try {
        let user = await userModel.findOne({ $or: [{ email: user_name }, { mobile: user_name }] });

        if (!user) {
            return res.status(404).json({ success: true, data: null, message: "No user found" });
        }

        if (!user.isActive && user.isDeleted) {
            return res.status(404).json({ success: false, message: "Your Account is Deleted or Deactived Please contact Admin" });
        }

        let match = await verifyPassword(password, user.password);

        if (!match) {
            return res.status(403).json({ success: true, data: null, message: "Incorrect password" });
        }

        let token = generateToken({ id: user._id, role: user.role, mobile: user.mobile });

        user = user.toObject();

        user.token = token;

        delete user.password;
        delete user.__v;

        res.cookie("login-token", token, {
            secure: true,
            isHttpOnly: true
        })

        res.status(200).json({ success: true, data: user, message: "login success" })

    } catch (error) {
        res.status(500).json({ success: false, data: null, message: error.message })
    }
}

// register user api
export async function registerUser(req, res, next) {
    let { password } = req.body;
    try {
        let hashPass = await hashPassword(password);

        let data = await userModel.create({ ...req.body, password: hashPass });
        data = data.toObject();

        if (data) {

            delete data.password;
            delete data.__v;

            res.status(200).json({ success: true, data, message: "success" })
        } else {
            res.status(404).json({ success: true, data, message: "user Not Added" })
        }
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: error.message })
    }
}

// get single user api by user id
export async function getSingleUser(req, res) {
    try {

        if (!req.user) {
            return res.status(404).json({ success: true, data: null, message: "No user found" });
        }

        res.status(200).json({ success: true, data: req.user, message: "success" })

    } catch (error) {
        res.status(500).json({ success: false, data: null, message: error.message })
    }
}


export async function updateUser(req, res) {

    try {
        let user = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true }).select("-password -__v");

        if (!user) {
            res.status(204).json({ success: false, user, message: "user not updated" })
        }

        res.status(200).json({ success: true, user, message: "user Updated" });

    } catch (error) {
        res.status(500).json({ success: false, data: null, message: error.message })
    }
}

export async function deleteUser(req, res, next) {
    try {
        let user = await userModel.findByIdAndUpdate(req.user._id, { isDeleted: true, isActive: false }, { new: true }).select("-password -__v");

        if (!user) {
            res.status(204).json({ success: false, user, message: "user not deleted" })
        }

        res.status(200).json({ success: true, user, message: "user Deleted" });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: error.message })
    }
}

export async function uploadDp(req, res) {

    try {
        const ImageUrl = `${req.protocol}://${req.host}/${req.file.destination}/${req.file.filename}`

        let user = await userModel.findByIdAndUpdate(req.user._id, { profile_pic: ImageUrl }, { new: true }).select("-password -__v");

        if (!user) {
            return res.status(204).json({ success: false, user, message: "profile picture not updated" });
        }

        if (req.user.profile_pic) {
            let index = req.user.profile_pic.indexOf("uploads");
            fs.rmSync(req.user.profile_pic.slice(index));
        }


        res.status(200).json({ success: true, user, message: "profile picture updated" });

    } catch (error) {
        res.status(500).json({ success: false, data: null, message: error.message })
    }
}