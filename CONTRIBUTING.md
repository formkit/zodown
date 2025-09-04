# Contributing to zodown

Thank you for your interest in contributing to zodown! This guide will help you get started.

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/zodown.git
   cd zodown
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Commands

```bash
# Run tests in watch mode
pnpm test

# Run tests once
pnpm test:run

# Build the package
pnpm build

# Check types
pnpm typecheck

# Format code
pnpm format

# Run linter
pnpm lint
```

## Testing

All new features should include tests. We use Vitest for testing:

```typescript
import { describe, it, expect } from 'vitest'
import { zodown } from '../src/zodown'

describe('New Feature', () => {
  it('should work correctly', () => {
    const schema = z.string()
    const v3 = zodown(schema)
    expect(v3.parse('test')).toBe('test')
  })
})
```

## Adding Support for New Zod Types

1. Add type mapping in `DowngradeType` in `src/zodown.ts`
2. Add conversion logic in the `downgrade()` function
3. Add comprehensive tests in `tests/zodown.test.ts`
4. Update README if needed

## Code Style

- Use 2 spaces for indentation
- No semicolons
- Single quotes for strings
- Run `pnpm format` before committing

## Commit Messages

Follow conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `test:` for tests
- `refactor:` for refactoring
- `chore:` for maintenance

## Pull Request Process

1. Ensure all tests pass: `pnpm test:run`
2. Update documentation if needed
3. Create a pull request with a clear description
4. Wait for review

## Questions?

Feel free to open an issue for any questions or discussions!