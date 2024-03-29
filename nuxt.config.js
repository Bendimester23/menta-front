export default {
  head: {
    title: 'Bluementa xd',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A next gen educational app.' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~/assets/main.css'
  ],
  plugins: [
  ],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss'
  ],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    '@deepsource/nuxt-websocket'
  ],
  router: {
    middleware: ['auth']
  },
  pwa: {
    manifest: {
      lang: 'hu'
    }
  },
  build: {
  },
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },
  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  },
  axios: {
    baseURL: process.env.MODE == `prod` ? `https://menta.bendi.cf` : 'http://192.168.1.17:8080'
  },
  auth: {
    redirect: {
      login: '/auth/login',
      logout: '/',
      home: '/dashboard'
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          maxAge: 1800,
          global: true,
          type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: '',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          refresh: { url: '/api/auth/refresh', method: 'post' },
          user: { url: '/api/user/me', method: 'get' },
          logout: false
        },
        autoLogout: false
      }
    }
  },
  toast: {
    position: 'bottom-center'
  },
  websocket: {
    url: 'ws://localhost:8080/api/ws/'
  }
}
