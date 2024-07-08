export class NotFoundMusicError extends Error {
	constructor(artistName?: string, songName?: string) {
		super(`Música ${songName} do artista ${artistName} não encontrada`)
	}
}
