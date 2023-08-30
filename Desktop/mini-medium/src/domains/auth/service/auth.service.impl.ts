import { UserRepository } from "@domains/user/repository";
import { AuthService } from "./auth.service";
import { SignInDTO, SignUpDTO, TokenDTO } from "../dto";
import { ConflictException, NotFoundException, UnauthorizedException, checkPassword, encryptPassword, generateAccessToken } from "@utils";

export class AuthServiceImpl implements AuthService {
    constructor(private readonly userRepository: UserRepository) {}

    async signUp (data: SignUpDTO): Promise<TokenDTO> {
        const existingUser = await this.userRepository.getByEmail(data.email)
        
        if (existingUser) {
            throw new ConflictException('USER_ALREADY_EXISTS')
        } else {
        const encryptedPassword = await encryptPassword(data.password)
    
        const user = await this.userRepository.create({ ...data, password: encryptedPassword })
        const token = generateAccessToken({ userId: user.id })
    
        return { token }
        }
    }
    
    async signIn (data: SignInDTO): Promise<TokenDTO> {
        const user = await this.userRepository.getByEmail(data.email)
        
        if (user) {
            const isCorrectPassword = await checkPassword(data.password, user.password)
            console.log("UserId Auth", user.id)
            if (isCorrectPassword) {
                const token = generateAccessToken({ userId: user.id })
                return { token }
            } else {
                throw new UnauthorizedException('INCORRECT_PASSWORD')
            } 
        } else {
            throw new NotFoundException('user')
        }
    }

}