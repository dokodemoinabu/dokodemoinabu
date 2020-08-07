<template>
<v-main :style="style">
  <v-container>
    <v-row class="justify-center pb-16 mb-sm-16">
      <v-col
        cols="12"
        md="6"
        lg="5"
      >
        <div class="d-flex justify-center">
          <v-img
            :src="imgSrc(shop.thumbnail)"
            :max-width="size"
          ></v-img>
        </div>
      </v-col>
      <v-col
        cols="12"
        md="6"
        lg="5"
      >
        <h1>
          {{ shop.shopTitle }}
        </h1>
        
        <div
          class="py-4"
          v-html="shop.introduction"
        ></div>
        
        <div
          v-if="shop.btnLabel && shop.btnLink"
          class="d-flex justify-center"
        >
          <Btn :label="shop.btnLabel" :link="shop.btnLink" />
        </div>
      </v-col>
    </v-row>
    <Promotion :item="shop" />
    <v-row
      v-if="articles != ''"
    >
      <Title>商品紹介</Title>
      <v-col
        cols="12"
      >
        <template v-for="article in articles">
        <v-row no-gutters class="justify-center pb-16 mb-sm-8">
          <v-col
            cols="12"
            lg="10"
            v-html="article.title"
            class="px-3"
          ></v-col>
          
          <template v-if="article.contents2 != ''">
            <Article :contents="article.contents1" />
            <Article :contents="article.contents2" />
          </template>
          
          <v-col
            v-if="article.btnLabel && article.btnLink"
            cols="12"
            class="d-flex justify-center"
          >
            <Btn :label="article.btnLabel" :link="article.btnLink" />
          </v-col>
        </v-row>
        </template>
      </v-col>
    </v-row>
  </v-container>
</v-main>
</template>

<script>
import Btn from '~/components/btn.vue';
import Promotion from '~/components/promotion.vue';
import Title from '~/components/title.vue';
import Article from '~/components/article.vue';

export default {
  components: {
    Btn,
    Promotion,
    Title,
    Article
  },
  async asyncData ({ payload, app, $config, params }) {
    if(payload) {
      return {
        home: payload.home,
        menu: payload.menu,
        shop: payload.shop,
        articles: payload.articles
      }
    }
    else if(process.env.NODE_ENV !== 'production') {
      var serviceId = process.env.SERVICE_ID
      var apiKey = $config.API_KEY
      var home = await app.$axios.$get(`https://${serviceId}.microcms.io/api/v1/home/home?fields=logo,footer,footerBgImg`, {
        headers: { 'X-API-KEY': apiKey }
      })
      var menu = await app.$axios.$get(`https://${serviceId}.microcms.io/api/v1/menu?fields=id,title`, {
        headers: { 'X-API-KEY': apiKey }
      })
      var shop = await app.$axios.$get(`https://${serviceId}.microcms.io/api/v1/menu/${params.shop}`, {
        headers: { 'X-API-KEY': apiKey }
      })
      var articles = await app.$axios.$get(`https://${serviceId}.microcms.io/api/v1/${params.shop}`, {
        headers: { 'X-API-KEY': apiKey }
      })
      return {
        home,
        menu: menu.contents,
        shop: shop,
        articles: articles.contents
      }
    }
  },
  data() {
    return {
    }
  },
  mounted () {
    this.updateData()
  },
  methods: {
    updateData () {
      this.$nuxt.$emit('updateData', {home: this.home, menu: this.menu})
    }
  },
  computed: {
    style () {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return 'margin-top:64px;'
      }
      else {
        return 'margin-top:56px;'
      }
    },
    imgSrc () {
      return function (img) {
        if(img) {
          return img.url
        }
        return undefined
      }
    },
    size () {
      if (this.$vuetify.breakpoint.xs) {
        return 288
      }
      else {
        return 444
      }
    }
  },
  head () {
    return {
      title: this.shop.title,
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.shop.title },
      ]
    }
  }
}
</script>