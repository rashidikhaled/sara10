export function clearResponserState ({ commit }) {
  commit('setResponserState', {})
}

export function setResponserState ({ commit }, payload) {
  commit('setResponserState', payload)
}
