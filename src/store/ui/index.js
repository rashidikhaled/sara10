export default {
  namespaced: true,
  state: {
    layoutSplitterWidth: 50,
    layoutMode: 'full',
    showSidebar: true,
    leftSideForm: 'map',
    leftSideFormArgs: null
  },
  getters: {
    layoutSplitterWidth: state => state.layoutMode === 'full' ? 100 : state.layoutMode === 'map' ? 0 : state.layoutSplitterWidth,
    layoutMode: state => state.layoutMode,
    isShowSidebar: state => state.showSidebar
  },
  mutations: {
    setLayoutWidth (state, value) {
      state.layoutSplitterWidth = value
    },
    setLayoutMode (state, value) {
      state.layoutMode = value
    },
    setSidebarVisibility (state, value) {
      state.showSidebar = value
    }
  },
  actions: {
    setLayoutWidth ({ commit }, value) {
      commit('setLayoutWidth', value)
    },
    setLayoutMode ({ commit }, value) {
      commit('setLayoutMode', value)
    },
    setSidebarVisibility ({ commit }, value) {
      commit('setSidebarVisibility', value)
    }
  }
}
