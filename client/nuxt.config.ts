// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt'
    // '@nuxtjs/tailwindcss' // 暂时禁用，使用基础 CSS
  ],

  css: ['~/assets/css/art-theme.css'],

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
        { name: 'description', content: '艺术写作，诗意生活' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&family=Noto+Serif+SC:wght@300;400;500;600&display=swap' }
      ]
    }
  }
})
