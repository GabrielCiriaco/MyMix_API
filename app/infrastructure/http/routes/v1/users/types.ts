import zod from 'zod'

export const UpdateAUserCompleteRequest = zod.object({
	email: zod.string(),
	password: zod.string(),
	name: zod.string()
})

export const UpdateAUserPartialRequest = zod.object({
	email: zod.string().optional(),
	password: zod.string().optional(),
	name: zod.string().optional()
})