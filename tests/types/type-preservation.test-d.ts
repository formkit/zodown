import { describe, it, expectTypeOf } from 'vitest'
import { z as zod4 } from 'zod'
import { z as zod3 } from 'zod/v3'
import { zodown } from '../../src/zodown'

describe('Type Preservation', () => {
  describe('Primitive Types', () => {
    it('should preserve string type', () => {
      const v4Schema = zod4.string()
      const v3Schema = zodown(v4Schema)
      
      expectTypeOf(v3Schema).toEqualTypeOf<zod3.ZodString>()
      expectTypeOf(v3Schema.parse('test')).toEqualTypeOf<string>()
    })

    it('should preserve number type', () => {
      const v4Schema = zod4.number()
      const v3Schema = zodown(v4Schema)
      
      expectTypeOf(v3Schema).toEqualTypeOf<zod3.ZodNumber>()
      expectTypeOf(v3Schema.parse(42)).toEqualTypeOf<number>()
    })

    it('should preserve boolean type', () => {
      const v4Schema = zod4.boolean()
      const v3Schema = zodown(v4Schema)
      
      expectTypeOf(v3Schema).toEqualTypeOf<zod3.ZodBoolean>()
      expectTypeOf(v3Schema.parse(true)).toEqualTypeOf<boolean>()
    })

    it('should preserve literal type', () => {
      const v4Schema = zod4.literal('hello')
      const v3Schema = zodown(v4Schema)
      
      expectTypeOf(v3Schema).toEqualTypeOf<zod3.ZodLiteral<'hello'>>()
      expectTypeOf(v3Schema.parse('hello')).toEqualTypeOf<'hello'>()
    })
  })

  describe('Array Types', () => {
    it('should preserve array of primitives', () => {
      const v4Schema = zod4.array(zod4.number())
      const v3Schema = zodown(v4Schema)
      
      // This should fail with current implementation (returns ZodArray<any>)
      expectTypeOf(v3Schema).toEqualTypeOf<zod3.ZodArray<zod3.ZodNumber>>()
      expectTypeOf(v3Schema.parse([1, 2, 3])).toEqualTypeOf<number[]>()
    })

    it('should preserve array of strings', () => {
      const v4Schema = zod4.array(zod4.string())
      const v3Schema = zodown(v4Schema)
      
      expectTypeOf(v3Schema).toEqualTypeOf<zod3.ZodArray<zod3.ZodString>>()
      expectTypeOf(v3Schema.parse(['a', 'b'])).toEqualTypeOf<string[]>()
    })

    it('should preserve nested arrays', () => {
      const v4Schema = zod4.array(zod4.array(zod4.boolean()))
      const v3Schema = zodown(v4Schema)
      
      expectTypeOf(v3Schema).toEqualTypeOf<zod3.ZodArray<zod3.ZodArray<zod3.ZodBoolean>>>()
      expectTypeOf(v3Schema.parse([[true, false]])).toEqualTypeOf<boolean[][]>()
    })
  })

  describe('Object Types', () => {
    it('should preserve object shape', () => {
      const v4Schema = zod4.object({
        name: zod4.string(),
        age: zod4.number(),
        active: zod4.boolean()
      })
      const v3Schema = zodown(v4Schema)
      
      expectTypeOf(v3Schema).toEqualTypeOf<zod3.ZodObject<{
        name: zod3.ZodString
        age: zod3.ZodNumber
        active: zod3.ZodBoolean
      }>>()
      
      expectTypeOf(v3Schema.parse({
        name: 'test',
        age: 25,
        active: true
      })).toEqualTypeOf<{
        name: string
        age: number
        active: boolean
      }>()
    })

    it('should preserve nested objects', () => {
      const v4Schema = zod4.object({
        user: zod4.object({
          id: zod4.number(),
          profile: zod4.object({
            bio: zod4.string()
          })
        })
      })
      const v3Schema = zodown(v4Schema)
      
      expectTypeOf(v3Schema.parse({
        user: {
          id: 1,
          profile: {
            bio: 'hello'
          }
        }
      })).toEqualTypeOf<{
        user: {
          id: number
          profile: {
            bio: string
          }
        }
      }>()
    })
  })

  describe('Optional and Nullable', () => {
    it('should preserve optional type', () => {
      const v4Schema = zod4.string().optional()
      const v3Schema = zodown(v4Schema)
      
      expectTypeOf(v3Schema).toEqualTypeOf<zod3.ZodOptional<zod3.ZodString>>()
      expectTypeOf(v3Schema.parse(undefined)).toEqualTypeOf<string | undefined>()
    })

    it('should preserve nullable type', () => {
      const v4Schema = zod4.number().nullable()
      const v3Schema = zodown(v4Schema)
      
      expectTypeOf(v3Schema).toEqualTypeOf<zod3.ZodNullable<zod3.ZodNumber>>()
      expectTypeOf(v3Schema.parse(null)).toEqualTypeOf<number | null>()
    })

    it('should preserve optional nullable type', () => {
      const v4Schema = zod4.boolean().nullable().optional()
      const v3Schema = zodown(v4Schema)
      
      expectTypeOf(v3Schema).toEqualTypeOf<zod3.ZodOptional<zod3.ZodNullable<zod3.ZodBoolean>>>()
      expectTypeOf(v3Schema.parse(undefined)).toEqualTypeOf<boolean | null | undefined>()
    })
  })

  describe('Union and Intersection', () => {
    it('should preserve union types', () => {
      const v4Schema = zod4.union([zod4.string(), zod4.number()])
      const v3Schema = zodown(v4Schema)
      
      expectTypeOf(v3Schema).toEqualTypeOf<zod3.ZodUnion<[zod3.ZodString, zod3.ZodNumber]>>()
      
      const result = v3Schema.parse('test' as string | number)
      expectTypeOf(result).toEqualTypeOf<string | number>()
    })

    it('should preserve intersection types', () => {
      const v4Schema = zod4.intersection(
        zod4.object({ a: zod4.string() }),
        zod4.object({ b: zod4.number() })
      )
      const v3Schema = zodown(v4Schema)
      
      expectTypeOf(v3Schema).toEqualTypeOf<zod3.ZodIntersection<
        zod3.ZodObject<{ a: zod3.ZodString }>,
        zod3.ZodObject<{ b: zod3.ZodNumber }>
      >>()
      
      expectTypeOf(v3Schema.parse({ a: 'test', b: 42 })).toEqualTypeOf<{
        a: string
        b: number
      }>()
    })
  })

  describe('Record Types', () => {
    it('should preserve record with value type only', () => {
      const v4Schema = zod4.record(zod4.number())
      const v3Schema = zodown(v4Schema)
      
      expectTypeOf(v3Schema).toEqualTypeOf<zod3.ZodRecord<zod3.ZodString, zod3.ZodNumber>>()
      expectTypeOf(v3Schema.parse({ a: 1, b: 2 })).toEqualTypeOf<Record<string, number>>()
    })

    it('should preserve record with key and value types', () => {
      const v4Schema = zod4.record(zod4.string(), zod4.boolean())
      const v3Schema = zodown(v4Schema)
      
      expectTypeOf(v3Schema).toEqualTypeOf<zod3.ZodRecord<zod3.ZodString, zod3.ZodBoolean>>()
      expectTypeOf(v3Schema.parse({ foo: true })).toEqualTypeOf<Record<string, boolean>>()
    })
  })

  describe('Tuple Types', () => {
    it('should preserve tuple types', () => {
      const v4Schema = zod4.tuple([zod4.string(), zod4.number(), zod4.boolean()])
      const v3Schema = zodown(v4Schema)
      
      expectTypeOf(v3Schema).toEqualTypeOf<zod3.ZodTuple<[
        zod3.ZodString,
        zod3.ZodNumber,
        zod3.ZodBoolean
      ]>>()
      
      expectTypeOf(v3Schema.parse(['test', 42, true])).toEqualTypeOf<[string, number, boolean]>()
    })
  })

  describe('Complex Nested Types', () => {
    it('should preserve complex nested structures', () => {
      const v4Schema = zod4.object({
        items: zod4.array(zod4.object({
          id: zod4.number(),
          tags: zod4.array(zod4.string()),
          metadata: zod4.record(zod4.unknown()).optional()
        })),
        count: zod4.number(),
        active: zod4.boolean().nullable()
      })
      
      const v3Schema = zodown(v4Schema)
      
      type ExpectedType = {
        items: Array<{
          id: number
          tags: string[]
          metadata?: Record<string, unknown>
        }>
        count: number
        active: boolean | null
      }
      
      expectTypeOf(v3Schema.parse({
        items: [{ id: 1, tags: ['a', 'b'] }],
        count: 1,
        active: null
      })).toEqualTypeOf<ExpectedType>()
    })
  })
})