import { Router } from 'express'
import Services from '@/services'
import { MusicsRouter } from './musics'
import { PlaylistsRouter } from './playlists'
import { UsersRouter } from './users'
import { AuthenticationRouter } from './authentication'

class V1Router {
	private V1Router: Router

	private static instance: V1Router

	static getInstance() {
		if (!V1Router.instance) {
			V1Router.instance = new V1Router()
		}
		return V1Router.instance
	}

	private constructor() {
		this.V1Router = Router()
		this.setupMiddlewares()
		this.setupRoutes()
	}

	private setupRoutes() {
		this.setupConfigurableItemRoutes()
	}

	private async setupConfigurableItemRoutes() {
		this.V1Router.use(
			'/auth',
			AuthenticationRouter.getInstance(Services.Users).getRouter()
		)

		this.V1Router.use(
			'/musics',
			MusicsRouter.getInstance(Services.Musics).getRouter()
		)

		this.V1Router.use(
			'/playlists',
			PlaylistsRouter.getInstance(Services.Playslists).getRouter()
		)

		this.V1Router.use(
			'/users',
			UsersRouter.getInstance(Services.Users).getRouter()
		)
	}

	private setupMiddlewares() { }

	getRouter() {
		return this.V1Router
	}
}

export default V1Router.getInstance()
