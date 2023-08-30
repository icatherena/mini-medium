import { PrismaClient } from "@prisma/client";
import { PostRepository } from "./post.repository";
import { CreatePostDTO, PostDTO } from "../dto";

export class PostRepositoryImpl implements PostRepository {
    constructor(private readonly db: PrismaClient) {}

    async create (authorId: string, data: CreatePostDTO): Promise<PostDTO> {
        const post = await this.db.post.create({
            data: {
                authorId,
                ...data
            }
        })
        return new PostDTO(post)
    }

    async delete (id: string): Promise<void> {
        await this.db.post.deleteMany({
            where: {
                id
            }
        })
    }

    async getAll (): Promise<PostDTO[]> {
        const posts = await this.db.post.findMany({
            take: 10,
            orderBy: {
                createdAt: 'desc',
            },
        })
        return posts.map((post: PostDTO) => new PostDTO(post))
    }

    async getById (id: string): Promise<PostDTO|null> {
        const post = await this.db.post.findUnique({
            where: {
                id
            },
        })
        return post ? new PostDTO(post) : null
    }

    async getByAuthorId (authorId: string): Promise<PostDTO[]> {
        const posts = await this.db.post.findMany({
            where: {
                authorId
            },
        })
        return posts.map((post: PostDTO) => new PostDTO(post))
    }
}