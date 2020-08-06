<template>
<v-row
  v-if="item.contents1 == '' && item.slider == '' && item.contents2 == '' && item.embedded == ''"
  class="justify-center pb-16 mb-sm-16"
>
  <v-col
    v-if="item.contents1"
    cols="12"
    sm="8"
    md="6"
    lg="5"
    v-html="item.contents1"
  ></v-col>
  
  <v-col
    v-if="item.slider != ''"
    cols="12"
    sm="8"
    md="6"
    lg="5"
  >
    <v-carousel
      cycle
      height="auto"
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(item,i) in item.slider"
        :key="i"
        :src="imgSrc(item.img)"
      ></v-carousel-item>
    </v-carousel>
  </v-col>
  
  <v-col
    v-if="item.contents2"
    cols="12"
    sm="8"
    md="6"
    lg="5"
    v-html="item.contents2"
  ></v-col>
  
  <v-col
    v-if="item.embedded"
    cols="12"
    sm="8"
    md="6"
    lg="5"
  >
    <div style="width: 100%;padding-bottom: 56.25%;height: 0px;position: relative;">
      <iframe
        style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);-webkit-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);"
        width="100%"
        height="100%"
        title="Movie"
        :src="embeddedSrc(item.embedded)"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </v-col>
</v-row>
</template>

<script>
import Title from '~/components/title.vue';

export default {
  components: {
    Title
  },
  props: ['item'],
  computed: {
    imgSrc () {
      return function (img) {
        if(img) {
          return img.url
        }
        return undefined
      }
    },
    size () {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 264
      }
      else {
        return 360
      }
    },
    embeddedSrc () {
      return function (embedded) {
        if (embedded.includes('youtu')) {
          var src = embedded
          if (embedded.includes('youtube')) {
              src = src.slice(32)
          }
          else {
              src = src.slice(17)
          }
          return `https://www.youtube.com/embed/${src}`
        }
      }
    }
  }
}
</script>