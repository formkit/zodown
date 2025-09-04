import { describe, it, expect } from 'vitest'
import { z as zod4 } from 'zod'
import { z as zod3 } from 'zod/v3'
import { zodown } from '../../src/zodown'

describe('Record Types', () => {
  it('converts record schemas', () => {
    const v4Schema = zod4.record(zod4.number())
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodRecord)
    expect(v3Schema.parse({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
    expect(() => v3Schema.parse({ a: '1' })).toThrow()
  })

  it('converts record with key validation', () => {
    const v4Schema = zod4.record(zod4.string().min(3), zod4.boolean())
    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse({ abc: true, xyz: false })).toEqual({ abc: true, xyz: false })
    expect(() => v3Schema.parse({ ab: true })).toThrow()
  })

  it('converts record with complex value types', () => {
    const v4Schema = zod4.record(
      zod4.object({
        name: zod4.string(),
        active: zod4.boolean(),
      })
    )
    const v3Schema = zodown(v4Schema)

    const data = {
      user1: { name: 'Alice', active: true },
      user2: { name: 'Bob', active: false },
    }
    expect(v3Schema.parse(data)).toEqual(data)
  })

  it('converts record with enum keys', () => {
    const v4Schema = zod4.record(zod4.enum(['small', 'medium', 'large']), zod4.number())
    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse({ small: 10, medium: 20, large: 30 })).toEqual({
      small: 10,
      medium: 20,
      large: 30,
    })
    expect(() => v3Schema.parse({ extraLarge: 40 })).toThrow()
  })
})