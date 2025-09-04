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

    expect(v3Schema.parse(['hello'])).toEqual(['hello'])
    expect(v3Schema.parse(['hello', 42])).toEqual(['hello', 42])
    expect(v3Schema.parse(['hello', 42, true])).toEqual(['hello', 42, true])
  })
})