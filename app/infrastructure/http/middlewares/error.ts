import { Request, Response, NextFunction } from 'express'
import { logger } from '@/infrastructure/logger'
import { Prisma } from '@prisma/client'
import { PlaylistMusicNotFoundError } from '@/services/playlists/errors'
import { AlreadyExistsError, NotFoundError, UnauthorizedError } from '@/services/users/errors'
import { JsonWebTokenError } from 'jsonwebtoken'
import zod from 'zod'
import { InvalidCredentials, RefreshTokenIsRequired } from '@/infrastructure/http/routes/v1/authentication/errors'
import { OperationNotAllowed as PlaylistfromOperationNotAllowed }  from '../routes/v1/playlists/errors' 
import { OperationNotAllowed as UserOperationNotAllowed} from '../routes/v1/users/errors'

export function errorHandler(
	err: unknown,
	_req: Request,
	res: Response,
	next: NextFunction
) {
	if (res.headersSent) {
		return next(err)
	}

	if (err instanceof zod.ZodError) {
		logger.http(err.message)
		res.status(400).json({
			error: 'Invalid input. Please check your request body. ' + err.message,
		})
		return
	}

	if (err instanceof PlaylistMusicNotFoundError) {
		logger.http(err.message)
		res.status(404).json({ error: err.message })
		return
	}

	if (err instanceof NotFoundError) {
		logger.http(err.message)
		res.status(404).json({ error: err.message })
		return
	}

	if (err instanceof UnauthorizedError) {
		logger.http(err.message)
		res.status(401).json({ error: err.message })
		return
	}

	if (err instanceof AlreadyExistsError) {
		logger.http(err.message)
		res.status(409).json({ error: err.message })
		return
	}

	if (err instanceof JsonWebTokenError) {
		logger.http(err.message)
		res.status(401).json({ error: err.message })
		return
	}

	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		logger.error(err)
		res.status(400).json({ error: 'Invalid input. Please check your request body.' })
		return
	}

	if (err instanceof Prisma.PrismaClientValidationError) {
		logger.error(err)
		res.status(400).json({ error: 'Invalid input. Please check your request body.' })
		return
	}

	if (err instanceof RefreshTokenIsRequired) {
		logger.http(err.message)
		res.status(401).json({ error: err.message })
		return
	
	}

	if (err instanceof InvalidCredentials) {
		logger.http(err.message)
		res.status(401).json({ error: err.message })
		return
	}

	if (err instanceof PlaylistfromOperationNotAllowed) {
		logger.http(err.message)
		res.status(403).json({ error: err.message })
		return
	}

	if (err instanceof UserOperationNotAllowed) {
		logger.http(err.message)
		res.status(403).json({ error: err.message })
		return
	}

	logger.error(err)
	res.status(500).json({ error: 'Internal Server Error' })
	next(err)
}
