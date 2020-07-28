<template>
<v-main>
  <v-img
    :src="imgSrc(home.topBgImg) + '?blend=59ffffff&blend-mode=normal'"
    height="100vh"
    class="pb-16 mb-sm-16"
  >
    <v-container
      class="d-flex flex-column align-center"
      style="height:100%;"
    >
      <v-row
        class="justify-center align-end"
        style="width:100%;"
      >
        <v-col
          cols="12"
          sm="8"
          md="6"
          lg="5"
          class="d-flex justify-center"
        >
          <div>
            <v-img
              :src="imgSrc(home.logo) + '?fit=clip&h=192'"
              alt=""
            ></v-img>
          </div>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col
          cols="12"
          sm="8"
          md="6"
          lg="5"
          v-html="home.top"
        ></v-col>
      </v-row>
    </v-container>
  </v-img>
  <v-container>
    <Promotion :item="home" />
    <v-row class="pb-16 mb-sm-16">
      <Title>店舗紹介</Title>
      <v-col>
        <v-row no-gutters class="justify-center">
          <template v-for="shop in menu">
          <v-col
            cols="12"
            sm="8"
            md="6"
            lg="5"
          >
            <v-card
              :to="`/${shop.id}`"
              class="my-4 mx-md-4"
              nuxt
            >
              <v-img
                :src="imgSrc(shop.thumbnail)"
                :style="(shop.thumbnail)? 'position:relative;' : 'position:relative;padding-top:75%;'"
              >
                <div
                  style="width:100%;position:absolute;top:100%;transform: translateY(-100%);background-color:rgba(159,223,201,.5);"
                >
                  <v-card-title>
                    {{ shop.title }}
                  </v-card-title>
                  
                  <v-card-subtitle>
                    {{ shop.shopTitle }}
                  </v-card-subtitle>
                </div>
                
              </v-img>
            </v-card>
          </v-col>
          </template>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</v-main>
</template>

<script>
import Promotion from '~/components/promotion.vue';
import Title from '~/components/title.vue';

export default {
  components: {
    Promotion,
    Title
  },
  async asyncData ({ payload, app }) {
    if(payload) {
      return {
        home: payload.home,
        menu: payload.menu
      }
    }
    else if(process.env.NODE_ENV !== 'production') {
      var serviceId = process.env.serviceId
      var apiKey = process.env.apiKey
      var home = await app.$axios.$get(`https://${serviceId}.microcms.io/api/v1/home/home`, {
        headers: { 'X-API-KEY': apiKey }
      })
      var menu = await app.$axios.$get(`https://${serviceId}.microcms.io/api/v1/menu?fields=id,thumbnail,title,shopTitle`, {
        headers: { 'X-API-KEY': apiKey }
      })
      return {
        home,
        menu: menu.contents
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
    imgSrc () {
      return function (img) {
        if(img) {
          return img.url
        }
        return undefined
      }
    }
  },
  head () {
    return {
      title: process.env.topTitle,
      titleTemplate: (process.env.topTemplate != '')? process.env.topTemplate : `${process.env.siteName} - %s`
    }
  }
}
</script>