import JWT from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET

// generate jwt token 
export function generateToken(data) {
    try {
        return JWT.sign(data, tokenSecret, { expiresIn: "1h" })
    } catch (error) {
        throw new Error(error.message)
    }
}

// verify or decode token
export function verifyToken(token) {
    try {
        return JWT.verify(token, tokenSecret)
    } catch (error) {
        throw new Error(error)
    }
}