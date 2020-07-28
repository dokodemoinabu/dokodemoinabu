<template>
<v-footer
  padless
  color="rgba(239,245,243,1)"
>
  <v-img
    :src="imgSrc(home.footerBgImg) + '?blend=59ffffff&blend-mode=normal'"
    :height="($vuetify.breakpoint.xs)? '312' : 264"
    class="d-flex align-end"
  >
    <v-container class="pb-0">
      <v-row
        class="py-4 justify-center"
        no-gutters
      >
        <v-col cols="auto"
          v-for="item in menu"
          :key="item.id"
        >
          <v-btn
              
            :to="`/${item.id}`"
            text
            rounded
            nuxt
          >
            {{ item.title }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row
        class="py-4 justify-center"
        no-gutters
      >
        <v-col
          cols="auto"
          class="pa-4"
        >
          <div>
            <v-img
              :src="imgSrc(home.logo) + '?fit=clip&h=96'"
              alt=""
            ></v-img>
          </div>
        </v-col>
        <v-col
          v-if="home.footer"
          cols="auto"
          class="pa-4"
          v-html="home.footer"
        ></v-col>
      </v-row>
      <v-row
        class="mx-0 justify-center"
      >
        <v-col
          cols="auto"
          class="caption pb-0"
        >
          @ 2020 稲武商工会
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</v-footer>
</template>

<script>
export default {
  props: ['home', 'menu'],
  computed: {
    imgSrc () {
      return function (img) {
        if(img) {
          return img.url
        }
        return undefined
      }
    }
  }
}
</script>