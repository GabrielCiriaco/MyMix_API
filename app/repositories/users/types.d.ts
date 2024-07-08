interface LoginUserDTO {
    email: string
    password: string
}

interface CreateUserDTO {
    email: string
    password: string
    name: string
}

interface UpdateUserDTO {
    email?: string
    password?: string
    name?: string
}