import { PrismaClient, FavoritesPlaylist } from '@prisma/client'

export class FavoritesPlaylistRepository {
	private prisma: PrismaClient

	private static instance: FavoritesPlaylistRepository

	public static getInstance(prisma: PrismaClient) {
		if (!this.instance) {
			this.instance = new FavoritesPlaylistRepository(prisma)
		}
		return this.instance
	}

	private constructor(prisma: PrismaClient) {
		this.prisma = prisma
	}

	public async findManyByUserId(userId: string) {
		return await this.prisma.favoritesPlaylist.findMany({
			where: {
				userId: userId
			},
			select:{
				music: true,
				id: true,
				userId: true,
			}
		})
	}

	public async addSongToAUserPlaylist(data: addSongToPlaylistDTO): Promise<FavoritesPlaylist> {
		return await this.prisma.favoritesPlaylist.create({
			data: {
				userId: data.userId,
				musicId: data.musicId
			}
		})
	}

	public async removeSongFromUserPlaylist(data: removeSongFromPlaylistDTO): Promise<FavoritesPlaylist> {
		return await this.prisma.favoritesPlaylist.delete({
			where: {
				userId_musicId: {
					userId: data.userId,
					musicId: data.musicId
				}
			}
		})
	}

}


