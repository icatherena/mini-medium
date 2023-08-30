import { SignUpDTO } from "@domains/auth/dto";
import { ExtendedUserDTO, UserDTO } from "../dto";

export interface UserRepository {
    create: (data: SignUpDTO) => Promise<UserDTO>
    getById: (userId: string) => Promise<UserDTO|null>
    getByEmail: (email: string) => Promise<ExtendedUserDTO|null>
    getAllUsers: () => Promise<UserDTO[]>
    update: (userId: string, data: UserDTO) => Promise<UserDTO>
}