export class PlaylistMusicNotFoundError extends Error {
	constructor() {
		super('Music not found')
	}
}