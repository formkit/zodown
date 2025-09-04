import { z as zod4 } from 'zod'
import { z as zod3 } from 'zod/v3'

type AnyZodV4Schema = zod4.ZodTypeAny
type AnyZodV3Schema = zod3.ZodTypeAny

/**
 * Maps Zod v4 types to their v3 equivalents for type inference
 */
type DowngradeType<T extends AnyZodV4Schema> = T extends zod4.ZodString
  ? zod3.ZodString
  : T extends zod4.ZodNumber
    ? zod3.ZodNumber
    : T extends zod4.ZodBoolean
      ? zod3.ZodBoolean
      : T extends zod4.ZodDate
        ? zod3.ZodDate
        : T extends zod4.ZodUndefined
          ? zod3.ZodUndefined
          : T extends zod4.ZodNull
            ? zod3.ZodNull
            : T extends zod4.ZodAny
              ? zod3.ZodAny
              : T extends zod4.ZodUnknown
                ? zod3.ZodUnknown
                : T extends zod4.ZodNever
                  ? zod3.ZodNever
                  : T extends zod4.ZodVoid
                    ? zod3.ZodVoid
                    : T extends zod4.ZodLiteral<infer L>
                      ? zod3.ZodLiteral<L>
                      : T extends zod4.ZodEnum<any>
                        ? zod3.ZodEnum<any>
                        : T extends zod4.ZodOptional<any>
                          ? zod3.ZodOptional<any>
                          : T extends zod4.ZodNullable<any>
                            ? zod3.ZodNullable<any>
                            : T extends zod4.ZodDefault<any>
                              ? zod3.ZodDefault<any>
                              : T extends zod4.ZodArray<any>
                                ? zod3.ZodArray<any>
                                : T extends zod4.ZodObject<any>
                                  ? zod3.ZodObject<any>
                                  : T extends zod4.ZodRecord<any, any>
                                    ? zod3.ZodRecord<any>
                                    : T extends zod4.ZodTuple<any>
                                      ? zod3.ZodTuple<any>
                                      : T extends zod4.ZodUnion<any>
                                        ? zod3.ZodUnion<any>
                                        : T extends zod4.ZodIntersection<any, any>
                                          ? zod3.ZodIntersection<any, any>
                                          : T extends zod4.ZodLazy<any>
                                            ? zod3.ZodLazy<any>
                                            : T extends zod4.ZodPromise<any>
                                              ? zod3.ZodPromise<any>
                                              : T extends zod4.ZodBigInt
                                                ? zod3.ZodBigInt
                                                : T extends zod4.ZodSymbol
                                                  ? zod3.ZodSymbol
                                                  : T extends zod4.ZodMap<any, any>
                                                    ? zod3.ZodMap
                                                    : T extends zod4.ZodSet<any>
                                                      ? zod3.ZodSet
                                                      : AnyZodV3Schema

/**
 * Converts a Zod v4 schema to a Zod v3 schema
 * Preserves type information and handles recursive schemas
 */
