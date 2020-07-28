<template>
<v-col
  cols="12"
  md="6"
  lg="5"
  class="d-flex flex-column justify-center px-3 pa-md-3"
>
  <template v-for="item in contents">
  <div v-if="item.contents" v-html="item.contents"></div>
  <div v-else-if="item.img" class="d-flex justify-center pt-1 pb-5">
    <v-img
      :src="imgSrc(item.img)"
      :max-width="size"
    ></v-img>
  </div>
  </template>
  <v-spacer></v-spacer>
</v-col>
</template>

<script>
export default {
  props: ['contents'],
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
      if (this.$vuetify.breakpoint.xs) {
        return 264
      }
      else if (this.$vuetify.breakpoint.sm) {
        return 480
      }
      else {
        return 360
      }
    }
  }
}
</script>