import { NextFunction, Request, Response, Router } from 'express'
import { MusicsService } from '@/services/musics'
import zod from 'zod'
import { validateToken } from '@/infrastructure/http/middlewares/auth'

export class MusicsRouter {
	private musicsSvc: MusicsService
	private router: Router

	private static instance: MusicsRouter

	static getInstance(musicsSvc: MusicsService) {
		if (!MusicsRouter.instance) {
			MusicsRouter.instance = new MusicsRouter(musicsSvc)
		}
		return MusicsRouter.instance
	}

	private constructor(musicsSvc: MusicsService) {
		this.router = Router({
			mergeParams: true,
			caseSensitive: true,
			strict: true,
		})
		this.musicsSvc = musicsSvc
		this.setupRoutes()
	}

	/**
	 * @swagger
	 * /musics:
	 *   get:
	 *     summary: Retrieve music by song and artist name
	 *     description: Retrieve music information based on song and artist names.
	 *     tags:
	 *       - Musics
	 *     parameters:
	 *       - in: query
	 *         name: songName
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: Name of the song to search.
	 *       - in: query
	 *         name: artistName
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: Name of the artist to search.
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Success
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/MusicResponse'
	 *       400:
	 *         description: Bad Request
	 *       500:
	 *         description: Internal Server Error
	 */
	private async getMusic(req: Request, res: Response, next: NextFunction) {
		try {
			const songName = zod.string().parse(req.query.songName)
			const artistName = zod.string().parse(req.query.artistName)

			const result = await this.musicsSvc.findOneBySongAndArtistName({
				songName,
				artistName,
			})

			res.status(200).json(result)
		} catch (error) {
			next(error)
		}
	}

	private setupRoutes(): void {
		this.router.get('/', validateToken, this.getMusic.bind(this))
	}

	public getRouter(): Router {
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
*     MusicResponse:
*       type: object
*       properties:
*         id:
*           type: string
*         title:
*           type: string
*         artist:
*           type: string
*/

export default MusicsRouter.getInstance