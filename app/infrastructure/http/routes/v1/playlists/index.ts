import { NextFunction, Request, Response, Router } from 'express'
import { PlaylistsService } from '@/services/playlists'
import zod from 'zod'
import { validateToken } from '@/infrastructure/http/middlewares/auth'
import { OperationNotAllowed } from './errors'


export class PlaylistsRouter {
	private playlistsSvc: PlaylistsService
	private router: Router

	private static instance: PlaylistsRouter

	static getInstance(playlistsSvc: PlaylistsService) {
		if (!PlaylistsRouter.instance) {
			PlaylistsRouter.instance = new PlaylistsRouter(playlistsSvc)
		}
		return PlaylistsRouter.instance
	}

	private constructor(playlistsSvc: PlaylistsService) {
		this.router = Router({
			mergeParams: true,
			caseSensitive: true,
			strict: true,
		})
		this.playlistsSvc = playlistsSvc
		this.setupMiddlewares()
		this.setupRoutes()
	}

	/**
	 * @swagger
	 * /playlists/{userId}/all:
	 *   get:
	 *     summary: Retrieve all musics in favorite playlist by userId
	 *     description: Retrieve all musics in favorite playlist by userId.
	 *     tags:
	 *       - Playlists
	 *     parameters:
	 *       - in: path
	 *         name: userId
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: User ID to search.
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/MusicArrayResponse'
	 *       400:
	 *         description: Bad Request
	 *       500:
	 *         description: Internal Server Error
	 */
	private async getMusic(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = zod.string().parse(req.params.userId)
  
			const result = await this.playlistsSvc.findManyByUserId(userId)
  
			res.status(200).json(result)
		} catch (error) {
			next(error)
		}
	}

	/**
	 * @swagger
	 * /playlists/{userId}/{musicId}:
	 *   post:
	 *     summary: Add a music to favorite playlist by userId
	 *     description: Add a music to favorite playlist by userId.
	 *     tags:
	 *       - Playlists
	 *     parameters:
	 *       - in: path
	 *         name: userId
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: User ID to search.
	 *       - in: path
	 *         name: musicId
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: Music ID to search.
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/PlaylistResponse'
	 *       400:
	 *         description: Bad Request
	 *       500:
	 *         description: Internal Server Error
	 */
	private async addSongToAUserPlaylist(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = zod.string().parse(req.params.userId)
			if (req.user && req.user.id !== userId){
				throw new OperationNotAllowed()
			}
			const musicId = zod.string().parse(req.params.musicId)
  
			const result = await this.playlistsSvc.addSongToAUserPlaylist({
				userId,
				musicId
			})
  
			res.status(200).json(result)
		} catch (error) {
			next(error)
		}
	}

	/**
	 * @swagger
	 * /playlists/{userId}/{musicId}:
	 *   delete:
	 *     summary: Remove a music from favorite playlist by userId
	 *     description: Remove a music from favorite playlist by userId.
	 *     tags:
	 *       - Playlists
	 *     parameters:
	 *       - in: path
	 *         name: userId
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: User ID to search.
	 *       - in: path
	 *         name: musicId
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: Music ID to search.
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/PlaylistResponse'
	 *       400:
	 *         description: Bad Request
	 *       500:
	 *         description: Internal Server Error
	 */

	private async removeSongFromAUserPlaylist(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = zod.string().parse(req.params.userId)
			if (req.user && req.user.id !== userId){
				throw new OperationNotAllowed()
			}
			const musicId = zod.string().parse(req.params.musicId)
  
			const result = await this.playlistsSvc.removeSongFromUserPlaylist({
				userId,
				musicId
			})
  
			res.status(200).json(result)
		} catch (error) {
			next(error)
		}
	}

	private setupRoutes() {
		this.router.get('/:userId/all',  validateToken, this.getMusic.bind(this))
		this.router.post('/:userId/:musicId',  validateToken, this.addSongToAUserPlaylist.bind(this))
		this.router.delete('/:userId/:musicId',  validateToken, this.removeSongFromAUserPlaylist.bind(this))
	}

	private setupMiddlewares() {}

	public getRouter() {
		return this.router
	}
}

/**
* @swagger
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*   schemas:
*     MusicArrayResponse:
*       type: array
*       items:
*         $ref: '#/components/schemas/MusicResponse'
*     PlaylistResponse:
*       type: object
*       properties:
*         id:
*           type: string
*         userId:
*           type: string
*         musicId:
*           type: string
*/

export default PlaylistsRouter.getInstance
