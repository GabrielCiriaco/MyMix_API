import Vagalume from '@/infrastructure/datasources/vagalume'
import { logger } from '@/infrastructure/logger'
import { MusicsRepository } from '@/repositories/musics'
import { Music } from '@prisma/client'


export class MusicsService {
	private musicsRepository: MusicsRepository
	private vagalumeWrapper: Vagalume
	private static instance: MusicsService

	public static getInstance(
		musicRepository: MusicsRepository,
		vagalumeWrapper: Vagalume
	) {
		if (!this.instance) {
			this.instance = new MusicsService(
				musicRepository,
				vagalumeWrapper
			)
		}
		return this.instance
	}

	private constructor(
		musicsRepository: MusicsRepository,
		vagalumeWrapper: Vagalume
	) {
		this.musicsRepository = musicsRepository
		this.vagalumeWrapper = vagalumeWrapper
	}

	public async findOneBySongAndArtistName(data: findOneBySongAndArtistNameDTO): Promise<Music | null> {
		logger.info(`Searching for music ${data.songName} by ${data.artistName}`)
		const isMusicAlreadyExistsInDatabase = await this.musicsRepository.findOneBySongAndArtistName({
			artistName: data.artistName.toLocaleLowerCase(),
			songName: data.songName.toLocaleLowerCase()
		})
		if (isMusicAlreadyExistsInDatabase) {
			logger.info(`Music ${data.songName} by ${data.artistName} already exists in database`)
			return isMusicAlreadyExistsInDatabase
		}

		logger.info(`Music ${data.songName} by ${data.artistName} does not exist in database`)
		const vagalumeMusic = await this.vagalumeWrapper.getMusics({
			artistName: data.artistName,
			songName: data.songName
		})

		const isMusicNormalizedFromVagalumeExistsInDatabase = await this.musicsRepository.findOneBySongAndArtistName({
			artistName: vagalumeMusic.artistName.toLocaleLowerCase(),
			songName: vagalumeMusic.songName.toLocaleLowerCase()
		})

		if (isMusicNormalizedFromVagalumeExistsInDatabase) {
			logger.info(`Music ${vagalumeMusic.songName} by ${vagalumeMusic.artistName} already exists in database`)
			return isMusicNormalizedFromVagalumeExistsInDatabase
		}

		logger.info(`Creating music ${vagalumeMusic.songName} by ${vagalumeMusic.artistName} in database`)
		return await this.musicsRepository.create({
			artistName: vagalumeMusic.artistName.toLocaleLowerCase(),
			songName: vagalumeMusic.songName.toLocaleLowerCase(),
		})
	}

	public async findOneById(musicId: string): Promise<Music | null> {
		return await this.musicsRepository.findOneById(musicId)
	}
}
