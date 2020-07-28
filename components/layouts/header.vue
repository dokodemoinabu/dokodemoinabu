<template>
<v-app-bar
    fixed
    :color="(!scroll && $route.path=='/')? 'transparent' : 'rgba(255,255,255,1)'"
    :flat="!scroll && $route.path=='/'"
>
  <v-toolbar-items>
    <v-btn
      text
      class="px-0"
      aria-label="to-top"
      @click="$router.push('/')"
    >
      <div>
        <v-img
          :src="(!scroll && $route.path=='/')? undefined : imgSrc(home.logo) + '?fit=clip&h=48'"
          alt=""
        ></v-img>
      </div>
    </v-btn>
  </v-toolbar-items>

  <v-spacer></v-spacer>
  
  <v-menu
      v-if="$vuetify.breakpoint.xs"
      right
      nudge-right
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        aria-label="menu"
        v-bind="attrs"
        v-on="on"
        icon
      >
          <v-icon large>mdi-menu</v-icon>
      </v-btn>
    </template>
    <v-list>
      <template v-for="item in menu">
      <v-list-item
        :to="`/${item.id}`"
        nuxt
      >
        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
      </template>
    </v-list>
  </v-menu>
  
  <v-toolbar-items v-else>
    <template v-for="item in menu">
    <v-btn
      :to="`/${item.id}`"
      :small="$vuetify.breakpoint.sm"
      color="transparent"
      class="align-self-center"
      depressed
      nuxt
    >
      {{ item.title }}
    </v-btn>
    </template>
  </v-toolbar-items>
</v-app-bar>
</template>

<script>
export default {
  props: ['home', 'menu', 'scroll'],
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