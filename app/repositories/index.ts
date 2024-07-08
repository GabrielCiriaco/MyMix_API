import RepositoryFactory from './factories'
import Repositories from './types'

const Repositories: Repositories = {
	Musics: RepositoryFactory.Musics,
	Playlists: RepositoryFactory.Playlists,
	Users: RepositoryFactory.Users,
}

export default Repositories
