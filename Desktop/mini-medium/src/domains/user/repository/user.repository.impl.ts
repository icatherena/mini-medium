import { SignUpDTO } from "@domains/auth/dto";
import { ExtendedUserDTO, UserDTO } from "../dto";
import { UserRepository } from "./user.repository";
import { PrismaClient } from "@prisma/client";

export class UserRepositoryImpl implements UserRepository {
    constructor (private readonly db: PrismaClient) {}

    async create (data: SignUpDTO): Promise<UserDTO> {
        const user = await this.db.user.create({
            data,
        })
        return new UserDTO(user)
    }

    async getById (userId: string): Promise<UserDTO|null> {
        console.log("userId Repository:", userId)
        const user = await this.db.user.findUnique({
            where: {
                id: userId,
            },
        })
        return user ? new UserDTO(user) : null
    }

    async getByEmail (email: string): Promise<ExtendedUserDTO|null> {
        const user = await this.db.user.findUnique({
            where: {
                email,
            },
        })
        return user ? new ExtendedUserDTO(user) : null
    }

    async getAllUsers (): Promise<UserDTO[]> {
        const users = await this.db.user.findMany({
            take: 10,
            orderBy: {
                createdAt: 'desc',
            },
        })
        return users.map((user: UserDTO) => new UserDTO(user))
    }

    async update (userId: string, data: UserDTO): Promise<UserDTO> {
        const user = await this.db.user.update({
            where: {
                id: userId,
            },
            data,
        })
        return new UserDTO(user)
    }

}