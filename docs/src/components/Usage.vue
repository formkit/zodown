<template>
  <section>
    <h2>USAGE</h2>

    <div class="border">
      <h3>BASIC EXAMPLE</h3>
      <pre style="background: var(--bg); border: none; padding: 0; color: var(--fg)">
import { z, zodown } from 'zodown' <span style="opacity: 0.5">// Includes Zod v4!</span>

<span style="opacity: 0.7">// Write modern Zod v4 schemas</span>
const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().int().positive(),
  roles: z.array(z.enum(['admin', 'user', 'guest']))
})

<span style="opacity: 0.7">// Convert to Zod v3</span>
const v3Schema = zodown(UserSchema)

<span style="opacity: 0.7">// Use with v3-dependent libraries</span>
const result = v3Schema.parse(userData)
      </pre>
    </div>

    <div class="grid">
      <div class="card">
        <h4>WITH REFINEMENTS</h4>
        <pre
          style="
            background: var(--bg);
            border: none;
            padding: 0;
            font-size: 0.85em;
            color: var(--fg);
          "
        >
const Password = z
  .string()
  .min(8)
  .regex(/[A-Z]/)
  .regex(/[0-9]/)
  .refine(custom)

const v3 = zodown(Password)
<span style="opacity: 0.5">// All refinements preserved!</span>
        </pre>
      </div>

      <div class="card">
        <h4>WITH TRANSFORMS</h4>
        <pre
          style="
            background: var(--bg);
            border: none;
            padding: 0;
            font-size: 0.85em;
            color: var(--fg);
          "
        >
const DateStr = z
  .string()
  .transform(s => new Date(s))
  .refine(d => !isNaN(d))

const v3 = zodown(DateStr)
<span style="opacity: 0.5">// Transforms work too!</span>
        </pre>
      </div>

      <div class="card">
        <h4>RECURSIVE SCHEMAS</h4>
        <pre
          style="
            background: var(--bg);
            border: none;
            padding: 0;
            font-size: 0.85em;
            color: var(--fg);
          "
        >
const Node = z.lazy(() =>
  z.object({
    value: z.string(),
    children: z.array(Node)
  })
)

const v3 = zodown(Node)
<span style="opacity: 0.5">// Handles circular refs!</span>
        </pre>
      </div>
    </div>

    <div class="border dashed">
      <h3>SUPPORTED TYPES</h3>
      <div
        style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 0.5rem;
          margin-top: 1rem;
        "
      >
        <span class="badge">STRING</span>
        <span class="badge">NUMBER</span>
        <span class="badge">BOOLEAN</span>
        <span class="badge">DATE</span>
        <span class="badge">BIGINT</span>
        <span class="badge">SYMBOL</span>
        <span class="badge">UNDEFINED</span>
        <span class="badge">NULL</span>
        <span class="badge">VOID</span>
        <span class="badge">ANY</span>
        <span class="badge">UNKNOWN</span>
        <span class="badge">NEVER</span>
        <span class="badge">LITERAL</span>
        <span class="badge">ENUM</span>
        <span class="badge">NATIVE ENUM</span>
        <span class="badge">OBJECT</span>
        <span class="badge">ARRAY</span>
        <span class="badge">TUPLE</span>
        <span class="badge">RECORD</span>
        <span class="badge">MAP</span>
        <span class="badge">SET</span>
        <span class="badge">UNION</span>
        <span class="badge">INTERSECTION</span>
        <span class="badge">OPTIONAL</span>
        <span class="badge">NULLABLE</span>
        <span class="badge">DEFAULT</span>
        <span class="badge">LAZY</span>
        <span class="badge">PROMISE</span>
        <span class="badge">FUNCTION</span>
        <span class="badge">REFINE</span>
        <span class="badge">TRANSFORM</span>
        <span class="badge">PREPROCESS</span>
      </div>
    </div>
  </section>
</template>
