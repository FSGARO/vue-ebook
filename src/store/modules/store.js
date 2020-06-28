const store = {
  state: {
    hotSearchOffsetY: 0,/*搜索页面滑动距离*/
    flapCardVisible: false,/*卡片是否显示*/
  },
  mutations: {
    SET_HOT_SEARCH_OFFSETY: (state, offsetY) => {
      state.hotSearchOffsetY = offsetY
    },
    SET_FLAP_VISIBLE: (state, visible) => {
      state.flapCardVisible = visible
    },
  },
}
export default store
