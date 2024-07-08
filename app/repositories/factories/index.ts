import MakeMusicsRepository from './musics'
import MakePlaylistsRepository from './playlists'
import MakeUsersRepository from './users'
import IRepositoryFactory from './types'

const RepositoryFactory: IRepositoryFactory = {
	Musics: MakeMusicsRepository,
	Playlists: MakePlaylistsRepository,
	Users: MakeUsersRepository
}

export default RepositoryFactory
