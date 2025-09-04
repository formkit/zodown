<template>
  <section id="usage" class="section-container">
    <h1>USAGE</h1>
    
    <div class="terminal-window">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <span class="terminal-button close"></span>
          <span class="terminal-button minimize"></span>
          <span class="terminal-button maximize"></span>
        </div>
        <div class="terminal-title">example@basic-usage</div>
        <div style="width: 60px"></div>
      </div>
      
      <div class="terminal-body">
        <pre><span class="keyword">import</span> { z, zodown } <span class="keyword">from</span> <span class="string">'zodown'</span> <span class="comment">// Includes Zod v4!</span>

<span class="comment">// Write modern Zod v4 schemas</span>
<span class="keyword">const</span> UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().int().positive(),
  roles: z.array(z.enum([<span class="string">'admin'</span>, <span class="string">'user'</span>, <span class="string">'guest'</span>]))
})

<span class="comment">// Convert to Zod v3</span>
<span class="keyword">const</span> v3Schema = zodown(UserSchema)

<span class="comment">// Use with v3-dependent libraries</span>
<span class="keyword">const</span> result = v3Schema.parse(userData)</pre>
      </div>
    </div>

    <div class="examples-grid">
      <div class="example-card">
        <div class="example-header">
          <span class="prompt">WITH REFINEMENTS</span>
        </div>
        <pre><span class="keyword">const</span> Password = z
  .string()
  .min(<span class="number">8</span>)
  .regex(<span class="regex">/[A-Z]/</span>)
  .regex(<span class="regex">/[0-9]/</span>)
  .refine(custom)

<span class="keyword">const</span> v3 = zodown(Password)
<span class="comment">// All refinements preserved!</span></pre>
      </div>

      <div class="example-card">
        <div class="example-header">
          <span class="prompt">WITH TRANSFORMS</span>
        </div>
        <pre><span class="keyword">const</span> DateStr = z
  .string()
  .transform(s => <span class="keyword">new</span> Date(s))
  .refine(d => !isNaN(d))

<span class="keyword">const</span> v3 = zodown(DateStr)
<span class="comment">// Transforms work too!</span></pre>
      </div>

      <div class="example-card">
        <div class="example-header">
          <span class="prompt">RECURSIVE SCHEMAS</span>
        </div>
        <pre><span class="keyword">const</span> Node = z.lazy(() =>
  z.object({
    value: z.string(),
    children: z.array(Node)
  })
)

<span class="keyword">const</span> v3 = zodown(Node)
<span class="comment">// Handles circular refs!</span></pre>
      </div>
    </div>

    <div class="supported-types">
      <div class="types-header">
        <span class="success">●</span> SUPPORTED TYPES <span class="type-count">[31 TYPES]</span>
      </div>
      <div class="types-grid">
        <span class="type-badge">STRING</span>
        <span class="type-badge">NUMBER</span>
        <span class="type-badge">BOOLEAN</span>
        <span class="type-badge">DATE</span>
        <span class="type-badge">BIGINT</span>
        <span class="type-badge">SYMBOL</span>
        <span class="type-badge">UNDEFINED</span>
        <span class="type-badge">NULL</span>
        <span class="type-badge">VOID</span>
        <span class="type-badge">ANY</span>
        <span class="type-badge">UNKNOWN</span>
        <span class="type-badge">NEVER</span>
        <span class="type-badge">LITERAL</span>
        <span class="type-badge">ENUM</span>
        <span class="type-badge">NATIVE_ENUM</span>
        <span class="type-badge">OBJECT</span>
        <span class="type-badge">ARRAY</span>
        <span class="type-badge">TUPLE</span>
        <span class="type-badge">RECORD</span>
        <span class="type-badge">MAP</span>
        <span class="type-badge">SET</span>
        <span class="type-badge">UNION</span>
        <span class="type-badge">INTERSECTION</span>
        <span class="type-badge">OPTIONAL</span>
        <span class="type-badge">NULLABLE</span>
        <span class="type-badge">DEFAULT</span>
        <span class="type-badge">LAZY</span>
        <span class="type-badge">PROMISE</span>
        <span class="type-badge">FUNCTION</span>
        <span class="type-badge">REFINE</span>
        <span class="type-badge">TRANSFORM</span>
        <span class="type-badge">PREPROCESS</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-container {
  margin: 4rem 0;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.example-card {
  border: 1px solid var(--border-dim);
  background: var(--bg-elevated);
  overflow: hidden;
}

.example-header {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-dim);
  background: var(--bg-highlight);
  font-size: 0.9rem;
  letter-spacing: 0.1em;
}

.example-card pre {
  padding: 1rem;
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0;
  border: none;
  background: transparent;
}

.example-card pre::before {
  display: none;
}

.keyword {
  color: var(--accent-alt);
}

.string {
  color: var(--warning);
}

.comment {
  color: var(--fg-dim);
  font-style: italic;
}

.number {
  color: var(--accent);
}

.regex {
  color: var(--error);
}

.supported-types {
  margin: 3rem 0;
  border: 1px solid var(--border-dim);
  background: var(--bg-elevated);
}

.types-header {
  padding: 1rem;
  border-bottom: 1px solid var(--border-dim);
  background: var(--bg-highlight);
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.type-count {
  margin-left: auto;
  color: var(--fg-dim);
  font-size: 0.8rem;
}

.types-grid {
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.5rem;
}

.type-badge {
  padding: 0.3rem 0.6rem;
  border: 1px solid var(--border-dim);
  background: var(--bg);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-align: center;
  transition: all 0.2s;
  cursor: default;
}

.type-badge:hover {
  border-color: var(--fg);
  color: var(--fg-bright);
  text-shadow: 0 0 5px currentColor;
}
</style>
