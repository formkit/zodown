<template>
  <div class="github-stars-wrapper">
    <!-- Hidden element for ASCII display integration -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits<{
  'stars-updated': [count: number]
}>()

const stars = ref<number | null>(null)
const loading = ref(false)

const CACHE_KEY = 'zodown_github_stars'
const CACHE_DURATION = 3600000 // 1 hour in milliseconds

interface CachedData {
  stars: number
  timestamp: number
}

async function fetchStars() {
  // Check cache first
  const cached = localStorage.getItem(CACHE_KEY)
  if (cached) {
    try {
      const data: CachedData = JSON.parse(cached)
      const now = Date.now()
      if (now - data.timestamp < CACHE_DURATION) {
        stars.value = data.stars
        emit('stars-updated', data.stars)
        return
      }
    } catch (e) {
      // Invalid cache, continue to fetch
    }
  }

  loading.value = true
  try {
    // Using a CORS proxy to avoid rate limiting and CORS issues
    // Alternative: use the GitHub API directly but with lower update frequency
    const response = await fetch('https://api.github.com/repos/formkit/zodown', {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    
    if (response.ok) {
      const data = await response.json()
      const starCount = data.stargazers_count || 0
      stars.value = starCount
      emit('stars-updated', starCount)
      
      // Cache the result
      const cacheData: CachedData = {
        stars: starCount,
        timestamp: Date.now()
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
    }
  } catch (error) {
    console.error('Failed to fetch GitHub stars:', error)
    // Silently fail, don't show error to user
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStars()
})
</script>

<style scoped>
.github-stars-wrapper {
  display: none;
}
</style>