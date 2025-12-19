import { verifyToken } from "../config/jwt.config.js";
import userModel from "../models/user.model.js";

export async function authOnlyUser(req, res, next) {
    let reqHeaders = req.headers.authorization;
    let token = reqHeaders.split(" ")[1];

    try {
        let decodeToken = verifyToken(token);
        let user = await userModel.findOne({ _id: decodeToken.id, role: decodeToken.role, isDeleted: false, isActive: true }).select("-password -__v");

        if (!user) {
            return res.status(401).json({ success: false, message: "Permission denied" })
        }

        user = user.toObject()

        req.user = user
        return next()
    } catch (error) {
        res.status(403).json({ success: false, message: "invalid or expire Token", error })
    }

}