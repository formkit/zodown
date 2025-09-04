<template>
  <section id="installation">
    <h2>INSTALLATION</h2>
    
    <div class="terminal">
      <div class="terminal-content">
        <div class="prompt">npm install zodown</div>
        <div style="opacity: 0.7; margin-top: 1rem;">
          # or
        </div>
        <div class="prompt">pnpm add zodown</div>
        <div style="opacity: 0.7; margin-top: 1rem;">
          # or
        </div>
        <div class="prompt">yarn add zodown</div>
      </div>
    </div>

    <div class="border dashed" style="margin-top: 2rem;">
      <h3>NO PEER DEPENDENCIES!</h3>
      <p>
        <code>zodown</code> includes Zod v4 built-in.
        It handles Zod v3 conversion internally - you get both!
      </p>
      <pre style="background: var(--bg); border: none; padding: 0.5rem 0; color: var(--fg);">
// zodown exports everything you need
import { z, zodown } from 'zodown'

// Write Zod v4 schemas
const schema = z.object({ ... })

// Convert to v3 when needed
const v3Schema = zodown(schema)
      </pre>
    </div>

    <div class="grid">
      <div class="card">
        <h4>📊 BUNDLE SIZE</h4>
        <p>~1.3KB minified + gzipped</p>
        <p style="font-size: 0.85em; opacity: 0.7;">(converter only)</p>
      </div>
      <div class="card">
        <h4>🎯 ZERO CONFIG</h4>
        <p>Just import and use</p>
      </div>
      <div class="card">
        <h4>🔒 TYPE SAFE</h4>
        <p>Full TypeScript support</p>
      </div>
    </div>
  </section>
</template>