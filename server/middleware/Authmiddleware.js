import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Please login first" })
        }

        const decoded = jwt.verify(token, process.env.jwt_secret)

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        req.user = user

        next()

    }
    catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}