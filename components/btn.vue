<template>
<v-btn
  :href="link"
  style="border-color:rgba(31,223,159,1);border-width:2px;"
  outlined
  large
>
  {{ label }}
</v-btn>
</template>

<script>
export default {
  props: ['label', 'link']
}
</script>