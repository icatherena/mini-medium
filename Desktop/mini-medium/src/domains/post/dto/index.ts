import { IsNotEmpty, IsString } from "class-validator"

export class PostDTO {
    constructor(post: PostDTO) {
        this.id = post.id
        this.authorId = post.authorId
        this.title = post.title
        this.content = post.content
        this.createdAt = post.createdAt
    }
    id: string
    authorId: string
    title: string
    content: string
    createdAt: Date
}

export class CreatePostDTO {
    @IsString()
    @IsNotEmpty()
        title!: string

    @IsString()
    @IsNotEmpty()        
        content!: string
    
    constructor(
        title: string,
        content: string
    ) {
        this.title = title
        this.content = content
    }
}