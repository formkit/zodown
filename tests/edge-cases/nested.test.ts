import { describe, it, expect } from 'vitest'
import { z as zod4 } from 'zod'
import { z as zod3 } from 'zod/v3'
import { zodown } from '../../src/zodown'

describe('Deeply Nested Schemas', () => {
  it('handles deeply nested objects', () => {
    const v4Schema = zod4.object({
      level1: zod4.object({
        level2: zod4.object({
          level3: zod4.object({
            level4: zod4.object({
              value: zod4.string(),
            }),
          }),
        }),
      }),
    })

    const v3Schema = zodown(v4Schema)
    const testData = {
      level1: {
        level2: {
          level3: {
            level4: {
              value: 'deep',
            },
          },
        },
      },
    }

    expect(v3Schema.parse(testData)).toEqual(testData)
  })

  it('handles nested arrays of objects', () => {
    const v4Schema = zod4.array(
      zod4.object({
        children: zod4.array(
          zod4.object({
            items: zod4.array(zod4.string()),
          })
        ),
      })
    )

    const v3Schema = zodown(v4Schema)
    const testData = [
      {
        children: [{ items: ['a', 'b'] }, { items: ['c', 'd'] }],
      },
      {
        children: [{ items: ['e', 'f'] }],
      },
    ]

    expect(v3Schema.parse(testData)).toEqual(testData)
  })

  it('handles nested unions and intersections', () => {
    const v4Schema = zod4.object({
      data: zod4.union([
        zod4.object({
          type: zod4.literal('simple'),
          value: zod4.string(),
        }),
        zod4.object({
          type: zod4.literal('complex'),
          nested: zod4.intersection(
            zod4.object({ id: zod4.number() }),
            zod4.object({ name: zod4.string() })
          ),
        }),
      ]),
    })

    const v3Schema = zodown(v4Schema)

    expect(
      v3Schema.parse({
        data: { type: 'simple', value: 'test' },
      })
    ).toEqual({
      data: { type: 'simple', value: 'test' },
    })

    expect(
      v3Schema.parse({
        data: { type: 'complex', nested: { id: 1, name: 'test' } },
      })
    ).toEqual({
      data: { type: 'complex', nested: { id: 1, name: 'test' } },
    })
  })

  it('handles nested optional and nullable modifiers', () => {
    const v4Schema = zod4.object({
      required: zod4.object({
        optional: zod4
          .object({
            nullable: zod4.string().nullable(),
          })
          .optional(),
      }),
    })

    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse({ required: {} })).toEqual({ required: {} })
    expect(v3Schema.parse({ required: { optional: { nullable: null } } })).toEqual({
      required: { optional: { nullable: null } },
    })
    expect(v3Schema.parse({ required: { optional: { nullable: 'value' } } })).toEqual({
      required: { optional: { nullable: 'value' } },
    })
  })

  it('handles nested records and tuples', () => {
    const v4Schema = zod4.record(
      zod4.tuple([zod4.string(), zod4.record(zod4.number()), zod4.array(zod4.boolean())])
    )

    const v3Schema = zodown(v4Schema)
    const testData = {
      key1: ['value', { a: 1, b: 2 }, [true, false]],
      key2: ['another', { c: 3 }, [false]],
    }

    expect(v3Schema.parse(testData)).toEqual(testData)
  })

  it('handles nested transforms and refinements', () => {
    const v4Schema = zod4.object({
      items: zod4
        .array(
          zod4
            .string()
            .transform((s) => s.trim())
            .refine((s) => s.length > 0, 'Cannot be empty')
        )
        .transform((arr) => arr.map((s) => s.toUpperCase())),
    })

    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse({ items: ['  hello  ', '  world  '] })).toEqual({
      items: ['HELLO', 'WORLD'],
    })
  })
})
