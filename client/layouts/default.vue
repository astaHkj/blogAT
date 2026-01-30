<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <main class="max-w-5xl mx-auto px-4 py-8">
      <slot />
    </main>
    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="max-w-5xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
        © 2024 BlogAT - Built with Nuxt 3 + Express
      </div>
    </footer>
  </div>
</template>
