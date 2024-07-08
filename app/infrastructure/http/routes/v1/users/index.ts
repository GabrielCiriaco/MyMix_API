import { NextFunction, Request, Response, Router } from 'express'
import { UsersService } from '@/services/users'
import { UpdateAUserCompleteRequest, UpdateAUserPartialRequest } from './types'
import zod from 'zod'
import { validateToken } from '@/infrastructure/http/middlewares/auth'
import { OperationNotAllowed } from './errors'

export class UsersRouter {
	private usersSvc: UsersService
	private router: Router

	private static instance: UsersRouter

	static getInstance(usersSvc: UsersService) {
		if (!UsersRouter.instance) {
			UsersRouter.instance = new UsersRouter(usersSvc)
		}
		return UsersRouter.instance
	}

	private constructor(usersSvc: UsersService) {
		this.router = Router({
			mergeParams: true,
			caseSensitive: true,
			strict: true,
		})
		this.usersSvc = usersSvc
		this.setupMiddlewares()
		this.setupRoutes()
	}

	/**
     * @swagger
     * /users/{userId}:
     *   post:
     *     summary: Update a user
     *     description: Update a user with the given ID
     *     tags:
     *       - Users
     *     parameters:
     *       - in: path
     *         name: userId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user to update
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateAUserCompleteRequest'
	*     security:
	*       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/UserResponse'
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal Server Error
     */
	private async updateUser(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = zod.string().parse(req.params.userId)
			const inputData = UpdateAUserCompleteRequest.parse(req.body)
			if (req.user && req.user.id !== userId){
				throw new OperationNotAllowed()
			}
			const result = await this.usersSvc.updateUser(userId, {
				email: inputData.email,
				password: inputData.password,
				name: inputData.name
			})
			res.status(200).json(result)
		} catch (error) {
			next(error)
		}
	}

	/**
     * @swagger
     * /users/{userId}:
     *   patch:
     *     summary: Partially update a user
     *     description: Partially update a user with the given ID
     *     tags:
     *       - Users
     *     parameters:
     *       - in: path
     *         name: userId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user to update
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateAUserPartialRequest'
	*     security:
	*       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/UserResponse'
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal Server Error
     */
	private async patchUser(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = zod.string().parse(req.params.userId)
			if (req.user && req.user.id !== userId){
				throw new OperationNotAllowed()
			}
			const inputData = UpdateAUserPartialRequest.parse(req.body)
			const result = await this.usersSvc.updateUser(userId, inputData)
			res.status(200).json(result)
		} catch (error) {
			next(error)
		}
	}

	/**
     * @swagger
     * /users/{userId}:
     *   delete:
     *     summary: Delete a user
     *     description: Delete a user with the given ID
     *     tags:
     *       - Users
     *     parameters:
     *       - in: path
     *         name: userId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user to delete
	*     security:
	*       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/UserResponse'
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal Server Error
     */
	private async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = zod.string().parse(req.params.userId)
			if (req.user && req.user.id !== userId){
				throw new OperationNotAllowed()
			}
			const result = await this.usersSvc.deleteUser(userId)
			res.status(200).json(result)
		} catch (error) {
			next(error)
		}
	}

	private setupRoutes() {
		this.router.post('/:userId',  validateToken, this.updateUser.bind(this))
		this.router.patch('/:userId',  validateToken, this.patchUser.bind(this))
		this.router.delete('/:userId',  validateToken, this.deleteUser.bind(this))
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
 *     UpdateAUserCompleteRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         name:
 *           type: string
 *     UpdateAUserPartialRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         name:
 *           type: string
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         name:
 *           type: string
 */
export default UsersRouter.getInstance
