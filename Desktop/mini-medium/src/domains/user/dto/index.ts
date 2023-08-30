export class UserDTO {
    constructor(user: UserDTO) {
        this.id = user.id
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.email = user.email
        this.password = user.password
        this.createdAt = user.createdAt
    }
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    createdAt: Date
}

export class ExtendedUserDTO extends UserDTO {
    constructor(user: ExtendedUserDTO) {
        super(user)
        this.email = user.email
        this.password = user.password
    }
    email: string
    password: string
}