<template>
  <div class="shelf-item-book">
    <!--书图-->
    <img :src="data.cover" class="shelf-item-book-cover" v-lazy="data.cover">
  </div>
</template>

<script>
  export default {
    props: {
      data: Object
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-item-book {
    width: 100%;
    height: 100%;
    .shelf-item-book-cover {
      width: 100%;
      height: 100%;
    }
  }
</style>
