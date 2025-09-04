import { describe, it, expect } from 'vitest'
import { z as zod4 } from 'zod'
import { z as zod3 } from 'zod/v3'
import { zodown } from '../../src/zodown'

describe('Optional, Nullable, and Default Modifiers', () => {
  it('converts optional schemas', () => {
    const v4Schema = zod4.string().optional()
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodOptional)
    expect(v3Schema.parse('hello')).toBe('hello')
    expect(v3Schema.parse(undefined)).toBe(undefined)
  })

  it('converts nullable schemas', () => {
    const v4Schema = zod4.number().nullable()
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodNullable)
    expect(v3Schema.parse(42)).toBe(42)
    expect(v3Schema.parse(null)).toBe(null)
    expect(() => v3Schema.parse(undefined)).toThrow()
  })

  it('converts nullish schemas', () => {
    const v4Schema = zod4.boolean().nullish()
    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse(true)).toBe(true)
    expect(v3Schema.parse(null)).toBe(null)
    expect(v3Schema.parse(undefined)).toBe(undefined)
  })

  it('converts default schemas', () => {
    const v4Schema = zod4.string().default('default-value')
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodDefault)
    expect(v3Schema.parse('provided')).toBe('provided')
    expect(v3Schema.parse(undefined)).toBe('default-value')
  })

  it('converts catch schemas', () => {
    const v4Schema = zod4.string().catch('fallback')
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodCatch)
    expect(v3Schema.parse('valid')).toBe('valid')
    expect(v3Schema.parse(123)).toBe('fallback')
    expect(v3Schema.parse(null)).toBe('fallback')
  })

  it('handles chained modifiers', () => {
    const v4Schema = zod4.string().optional().default('default')
    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse('value')).toBe('value')
    expect(v3Schema.parse(undefined)).toBe('default')
  })

  it('handles optional with refinements', () => {
    const v4Schema = zod4.string().min(3).optional()

    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse('hello')).toBe('hello')
    expect(v3Schema.parse(undefined)).toBe(undefined)
    expect(() => v3Schema.parse('ab')).toThrow()
  })

  it('handles nullable with transforms', () => {
    const v4Schema = zod4
      .string()
      .transform((s) => s.toUpperCase())
      .nullable()

    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse('hello')).toBe('HELLO')
    expect(v3Schema.parse(null)).toBe(null)
  })

  it('handles complex default values', () => {
    const v4Schema = zod4.object({
      name: zod4.string(),
      settings: zod4
        .object({
          theme: zod4.string().default('light'),
          notifications: zod4.boolean().default(true),
        })
        .default({
          theme: 'dark',
          notifications: false,
        }),
    })

    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse({ name: 'User' })).toEqual({
      name: 'User',
      settings: {
        theme: 'dark',
        notifications: false,
      },
    })

    expect(v3Schema.parse({ name: 'User', settings: {} })).toEqual({
      name: 'User',
      settings: {
        theme: 'light',
        notifications: true,
      },
    })
  })
})
