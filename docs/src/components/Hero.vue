<template>
  <header>
    <pre class="ascii-art">
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║  ███████╗ ██████╗ ██████╗  ██████╗ ██╗    ██╗███╗   ██╗║
║  ╚══███╔╝██╔═══██╗██╔══██╗██╔═══██╗██║    ██║████╗  ██║║
║    ███╔╝ ██║   ██║██║  ██║██║   ██║██║ █╗ ██║██╔██╗ ██║║
║   ███╔╝  ██║   ██║██║  ██║██║   ██║██║███╗██║██║╚██╗██║║
║  ███████╗╚██████╔╝██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚████║║
║  ╚══════╝ ╚═════╝ ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝║
║                                                       ║
║          WRITE ZOD V4, RUN ZOD V3                    ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
    </pre>

    <div class="border dashed">
      <p class="typewriter" style="text-align: center; font-size: 1.1rem">
        Convert Zod v4 schemas to v3 at runtime<span class="blink">_</span>
      </p>
    </div>

    <div
      style="
        text-align: center;
        margin: 2rem 0;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
      "
    >
      <GitHubButton />
      <button @click="scrollToInstall">GET STARTED →</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import GitHubButton from './GitHubButton.vue'

const scrollToInstall = () => {
  document.querySelector('#installation')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
