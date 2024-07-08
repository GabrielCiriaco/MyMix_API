import { MusicsRepository } from './musics'
import { PlaylistsRepository } from './playlists'
import { UsersRepository } from './users'

interface Repositories {
  Musics: MusicsRepository;
  Playlists: PlaylistsRepository;
  Users: UsersRepository;
}

export default Repositories