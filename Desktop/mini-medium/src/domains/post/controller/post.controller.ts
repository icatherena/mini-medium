import { Request, Response, Router } from "express";
import { PostService, PostServiceImpl } from "../service";
import { PostRepositoryImpl } from "../repository";
import { BodyValidation, db } from "@utils";
import { UserRepositoryImpl } from "@domains/user/repository";
import { CreatePostDTO } from "../dto";
import HttpStatus from "http-status";

export const postRouter = Router()

const PostService = new PostServiceImpl(
    new PostRepositoryImpl(db),
    new UserRepositoryImpl(db)
)

postRouter.post('/', BodyValidation(CreatePostDTO), async (req: Request, res: Response) => {
    const { userId } = res.locals.context
    const data = req.body
    const post = await PostService.createPost(userId, data)
    return res.status(HttpStatus.CREATED).json(post)
})
postRouter.get('/', async (req: Request, res: Response) => {
    const posts = await PostService.getPosts()
    return res.status(HttpStatus.OK).json(posts)
})

postRouter.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const post = await PostService.getPostById(id)
    return res.status(HttpStatus.OK).json(post)
})

postRouter.get('/author/:userId', async (req: Request, res: Response) => {
    const {userId: authorId} = req.params
    const posts = await PostService.getPostsByAuthorId(authorId)
    return res.status(HttpStatus.OK).json(posts)
})

postRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const { userId } = res.locals.context
    await PostService.deletePost(id, userId)
    return res.status(HttpStatus.OK).send(`Deleted post ${id}`)
})