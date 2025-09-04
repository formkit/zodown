<template>
  <section id="installation" class="section-container">
    <h1>INSTALLATION</h1>
    
    <div class="terminal-window">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <span class="terminal-button close"></span>
          <span class="terminal-button minimize"></span>
          <span class="terminal-button maximize"></span>
        </div>
        <div class="terminal-title">package-manager@install</div>
        <div style="width: 60px"></div>
      </div>
      
      <div class="terminal-body">
        <div class="prompt">
          <span class="command">npm install zodown</span>
        </div>
        <div class="output">
          <div>+ zodown@latest</div>
          <div>added 1 package in 0.5s</div>
        </div>
        
        <div class="comment" style="margin-top: 1rem"># or use your preferred package manager</div>
        
        <div class="prompt">
          <span class="command">pnpm add zodown</span>
        </div>
        
        <div class="prompt">
          <span class="command">yarn add zodown</span>
        </div>
      </div>
    </div>

    <div class="feature-box">
      <div class="feature-header">
        <span class="success">✓</span> NO PEER DEPENDENCIES
      </div>
      <div class="feature-content">
        <p>
          <code>zodown</code> includes Zod v4 built-in.
          It handles Zod v3 conversion internally - you get both!
        </p>
        <pre>
<span class="comment">// zodown exports everything you need</span>
<span class="keyword">import</span> { z, zodown } <span class="keyword">from</span> <span class="string">'zodown'</span>

<span class="comment">// Write Zod v4 schemas</span>
<span class="keyword">const</span> schema = z.object({ ... })

<span class="comment">// Convert to v3 when needed</span>
<span class="keyword">const</span> v3Schema = zodown(schema)</pre>
      </div>
    </div>

    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-icon">[SIZE]</div>
        <div class="metric-label">BUNDLE SIZE</div>
        <div class="metric-value">~1.3KB</div>
        <div class="metric-detail">minified + gzipped</div>
      </div>
      <div class="metric-card">
        <div class="metric-icon">[CONF]</div>
        <div class="metric-label">ZERO CONFIG</div>
        <div class="metric-value">TRUE</div>
        <div class="metric-detail">just import and use</div>
      </div>
      <div class="metric-card">
        <div class="metric-icon">[TYPE]</div>
        <div class="metric-label">TYPE SAFE</div>
        <div class="metric-value">100%</div>
        <div class="metric-detail">full TypeScript support</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-container {
  margin: 4rem 0;
}

.feature-box {
  margin: 2rem 0;
  border: 1px solid var(--border-dim);
  background: var(--bg-elevated);
}

.feature-header {
  padding: 1rem;
  border-bottom: 1px solid var(--border-dim);
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.feature-content {
  padding: 1rem;
}

.feature-content pre {
  margin-top: 1rem;
}

.keyword {
  color: var(--accent-alt);
}

.string {
  color: var(--warning);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.metric-card {
  border: 1px solid var(--border-dim);
  padding: 1.5rem;
  background: var(--bg-elevated);
  text-align: center;
  transition: all 0.3s;
}

.metric-card:hover {
  border-color: var(--fg);
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.1);
}

.metric-icon {
  color: var(--accent);
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.metric-label {
  color: var(--fg-dim);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.metric-value {
  color: var(--fg-bright);
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 0 0 10px currentColor;
  margin: 0.5rem 0;
}

.metric-detail {
  color: var(--fg-dim);
  font-size: 0.8rem;
}
</style>
