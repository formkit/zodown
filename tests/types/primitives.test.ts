import { describe, it, expect } from 'vitest'
import { z as zod4 } from 'zod'
import { z as zod3 } from 'zod/v3'
import { zodown } from '../../src/zodown'

describe('Primitive Types', () => {
  it('converts string schemas', () => {
    const v4Schema = zod4.string()
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodString)
    expect(v3Schema.parse('hello')).toBe('hello')
    expect(() => v3Schema.parse(123)).toThrow()
  })

  it('converts string with refinements', () => {
    const v4Schema = zod4.string().min(5).max(20).email().startsWith('user').endsWith('@test.com')

    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse('user1@test.com')).toBe('user1@test.com')
    expect(() => v3Schema.parse('usr@test.com')).toThrow() // startsWith
    expect(() => v3Schema.parse('user@example.com')).toThrow() // endsWith
    expect(() => v3Schema.parse('ab')).toThrow() // min length
  })

  it('converts number schemas', () => {
    const v4Schema = zod4.number()
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodNumber)
    expect(v3Schema.parse(42)).toBe(42)
    expect(() => v3Schema.parse('42')).toThrow()
  })

  it('converts number with refinements', () => {
    const v4Schema = zod4.number().int().min(10).max(100).multipleOf(5)

    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse(50)).toBe(50)
    expect(() => v3Schema.parse(3.14)).toThrow() // not int
    expect(() => v3Schema.parse(-5)).toThrow() // min
    expect(() => v3Schema.parse(105)).toThrow() // max
  })

  it('converts boolean schemas', () => {
    const v4Schema = zod4.boolean()
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodBoolean)
    expect(v3Schema.parse(true)).toBe(true)
    expect(v3Schema.parse(false)).toBe(false)
    expect(() => v3Schema.parse('true')).toThrow()
  })

  it('converts bigint schemas', () => {
    const v4Schema = zod4.bigint()
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodBigInt)
    expect(v3Schema.parse(BigInt(123))).toBe(BigInt(123))
    expect(() => v3Schema.parse(123)).toThrow()
  })

  it('converts symbol schemas', () => {
    const v4Schema = zod4.symbol()
    const v3Schema = zodown(v4Schema)

    const sym = Symbol('test')
    expect(v3Schema).toBeInstanceOf(zod3.ZodSymbol)
    expect(v3Schema.parse(sym)).toBe(sym)
    expect(() => v3Schema.parse('symbol')).toThrow()
  })

  it('converts date schemas', () => {
    const v4Schema = zod4.date()
    const v3Schema = zodown(v4Schema)

    const date = new Date()
    expect(v3Schema).toBeInstanceOf(zod3.ZodDate)
    expect(v3Schema.parse(date)).toEqual(date)
    expect(() => v3Schema.parse('2024-01-01')).toThrow()
  })

  it('converts date with min/max', () => {
    const minDate = new Date('2024-01-01')
    const maxDate = new Date('2024-12-31')
    const v4Schema = zod4.date().min(minDate).max(maxDate)
    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse(new Date('2024-06-15'))).toEqual(new Date('2024-06-15'))
    expect(() => v3Schema.parse(new Date('2023-12-31'))).toThrow()
    expect(() => v3Schema.parse(new Date('2025-01-01'))).toThrow()
  })

  it('converts undefined schemas', () => {
    const v4Schema = zod4.undefined()
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodUndefined)
    expect(v3Schema.parse(undefined)).toBe(undefined)
    expect(() => v3Schema.parse(null)).toThrow()
  })

  it('converts null schemas', () => {
    const v4Schema = zod4.null()
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodNull)
    expect(v3Schema.parse(null)).toBe(null)
    expect(() => v3Schema.parse(undefined)).toThrow()
  })

  it('converts void schemas', () => {
    const v4Schema = zod4.void()
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodVoid)
    expect(v3Schema.parse(undefined)).toBe(undefined)
  })

  it('converts any schemas', () => {
    const v4Schema = zod4.any()
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodAny)
    expect(v3Schema.parse('anything')).toBe('anything')
    expect(v3Schema.parse(123)).toBe(123)
    expect(v3Schema.parse(null)).toBe(null)
  })

  it('converts unknown schemas', () => {
    const v4Schema = zod4.unknown()
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodUnknown)
    expect(v3Schema.parse('anything')).toBe('anything')
    expect(v3Schema.parse(123)).toBe(123)
  })

  it('converts never schemas', () => {
    const v4Schema = zod4.never()
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodNever)
    expect(() => v3Schema.parse('anything')).toThrow()
    expect(() => v3Schema.parse(null)).toThrow()
  })
})