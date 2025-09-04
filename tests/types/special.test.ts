import { describe, it, expect } from 'vitest'
import { z as zod4 } from 'zod'
import { z as zod3 } from 'zod/v3'
import { zodown } from '../../src/zodown'

describe('Special Types', () => {
  it('converts Map schemas', () => {
    const v4Schema = zod4.map(zod4.string(), zod4.number())
    const v3Schema = zodown(v4Schema)

    const map = new Map([
      ['a', 1],
      ['b', 2],
    ])
    expect(v3Schema).toBeInstanceOf(zod3.ZodMap)
    expect(v3Schema.parse(map)).toEqual(map)
  })

  it('converts Set schemas', () => {
    const v4Schema = zod4.set(zod4.string())
    const v3Schema = zodown(v4Schema)

    const set = new Set(['a', 'b', 'c'])
    expect(v3Schema).toBeInstanceOf(zod3.ZodSet)
    expect(v3Schema.parse(set)).toEqual(set)
  })

  it('converts Promise schemas', () => {
    const v4Schema = zod4.promise(zod4.string())
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodPromise)
    expect(v3Schema.parse(Promise.resolve('test'))).toBeInstanceOf(Promise)
  })

  it('converts function schemas', () => {
    // Note: Zod v4 uses different syntax for functions
    const v4Schema = zod4.function([zod4.string(), zod4.number()], zod4.boolean())
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodFunction)

    // v3 function validation works differently, just check the type
    expect(v3Schema).toBeDefined()
  })

  it('converts branded types', () => {
    const v4Schema = zod4.string().brand<'UserId'>()
    const v3Schema = zodown(v4Schema)

    // Note: In v4, branding is purely type-level with no runtime representation
    // So we can't convert it to v3's ZodBranded. The schema remains a ZodString
    expect(v3Schema).toBeInstanceOf(zod3.ZodString)
    expect(v3Schema.parse('user123')).toBe('user123')

    // This is a known limitation - v4 brands are compile-time only
  })

  it('converts readonly schemas', () => {
    const v4Schema = zod4
      .object({
        name: zod4.string(),
        age: zod4.number(),
      })
      .readonly()

    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodReadonly)
    const data = { name: 'Alice', age: 30 }
    expect(v3Schema.parse(data)).toEqual(data)
  })

  it('converts pipeline schemas', () => {
    const v4Schema = zod4.string().pipe(zod4.coerce.number())
    const v3Schema = zodown(v4Schema)

    // Pipeline gets converted to the output schema
    expect(v3Schema.parse('42')).toBe(42)
  })
})
