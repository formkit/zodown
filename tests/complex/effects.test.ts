import { describe, it, expect } from 'vitest'
import { z as zod4 } from 'zod'
import { z as zod3 } from 'zod/v3'
import { zodown } from '../../src/zodown'

describe('Effects (Refine, Transform, Preprocess)', () => {
  it('converts refined schemas', () => {
    const v4Schema = zod4.number().refine((n) => n % 2 === 0, {
      message: 'Must be even',
    })

    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodEffects)
    expect(v3Schema.parse(4)).toBe(4)
    expect(() => v3Schema.parse(3)).toThrow('Must be even')
  })

  it('converts transform schemas', () => {
    const v4Schema = zod4.string().transform((s) => s.toUpperCase())
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodEffects)
    expect(v3Schema.parse('hello')).toBe('HELLO')
  })

  it('converts preprocess schemas', () => {
    const v4Schema = zod4.preprocess(
      (arg) => (typeof arg === 'string' ? parseInt(arg, 10) : arg),
      zod4.number()
    )
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodEffects)
    expect(v3Schema.parse('42')).toBe(42)
    expect(v3Schema.parse(42)).toBe(42)
  })

  it('converts multiple refinements', () => {
    const v4Schema = zod4
      .string()
      .refine((s) => s.length >= 5, 'Too short')
      .refine((s) => s.includes('@'), 'Must contain @')
      .refine((s) => !s.includes(' '), 'No spaces allowed')

    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse('test@example')).toBe('test@example')
    expect(() => v3Schema.parse('test')).toThrow()
    expect(() => v3Schema.parse('testexample')).toThrow()
    expect(() => v3Schema.parse('test @example')).toThrow()
  })

  it('converts super refine', () => {
    const v4Schema = zod4.string().superRefine((val, ctx) => {
      if (val.length < 5) {
        ctx.addIssue({
          code: zod4.ZodIssueCode.custom,
          message: 'String must be at least 5 characters',
        })
      }
    })

    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse('hello')).toBe('hello')
    expect(() => v3Schema.parse('hi')).toThrow()
  })

  it('converts transform with type change', () => {
    const v4Schema = zod4
      .string()
      .transform((s) => s.split(','))
      .transform((arr) => arr.map((s) => s.trim()))

    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse('a, b, c')).toEqual(['a', 'b', 'c'])
  })

  it('converts preprocess with validation', () => {
    const v4Schema = zod4.preprocess(
      (arg) => {
        if (typeof arg === 'string') {
          return arg.trim().toLowerCase()
        }
        return arg
      },
      zod4.enum(['yes', 'no'])
    )

    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse('YES  ')).toBe('yes')
    expect(v3Schema.parse('no')).toBe('no')
    expect(() => v3Schema.parse('maybe')).toThrow()
  })
})