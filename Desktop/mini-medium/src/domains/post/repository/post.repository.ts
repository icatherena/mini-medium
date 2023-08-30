import { CreatePostDTO, PostDTO } from "../dto"

export interface PostRepository {
    create: (authorId: string, data: CreatePostDTO) => Promise<PostDTO>
    delete: (id: string) => Promise<void>
    getAll: () => Promise<PostDTO[]>
    getById: (id: string) => Promise<PostDTO|null>
    getByAuthorId: (authorId: string) => Promise<PostDTO[]>
}