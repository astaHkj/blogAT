// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt'
    // '@nuxtjs/tailwindcss' // 暂时禁用，使用基础 CSS
  ],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:4000/api'
    }
  },

  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:4000/api',
        changeOrigin: true
      }
    }
  },

  app: {
    head: {
      title: 'BlogAT',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '一个简洁的博客系统' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap' }
      ]
    }
  }
})
