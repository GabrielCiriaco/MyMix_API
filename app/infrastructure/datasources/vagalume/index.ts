import { logger } from '@/infrastructure/logger'

class Vagalume {
	private baseUrl: string
	private API_KEY: string

	constructor() {
		this.baseUrl = process.env.VAGALUME_URL
		this.API_KEY = process.env.VAGALUME_API_KEY
	}

	async getMusics(data: GetMusicDTO): Promise<GetMusicResponse> {
		logger.info(`Searching for music ${data.songName} by ${data.artistName}`)
		const url =  `${this.baseUrl}search.php?art=${data.artistName}&mus=${data.songName}&extra=relmus,relart&apikey=${this.API_KEY}`
		const response = await fetch(url)
		const responseJson = await response.json() as Dados

		logger.info(`Response from Vagalume API: ${JSON.stringify(responseJson)}`)


		logger.info(`Music ${data.songName} by ${data.artistName} found in Vagalume API`)
		return {
			artistName: responseJson.art.name,
			songName: responseJson.mus[0]?.name,
			lyrics: responseJson.mus[0]?.text,
		} as GetMusicResponse
	}
}

export default Vagalume