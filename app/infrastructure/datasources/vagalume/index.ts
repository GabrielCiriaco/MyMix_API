import { logger } from '@/infrastructure/logger'
import { NotFoundMusicError } from './errors'

class Vagalume {
	private baseUrl: string
	private API_KEY: string

	constructor() {
		this.baseUrl = process.env.VAGALUME_URL
		this.API_KEY = process.env.VAGALUME_API_KEY
	}

	async getMusics(data: GetMusicDTO): Promise<GetMusicResponse> {
		logger.info(`Searching for music ${data.songName} by ${data.artistName}`)
		const url = `${this.baseUrl}search.artmus?apikey=${encodeURIComponent(this.API_KEY)}&q=${encodeURIComponent(data.artistName + data.songName)}&limit=3`
		const response = await fetch(url)
		const responseJson = await response.json() as ApiResponse

		logger.info(`Response from Vagalume API: ${JSON.stringify(responseJson)}`)

		if (
			responseJson.response.numFound === 0
			||
			responseJson.response.numFoundExact === false
			||
			responseJson.response.docs.map(doc => doc.band.toLocaleLowerCase()).includes(data.artistName.toLocaleLowerCase()) === false
		) {
			throw new NotFoundMusicError(data.artistName, data.songName)
		}

		logger.info(`Music ${data.songName} by ${data.artistName} found in Vagalume API`)
		return {
			artistName: responseJson.response.docs[0].band,
			songName: responseJson.response.docs[0].title,
		} as GetMusicResponse
	}
}

export default Vagalume