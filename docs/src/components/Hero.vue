<template>
  <header class="hero-container">
    <div class="ascii-art">
███████╗ ██████╗ ██████╗  ██████╗ ██╗    ██╗███╗   ██╗
╚══███╔╝██╔═══██╗██╔══██╗██╔═══██╗██║    ██║████╗  ██║
  ███╔╝ ██║   ██║██║  ██║██║   ██║██║ █╗ ██║██╔██╗ ██║
 ███╔╝  ██║   ██║██║  ██║██║   ██║██║███╗██║██║╚██╗██║
███████╗╚██████╔╝██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚████║
╚══════╝ ╚═════╝ ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝
    </div>
    
    <div class="terminal-window">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <span class="terminal-button close"></span>
          <span class="terminal-button minimize"></span>
          <span class="terminal-button maximize"></span>
        </div>
        <div class="terminal-title">zodown@v4-to-v3 ~ runtime converter</div>
        <div style="width: 60px"></div>
      </div>
      
      <div class="terminal-body">
        <div class="prompt">
          <span class="command">zodown --version</span>
        </div>
        <div class="output">{{ version }}</div>
        
        <div class="prompt" style="margin-top: 1rem">
          <span class="command">zodown --info</span>
        </div>
        <div class="output">
          <div>Runtime Zod v4 → v3 converter</div>
          <div>Status: <span class="success">● ACTIVE</span></div>
          <div>Compatibility: <span class="highlight">100%</span></div>
          <div>Performance: <span class="highlight">&lt; 1ms overhead</span></div>
        </div>
        
        <div class="prompt" style="margin-top: 1rem">
          <span class="command">zodown --why<span class="cursor"></span></span>
        </div>
        <div class="output typing">
          <div v-if="showWhy">Bridge the gap between Zod v3 and v4 ecosystems</div>
        </div>
      </div>
    </div>

    <div class="hero-description">
      <p class="tagline">
        <span class="comment"># Runtime converter for Zod schemas</span><br>
        <span class="highlight">Write Zod v4</span> → <span class="highlight">Use in v3 libraries</span>
      </p>
      
      <div class="quick-links">
        <button @click="scrollToInstall">
          <span style="margin: 0 1rem">INSTALL</span>
        </button>
        <button @click="scrollToUsage">
          <span style="margin: 0 1rem">USAGE</span>
        </button>
        <GitHubButton />
      </div>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">TYPE SAFETY</div>
        <div class="stat-value">✓ PRESERVED</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">ZERO CONFIG</div>
        <div class="stat-value">✓ ENABLED</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">TREE-SHAKE</div>
        <div class="stat-value">✓ FRIENDLY</div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import GitHubButton from './GitHubButton.vue'

const version = ref('v1.0.0')
const showWhy = ref(false)

onMounted(() => {
  setTimeout(() => {
    showWhy.value = true
  }, 2000)
})

const scrollToInstall = () => {
  document.querySelector('#installation')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToUsage = () => {
  document.querySelector('#usage')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero-container {
  margin: 2rem 0 4rem;
}

.hero-description {
  margin: 3rem 0;
  text-align: center;
}

.tagline {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.quick-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 3rem 0;
}

.stat-card {
  border: 1px solid var(--border-dim);
  padding: 1.5rem;
  text-align: center;
  background: var(--bg-elevated);
  transition: all 0.3s;
}

.stat-card:hover {
  border-color: var(--fg);
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.1);
}

.stat-label {
  color: var(--fg-dim);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.stat-value {
  color: var(--fg-bright);
  font-size: 1.1rem;
  font-weight: bold;
  text-shadow: 0 0 10px currentColor;
}

.typing {
  overflow: hidden;
  animation: typing 2s steps(50, end);
}

@keyframes typing {
  from { max-width: 0; }
  to { max-width: 100%; }
}

@media (max-width: 640px) {
  .ascii-art {
    font-size: 8px;
  }
}
</style>
