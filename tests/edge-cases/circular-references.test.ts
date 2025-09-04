import { describe, it, expect } from 'vitest'
import { z as zod4 } from 'zod'
import { z as zod3 } from 'zod/v3'
import { zodown } from '../../src/zodown'

describe('Circular References and Lazy Types', () => {
  it('converts lazy schemas', () => {
    type Node = {
      value: string
      children?: Node[]
    }

    const v4Schema: zod4.ZodType<Node> = zod4.lazy(() =>
      zod4.object({
        value: zod4.string(),
        children: zod4.array(v4Schema).optional(),
      })
    )

    const v3Schema = zodown(v4Schema)

    const testData: Node = {
      value: 'root',
      children: [{ value: 'child1' }, { value: 'child2', children: [{ value: 'grandchild' }] }],
    }

    expect(v3Schema.parse(testData)).toEqual(testData)
  })

  it('handles circular references with caching', () => {
    const baseSchema = zod4.object({
      id: zod4.string(),
      name: zod4.string(),
    })

    const v3Schema1 = zodown(baseSchema)
    const v3Schema2 = zodown(baseSchema)

    // Both should work independently
    expect(v3Schema1.parse({ id: '1', name: 'test' })).toEqual({ id: '1', name: 'test' })
    expect(v3Schema2.parse({ id: '2', name: 'test2' })).toEqual({ id: '2', name: 'test2' })
  })

  it('converts recursive tree structures', () => {
    interface TreeNode {
      type: 'leaf' | 'branch'
      value?: string
      left?: TreeNode
      right?: TreeNode
    }

    const treeSchema: zod4.ZodType<TreeNode> = zod4.lazy(() =>
      zod4.union([
        zod4.object({
          type: zod4.literal('leaf'),
          value: zod4.string(),
        }),
        zod4.object({
          type: zod4.literal('branch'),
          left: treeSchema.optional(),
          right: treeSchema.optional(),
        }),
      ])
    )

    const v3Schema = zodown(treeSchema)

    const testTree: TreeNode = {
      type: 'branch',
      left: {
        type: 'leaf',
        value: 'left-value',
      },
      right: {
        type: 'branch',
        left: {
          type: 'leaf',
          value: 'right-left-value',
        },
      },
    }

    expect(v3Schema.parse(testTree)).toEqual(testTree)
  })

  it('handles mutually recursive schemas', () => {
    interface A {
      type: 'A'
      b?: B
    }
    interface B {
      type: 'B'
      a?: A
    }

    const aSchema: zod4.ZodType<A> = zod4.lazy(() =>
      zod4.object({
        type: zod4.literal('A'),
        b: bSchema.optional(),
      })
    )

    const bSchema: zod4.ZodType<B> = zod4.lazy(() =>
      zod4.object({
        type: zod4.literal('B'),
        a: aSchema.optional(),
      })
    )

    const v3SchemaA = zodown(aSchema)
    const v3SchemaB = zodown(bSchema)

    const testDataA: A = {
      type: 'A',
      b: {
        type: 'B',
        a: {
          type: 'A',
        },
      },
    }

    const testDataB: B = {
      type: 'B',
      a: {
        type: 'A',
        b: {
          type: 'B',
        },
      },
    }

    expect(v3SchemaA.parse(testDataA)).toEqual(testDataA)
    expect(v3SchemaB.parse(testDataB)).toEqual(testDataB)
  })
})