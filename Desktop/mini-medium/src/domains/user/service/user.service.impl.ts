import { UserDTO } from "../dto";
import { UserRepository } from "../repository";
import { UserService } from "./user.service";

export class UserServiceImpl implements UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async getUser (userId: string): Promise<UserDTO> {
        console.log("userId Service:", userId)
        const user = await this.userRepository.getById(userId)
        if (user) {
            return user
        } else {
            throw new Error('User not found')
        }
    }

    async getAllUsers (): Promise<UserDTO[]> {
        const users = await this.userRepository.getAllUsers()
        if (users.length > 0) {
            return users
        } else {
            throw new Error('Have not found any users yet. Try again later')
        }
    }

    async updateUser (userId: string, data: UserDTO): Promise<UserDTO> {
        const user = await this.userRepository.getById(userId)
        const update = await this.userRepository.update(userId, data)
        if (user) {
            return update
        } else {
            throw new Error('User not found')
        }
    }
}