interface CreateUserDTO {
    name: string
    email: string
    password: string
}

interface LoginUserDTO {
    email: string
    password: string
}

interface UpdateUserDTO {
    name?: string
    email?: string
    password?: string
}

interface CreateUserResponse {
    id: string
    name: string
    email: string
}