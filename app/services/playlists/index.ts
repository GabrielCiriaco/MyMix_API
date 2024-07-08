import { logger } from '@/infrastructure/logger'
import { FavoritesPlaylistRepository } from '@/repositories/playlists'
import { FavoritesPlaylist, Music } from '@prisma/client'
import { MusicsService } from '@/services/musics'
import { PlaylistMusicNotFoundError } from './errors'


export class PlaylistsService {
	private playlistsRepository: FavoritesPlaylistRepository
	private musicsService: MusicsService
	private static instance: PlaylistsService

	public static getInstance(
		playlistsRepository: FavoritesPlaylistRepository,
		musicsService: MusicsService
	) {
		if (!this.instance) {
			this.instance = new PlaylistsService(
				playlistsRepository,
				musicsService
			)
		}
		return this.instance
	}

	private constructor(
		playlistsRepository: FavoritesPlaylistRepository,
		musicsSevice: MusicsService
	) {
		this.playlistsRepository = playlistsRepository
		this.musicsService = musicsSevice
	}


	public async findManyByUserId(userId: string): Promise<Music[]> {
		const playlist =  await this.playlistsRepository.findManyByUserId(userId)
	
		return playlist.map(item => item.music)
	}

	public async addSongToAUserPlaylist(data: addSongToPlaylistDTO): Promise<FavoritesPlaylist> {
		const favoritesUserPlaylist = await this.playlistsRepository.findManyByUserId(data.userId)

		const isMusicAlreadyExistsInPlaylist = favoritesUserPlaylist.find(
			favoritesMusic => favoritesMusic.music.id === data.musicId
		)
		if (isMusicAlreadyExistsInPlaylist) {
			logger.warn('This Music already exists in playlist')
			return {
				id: isMusicAlreadyExistsInPlaylist.id,
				userId: isMusicAlreadyExistsInPlaylist.userId,
				musicId: isMusicAlreadyExistsInPlaylist.music.id
			}
		}

		return await this.playlistsRepository.addSongToAUserPlaylist({
			userId: data.userId,
			musicId: data.musicId
		})
	}

	public async removeSongFromUserPlaylist(data: removeSongFromPlaylistDTO): Promise<FavoritesPlaylist> {
		const music = await this.musicsService.findOneById(data.musicId)
		if (!music) {
			throw new PlaylistMusicNotFoundError()
		}
		return await this.playlistsRepository.removeSongFromUserPlaylist(data)
	}

}
