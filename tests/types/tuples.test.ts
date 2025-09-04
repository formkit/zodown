import { describe, it, expect } from 'vitest'
import { z as zod4 } from 'zod'
import { z as zod3 } from 'zod/v3'
import { zodown } from '../../src/zodown'

describe('Tuple Types', () => {
  it('converts tuple schemas', () => {
    const v4Schema = zod4.tuple([zod4.string(), zod4.number(), zod4.boolean()])
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodTuple)
    expect(v3Schema.parse(['hello', 42, true])).toEqual(['hello', 42, true])
    expect(() => v3Schema.parse(['hello', '42', true])).toThrow()
  })

  it('converts empty tuple', () => {
    const v4Schema = zod4.tuple([])
    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse([])).toEqual([])
    expect(() => v3Schema.parse(['extra'])).toThrow()
  })

  it('converts tuple with rest elements', () => {
    const v4Schema = zod4.tuple([zod4.string(), zod4.number()]).rest(zod4.boolean())
    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse(['hello', 42, true, false, true])).toEqual([
      'hello',
      42,
      true,
      false,
      true,
    ])
    expect(() => v3Schema.parse(['hello', 42, 'not-boolean'])).toThrow()
  })

  it('converts tuple with optional elements', () => {
    const v4Schema = zod4.tuple([
      zod4.string(),
      zod4.number().optional(),
      zod4.boolean().optional(),
    ])
    const v3Schema = zodown(v4Schema)

    // Note: v3 tuples require all elements to be present (undefined for optional)
    // This is a known limitation - v4 allows variable length, v3 doesn't
    expect(v3Schema.parse(['hello', undefined, undefined])).toEqual(['hello', undefined, undefined])
    expect(v3Schema.parse(['hello', 42, undefined])).toEqual(['hello', 42, undefined])
    expect(v3Schema.parse(['hello', 42, true])).toEqual(['hello', 42, true])

    // These would work in v4 but not in v3 - this is expected
    expect(() => v3Schema.parse(['hello'])).toThrow()
    expect(() => v3Schema.parse(['hello', 42])).toThrow()
  })
})
