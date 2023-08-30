import { PostService } from "./post.service";
import { PostRepository } from "../repository";
import { CreatePostDTO, PostDTO } from "../dto";
import { validate } from "class-validator";
import { ForbiddenException, NotFoundException } from "@utils";
import { UserRepository } from "@domains/user/repository";

export class PostServiceImpl implements PostService {
    constructor(
        private readonly postRepository: PostRepository,
        private readonly userRepository: UserRepository
    ) {}

    async createPost (authorId: string, data: CreatePostDTO): Promise<PostDTO> {
        validate(data)
        const post = await this.postRepository.create(authorId, data)
        return post
    }

    async deletePost (id: string, userId: string): Promise<void> {
        const post = await this.postRepository.getById(id)
        if (post) {
            if (post?.authorId == userId) {
                await this.postRepository.delete(id)
            } else {
                throw new ForbiddenException()
            }
        } else {
            throw new NotFoundException('post')
        }
    }

    async getPostById (id: string): Promise<PostDTO> {
        const post = await this.postRepository.getById(id)
        if (post) {
            return post
        } else {
            throw new NotFoundException('post')
        }
    }

    async getPostsByAuthorId (authorId: string): Promise<PostDTO[]> {
        const author = await this.userRepository.getById(authorId)
        const posts = await this.postRepository.getByAuthorId(authorId)

        if (author) {
            if (posts.length > 0) {
                return posts
            } else {
                throw new Error('Have not found any post yet. Try again later')
            }
        } else {
            throw new NotFoundException('author')
        }
    }

    async getPosts (): Promise<PostDTO[]> {
        const posts = await this.postRepository.getAll()
        if (posts.length > 0) {
            return posts
        } else {
            throw new Error('Oops! Have not found any post yet. Try again later!')
        }
    }
}