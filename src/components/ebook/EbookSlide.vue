<!--侧滑-->
<template>
  <transition name="fade-slide-right">
    <div class="slide-content-wrapper" v-show="this.menuVisible && this.settingVisible === 3">
      <transition name="slide-right">
        <!--左-->
        <div class="content" v-if="settingVisible === 3">
          <div class="content-page-wrapper" v-if="bookAvailable">
            <div class="content-page">
              <component :is="currentTab === 1 ? content : bookmark"></component>
            </div>
            <!--下面的选项-->
            <div class="content-page-tab">
              <div :class="{'selected': currentTab === 1}"
                   @click="selectTab(1)"
                   class="content-page-tab-item">
                {{$t('book.navigation')}}
              </div>
              <div :class="{'selected': currentTab === 2}"
                   @click="selectTab(2)"
                   class="content-page-tab-item">
                {{$t('book.bookmark')}}
              </div>
            </div>
          </div>
          <div class="content-empty" v-else>
            <EbookLoading></EbookLoading>
          </div>
        </div>
      </transition>
      <!--右-->
      <div @click="hideTitleAndMenu()" class="content-bg"></div>
    </div>
  </transition>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  import EbookSlideContents from './EbookSlideContents'
  import EbookLoading from './EbookLoading'
  import EbookSlideBookmark from './EbookSlideBookmark'

  export default {
    mixins: [ebookMixin],
    name: 'EbookSlide',
    components: {
      EbookLoading
    },
    data () {
      return {
        currentTab: 1,
        content: EbookSlideContents,
        bookmark: EbookSlideBookmark
      }
    },
    methods: {
      selectTab (tab) {
        this.currentTab = tab
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .slide-content-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 350;
    display: flex;
    width: 100%;
    height: 100%;

    .content {
      flex: 0 0 85%;
      width: 85%;
      height: 100%;

      .content-page-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        .content-page {
          flex: 1;
          width: 100%;
          overflow: hidden;
        }

        .content-page-tab {
          display: flex;
          flex: 0 0 px2rem(48);

          .content-page-tab-item {
            flex: 1;
            font-size: px2rem(12);
            @include center;
          }
        }
      }

      .content-empty {
        width: 100%;
        height: 100%;
        @include center;
        font-size: px2rem(16);
        color: #333;
      }
    }

    .content-bg {
      flex: 0 0 15%;
      width: 15%;
      height: 100%;
    }
  }
</style>
