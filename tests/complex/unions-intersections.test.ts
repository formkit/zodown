import { describe, it, expect } from 'vitest'
import { z as zod4 } from 'zod'
import { z as zod3 } from 'zod/v3'
import { zodown } from '../../src/zodown'

describe('Union and Intersection Types', () => {
  it('converts union schemas', () => {
    const v4Schema = zod4.union([zod4.string(), zod4.number()])
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodUnion)
    expect(v3Schema.parse('hello')).toBe('hello')
    expect(v3Schema.parse(42)).toBe(42)
    expect(() => v3Schema.parse(true)).toThrow()
  })

  it('converts discriminated union schemas', () => {
    const v4Schema = zod4.discriminatedUnion('type', [
      zod4.object({ type: zod4.literal('text'), content: zod4.string() }),
      zod4.object({ type: zod4.literal('number'), value: zod4.number() }),
    ])
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodDiscriminatedUnion)
    expect(v3Schema.parse({ type: 'text', content: 'hello' })).toEqual({
      type: 'text',
      content: 'hello',
    })
    expect(v3Schema.parse({ type: 'number', value: 42 })).toEqual({ type: 'number', value: 42 })
  })

  it('converts intersection schemas', () => {
    const v4Schema = zod4.intersection(
      zod4.object({ name: zod4.string() }),
      zod4.object({ age: zod4.number() })
    )
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodIntersection)
    expect(v3Schema.parse({ name: 'Alice', age: 30 })).toEqual({ name: 'Alice', age: 30 })
    expect(() => v3Schema.parse({ name: 'Alice' })).toThrow()
  })

  it('converts complex union with multiple types', () => {
    const v4Schema = zod4.union([
      zod4.string(),
      zod4.number(),
      zod4.boolean(),
      zod4.null(),
      zod4.undefined(),
    ])
    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse('text')).toBe('text')
    expect(v3Schema.parse(123)).toBe(123)
    expect(v3Schema.parse(true)).toBe(true)
    expect(v3Schema.parse(null)).toBe(null)
    expect(v3Schema.parse(undefined)).toBe(undefined)
    expect(() => v3Schema.parse([])).toThrow()
  })

  it('converts nested unions and intersections', () => {
    const v4Schema = zod4.union([
      zod4.string(),
      zod4.intersection(
        zod4.object({ type: zod4.literal('complex') }),
        zod4.object({ data: zod4.array(zod4.number()) })
      ),
    ])
    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse('simple')).toBe('simple')
    expect(v3Schema.parse({ type: 'complex', data: [1, 2, 3] })).toEqual({
      type: 'complex',
      data: [1, 2, 3],
    })
  })
})