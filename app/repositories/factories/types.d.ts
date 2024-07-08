import { MusicsRepository } from '@/repositories/musics'
import { FavoritesPlaylistRepository } from '@/repositories/playlists'
import { UsersRepository } from '@/repositories/users'

interface IRepositoryFactory {
  Musics: MusicsRepository;
  Playlists: FavoritesPlaylistRepository;
  Users: UsersRepository
}

export default IRepositoryFactory
