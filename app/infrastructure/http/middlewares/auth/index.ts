import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '@prisma/client'
import { TokenDecoded } from '@/infrastructure/http/routes/v1/authentication/types'
import Services from '@/services'
import { UsersService } from '@/services/users'
import { NotFoundError } from '@/services/users/errors'

const usersSvc: UsersService = Services.Users


export function generateToken(user: User): AuthTokens {
	const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRATION,
	})
	const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
		expiresIn: process.env.JWT_REFRESH_EXPIRATION,
	})

	return { accessToken, refreshToken }
}


export function validateToken (
	_err: unknown,
	req: Request,
	res: Response,
	next: NextFunction) {
	const token = req.headers.authorization?.split(' ')[1]

	if (!token) {
		return res.status(401).json({ error: 'Token is required' })
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenDecoded
	usersSvc.getUserById(decoded.id).then((user) => {
		if (!user) {
			throw new NotFoundError()
		}

		req.user = user

		next()
	}).catch((error) => {
		next(error)
	})
}
