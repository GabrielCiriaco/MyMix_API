import zod from 'zod'

export const RegisterAUserRequest = zod.object({
	email: zod.string(),
	password: zod.string(),
	name: zod.string()
})

export const LoginAUserRequest = zod.object({
	email: zod.string(),
	password: zod.string()
})

export interface LoginAUserResponse {
	tokens : AuthTokens,
	user: {
		id: string,
		email: string,
		name: string | null
	}
}

export interface TokenDecoded {
	id: string
}