<template>
  <footer class="app-footer" role="contentinfo">
    <p class="app-footer__text">
      Made with
      <span aria-label="love" role="img">&#10084;&#65039;</span>
      Copilot &nbsp;&bull;&nbsp; FastForward &copy; {{ year }}
    </p>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
  padding: 1rem 2rem;
  text-align: center;
  border-top: 1px solid var(--border);
  background: var(--surface);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: background var(--transition);
}

.app-footer__text {
  font-size: 0.8125rem;
  color: var(--text-muted);
  letter-spacing: 0.02em;
}
</style>
