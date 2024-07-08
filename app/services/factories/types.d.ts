import { MusicService } from '@/services/musics'
import { PlaylistsService } from '@/services/playlists'
import { UserService } from '@/services/users'

interface IServiceFactory {
  Musics: MusicService;
  Playlists: PlaylistsService;
  Users: UserService;
}

export default IServiceFactory
