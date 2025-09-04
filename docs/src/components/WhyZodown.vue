<template>
  <section>
    <h2>WHY ZODOWN?</h2>
    
    <div class="grid">
      <div class="card">
        <h3>📦 THE PROBLEM</h3>
        <p>
          Popular libraries like <code>@modelcontextprotocol/sdk</code> still depend on Zod v3.
          You're forced to choose between modern schemas and library compatibility.
        </p>
      </div>
      
      <div class="card">
        <h3>✨ THE SOLUTION</h3>
        <p>
          <code>zodown</code> converts your Zod v4 schemas to v3 at runtime.
          Write modern code, maintain compatibility, ship features.
        </p>
      </div>
    </div>

    <div class="terminal">
      <div class="terminal-content">
        <div class="prompt">npm ls zod</div>
        <pre style="background: var(--bg); border: none; color: var(--fg); padding: 0;">
├─ @modelcontextprotocol/sdk@1.0.0
│  └─ zod@3.22.4 <span style="opacity: 0.5">// Requires v3!</span>
└─ my-app@1.0.0
   └─ zod@4.0.0 <span style="opacity: 0.5">// You want v4!</span>
        </pre>
      </div>
    </div>

    <div class="border" style="margin-top: 2rem;">
      <h3>REAL WORLD EXAMPLE</h3>
      <pre style="background: var(--bg); border: none; padding: 0; color: var(--fg);">
<span style="opacity: 0.7">// zodown includes Zod v4 - no separate install!</span>
import { z, zodown } from 'zodown'

const UserSchema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
  metadata: z.record(z.unknown())
})

<span style="opacity: 0.7">// Convert for MCP SDK compatibility</span>
const v3Schema = zodown(UserSchema)

<span style="opacity: 0.7">// Works with @modelcontextprotocol/sdk!</span>
mcp.tool(v3Schema, handler) <span style="opacity: 0.5">// ✅ No conflicts!</span>
      </pre>
    </div>
  </section>
</template>