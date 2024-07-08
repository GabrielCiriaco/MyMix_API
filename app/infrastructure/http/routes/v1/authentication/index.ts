import { NextFunction, Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { UsersService } from '@/services/users'
import { generateToken } from '@/infrastructure/http/middlewares'
import { NotFoundError } from '@/services/users/errors'
import { InvalidCredentials, RefreshTokenIsRequired } from './errors'
import {
	LoginAUserRequest,
	LoginAUserResponse,
	RegisterAUserRequest,
	TokenDecoded,
} from './types'

export class AuthenticationRouter {
	private usersSvc: UsersService
	private router: Router

	private static instance: AuthenticationRouter

	static getInstance(usersSvc: UsersService) {
		if (!AuthenticationRouter.instance) {
			AuthenticationRouter.instance = new AuthenticationRouter(usersSvc)
		}
		return AuthenticationRouter.instance
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
   * /auth/register:
   *   put:
   *     summary: Register a new user
   *     description: Register a new user with email, password, and name
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RegisterAUserRequest'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserResponse'
   *       400:
   *         description: Bad Request
   *       500:
   *         description: Internal Server Error
   */
	private async register(req: Request, res: Response, next: NextFunction) {
		try {
			const inputData = RegisterAUserRequest.parse(req.body)
			const result = await this.usersSvc.createUser({
				email: inputData.email,
				password: inputData.password,
				name: inputData.name,
			})
			res.status(200).json(result)
		} catch (error) {
			next(error)
		}
	}

	/**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Login as a user
   *     description: Login with email and password
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginAUserRequest'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/LoginAUserResponse'
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal Server Error
   */
	private async login(req: Request, res: Response, next: NextFunction) {
		try {
			const inputData = LoginAUserRequest.parse(req.body)
			const user = await this.usersSvc.getUserByEmail(inputData.email)

			if (!user || !user.password) {
				throw new InvalidCredentials()
			}

			const passwordIsValid = bcrypt.compare(inputData.password, user.password)

			if (!passwordIsValid) {
				throw new InvalidCredentials()
			}

			const tokens = generateToken(user)

			const response: LoginAUserResponse = {
				tokens,
				user,
			}
			res.status(200).json(response)
		} catch (error) {
			next(error)
		}
	}

	/**
   * @swagger
   * /auth/refresh-token:
   *   post:
   *     summary: Refresh access token
   *     description: Refresh access token using refresh token
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               refreshToken:
   *                 type: string
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Tokens'
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal Server Error
   */
	private async refreshToken(req: Request, res: Response, next: NextFunction) {
		const refreshToken = req.body.refreshToken
		if (!refreshToken) {
			throw new RefreshTokenIsRequired()
		}

		try {
			const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as TokenDecoded
			const user = await this.usersSvc.getUserById(decoded.id)

			if (!user) {
				throw new NotFoundError()
			}

			const tokens = generateToken(user)
			res.status(200).json(tokens)
		} catch (error) {
			next(error)
		}
	}

	private setupRoutes() {
		this.router.put('/register', this.register.bind(this))
		this.router.post('/login', this.login.bind(this))
		this.router.post('/refresh-token', this.refreshToken.bind(this))
	}

	private setupMiddlewares() {}

	public getRouter() {
		return this.router
	}
}

/**
* @swagger
* components:
*   schemas:
*     RegisterAUserRequest:
*       type: object
*       properties:
*         email:
*           type: string
*         password:
*           type: string
*         name:
*           type: string
*     LoginAUserRequest:
*       type: object
*       properties:
*         email:
*           type: string
*         password:
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
*     Tokens:
*       type: object
*       properties:
*         accessToken:
*           type: string
*         refreshToken:
*           type: string
*     LoginAUserResponse:
*       type: object
*       properties:
*         tokens:
*           $ref: '#/components/schemas/Tokens'
*         user:
*           $ref: '#/components/schemas/UserResponse'
*/


export default AuthenticationRouter.getInstance