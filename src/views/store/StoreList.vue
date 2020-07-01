<!--分类页面-->
<template>
  <div class="book-list-wrapper">
    <detail-title :showShelf="true"
                  :title="title"
                  @back="back"
                  ref="title">
    </detail-title>
    <!--滚动条-->
    <scroll :top="42"
            @onScroll="onScroll"
            class="book-list-scroll-wrapper"
            ref="scroll">
      <!--所有书籍列表-->
      <featured :btnText="''" :data="value"
                :key="index" :titleText="titleText ? titleText : getCategoryText(key)"
                v-for="(value, key, index) in list"><!--value为空不显示-->
      </featured>
    </scroll>
  </div>
</template>

<script>
  import DetailTitle from '../../components/detail/DetaiTitle'
  import Scroll from '../../components/common/Scroll'
  import Featured from '../../components/home/Featured'
  import { realPx } from '../../utils/utils'
  import { list } from '../../api/store'
  import { categoryList, categoryText } from '../../utils/store'

  export default {
    components: {
      DetailTitle,
      Scroll,
      Featured
    },
    computed: {
      /*获取标题*/
      title () {
        if (this.list) {
          return this.total && this.$t('home.allBook').replace('$1', this.totalNumber)
        } else {
          return null
        }
      },
      /*获取数量*/
      totalNumber () {
        let num = 0
        Object.keys(this.list).forEach(key => {
          num += this.list[key].length
        })
        return num
      }
    },
    data () {
      return {
        list: null,
        total: null
      }
    },
    methods: {
      getCategoryText (key) {
        return `${categoryText(categoryList[key], this)}(${this.list[key].length})`
      },
      back () {
        this.$router.go(-1)/*返回*/
      },
      onScroll (offsetY) {
        if (offsetY > realPx(42)) {
          this.$refs.title.showShadow()
        } else {
          this.$refs.title.hideShadow()
        }
      },

      /*获取图书列表 booklist*/
      getList () {
        list().then(response => {
          this.list = response.data.data/*图书列表*/
          this.total = response.data.total/*total 465*/
          const category = this.$route.query.category/*传入的category*/
          const keyword = this.$route.query.keyword/*传入的keyword 用来做搜索*/
          if (category) {
            const key = Object.keys(this.list).filter(item => item === category)[0]/*取得分类的key*/
            const data = this.list[key]/*通过key找到分类内容*/
            this.list = {}
            this.list[key] = data
          } else if (keyword) {
            /*获取list的所有key再遍历*/
            Object.keys(this.list).filter(key => {
              /*找到搜索内容就返回 覆盖原数组*/
              this.list[key] = this.list[key].filter(book => book.fileName.indexOf(keyword) >= 0)
              /*有则返回*/
              return this.list[key].length > 0
            })
          }
        })
      }
    },
    created () {
      this.getList()/*获取图书列表*/
      this.titleText = this.$route.query.categoryText
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .book-list-wrapper {
    width: 100%;
    height: 100%;
    background: white;
  }
</style>
