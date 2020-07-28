<template>
<v-app>
  <Header :home="home" :menu="menu" :scroll="scroll" />
  <v-app-bar
    v-if="scroll || $route.path!='/'"
    fixed
    color="rgba(31,223,159,1)"
    height="4"
    flat
  ></v-app-bar>
  
  <nuxt v-scroll="onScroll" />

  <v-btn
    fab
    fixed
    bottom
    right
    @click="$vuetify.goTo(0)"
    v-show="scroll"
    color="rgba(239,245,243,1)"
  >
    <v-icon>
      mdi-chevron-up
    </v-icon>
  </v-btn>

  <Footer :home="home" :menu="menu" />
</v-app>
</template>

<script>
import Header from '~/components/layouts/header.vue';
import Footer from '~/components/layouts/footer.vue';

export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      scroll: false,
      home: '',
      menu: '',
    }
  },
  created () {
    this.$nuxt.$on('updateData', data =>{
      this.home = data.home
      this.menu = data.menu
    })
  },
  methods: {
    onScroll (e) {
      var top = window.pageYOffset ||e.target.scrollTop || 0
      if(top >= window.innerHeight) {
        this.scroll = true
      }
      else {
        this.scroll = false
      }
    }
  },
}
</script>