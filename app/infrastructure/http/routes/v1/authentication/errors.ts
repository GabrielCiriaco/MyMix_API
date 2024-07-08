export class RefreshTokenIsRequired extends Error {
	constructor() {
		super('Refresh token is required')
	}
}

export class InvalidCredentials extends Error {
	constructor() {
		super('Invalid credentials')
	}
}