<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUser()
})
</script>
