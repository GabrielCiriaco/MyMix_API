import ServiceFactory from './factories'
import Services from './types'

const Services = {
	Musics: ServiceFactory.Musics,
	Playslists: ServiceFactory.Playlists,
	Users: ServiceFactory.Users,
}

export default Services
