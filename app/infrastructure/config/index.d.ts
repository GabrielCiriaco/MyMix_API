import { z } from 'zod'

enum NODE_ENV {
	DEV = 'development',
	PROD = 'production',
}

export const envSchema = z.object({
	DATABASE_URL: z.string(),
	APP_PORT: z.coerce.number().default(8080),
	APP_HOST: z.string().optional().default('0.0.0.0'),
	JWT_EXPIRATION: z.string().default('1d'),
	JWT_SECRET: z.string().default('secret'),
	JWT_REFRESH_EXPIRATION: z.string().default('30d'),
	JWT_REFRESH_SECRET: z.string().default('refresh_secret'),
	NODE_ENV: z.nativeEnum(NODE_ENV).default(NODE_ENV.DEV),
	VAGALUME_API_KEY: z.string(),
	VAGALUME_URL: z.string().default('https://api.vagalume.com.br/'),
})
declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> {}
	}
}
