import express from 'express'
import { ecsFormat } from '@elastic/ecs-morgan-format'
import { logger } from '@/infrastructure/logger'
import { errorHandler } from '@/infrastructure/http/middlewares'
import V1Router from '@/infrastructure/http/routes/v1'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc, { Options } from 'swagger-jsdoc'
import { ServerConfig, ServerDTO } from './types'
import compression from 'compression'

class Server implements ServerDTO {
	public app: express.Express
	private config: ServerConfig
	private router: express.Router

	constructor(config: ServerConfig) {
		this.config = config
		this.app = express()
		this.router = express.Router()
	}

	private async init(): Promise<void> {
		this.setupMiddlewares()
		this.setupRoutes()
		this.setupSwagger()
		this.setupErrorHandlers()
	}

	private setupSwagger(): void {
		const options: Options = {
			definition: {
				openapi: '3.0.0',
				info: {
					title: 'MyMix',
					version: '1.0.0',
					description: 'MyMix API',
					license: {
						name: 'MIT',
						url: 'https://spdx.org/licenses/MIT.html',
					},
				},
				servers: [
					{
						url: `http://${this.config.address}:${this.config.port}/api/v1`,
						description: 'Development server',
					},
				]
			},
			apis: [
				'./app/infrastructure/http/routes/*/*.ts',
				'./app/infrastructure/http/routes/*/*/*.ts',
			],
			
		}
		const swaggerSpec = swaggerJSDoc(options)
		this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(
			swaggerSpec, { 
				explorer: true, 
				customSiteTitle: 'MyMix Api - Documentação'
			},
		))
	}

	private setupErrorHandlers(): void {
		this.app.use(errorHandler)
	}

	private setupCors(): void {
		this.app.use((_req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*')
			res.header(
				'Access-Control-Allow-Methods',
				'GET, POST, PUT, DELETE, OPTIONS, PATCH'
			)
			res.header(
				'Access-Control-Allow-Headers',
				'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin'
			)
			next()
		})
	}

	async start(): Promise<void> {
		await this.init()
		logger.info(
			`Server listening on ${this.config.address}:${this.config.port} in ${process.env.NODE_ENV} mode`
		)
		this.app
			.listen(this.config.port, this.config.address)
			.on('error', (err) => {
				logger.error(err)
				this.shutdown()
			})
	}

	private setupRoutes(): void {
		const v1 = V1Router.getRouter()
		this.router.use('/v1', v1)
		this.app.use('/api', this.router)
	}

	private setupMiddlewares(): void {
		this.app.use(compression())
		this.app.use(morgan(ecsFormat({ format: 'dev' })))
		this.app.use(express.json())
		this.app.use(express.urlencoded({ extended: true }))
		this.setupCors()
	}

	shutdown(): void {
		logger.info('Shutting down server')
		process.exit(1)
	}
}

export default Server