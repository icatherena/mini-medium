import { Request, Response, Router } from "express";
import { AuthService, AuthServiceImpl } from "../service";
import { UserRepositoryImpl } from "@domains/user/repository";
import { BodyValidation, db } from "@utils";
import httpStatus from "http-status";
import { SignInDTO, SignUpDTO } from "../dto";

export const authRouter = Router()

const AuthService = new AuthServiceImpl(new UserRepositoryImpl(db))

authRouter.post('/signup', BodyValidation(SignUpDTO), async (req: Request, res: Response) => {
    const data = req.body
    const token = await AuthService.signUp(data)
    res.status(httpStatus.CREATED).json(token)
})

authRouter.post('/signin', BodyValidation(SignInDTO), async (req: Request, res: Response) => {
    const data = req.body
    const token = await AuthService.signIn(data)
    res.status(httpStatus.OK).json(token)
})