import { MusicsService } from './musics'
import { PlaylistsService } from './playlists'
import { UsersService } from './users'

interface Services {
  Musics: MusicsService;
  Playlists: PlaylistsService;
  Users: UsersService;
}

export default Services
