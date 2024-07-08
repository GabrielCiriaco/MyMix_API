import { prisma } from '@/infrastructure/datasources/databases/prisma'
import { MusicsRepository } from '@/repositories/musics'

class MakeMusicsRepository {
	private constructor() {}

	public static execute(): MusicsRepository {
		return MusicsRepository.getInstance(prisma)
	}
}

export default MakeMusicsRepository.execute()
