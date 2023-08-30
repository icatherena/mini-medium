import { CreatePostDTO, PostDTO } from "../dto"

export interface PostService {
    createPost: (authorId: string, data: CreatePostDTO) => Promise<PostDTO>
    deletePost: (id: string, userId: string) => Promise<void>
    getPostById: (id: string) => Promise<PostDTO>
    getPostsByAuthorId: (authorId: string) => Promise<PostDTO[]>
    getPosts: () => Promise<PostDTO[]>
}