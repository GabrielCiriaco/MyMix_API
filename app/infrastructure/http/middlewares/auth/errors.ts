export class InvalidCredentials extends Error {
	constructor() {
		super('User or password is invalid')
	}
}