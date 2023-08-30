import { UserDTO } from "../dto"

export interface UserService {
    getUser: (userId: string) => Promise<UserDTO>
    getAllUsers: () => Promise<UserDTO[]>
    updateUser: (userId: string, data: UserDTO) => Promise<UserDTO>
}