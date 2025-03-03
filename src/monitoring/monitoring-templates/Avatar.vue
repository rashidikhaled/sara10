<template>
  <div
    :size="size"
    class="user-avatar-wrap"
  >
    <img
      v-if="!failed"
      v-bind="$attrs"
      class="user-avatar"
      :src="imageUrl"
      @error="failed = true"
      v-on="$listeners"
    />
    <div
      v-else
      v-bind="$attrs"
      class="user-avatar--fallback"
      v-on="$listeners"
      :style="`background-color: ${fill}`"
    >
      <q-img src="../static/user.png" :alt="altText" />
    </div>
  </div>
</template>
<script>
// import styled from 'vue-styled-components'
import { utils } from 'ui-core'

// const avatarWrapper = styled('div', {
//   size: Number
// })`
//   width: ${(props) => props.size + 'px'};
//   height: ${(props) => props.size + 'px'};
//   min-width: ${(props) => props.size + 'px'};
//   min-height: ${(props) => props.size + 'px'};
//   border-radius: 50px;
//   position: relative;
//   overflow: hidden;
//   background-color: #fff;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `

export default {
  components: {
    // avatarWrapper
  },
  props: {
    src: {
      type: String
    },
    nidUser: String,
    alt: {
      type: String
    },
    useChar: {
      type: Boolean,
      default: true
    },
    fill: {
      type: String,
      default: '#3c5076' // #7cc655 => green
    },
    size: {
      type: Number,
      default: 30
    }
  },
  data () {
    return {
      failed: false
    }
  },
  computed: {
    imageUrl () {
      if (this.src) return this.src
      // eslint-disable-next-line no-undef
      if (this.nidUser) {
        let url = window.getConfigValue('securityBaseUrl') || window.getConfigValue('security.service')
        // eslint-disable-next-line standard/array-bracket-even-spacing
        return utils.appendUrls([ url, `/avatar/${this.nidUser}.png`])
      }
      return ''
    },
    altText () {
      if (this.useChar && this.alt) {
        const separated = this.alt.split(' ')
        const safeName =
          separated[0].charAt(0) + (separated[1] || ' ').charAt(0)
        return safeName.toUpperCase().trim()
      }
      return this.alt
    }
  },
  watch: {
    imageUrl () {
      this.failed = false
    }
  }
}
</script>
