import { Router } from "express"
import { protect } from "../middleware/authMiddleware.js"
import { deleteUser, getUser, getUsers, loginUser, logOutUser, registerUser, updateUser } from "../controllers/user.controller.js"
const userRouter = Router()


userRouter.route('/all')
    .get( getUsers )
    .delete (deleteUser)
    .put(updateUser)

userRouter.route('/')
    .get( protect, getUsers )
    .post( registerUser )

userRouter.route('/logins')
    .post (getUser)

userRouter.route('/login')
    .post( loginUser )

userRouter.route('/logout')
    .post( logOutUser )

export default userRouter