import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'lcov'],
			exclude: [
				'**/index.ts',
				'vitest.config.ts',
			],
		},
	},
});
