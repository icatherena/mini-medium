import { IsEmail, IsNotEmpty, IsString, IsStrongPassword} from 'class-validator'

export class TokenDTO {
    token!: string
}

export class SignUpDTO {
    @IsString()
    @IsNotEmpty()
        firstName: string

    @IsString()
    @IsNotEmpty()    
        lastName: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
        email: string

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
        password: string

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
    }
}

export class SignInDTO {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
        email!: string

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
        password!: string
}