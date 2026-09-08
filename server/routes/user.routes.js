import express from "express"

import { registerUser, loginUser, getProfile, logoutUser, changePassword } from "../controllers/user.controllers.js"
import { isAuthenticated } from "../middleware/Authmiddleware.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', logoutUser)
userRouter.post('/change-password', isAuthenticated, changePassword)
userRouter.get('/me', isAuthenticated, getProfile)

export default userRouter