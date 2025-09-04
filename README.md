# zodown

<p align="center">
  <a href="https://www.npmjs.com/package/zodown"><img src="https://img.shields.io/npm/v/zodown.svg?style=flat-square" alt="npm version"></a>
  <a href="https://github.com/formkit/zodown/actions"><img src="https://img.shields.io/github/actions/workflow/status/formkit/zodown/ci.yml?branch=main&style=flat-square" alt="build status"></a>
  <a href="https://www.npmjs.com/package/zodown"><img src="https://img.shields.io/npm/dm/zodown.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://github.com/formkit/zodown/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/zodown.svg?style=flat-square" alt="license"></a>
</p>

> Write Zod v4 schemas, run them in Zod v3 environments

## The Problem

Many popular libraries still depend on Zod v3 (like `@modelcontextprotocol/sdk`), but you want to use the latest Zod v4 features and stay current with the ecosystem. Version conflicts force you to choose between modern schemas and library compatibility.

## The Solution

`zodown` converts Zod v4 schemas to functionally equivalent Zod v3 schemas at runtime, preserving all validations, refinements, and type safety. Write modern code, maintain compatibility.

## Installation

```bash
npm install zodown
# or
pnpm add zodown
# or
yarn add zodown
```

**Note:** zodown includes Zod v4 built-in and handles Zod v3 conversion internally. You don't need to install Zod separately!

## Usage

```typescript
import { z, zodown } from 'zodown' // Includes Zod v4!

// Write modern Zod v4 schemas
const UserSchema = z.object({
  email: z.string().email(),
  age: z.number().int().positive(),
  role: z.enum(['admin', 'user']),
  metadata: z.record(z.unknown()).optional(),
})

// Convert for Zod v3 compatibility
const v3Schema = zodown(UserSchema)

// Use with libraries that require Zod v3
import { Client } from '@modelcontextprotocol/sdk'
const client = new Client({
  schema: v3Schema, // Works perfectly!
})
```

## Features

✅ **Complete Type Support** - All Zod types including primitives, objects, arrays, unions, intersections, and more  
✅ **Validation Preservation** - All refinements, transforms, and custom validations are maintained  
✅ **Type Safety** - Full TypeScript support with proper type inference  
✅ **Circular References** - Handles recursive schemas with WeakMap caching  
✅ **Zero Configuration** - Just wrap your schema with `zodown()`  
✅ **Lightweight** - ~1.3KB gzipped converter logic

## Supported Types

`zodown` supports all Zod v4 types:

- **Primitives**: string, number, boolean, date, bigint, symbol, undefined, null, void, any, unknown, never
- **Literals**: literal values, enums, native enums
- **Strings**: with all refinements (email, url, uuid, regex, length constraints, etc.)
- **Numbers**: with all refinements (int, positive, min/max, multipleOf, finite)
- **Complex Types**: objects, arrays, tuples, records, maps, sets
- **Compositions**: unions, intersections, optional, nullable, default
- **Advanced**: lazy (recursive), promise, function, transform, refine, preprocess
- **Effects**: Custom refinements and transformations

## Examples

### Basic Schema

```typescript
import { z, zodown } from 'zodown'

const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  price: z.number().positive(),
  tags: z.array(z.string()),
})

const v3Product = zodown(ProductSchema)
```

### With Refinements

```typescript
import { z, zodown } from 'zodown'

const PasswordSchema = z
  .string()
  .min(8)
  .regex(/[A-Z]/, 'Must contain uppercase')
  .regex(/[0-9]/, 'Must contain number')
  .refine((val) => !commonPasswords.includes(val), 'Too common')

const v3Password = zodown(PasswordSchema)
```

### Recursive Schema

```typescript
import { z, zodown, ZodType } from 'zodown'

const CategorySchema: ZodType<Category> = z.lazy(() =>
  z.object({
    name: z.string(),
    subcategories: z.array(CategorySchema).optional(),
  })
)

const v3Category = zodown(CategorySchema)
```

### With Transform

```typescript
import { z, zodown } from 'zodown'

const DateSchema = z
  .string()
  .transform((str) => new Date(str))
  .refine((date) => !isNaN(date.getTime()), 'Invalid date')

const v3Date = zodown(DateSchema)
```

## API

### `zodown(schema)`

Converts a Zod v4 schema to a Zod v3 schema.

- **Parameters**: `schema` - Any Zod v4 schema
- **Returns**: Equivalent Zod v3 schema
- **Type Safety**: Preserves full type inference

### `InferDowngraded<T>`

Type helper for extracting the inferred type from a downgraded schema.

```typescript
import type { InferDowngraded } from 'zodown'

const Schema = z.object({ name: z.string() })
type User = InferDowngraded<typeof Schema> // { name: string }
```

## Limitations

While `zodown` handles most Zod v4 features, there are some limitations due to architectural differences between v3 and v4:

### Features That Cannot Be Converted

1. **`.refine()` and `.superRefine()` on base types** - In Zod v4, these are compiled into internal check functions that cannot be reverse-engineered. The base schema is returned without the refinement.

2. **Branded types** - Zod v4 implements branding as a compile-time TypeScript feature with no runtime representation, while v3 expects runtime `ZodBranded` instances. Branded schemas are returned as their base type.

3. **Variable-length tuples with optional elements** - Zod v4 allows tuples like `[string, number?]` to have variable length, but v3 requires fixed length with `undefined` for optional elements.

### Workarounds

If you need these features, consider:

- Using transforms instead of refinements where possible
- Implementing validation logic outside of Zod
- Using v3-compatible patterns from the start

### Example of Limitations

```typescript
// These v4 features have limitations:

// ❌ Refinements are lost
const v4Refined = z.number().refine((n) => n % 2 === 0)
const v3Refined = zodown(v4Refined) // Returns ZodNumber without refinement

// ❌ Brands become base types
const v4Branded = z.string().brand<'UserId'>()
const v3Branded = zodown(v4Branded) // Returns ZodString, not ZodBranded

// ❌ Optional tuple elements need all positions
const v4Tuple = z.tuple([z.string(), z.number().optional()])
const v3Tuple = zodown(v4Tuple)
v3Tuple.parse(['hi', undefined]) // ✅ Works
v3Tuple.parse(['hi']) // ❌ Fails - v3 needs fixed length
```

## Use Cases

- 📦 Using `@modelcontextprotocol/sdk` with modern Zod schemas
- 🔄 Gradually migrating large codebases from Zod v3 to v4
- 📚 Maintaining libraries that need to support both versions
- 🛠️ Working with tools that haven't updated to Zod v4 yet

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## License

MIT © Justin Schroeder

## Acknowledgments

Built with necessity for the [Model Context Protocol SDK](https://github.com/anthropics/model-context-protocol) and the many other libraries still on Zod v3.
