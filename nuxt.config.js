import colors from 'vuetify/es5/util/colors'
const axios = require("axios")
require('dotenv').config()
const {SERVICE_ID, API_KEY, SITE_TITLE, SITE_URL, SITE_DESC, SITE_KEYWORDS, TOP_TITLE, TOP_TEMPlATE, GTM_ID} = process.env

export default {
  privateRuntimeConfig: {
    API_KEY
  },
  env: {
    SERVICE_ID, SITE_TITLE, TOP_TITLE, TOP_TEMPlATE
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
      lang: 'ja'
    },
    titleTemplate: `%s - ${SITE_TITLE}`,
    meta: [
      // 設定関連
      { charset: 'utf-8' },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    
      // SEO関連
      { hid: 'description', name: 'description', content: SITE_DESC },
      { hid: 'keywords', name: 'keywords', content: SITE_KEYWORDS },
      
      // ogp関連
      { hid: 'og:site_name', property: 'og:site_name', content: SITE_TITLE },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: SITE_URL },
      { hid: 'og:title', property: 'og:title', content: SITE_TITLE },
      { hid: 'og:description', property: 'og:description', content: SITE_DESC },
      { hid: 'og:image', property: 'og:image', content: `${SITE_URL}ogp/home.jpg` },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
         '~~/font/dist/css/materialdesignicons.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/gtm'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    defaultAssets: false,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  generate: {
    routes: async function () {
      var home = await axios.get(`https://${SERVICE_ID}.microcms.io/api/v1/home/home`, {
        headers: { 'X-API-KEY': API_KEY }
      })
      var menu = await axios.get(`https://${SERVICE_ID}.microcms.io/api/v1/menu?fields=id,thumbnail,title,shopTitle`, {
        headers: { 'X-API-KEY': API_KEY }
      })
      var shop = {}
      var articles = {}
      var routes = []
      home = home.data
      menu = menu.data.contents
      routes = [
        {
          route: '/',
          payload: {
            home,
            menu
          }
        }
      ]
      for (let item of menu) {
        shop = await axios.get(`https://${SERVICE_ID}.microcms.io/api/v1/menu/${item.id}`, {
          headers: { 'X-API-KEY': API_KEY }
        })
        articles = await axios.get(`https://${SERVICE_ID}.microcms.io/api/v1/${item.id}`, {
          headers: { 'X-API-KEY': API_KEY }
        })
        routes = [
          ...routes,
          {
            route: `/${item.id}`,
            payload: {
              home,
              menu,
              shop: shop.data,
              articles: articles.data.contents
            }
          }
        ]
      }
      return routes
    }
  },
  gtm: {
    id: GTM_ID,
    pageTracking: true,
  }
}
