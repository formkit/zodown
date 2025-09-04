import { describe, it, expect } from 'vitest'
import { z as zod4 } from 'zod'
import { z as zod3 } from 'zod/v3'
import { zodown } from '../../src/zodown'

describe('Object Types', () => {
  it('converts object schemas', () => {
    const v4Schema = zod4.object({
      name: zod4.string(),
      age: zod4.number(),
    })
    const v3Schema = zodown(v4Schema)
    expect(v3Schema).toBeInstanceOf(zod3.ZodObject)
    expect(v3Schema.parse({ name: 'John', age: 30 })).toEqual({ name: 'John', age: 30 })
    expect(() => v3Schema.parse({ name: 'John' })).toThrow()
  })

  it('converts nested object schemas', () => {
    const v4Schema = zod4.object({
      user: zod4.object({
        name: zod4.string(),
        settings: zod4.object({
          theme: zod4.enum(['light', 'dark']),
          notifications: zod4.boolean(),
        }),
      }),
    })
    const v3Schema = zodown(v4Schema)

    const testData = {
      user: {
        name: 'Alice',
        settings: {
          theme: 'dark' as const,
          notifications: true,
        },
      },
    }

    expect(v3Schema.parse(testData)).toEqual(testData)
  })

  it('converts object with optional fields', () => {
    const v4Schema = zod4.object({
      required: zod4.string(),
      optional: zod4.number().optional(),
      nullable: zod4.boolean().nullable(),
      nullableOptional: zod4.string().nullable().optional(),
    })
    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse({ required: 'test', nullable: true })).toEqual({
      required: 'test',
      nullable: true,
    })
    expect(v3Schema.parse({ required: 'test', optional: 42, nullable: false })).toEqual({
      required: 'test',
      optional: 42,
      nullable: false,
    })
    expect(v3Schema.parse({ required: 'test', nullable: null })).toEqual({
      required: 'test',
      nullable: null,
    })
    expect(v3Schema.parse({ required: 'test', nullable: true, nullableOptional: null })).toEqual({
      required: 'test',
      nullable: true,
      nullableOptional: null,
    })
    expect(v3Schema.parse({ required: 'test', nullable: false })).toEqual({
      required: 'test',
      nullable: false,
    })
  })

  it('converts object with default values', () => {
    const v4Schema = zod4.object({
      name: zod4.string(),
      role: zod4.string().default('user'),
    })
    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse({ name: 'Alice' })).toEqual({ name: 'Alice', role: 'user' })
    expect(v3Schema.parse({ name: 'Bob', role: 'admin' })).toEqual({ name: 'Bob', role: 'admin' })
  })

  it('converts strict object schemas', () => {
    const v4Schema = zod4.object({ name: zod4.string() }).strict()
    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse({ name: 'test' })).toEqual({ name: 'test' })
    expect(() => v3Schema.parse({ name: 'test', extra: 'field' })).toThrow()
  })

  it('converts passthrough object schemas', () => {
    const v4Schema = zod4.object({ name: zod4.string() }).passthrough()
    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse({ name: 'test', extra: 'field' })).toEqual({
      name: 'test',
      extra: 'field',
    })
  })
})
