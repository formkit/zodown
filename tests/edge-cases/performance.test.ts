import { describe, it, expect } from 'vitest'
import { z as zod4 } from 'zod'
import { zodown } from '../../src/zodown'

describe('Performance and Edge Cases', () => {
  it('performs efficiently on deeply nested schemas', () => {
    const createDeepSchema = (depth: number): zod4.ZodTypeAny => {
      if (depth === 0) {
        return zod4.string()
      }
      return zod4.array(createDeepSchema(depth - 1))
    }

    const v4Schema = createDeepSchema(10)
    const v3Schema = zodown(v4Schema)

    const testData = [[[[[[[[[['deep']]]]]]]]]]
    expect(v3Schema.parse(testData)).toEqual(testData)
  })

  it('handles unknown Zod types gracefully', () => {
    // Create a mock unknown type
    const unknownType = {
      _def: { typeName: 'CustomZodType' },
      parse: (data: any) => data,
      safeParse: (data: any) => ({ success: true, data }),
    } as any

    const result = zodown(unknownType)
    expect(result).toBeDefined()
  })

  it('handles large schemas efficiently', () => {
    const largeObjectSchema = zod4.object(
      Object.fromEntries(Array.from({ length: 100 }, (_, i) => [`field${i}`, zod4.string()]))
    )

    const v3Schema = zodown(largeObjectSchema)

    const testData = Object.fromEntries(
      Array.from({ length: 100 }, (_, i) => [`field${i}`, `value${i}`])
    )

    expect(v3Schema.parse(testData)).toEqual(testData)
  })

  it('handles schema with many union options', () => {
    const unionOptions = Array.from({ length: 20 }, (_, i) => zod4.literal(`option${i}`))
    const v4Schema = zod4.union(unionOptions as any)

    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse('option5')).toBe('option5')
    expect(v3Schema.parse('option19')).toBe('option19')
    expect(() => v3Schema.parse('option20')).toThrow()
  })

  it('handles mixed complexity schemas', () => {
    const v4Schema = zod4.object({
      id: zod4.string().uuid(),
      data: zod4.union([
        zod4.object({
          type: zod4.literal('simple'),
          value: zod4.string(),
        }),
        zod4.object({
          type: zod4.literal('array'),
          items: zod4.array(zod4.number()),
        }),
        zod4.object({
          type: zod4.literal('nested'),
          children: zod4.lazy(() => v4Schema).array(),
        }),
      ]),
      metadata: zod4.record(zod4.unknown()).optional(),
      timestamps: zod4.object({
        created: zod4.date(),
        updated: zod4.date().optional(),
      }),
    })

    const v3Schema = zodown(v4Schema)

    const testData = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      data: {
        type: 'array' as const,
        items: [1, 2, 3],
      },
      timestamps: {
        created: new Date(),
      },
    }

    expect(v3Schema.parse(testData)).toEqual(testData)
  })
})
