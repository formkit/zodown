import { describe, it, expect } from 'vitest'
import { z as zod4 } from 'zod'
import { zodown, type InferDowngraded } from '../../src/zodown'

describe('Real-world Examples', () => {
  it('converts a typical API request schema', () => {
    const v4Schema = zod4.object({
      method: zod4.enum(['GET', 'POST', 'PUT', 'DELETE']),
      url: zod4.string().url(),
      headers: zod4.record(zod4.string()).optional(),
      body: zod4
        .union([
          zod4.string(),
          zod4.object({}).passthrough(),
          zod4.array(zod4.unknown()),
        ])
        .optional(),
      timeout: zod4.number().positive().optional(),
      retries: zod4.number().int().min(0).max(5).default(3),
    })

    const v3Schema = zodown(v4Schema)

    const request = {
      method: 'POST' as const,
      url: 'https://api.example.com/users',
      headers: { 'Content-Type': 'application/json' },
      body: { name: 'John', email: 'john@example.com' },
      timeout: 5000,
    }

    expect(v3Schema.parse(request)).toEqual({ ...request, retries: 3 })
  })

  it('converts a user authentication schema', () => {
    const v4Schema = zod4.discriminatedUnion('type', [
      zod4.object({
        type: zod4.literal('password'),
        username: zod4.string().min(3),
        password: zod4.string().min(8),
      }),
      zod4.object({
        type: zod4.literal('oauth'),
        provider: zod4.enum(['google', 'github', 'facebook']),
        token: zod4.string(),
      }),
      zod4.object({
        type: zod4.literal('api-key'),
        key: zod4.string().regex(/^[A-Za-z0-9]{32}$/),
      }),
    ])

    const v3Schema = zodown(v4Schema)

    expect(v3Schema.parse({
      type: 'password',
      username: 'user123',
      password: 'securepass',
    })).toEqual({
      type: 'password',
      username: 'user123',
      password: 'securepass',
    })

    expect(v3Schema.parse({
      type: 'oauth',
      provider: 'github',
      token: 'ghp_xxxxxxxxxxxx',
    })).toEqual({
      type: 'oauth',
      provider: 'github',
      token: 'ghp_xxxxxxxxxxxx',
    })
  })

  it('converts a database model schema', () => {
    const baseModelSchema = zod4.object({
      id: zod4.string().uuid(),
      createdAt: zod4.date(),
      updatedAt: zod4.date(),
      deletedAt: zod4.date().nullable().optional(),
    })

    const userSchema = baseModelSchema.extend({
      email: zod4.string().email(),
      username: zod4.string().min(3).max(20),
      profile: zod4.object({
        firstName: zod4.string(),
        lastName: zod4.string(),
        bio: zod4.string().max(500).optional(),
        avatar: zod4.string().url().optional(),
      }),
      settings: zod4.object({
        notifications: zod4.boolean().default(true),
        theme: zod4.enum(['light', 'dark', 'auto']).default('auto'),
        language: zod4.string().default('en'),
      }).default({}),
    })

    const v3Schema = zodown(userSchema)

    const user = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15'),
      email: 'user@example.com',
      username: 'johndoe',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
      },
    }

    const parsed = v3Schema.parse(user)
    expect(parsed.settings.notifications).toBe(true)
    expect(parsed.settings.theme).toBe('auto')
  })

  it('preserves type information through InferDowngraded helper', () => {
    const v4Schema = zod4.object({
      name: zod4.string(),
      age: zod4.number(),
      tags: zod4.array(zod4.string()),
      metadata: zod4.record(zod4.unknown()).optional(),
    })

    const v3Schema = zodown(v4Schema)

    type V3Type = InferDowngraded<typeof v4Schema>

    const data: V3Type = {
      name: 'Test',
      age: 25,
      tags: ['a', 'b'],
    }

    expect(v3Schema.parse(data)).toEqual(data)
  })

  it('converts form validation schema', () => {
    const v4Schema = zod4.object({
      email: zod4.string().email('Invalid email address'),
      password: zod4
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain uppercase letter')
        .regex(/[0-9]/, 'Must contain number'),
      confirmPassword: zod4.string(),
      acceptTerms: zod4.boolean().refine((val) => val === true, {
        message: 'You must accept the terms',
      }),
      newsletter: zod4.boolean().optional(),
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    })

    const v3Schema = zodown(v4Schema)

    const validForm = {
      email: 'user@example.com',
      password: 'SecurePass123',
      confirmPassword: 'SecurePass123',
      acceptTerms: true,
    }

    expect(v3Schema.parse(validForm)).toEqual(validForm)

    expect(() =>
      v3Schema.parse({
        ...validForm,
        confirmPassword: 'DifferentPass123',
      })
    ).toThrow()
  })
})