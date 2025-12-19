import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI || "";

export default async function DbConnect() {
    try {
        let con = await connect(uri);
        if (con) console.log('Connected successfully to DB server');
    } catch (error) {
        console.log(error);
    }
}