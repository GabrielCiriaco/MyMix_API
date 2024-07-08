import { PlaylistsService } from '@/services/playlists'
import MakeMusicsService from '@/services/factories/musics'
import RepositoryFactory from '@/repositories'

class MakePlaylistsService {
	private constructor() { }

	public static execute(): PlaylistsService {
		return PlaylistsService.getInstance(
			RepositoryFactory.Playlists,
			MakeMusicsService
		)
	}
}

export default MakePlaylistsService.execute()
