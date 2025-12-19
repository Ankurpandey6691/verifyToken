import bcrypt from "bcrypt"
const saltRound = 12;

export async function hashPassword(password) {
    try {
        return await bcrypt.hash(password, saltRound);
    } catch (error) {
        throw new Error(error.message)
    }
}


export async function verifyPassword(password, hash) {
    try {
        return await bcrypt.compare(password, hash)
    } catch (error) {
        throw new Error(error.message)
    }
}