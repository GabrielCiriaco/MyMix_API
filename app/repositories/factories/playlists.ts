import { prisma } from '@/infrastructure/datasources/databases/prisma'
import { FavoritesPlaylistRepository } from '@/repositories/playlists'

class MakeFavoritesPlaylistRepositoryRepository {
	private constructor() {}

	public static execute(): FavoritesPlaylistRepository {
		return FavoritesPlaylistRepository.getInstance(prisma)
	}
}

export default MakeFavoritesPlaylistRepositoryRepository.execute()
