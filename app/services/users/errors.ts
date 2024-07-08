export class NotFoundError extends Error {
	constructor() {
		super('User not found')
	}
}

export class UnauthorizedError extends Error {
	constructor() {
		super('Email or password is incorrect')
	}
}

export class AlreadyExistsError extends Error {
	constructor() {
		super('User already exists')
	}
}