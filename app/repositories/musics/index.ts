import { PrismaClient, Music } from '@prisma/client'

export class MusicsRepository {
	private prisma: PrismaClient

	private static instance: MusicsRepository

	public static getInstance(prisma: PrismaClient) {
		if (!this.instance) {
			this.instance = new MusicsRepository(prisma)
		}
		return this.instance
	}

	private constructor(prisma: PrismaClient) {
		this.prisma = prisma
	}

	public async findOneBySongAndArtistName(data: findOneBySongAndArtistNameDTO): Promise<Music | null> {
		return await this.prisma.music.findFirst({
			where: {
				title: data.songName,
				artist: data.artistName
			},
		})
	}

	public async create(data: createDTO): Promise<Music> {
		return await this.prisma.music.create({
			data: {
				title: data.songName,
				artist: data.artistName,
			},
		})
	}

	public async findOneById(musicId: string): Promise<Music | null> {
		return await this.prisma.music.findFirst({
			where: {
				id: musicId
			}
		})
	}

}


