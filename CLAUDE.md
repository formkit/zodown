# Claude Development Guide for zodown

This guide helps AI assistants understand and work with the zodown codebase effectively.

## Project Overview

**zodown** is a runtime converter that enables developers to write Zod v4 schemas while maintaining compatibility with libraries that require Zod v3 (like @modelcontextprotocol/sdk). Zod 3 is available in the zod 4 package as `zod/v3`.

## Core Architecture

### Main Function: `zodown()`
- Location: `src/zodown.ts`
- Purpose: Converts Zod v4 schemas to Zod v3 schemas at runtime
- Key features:
  - Preserves all validations and refinements
  - Handles circular references with WeakMap caching
  - Maintains full type safety

### Type System
- `DowngradeType<T>`: Maps v4 types to v3 equivalents
- `InferDowngraded<T>`: Helper for type inference
- All type mappings preserve validation logic

## Development Workflow

### Running Tests
```bash
pnpm test          # Run tests in watch mode
pnpm test:run      # Run tests once
pnpm test:coverage # Generate coverage report
```

### Building
```bash
pnpm build    # Build for production
pnpm dev      # Build in watch mode
```

### Code Quality
```bash
pnpm lint      # Check formatting
pnpm format    # Fix formatting
pnpm typecheck # TypeScript type checking
```

## Key Implementation Details

### Adding New Type Support

When adding support for a new Zod type:

1. Add type mapping in `DowngradeType` type definition
2. Add conversion logic in the `downgrade()` function
3. Handle any special validation rules or refinements
4. Add comprehensive tests in `tests/zodown.test.ts`

### Testing Guidelines

- Each Zod type should have multiple test cases
- Test both basic conversion and validation preservation
- Include edge cases and error scenarios
- Test type inference with TypeScript

### Performance Considerations

- WeakMap caching prevents infinite recursion
- Lazy evaluation for recursive schemas
- Minimal overhead - only processes used schemas

## Documentation Site

The documentation site is built with Vue 3 and Vite:
- Location: `docs/`
- Style: 1-bit retro terminal aesthetic
- Run locally: `pnpm docs:dev`
- Build: `pnpm docs:build`

## Release Process

1. Run tests: `pnpm test:run`
2. Update version: `pnpm release`
3. Bumpp will handle:
   - Version bumping
   - Changelog generation
   - Git tagging
   - NPM publishing

## Common Tasks

### Adding a New Validation
```typescript
// In zodown.ts, find the appropriate type handler
if (s instanceof zod4.ZodString) {
  // Add new validation handling here
  if (check.kind === "newValidation") {
    result = result.newValidation(check.value, check.message)
  }
}
```

### Debugging Type Issues
```typescript
// Use console.warn for unknown types
console.warn(`Unknown Zod v4 type encountered: ${typeName}`)
// Fallback to z.unknown() for safety
```

## Architecture Decisions

1. **WeakMap for Caching**: Prevents memory leaks with circular references
2. **Recursive Downgrade**: Handles nested schemas efficiently
3. **Type Preservation**: Maintains TypeScript inference throughout
4. **Effect Handling**: Special cases for refine, transform, preprocess

## Troubleshooting

### Common Issues
- **Circular References**: Handled via WeakMap caching
- **Unknown Types**: Falls back to `z.unknown()` with warning
- **Type Inference**: Use `InferDowngraded<T>` helper

### Testing New Features
1. Add unit tests for the specific type/feature
2. Add integration tests with complex schemas
3. Test type inference in TypeScript
4. Check performance with large schemas

## Important Files

- `src/zodown.ts` - Main converter implementation
- `src/index.ts` - Public API exports
- `tests/zodown.test.ts` - Comprehensive test suite
- `tsup.config.ts` - Build configuration
- `vitest.config.ts` - Test configuration

## Contributing

When contributing:
1. Follow existing code patterns
2. Add tests for new features
3. Update this guide if needed
4. Ensure all tests pass
5. Run formatter before committing
