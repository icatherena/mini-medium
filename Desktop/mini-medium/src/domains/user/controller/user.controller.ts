import { Request, Response, Router } from "express";
import { UserService, UserServiceImpl } from "../service";
import { UserRepositoryImpl } from "../repository";
import { db } from "@utils";
import httpStatus from "http-status";

export const userRouter = Router()

const UserService = new UserServiceImpl(
    new UserRepositoryImpl(db)
)

userRouter.get('/me', async (req: Request, res: Response) => {
    const { userId } = res.locals.context
    console.log("userId controller:", userId)
    const user = await UserService.getUser(userId)
    return res.status(httpStatus.OK).json(user)
})

userRouter.get('/:userId', async (req: Request, res: Response) => {
    const { userId: otherUserId } = req.params
    const user = await UserService.getUser(otherUserId)
    return res.status(httpStatus.OK).json(user)
})

userRouter.get('/', async (req: Request, res: Response) => {
    const users = await UserService.getAllUsers()
    return res.status(httpStatus.OK).json(users)
})

userRouter.put('/me', async (req: Request, res: Response) => {
    const { userId } = res.locals.context
    const data = req.body
    const user = await UserService.updateUser(userId, data)
    return res.status(httpStatus.OK).json(user)
})
