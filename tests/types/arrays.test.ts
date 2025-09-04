import { describe, it, expect } from 'vitest'
import { z as zod4 } from 'zod'
import { z as zod3 } from 'zod/v3'
import { zodown } from '../../src/zodown'

describe('Array Types', () => {
  it('converts array schemas', () => {
    const v4Schema = zod4.array(zod4.string())
    const v3Schema = zodown(v4Schema)

    expect(v3Schema).toBeInstanceOf(zod3.ZodArray)
    expect(v3Schema.parse(['a', 'b', 'c'])).toEqual(['a', 'b', 'c'])
    expect(() => v3Schema.parse(['a', 1, 'c'])).toThrow()
  })

  it('converts array with length constraints', () => {
    const v4Schema = zod4.array(zod4.number()).min(2).max(5)
    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse([1, 2, 3])).toEqual([1, 2, 3])
    expect(() => v3Schema.parse([1])).toThrow()
    expect(() => v3Schema.parse([1, 2, 3, 4, 5, 6])).toThrow()
  })

  it('converts nested arrays', () => {
    const v4Schema = zod4.array(zod4.array(zod4.boolean()))
    const v3Schema = zodown(v4Schema)

    expect(
      v3Schema.parse([
        [true, false],
        [false, true],
      ])
    ).toEqual([
      [true, false],
      [false, true],
    ])
    expect(() => v3Schema.parse([[true, 'false']])).toThrow()
  })

  it('converts array with nonempty constraint', () => {
    const v4Schema = zod4.array(zod4.string()).nonempty()
    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse(['a'])).toEqual(['a'])
    expect(() => v3Schema.parse([])).toThrow()
  })

  it('converts array with exact length', () => {
    const v4Schema = zod4.array(zod4.number()).length(3)
    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse([1, 2, 3])).toEqual([1, 2, 3])
    expect(() => v3Schema.parse([1, 2])).toThrow()
    expect(() => v3Schema.parse([1, 2, 3, 4])).toThrow()
  })

  it('converts array with complex element types', () => {
    const v4Schema = zod4.array(
      zod4.object({
        id: zod4.number(),
        name: zod4.string(),
      })
    )
    const v3Schema = zodown(v4Schema)

    const data = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]
    expect(v3Schema.parse(data)).toEqual(data)
    expect(() => v3Schema.parse([{ id: '1', name: 'Alice' }])).toThrow()
  })
})
