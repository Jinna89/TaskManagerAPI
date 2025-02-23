import { JWT_EXPIRE_TIME, JWT_KEY } from "../config/config.js";
import jwt from "jsonwebtoken";

export const TokenEncode = (email, user_id) =>{
    const KEY = JWT_KEY
    const EXPIRE = JWT_EXPIRE_TIME
    const payload = {
        email,
        user_id,
    }
    return jwt.sign(payload, KEY, { expiresIn: EXPIRE })
}

export const TokenDecode = (token) => {
    try {
        const KEY = JWT_KEY
        const decoded = jwt.verify(token, KEY)
        return decoded
    } catch (error) {
        return null
    }
}