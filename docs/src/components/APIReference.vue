<template>
  <section>
    <h2>API REFERENCE</h2>

    <div class="border">
      <h3><code>zodown(schema)</code></h3>
      <p style="margin: 1rem 0">
        Converts a Zod v4 schema to a functionally equivalent Zod v3 schema.
      </p>

      <div style="margin: 1.5rem 0">
        <h4>PARAMETERS</h4>
        <ul style="list-style: none; padding-left: 1rem">
          <li><code>schema</code> - Any Zod v4 schema (ZodTypeAny)</li>
        </ul>
      </div>

      <div style="margin: 1.5rem 0">
        <h4>RETURNS</h4>
        <ul style="list-style: none; padding-left: 1rem">
          <li>Equivalent Zod v3 schema with preserved validations</li>
        </ul>
      </div>

      <div style="margin: 1.5rem 0">
        <h4>EXAMPLE</h4>
        <pre
          style="
            background: var(--bg);
            border: 1px dashed var(--border);
            padding: 1rem;
            color: var(--fg);
          "
        >
import { z, zodown } from 'zodown'

const v4Schema = z.object({
  name: z.string().min(1),
  email: z.string().email()
})

const v3Schema = zodown(v4Schema)

<span style="opacity: 0.7">// v3Schema is now a Zod v3 schema</span>
<span style="opacity: 0.7">// with all validations preserved</span>
        </pre>
      </div>
    </div>

    <div class="border" style="margin-top: 2rem">
      <h3><code>InferDowngraded&lt;T&gt;</code></h3>
      <p style="margin: 1rem 0">
        Type helper for extracting the inferred TypeScript type from a downgraded schema.
      </p>

      <div style="margin: 1.5rem 0">
        <h4>TYPE PARAMETERS</h4>
        <ul style="list-style: none; padding-left: 1rem">
          <li><code>T</code> - A Zod v4 schema type</li>
        </ul>
      </div>

      <div style="margin: 1.5rem 0">
        <h4>EXAMPLE</h4>
        <pre
          style="
            background: var(--bg);
            border: 1px dashed var(--border);
            padding: 1rem;
            color: var(--fg);
          "
        >
import type { InferDowngraded } from 'zodown'

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number()
})

<span style="opacity: 0.7">// Extract the TypeScript type</span>
type User = InferDowngraded&lt;typeof UserSchema&gt;
<span style="opacity: 0.7">// type User = {</span>
<span style="opacity: 0.7">//   id: string</span>
<span style="opacity: 0.7">//   name: string</span>
<span style="opacity: 0.7">//   age: number</span>
<span style="opacity: 0.7">// }</span>
        </pre>
      </div>
    </div>

    <div class="border dashed" style="margin-top: 2rem">
      <h3>PERFORMANCE</h3>
      <ul style="list-style: none; padding: 1rem">
        <li>✓ WeakMap caching prevents redundant conversions</li>
        <li>✓ Handles circular references efficiently</li>
        <li>✓ Minimal runtime overhead (~2ms for complex schemas)</li>
        <li>✓ Tree-shakeable - only includes what you use</li>
      </ul>
    </div>
  </section>
</template>
