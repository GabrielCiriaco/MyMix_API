import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['app/**/*.{ts}', '!node_modules'],
	outDir: 'build',
	target: 'es2020',
	format: ['cjs', 'esm'],
	sourcemap: false,
	splitting: false,
	clean: true
})
