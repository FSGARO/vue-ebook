<!--书签图标-->
<template>
  <div :style="style" class="bookmark" ref="bookmark"></div>
</template>

<script>
  import { px2rem } from '../../utils/utils'

  export default {
    /*修改*/
    props: {
      width: Number,
      height: Number,
      color: String
    },
    computed: {
      style () {
        /*改颜色*/
        if (this.color) {
          return {
            borderColor: `${this.color} ${this.color} transparent ${this.color}`
          }
        } else {
          return {}
        }
      }
    },
    methods: {
      /*宽高*/
      refresh () {
        if (this.height && this.width) {
          this.$refs.bookmark.style.borderWidth = `${px2rem(this.height - 5)}rem
          ${px2rem(this.width / 2)}rem
          ${px2rem(5)}rem
          ${px2rem(this.width / 2)}rem`
        }
      }
    },
    mounted () {
      /*刷新宽高*/
      this.refresh()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  /*书签*/
  .bookmark {
    width: 0;
    height: 0;
    border-width: px2rem(50) px2rem(10) px2rem(10) px2rem(10);
    border-style: solid;
    border-color: white white transparent white;
  }
</style>
