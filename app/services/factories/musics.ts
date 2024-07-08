import { MusicsService } from '@/services/musics'
import RepositoryFactory from '@/repositories'
import Vagalume from '@/infrastructure/datasources/vagalume'

class MakeMusicsService {
	private constructor() { }

	public static execute(): MusicsService {
		return MusicsService.getInstance(
			RepositoryFactory.Musics,
			new Vagalume()
		)
	}
}

export default MakeMusicsService.execute()
