<!--进度条-->
<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible&&settingVisible===2">
      <div class="setting-progress">
        <!--阅读时间-->
        <div class="read-time-wrapper">
          <span class="read-time-text">{{getReadTimeText()}}</span>
          <span class="icon-forward"></span>
        </div>
        <div class="progress-wrapper">
          <!--左侧图标-->
          <div @click="prevSection()" class="progress-icon-wrapper">
            <span class="icon-back"></span>
          </div>
          <!--进度条-->
          <input :disabled="!bookAvailable" :value="progress"
                 @change="onProgressChange($event.target.value)"
                 @input="onProgressInput($event.target.value)"
                 class="progress"
                 max="100"
                 min="0"
                 ref="progress"
                 step="1"
                 type="range">
          <!--右侧图标-->
          <div @click="nextSection()" class="progress-icon-wrapper">
            <span class="icon-forward"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{this.getSectionName}}</span> <!--章节名字-->
          <span class="progress-text">({{bookAvailable ? progress + '%' : $t('book.loading')}})</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import { ebookMixin } from '../../utils/mixin'

  export default {
    mixins: [ebookMixin],
    name: 'EbookSettingProgress',
    computed: {},
    methods: {
      /*进度条拖动松手后*/
      onProgressChange (progress) {
        this.setProgress(progress).then(() => {
          this.displayProgress()
          this.updateProgressBg()
        })
      },
      /*进度条拖动中*/
      onProgressInput (progress) {
        this.setProgress(progress).then(() => {
          this.updateProgressBg() /*拖动中百分比一起变化*/
          /*this.displayProgress()*/      /*内容*/
        })
      },
      /*展示进度在的页面*/
      displayProgress () {
        const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100) /*通过百分比获取cfi 定位*/
        /*渲染cfi*/
        this.display(cfi)
      },
      /*进度条背景*/
      updateProgressBg () {
        this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
      },
      /*上一章节*/
      prevSection () {
        if (this.section > 0 && this.bookAvailable) {   /*解析完*/
          this.setSection(this.section - 1).then(() => {
            this.displaySection()
          })
        }
      },
      nextSection () {
        /*spine epub的章节*/
        if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {   /*解析完*/
          this.setSection(this.section + 1).then(() => {
            this.displaySection()
          })
        }
      },
      /*跳转章节*/
      displaySection () {
        const sectionInfo = this.currentBook.section(this.section)
        if (sectionInfo && sectionInfo.href) {
          this.currentBook.rendition.display(sectionInfo.href).then(() => {
            this.refreshLocation()
          })
        }
      }
    },
    updated () {
      this.updateProgressBg()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 190;
    width: 100%;
    height: px2rem(90);
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);

    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;

      .read-time-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: px2rem(40);
        @include center;
        font-size: px2rem(12);
      }

      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 px2rem(15);
        box-sizing: border-box;

        .progress {
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(2);
          margin: 0 px2rem(10);
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background: white;
            /*  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);*/
            border: px2rem(1) solid #ddd;
          }
        }

        .progress-icon-wrapper {
          flex: 0 0 px2rem(22);
          font-size: px2rem(22);
          @include center;
        }
      }

      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: px2rem(5);
        width: 100%;
        font-size: px2rem(12);
        text-align: center;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        @include center;

        .progress-section-text {
          line-height: px2rem(15);
          @include ellipsis;
        }

        .progress-text {
        }
      }
    }
  }
</style>
