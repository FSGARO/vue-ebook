<!--选择字体界面 加入菜单中-->
<template>
  <transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hide">
          <span class="icon-down2"></span>
        </div>
        <span class="ebook-popup-title-text">选择字体</span>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div class="ebook-popup-item" v-for="(item, index) in fontFamilyList" :key="index"
             @click="setFontFamily(item.font)"
        >
          <!--字体名称-->
          <div class="ebook-popup-item-text" :class="{'selected' :isSelected(item)}">{{item.font}}</div>
          <div class="ebook-popup-item-check" v-if="isSelected(item)">
            <!--后面的图标-->
            <span class="icon-check"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { ebookMinx } from '../../utils/mixin'
  import { FONT_FAMILY } from '../../utils/book'
  import { setLocalStorage, getLocalStorage, removeLocalStorage, clearLocalStorage } from '../../utils/localStorage'

  export default {
    mixins: [ebookMinx],
    data () {
      return {
        fontFamilyList: FONT_FAMILY
      }
    },
    name: 'EbookSettingFontPopup',
    methods: {
      /*隐藏字体选项*/
      hide () {
        this.setFontFamilyVisible(false)
      },
      isSelected (item) {
        return this.defaultFontFamily === item.font
      },
      setFontFamily (font) {
        this.setDefaultFontFamily(font)/*改字体*/
        if (font === 'Default') {
          this.currentBook.rendition.themes.font('Times New Roman')/*改字体*/
        } else {
          this.currentBook.rendition.themes.font(font)/*改字体*/
        }
        this.setFontFamilyVisible(false)/*选择后自动关闭选项*/
      }
    },
    mounted () {
      setLocalStorage(this.fileName, 'aaa')
      console.log(getLocalStorage(this.fileName))
      removeLocalStorage()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook-popup-list {
    position: absolute; /*绝对布局*/
    bottom: 0;
    left: 0;
    z-index: 300;
    width: 100%;
    background: white;
    box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, .1);

    .ebook-popup-title {
      position: relative;
      padding: px2rem(15);
      box-sizing: border-box;
      text-align: center;
      border-bottom: px2rem(1) solid #b8b9bb;
      @include center;

      .ebook-popup-title-icon {
        position: absolute;
        left: px2rem(15);
        top: 0;
        height: 100%;
        font-size: px2rem(16);
        font-weight: bold;
        @include center;
      }

      .ebook-popup-title-text {
        font-size: px2rem(14);
        font-weight: bold;
      }
    }

    .ebook-popup-list-wrapper {
      .ebook-popup-item {
        display: flex;
        padding: px2rem(15);

        .ebook-popup-item-text {
          flex: 1;
          font-size: px2rem(14);
          text-align: left;
          /*&表示与.ebook-popup-item-text 同级*/
          &.selected {
            color: #346cb9;
            font-weight: bold;
          }
        }

        .ebook-popup-item-check {
          flex: 1;
          text-align: right;
          font-size: px2rem(14);
          font-weight: bold; /*加粗*/
          color: #346cb9;
        }
      }
    }
  }
</style>
