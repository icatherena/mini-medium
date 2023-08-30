import { SignInDTO, SignUpDTO, TokenDTO } from "../dto";

export interface AuthService {
    signUp: (data: SignUpDTO) => Promise<TokenDTO>
    signIn: (data: SignInDTO) => Promise<TokenDTO>
}