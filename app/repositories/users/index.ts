import { PrismaClient, User } from '@prisma/client'

export class UsersRepository {
	private prisma: PrismaClient

	private static instance: UsersRepository

	public static getInstance(prisma: PrismaClient) {
		if (!this.instance) {
			this.instance = new UsersRepository(prisma)
		}
		return this.instance
	}

	private constructor(prisma: PrismaClient) {
		this.prisma = prisma
	}

	public async createUser(data: CreateUserDTO): Promise<User> {
		return this.prisma.user.create({ data })
	}

	public async findUserById(id: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { id } })
	}

	public async findUserByEmail(email: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { email } })
	}

	public async login(data: LoginUserDTO): Promise<User | null> {
		return this.prisma.user.findFirst(
			{
				where: {
					...data
				}
			}
		)
	}

	public async deleteUser(id: string): Promise<User | null> {
		return this.prisma.user.delete({ where: { id } })
	}

	public async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
		return this.prisma.user.update({ where: { id }, data })
	}
}


