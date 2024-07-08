import { UsersService } from '@/services/users'
import RepositoryFactory from '@/repositories'

class MakeUsersService {
	private constructor() { }

	public static execute(): UsersService {
		return UsersService.getInstance(
			RepositoryFactory.Users
		)
	}
}

export default MakeUsersService.execute()
