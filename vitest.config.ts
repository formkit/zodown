import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', 'docs/', '*.config.ts'],
    },
    typecheck: {
      enabled: true,
      checker: 'tsc',
      include: ['**/*.test-d.ts'],
    },
    include: ['**/*.test.ts', '**/*.spec.ts', '**/*.test-d.ts'],
  },
})
