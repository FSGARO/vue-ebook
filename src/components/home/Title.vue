<!--小标题-->
<template>
  <div class="home-title-wrapper">
    <!--类别名字-->
    <div class="label">{{label}}</div>
    <!--按钮名字-->
    <div @click="click" class="btn">{{btn}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      label: String,
      btn: String
    },
    methods: {
      click () {
        this.$emit('onClick')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .home-title-wrapper {
    width: 100%;
    padding: px2rem(15) px2rem(10);
    box-sizing: border-box;
    @include top;

    .label {
      flex: 1;
      font-size: px2rem(18);
      color: #333;
      font-weight: bold;
    }

    .btn {
      font-size: px2rem(14);
      color: rgba(64, 158, 255, 1);

      &:active {
        color: rgba(64, 158, 255, .5);
      }
    }
  }
</style>
