<template>
  <div class="shelf-footer" v-show="isEditMode">
    <div class="shelf-footer-tab-wrapper">
      <div :class="{'is-selected':isSelected}" @click="removeSelected"
           class="shelf-footer-tab">
        <div class="icon-shelf tab-icon"></div>
        <div class="tab-text">{{$t('shelf.remove')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin'
  import Toast from '../common/Toast'
  import { setLocalStorage } from '../../utils/localStorage'

  export default {
    components: { Toast },
    mixins: [storeShelfMixin],
    data () {
      return {
        toastText: '移除成功',
      }
    },
    computed: {
      isSelected () {
        return this.shelfSelected && this.shelfSelected.length > 0
      }
    },
    methods: {
      /*删除图书*/
      removeSelected () {
        /*遍历选中*/
        console.log(this.shelfList)
        this.shelfSelected.forEach(selected => {
          this.setShelfList(this.shelfList.filter(book => book !== selected))
        })
        console.log(this.shelfList)
        /*选中恢复*/
        this.setShelfSelected([])
        this.setIsEditMode(false)
        /*保存*/
        setLocalStorage('shelf', this.shelfList)
      },
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .shelf-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 120;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-2) px2rem(4) 0 rgba(0, 0, 0, .1);

    .shelf-footer-tab-wrapper {
      flex: 1;
      width: 25%;
      height: 100%;

      .shelf-footer-tab {
        width: 100%;
        height: 100%;
        opacity: .5;
        @include center;

        &.is-selected {
          opacity: 1;
        }

        .tab-icon {
          font-size: px2rem(20);
          color: #666;
        }

        .tab-text {
          margin-top: px2rem(5);
          font-size: px2rem(12);
          color: #666;
        }

        .icon-shelf {
          color: $color-pink;
        }

        .shelf-toast {
          top: 0;
        }
      }
    }
  }
</style>
