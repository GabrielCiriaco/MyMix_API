import { prisma } from '@/infrastructure/datasources/databases/prisma'
import { UsersRepository } from '@/repositories/users'

class MakeUsersRepository {
	private constructor() {}

	public static execute(): UsersRepository {
		return UsersRepository.getInstance(prisma)
	}
}

export default MakeUsersRepository.execute()
