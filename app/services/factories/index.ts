import MakeMusicsService from './musics'
import MakePlaylistsService from './playlists'
import MakeUsersService from './users'
import IServiceFactory from './types'

const ServiceFactory: IServiceFactory = {
	Musics: MakeMusicsService,
	Playlists: MakePlaylistsService,
	Users: MakeUsersService
}

export default ServiceFactory
