import { logger } from '@/infrastructure/logger'
import { UsersRepository } from '@/repositories/users'
import { User } from '@prisma/client'
import { AlreadyExistsError, NotFoundError, UnauthorizedError } from './errors'
import bcrypt from 'bcrypt'


export class UsersService {
	private usersRepository: UsersRepository
	private static instance: UsersService

	public static getInstance(usersRepository: UsersRepository) {
		if (!this.instance) {
			this.instance = new UsersService(usersRepository)
		}
		return this.instance
	}

	private constructor(usersRepository: UsersRepository) {
		this.usersRepository = usersRepository
	}
	
	public async createUser(data: CreateUserDTO): Promise<CreateUserResponse> {
		logger.info(`Creating user with email ${data.email}`)
		const hashedPassword = await bcrypt.hash(data.password, 10)

		const user = await this.usersRepository.findUserByEmail(data.email)
		if (user) {
			throw new AlreadyExistsError()
		}

		const newUser = await this.usersRepository.createUser({
			...data,
			password: hashedPassword,
		})
		
		return newUser as CreateUserResponse
	}

	public async loginUser(data: LoginUserDTO): Promise<User> {
		logger.info(`Logging in user with email ${data.email}`)
		const user = await this.usersRepository.findUserByEmail(data.email)
		if (!user) {
			throw new NotFoundError()
		}

		if (!user.password) {
			throw new UnauthorizedError()
		}

		const isPasswordValid = bcrypt.compare(data.password, user.password)
		if (!isPasswordValid) {
			throw new UnauthorizedError()
		}
		return user
	}

	public async updateUser(userId: string, data: UpdateUserDTO): Promise<User> {
		logger.info(`Updating user with ID ${userId}`)
		if (data.password) {
			const hashedPassword = await bcrypt.hash(data.password, 10)
			data.password = hashedPassword
		}
		const updatedUser = await this.usersRepository.updateUser(userId, data)
		if (!updatedUser) {
			throw new NotFoundError()
		}
		return updatedUser
	}

	public async getUserById(userId: string): Promise<User> {
		logger.info(`Getting user with ID ${userId}`)
		const user = await this.usersRepository.findUserById(userId)
		if (!user) {
			throw new NotFoundError()
		}
		return user
	}

	public async getUserByEmail(email: string): Promise<User> {
		logger.info(`Getting user with email ${email}`)
		const user = await this.usersRepository.findUserByEmail(email)
		if (!user) {
			throw new NotFoundError()
		}
		return user

	}

	public async deleteUser(userId: string): Promise<User> {
		logger.info(`Deleting user with ID ${userId}`)
		const deletedUser = await this.usersRepository.deleteUser(userId)
		if (!deletedUser) {
			throw new NotFoundError()
		}
		return deletedUser
	}
}
