import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'

export const isAuthenticated = async (req, res, next) => {
    try {
        //to get coockis from the request
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Please login first" })
        }
        //to verify the jwt token , it will compare with token and jwt.env.jwt_secret key . if matches then it will return the decoded id and user_id from payload
        const decoded = jwt.verify(token, process.env.jwt_secret)

        const user = await User.findById(decoded.userId).select("-password") //when we login again , we will get whole user 

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