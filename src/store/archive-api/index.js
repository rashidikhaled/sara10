export default {
  namespaced: true,
  state () {
    return {
      archiveBaseUrl: '',
      tokens: {
        'aa:uu': {
          access_token: 'sss',
          expires_in: null,
          refresh_token: '',
          token_type: 'bearer'
        }
      }
    }
  },
  getters: {
    getTokens: state => Object.keys(state.tokens).reduce((out, key) => {
      if (typeof out !== 'object') out = {}
      out[key] = state.tokens[key].access_token
      return out
    }, {}),
    baseUrl: state => state.archiveBaseUrl ?? ''
  },
  mutations: {},
  actions: {
    setArchiveBaseUrl ({ state }, url) {
      if (!`${url}`.endsWith('/')) url += '/'
      state.archiveBaseUrl = url
    },
    async fetchToken ({ state }, { username, password }) {
      const key = `${username}:${password}`
      const isTokenExpired = (exp) => {
        if (!exp) return true
        return parseInt(Date.now() / 1000) > exp
      }

      const existData = state.tokens[key]
      if (existData && existData.access_token && !isTokenExpired(existData.expires_in)) return existData.access_token

      // const payload = {
      //   username,
      //   password,
      //   grant_type: 'password'
      // }
      const headers = new Headers()
      headers.append('Content-Type', 'application/x-www-form-urlencoded')

      const urlencoded = new URLSearchParams()
      urlencoded.append('username', username)
      urlencoded.append('password', password)
      urlencoded.append('grant_type', 'password')

      const url = `${state.archiveBaseUrl}Login`
      const res = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: urlencoded
      })

      const data = await res.json()
      if (data.access_token) {
        state.tokens[key] = {
          ...data,
          expires_in: parseInt(Date.now() / 1000) + data.expires_in
        }
      }

      return data.access_token
    },
    resetToken ({ state }, { username, password }) {
      delete state.tokens[`${username}:${password}`]
    }
  }
}
