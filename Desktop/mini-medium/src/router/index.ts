import { Router } from 'express'
import { withAuth } from '@utils'

import { authRouter } from '@domains/auth'
import { postRouter } from '@domains/post'
import { userRouter } from '@domains/user'

export const router = Router()

router.use('/auth', authRouter)
router.use('/post', withAuth, postRouter)
router.use('/user', withAuth, userRouter)