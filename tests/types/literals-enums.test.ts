import { describe, it, expect } from 'vitest'
import { z as zod4 } from 'zod'
import { z as zod3 } from 'zod/v3'
import { zodown } from '../../src/zodown'

describe('Literal and Enum Types', () => {
  it('converts literal schemas', () => {
    const v4Schema = zod4.literal('exact-value')
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodLiteral)
    expect(v3Schema.parse('exact-value')).toBe('exact-value')
    expect(() => v3Schema.parse('other-value')).toThrow()
  })

  it('converts number literal schemas', () => {
    const v4Schema = zod4.literal(42)
    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse(42)).toBe(42)
    expect(() => v3Schema.parse(43)).toThrow()
  })

  it('converts enum schemas', () => {
    const v4Schema = zod4.enum(['option1', 'option2', 'option3'])
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodEnum)
    expect(v3Schema.parse('option1')).toBe('option1')
    expect(v3Schema.parse('option2')).toBe('option2')
    expect(() => v3Schema.parse('option4')).toThrow()
  })

  it('converts native enum schemas', () => {
    enum TestEnum {
      A = 'a',
      B = 'b',
      C = 'c',
    }

    const v4Schema = zod4.nativeEnum(TestEnum)
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodNativeEnum)
    expect(v3Schema.parse(TestEnum.A)).toBe('a')
    expect(v3Schema.parse('b')).toBe('b')
    expect(() => v3Schema.parse('d')).toThrow()
  })

  it('converts numeric native enum schemas', () => {
    enum NumericEnum {
      Zero = 0,
      One = 1,
      Two = 2,
    }

    const v4Schema = zod4.nativeEnum(NumericEnum)
    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse(0)).toBe(0)
    expect(v3Schema.parse(1)).toBe(1)
    expect(() => v3Schema.parse(3)).toThrow()
  })

  it('converts mixed native enum schemas', () => {
    enum MixedEnum {
      StringVal = 'string',
      NumberVal = 42,
    }

    const v4Schema = zod4.nativeEnum(MixedEnum)
    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse('string')).toBe('string')
    expect(v3Schema.parse(42)).toBe(42)
    expect(() => v3Schema.parse('other')).toThrow()
  })
})