export function zodown<T extends AnyZodV4Schema>(schema: T): DowngradeType<T> {
  // Cache for handling circular references
  const cache = new WeakMap<AnyZodV4Schema, AnyZodV3Schema>()

  function downgrade(s: AnyZodV4Schema): AnyZodV3Schema {
    // Handle null/undefined
    if (!s) {
      return zod3.unknown()
    }

    // Check cache first
    if (cache.has(s)) {
      return cache.get(s)!
    }

    // Handle primitive types
    if (s instanceof zod4.ZodString) {
      const v3Schema = zod3.string()
      cache.set(s, v3Schema)

      // Copy refinements if any
      const checks = (s as any)._def.checks || []
      let result = v3Schema as any
      for (const check of checks) {
        // Handle superRefine (custom checks)
        // Note: v4 compiles superRefine into internal check functions that we can't
        // reverse-engineer. This is a known limitation - superRefine can't be converted.
        if (check._zod?.def?.check === 'custom' && typeof check._zod?.check === 'function') {
          // Skip - we can't convert compiled superRefine checks
          console.warn('Warning: superRefine cannot be converted from v4 to v3')
          continue
        }
        // Handle custom refinements
        if (check.type === 'custom' || check.constructor?.name === 'ZodCustom') {
          if (check._zod?.def?.fn) {
            const fn = check._zod.def.fn
            const errorFactory = check._zod.def.error
            const message = errorFactory ? errorFactory() : undefined
            result = result.refine(fn, message)
          } else if (check.check || check.fn) {
            const fn = check.check || check.fn
            const message = check.error || check.message
            result = result.refine(fn, message)
          }
        } else if (check._zod?.def) {
          // Zod v4 format - checks are stored in _zod.def
          const checkDef = check._zod.def
          switch (checkDef.check) {
            case 'min_length':
              result = result.min(checkDef.minimum, checkDef.error?.())
              break
            case 'max_length':
              result = result.max(checkDef.maximum, checkDef.error?.())
              break
            case 'exact_length':
              result = result.length(checkDef.length, checkDef.error?.())
              break
            case 'string_format':
              switch (checkDef.format) {
                case 'email':
                  result = result.email(checkDef.error?.())
                  break
                case 'url':
                  result = result.url(checkDef.error?.())
                  break
                case 'uuid':
                  result = result.uuid(checkDef.error?.())
                  break
                case 'starts_with':
                  result = result.startsWith(checkDef.prefix, checkDef.error?.())
                  break
                case 'ends_with':
                  result = result.endsWith(checkDef.suffix, checkDef.error?.())
                  break
              }
              break
            case 'regex':
              result = result.regex(checkDef.regex, checkDef.error?.())
              break
          }
        } else {
          // Fallback for old format
          switch (check.kind) {
            case 'min':
              result = result.min(check.value, check.message)
              break
            case 'max':
              result = result.max(check.value, check.message)
              break
            case 'length':
              result = result.length(check.value, check.message)
              break
            case 'email':
              result = result.email(check.message)
              break
            case 'url':
              result = result.url(check.message)
              break
            case 'uuid':
              result = result.uuid(check.message)
              break
            case 'regex':
              result = result.regex(check.regex, check.message)
              break
            case 'startsWith':
              result = result.startsWith(check.value, check.message)
              break
            case 'endsWith':
              result = result.endsWith(check.value, check.message)
              break
          }
        }
      }
      return result
    }

    if (s instanceof zod4.ZodNumber) {
      const v3Schema = zod3.number()
      cache.set(s, v3Schema)

      const checks = (s as any)._def.checks || []
      let result: any = v3Schema
      for (const check of checks) {
        // Handle superRefine (custom checks)
        // Note: v4 compiles superRefine into internal check functions that we can't
        // reverse-engineer. This is a known limitation - superRefine can't be converted.
        if (check._zod?.def?.check === 'custom' && typeof check._zod?.check === 'function') {
          // Skip - we can't convert compiled superRefine checks
          console.warn('Warning: superRefine cannot be converted from v4 to v3')
          continue
        }
        // Handle custom refinements
        if (check.type === 'custom' || check.constructor?.name === 'ZodCustom') {
          if (check._zod?.def?.fn) {
            const fn = check._zod.def.fn
            const errorFactory = check._zod.def.error
            const message = errorFactory ? errorFactory() : undefined
            result = result.refine(fn, message)
          } else if (check.check || check.fn) {
            const fn = check.check || check.fn
            const message = check.error || check.message
            result = result.refine(fn, message)
          }
        } else if (check._zod?.def) {
          // Zod v4 format - checks are stored in _zod.def
          const checkDef = check._zod.def
          switch (checkDef.check) {
            case 'number_format':
              if (checkDef.format === 'safeint') {
                result = result.int(checkDef.error?.())
              } else if (checkDef.format === 'finite') {
                result = result.finite(checkDef.error?.())
              }
              break
            case 'greater_than':
              if (checkDef.inclusive) {
                result = result.min(checkDef.value, checkDef.error?.())
              } else {
                result = result.gt(checkDef.value, checkDef.error?.())
              }
              break
            case 'less_than':
              if (checkDef.inclusive) {
                result = result.max(checkDef.value, checkDef.error?.())
              } else {
                result = result.lt(checkDef.value, checkDef.error?.())
              }
              break
            case 'multiple_of':
              result = result.multipleOf(checkDef.value, checkDef.error?.())
              break
          }
        } else {
          // Fallback for old format
          switch (check.kind) {
            case 'int':
              result = result.int(check.message)
              break
            case 'min':
              result = result.min(check.value, check.message)
              break
            case 'max':
              result = result.max(check.value, check.message)
              break
            case 'multipleOf':
              result = result.multipleOf(check.value, check.message)
              break
            case 'finite':
              result = result.finite(check.message)
              break
          }
        }
      }
      return result
    }

    if (s instanceof zod4.ZodBoolean) {
      const v3Schema = zod3.boolean()
      cache.set(s, v3Schema)
      return v3Schema
    }

    if (s instanceof zod4.ZodDate) {
      const v3Schema = zod3.date()
      cache.set(s, v3Schema)

      const checks = (s as any)._def.checks || []
      let result: any = v3Schema
      for (const check of checks) {
        if (check._zod?.def) {
          // Zod v4 format
          const checkDef = check._zod.def
          switch (checkDef.check) {
            case 'greater_than':
              if (checkDef.inclusive) {
                result = result.min(checkDef.value, checkDef.error?.())
              }
              break
            case 'less_than':
              if (checkDef.inclusive) {
                result = result.max(checkDef.value, checkDef.error?.())
              }
              break
          }
        } else {
          // Fallback for old format
          switch (check.kind) {
            case 'min':
              result = result.min(check.value, check.message)
              break
            case 'max':
              result = result.max(check.value, check.message)
              break
          }
        }
      }
      return result
    }

    if (s instanceof zod4.ZodBigInt) {
      const v3Schema = zod3.bigint()
      cache.set(s, v3Schema)
      return v3Schema
    }

    if (s instanceof zod4.ZodSymbol) {
      const v3Schema = zod3.symbol()
      cache.set(s, v3Schema)
      return v3Schema
    }

    if (s instanceof zod4.ZodUndefined) {
      const v3Schema = zod3.undefined()
      cache.set(s, v3Schema)
      return v3Schema
    }

    if (s instanceof zod4.ZodNull) {
      const v3Schema = zod3.null()
      cache.set(s, v3Schema)
      return v3Schema
    }

    if (s instanceof zod4.ZodAny) {
      const v3Schema = zod3.any()
      cache.set(s, v3Schema)
      return v3Schema
    }

    if (s instanceof zod4.ZodUnknown) {
      const v3Schema = zod3.unknown()
      cache.set(s, v3Schema)
      return v3Schema
    }

    if (s instanceof zod4.ZodNever) {
      const v3Schema = zod3.never()
      cache.set(s, v3Schema)
      return v3Schema
    }

    if (s instanceof zod4.ZodVoid) {
      const v3Schema = zod3.void()
      cache.set(s, v3Schema)
      return v3Schema
    }

    // Handle literal types
    if (s instanceof zod4.ZodLiteral) {
      const value = s.value
      const v3Schema = zod3.literal(value)
      cache.set(s, v3Schema)
      return v3Schema
    }

    // Handle enum types
    if (s instanceof zod4.ZodEnum) {
      const entries = (s as any)._def?.entries
      if (entries) {
        // Check if this is a native enum by seeing if keys match values
        // In regular enums, keys === values. In native enums, they don't.
        const entriesArray = Object.entries(entries)
        const isNativeEnum = !entriesArray.every(([key, value]) => key === value)

        if (isNativeEnum) {
          // Native enum - keys don't match values
          const v3Schema = zod3.nativeEnum(entries)
          cache.set(s, v3Schema)
          return v3Schema
        } else {
          // Regular enum - keys match values
          const values = s.options
          const v3Schema = zod3.enum(values as [string, ...string[]])
          cache.set(s, v3Schema)
          return v3Schema
        }
      } else if (s.options && Array.isArray(s.options)) {
        // Fallback for regular enum without entries
        const values = s.options
        const v3Schema = zod3.enum(values as [string, ...string[]])
        cache.set(s, v3Schema)
        return v3Schema
      }
    }

    // Handle wrapper types
    if (s instanceof zod4.ZodOptional) {
      const inner = (s as any)._def.innerType
      const v3Schema = downgrade(inner).optional()
      cache.set(s, v3Schema)
      return v3Schema
    }

    if (s instanceof zod4.ZodNullable) {
      const inner = (s as any)._def.innerType
      const v3Schema = downgrade(inner).nullable()
      cache.set(s, v3Schema)
      return v3Schema
    }

    if (s instanceof zod4.ZodDefault) {
      const inner = (s as any)._def.innerType
      const defaultValue = (s as any)._def.defaultValue
      const v3DefaultValue = typeof defaultValue === 'function' ? defaultValue() : defaultValue
      const v3Schema = downgrade(inner).default(v3DefaultValue)
      cache.set(s, v3Schema)
      return v3Schema
    }

    // Handle array type
    if (s instanceof zod4.ZodArray) {
      const itemType = (s as any)._def.element || (s as any)._def.type
      const v3ItemType = downgrade(itemType)
      let v3Schema = zod3.array(v3ItemType)
      cache.set(s, v3Schema)

      // Handle checks for arrays
      const checks = (s as any)._def.checks || []
      for (const check of checks) {
        // In Zod v4, array checks are stored in _zod.def
        const checkDef = check._zod?.def
        if (checkDef) {
          if (checkDef.check === 'min_length') {
            v3Schema = v3Schema.min(checkDef.minimum, checkDef.error?.())
          } else if (checkDef.check === 'max_length') {
            v3Schema = v3Schema.max(checkDef.maximum, checkDef.error?.())
          } else if (checkDef.check === 'length_equals') {
            // In v4 it's length_equals, not exact_length
            v3Schema = v3Schema.length(checkDef.length, checkDef.error?.())
          }
        } else {
          // Fallback for old format
          switch (check.kind) {
            case 'min':
              v3Schema = v3Schema.min(check.value, check.message)
              break
            case 'max':
              v3Schema = v3Schema.max(check.value, check.message)
              break
            case 'length':
              v3Schema = v3Schema.length(check.value, check.message)
              break
          }
        }
      }

      return v3Schema
    }

    // Handle object type
    if (s instanceof zod4.ZodObject) {
      const shape = s.shape
      const v3Shape: Record<string, AnyZodV3Schema> = {}

      // Create placeholder to handle circular references
      const placeholder = zod3.object({})
      cache.set(s, placeholder)

      for (const [key, value] of Object.entries(shape)) {
        v3Shape[key] = downgrade(value as AnyZodV4Schema)
      }

      const v3Schema = zod3.object(v3Shape)
      cache.set(s, v3Schema)

      // Handle strict/strip/passthrough
      const unknownKeys = (s as any)._def.unknownKeys
      const catchall = (s as any)._def.catchall

      // In Zod v4, strict/passthrough is handled via catchall
      if (catchall && typeof catchall === 'object') {
        if (catchall instanceof zod4.ZodNever || catchall.constructor?.name === 'ZodNever') {
          // ZodNever catchall means strict mode
          return v3Schema.strict()
        } else {
          // Any other catchall means passthrough
          return v3Schema.passthrough()
        }
      } else if (unknownKeys === 'strict') {
        return v3Schema.strict()
      } else if (unknownKeys === 'passthrough') {
        return v3Schema.passthrough()
      }
      // Default is strip
      return v3Schema
    }

    // Handle record type
    if (s instanceof zod4.ZodRecord) {
      const keyType = (s as any)._def.keyType
      const valueType = (s as any)._def.valueType

      // In Zod v4, if only one arg is passed to record(), it becomes the value type
      // and keyType is implicitly string. If valueType is undefined, keyType is actually the value
      if (valueType === undefined && keyType) {
        // Single argument case: record(valueSchema)
        const v3Schema = zod3.record(downgrade(keyType as AnyZodV4Schema))
        cache.set(s, v3Schema)
        return v3Schema
      } else if (keyType && valueType) {
        // Two argument case: record(keySchema, valueSchema)
        const v3Schema = zod3.record(
          downgrade(keyType as AnyZodV4Schema),
          downgrade(valueType as AnyZodV4Schema)
        )
        cache.set(s, v3Schema)
        return v3Schema
      } else {
        // Fallback to unknown record
        const v3Schema = zod3.record(zod3.unknown())
        cache.set(s, v3Schema)
        return v3Schema
      }
    }

    // Handle tuple type
    if (s instanceof zod4.ZodTuple) {
      const items = (s as any)._def.items
      const v3Items = items.map((item: AnyZodV4Schema) => downgrade(item))
      let v3Schema = zod3.tuple(v3Items)

      // Handle rest element if present
      const rest = (s as any)._def.rest
      if (rest) {
        v3Schema = (v3Schema as any).rest(downgrade(rest))
      }

      cache.set(s, v3Schema)
      return v3Schema
    }

    // Handle discriminated union type
    if (
      s &&
      (s.constructor?.name === 'ZodDiscriminatedUnion' ||
        ((zod4 as any).ZodDiscriminatedUnion && s instanceof (zod4 as any).ZodDiscriminatedUnion))
    ) {
      const discriminator = (s as any)._def.discriminator
      const options = (s as any)._def.options
      const v3Options = options.map((option: AnyZodV4Schema) => downgrade(option))
      const v3Schema = zod3.discriminatedUnion(discriminator, v3Options)
      cache.set(s, v3Schema)
      return v3Schema
    }

    // Handle union type
    if (s instanceof zod4.ZodUnion) {
      const options = (s as any)._def.options
      const v3Options = options.map((option: AnyZodV4Schema) => downgrade(option))
      const v3Schema = zod3.union(v3Options)
      cache.set(s, v3Schema)
      return v3Schema
    }

    // Handle intersection type
    if (s instanceof zod4.ZodIntersection) {
      const left = (s as any)._def.left
      const right = (s as any)._def.right
      const v3Schema = zod3.intersection(downgrade(left), downgrade(right))
      cache.set(s, v3Schema)
      return v3Schema
    }

    // Handle lazy type (for recursive schemas)
    if (s instanceof zod4.ZodLazy) {
      const getter = (s as any)._def.getter
      const v3Schema = zod3.lazy(() => downgrade(getter()))
      cache.set(s, v3Schema)
      return v3Schema
    }

    // Handle promise type
    if (s instanceof zod4.ZodPromise) {
      const type = (s as any)._def.type
      const v3Schema = zod3.promise(downgrade(type))
      cache.set(s, v3Schema)
      return v3Schema
    }

    // Handle ZodCatch
    if (
      s &&
      (s.constructor?.name === 'ZodCatch' ||
        ((zod4 as any).ZodCatch && s instanceof (zod4 as any).ZodCatch))
    ) {
      const inner = (s as any)._def.innerType
      const catchValue = (s as any)._def.catchValue
      const v3Inner = downgrade(inner)
      const v3Schema = v3Inner.catch(typeof catchValue === 'function' ? catchValue() : catchValue)
      cache.set(s, v3Schema)
      return v3Schema
    }

    // Handle ZodReadonly
    if (s && s.constructor?.name === 'ZodReadonly') {
      const inner = (s as any)._def.innerType
      const v3Inner = downgrade(inner)
      const v3Schema = v3Inner.readonly()
      cache.set(s, v3Schema)
      return v3Schema
    }

    // Handle ZodBranded - In v4, branded is implemented differently
    // Check for brand in checks or if it has the brand symbol
    if (s && typeof s === 'object') {
      const hasBrand =
        (s as any)._def?.brand ||
        (s as any).constructor?.name === 'ZodBranded' ||
        (s as any)._def?.checks?.some?.((c: any) => c?.kind === 'brand')

      if (hasBrand) {
        // Get the base schema
        const baseSchema = (s as any)._def?.innerType || s
        const v3Base = downgrade(baseSchema)
        // Apply branding in v3
        if (typeof v3Base.brand === 'function') {
          const v3Schema = v3Base.brand()
          cache.set(s, v3Schema)
          return v3Schema
        }
        return v3Base
      }
    }

    // Handle ZodPipe (transforms and preprocess in v4)
    if (s && s.constructor?.name === 'ZodPipe') {
      const inSchema = (s as any)._def.in
      const outSchema = (s as any)._def.out

      // Check if output has coerce flag (e.g., z.string().pipe(z.coerce.number()))
      if (outSchema?._def?.coerce) {
        // This is a coercion pipe
        const v3In = downgrade(inSchema)

        // Create a transform that does the coercion
        let coerceFn: (val: any) => any
        if (outSchema.constructor.name === 'ZodNumber') {
          coerceFn = (val: any) => Number(val)
        } else if (outSchema.constructor.name === 'ZodString') {
          coerceFn = (val: any) => String(val)
        } else if (outSchema.constructor.name === 'ZodBoolean') {
          coerceFn = (val: any) => Boolean(val)
        } else {
          coerceFn = (val: any) => val
        }

        const v3Schema = v3In.transform(coerceFn)
        cache.set(s, v3Schema)
        return v3Schema
      }

      // Check if this is a preprocess (in is ZodTransform with ZodUnknown base)
      if (inSchema && inSchema.constructor.name === 'ZodTransform') {
        const transformFn = inSchema._def?.transform
        if (transformFn) {
          // This is a preprocess - recreate it in v3
          const v3Out = downgrade(outSchema)
          const v3Schema = zod3.preprocess(transformFn, v3Out)
          cache.set(s, v3Schema)
          return v3Schema
        }
      }

      // Check if this is a transform (out is ZodTransform)
      if (outSchema && outSchema.constructor.name === 'ZodTransform') {
        const v3In = downgrade(inSchema)
        const transform = outSchema._def.transform
        const v3Schema = v3In.transform(transform)
        cache.set(s, v3Schema)
        return v3Schema
      }

      // For other pipes, return output schema as fallback
      const v3Out = downgrade(outSchema)
      const v3Schema = v3Out
      cache.set(s, v3Schema)
      return v3Schema
    }

    // Handle ZodEffects (older v4 or v3-style effects)
    if ((s as any)._def?.typeName === 'ZodEffects') {
      const schema = (s as any)._def.schema
      const effect = (s as any)._def.effect
      const v3Base = downgrade(schema)

      if (effect?.type === 'refinement') {
        const v3Schema = v3Base.refine(effect.refinement, effect.message)
        cache.set(s, v3Schema)
        return v3Schema
      } else if (effect?.type === 'transform') {
        const v3Schema = v3Base.transform(effect.transform)
        cache.set(s, v3Schema)
        return v3Schema
      } else if (effect?.type === 'preprocess') {
        const v3Schema = zod3.preprocess(effect.transform, v3Base)
        cache.set(s, v3Schema)
        return v3Schema
      }

      return v3Base
    }

    // Handle function type
    if (s instanceof zod4.ZodFunction || s.constructor?.name === 'ZodFunction') {
      // In Zod v3, function schemas are simpler
      // v3 function() creates a basic function schema without type checking
      // v4 has input/output types but v3 API doesn't support them the same way
      const v3Schema = zod3.function()
      cache.set(s, v3Schema)
      return v3Schema
    }

    // Handle Map type
    if (s instanceof zod4.ZodMap) {
      const keyType = (s as any)._def.keyType
      const valueType = (s as any)._def.valueType
      const v3Schema = zod3.map(downgrade(keyType), downgrade(valueType))
      cache.set(s, v3Schema)
      return v3Schema
    }

    // Handle Set type
    if (s instanceof zod4.ZodSet) {
      const valueType = (s as any)._def.valueType
      const v3Schema = zod3.set(downgrade(valueType))
      cache.set(s, v3Schema)
      return v3Schema
    }

    // Check for other string types by name
    const typeName = (s as any)._def?.typeName || s.constructor.name

    // Handle ZodType base cases that slipped through
    if (typeName === 'String' || typeName === 'ZodString') {
      return downgrade(zod4.string())
    }

    // Fallback for unknown types
    console.warn(`Unknown Zod v4 type encountered: ${typeName}`)
    return zod3.unknown()
  }

  return downgrade(schema) as DowngradeType<T>
}

// Export helper type for extracting the inferred type from the downgraded schema
export type InferDowngraded<T extends AnyZodV4Schema> = zod3.infer<DowngradeType<T>>
