<template>
  <div
      v-if="showBtn"
      class="full-width full-height flex items-center justify-around"
  >
      <q-btn
          size="10px"
          padding="1px 12px"
          @click.stop="callBack"
          v-bind="btnOptions"
          class="cursor-pointer"
      />
  </div>
</template>

<script>
export default {
  name: 'AgCallbackBtn',

  computed: {
    btnOptions () {
      const options = {
        color: this.params.colDef.btnColor || 'primary',
        label: this.labelHandler(),
        icon: this.params.colDef.btnIcon || undefined,
        disabled: this.params.data.IsDisable === true || false,
        class: [
          'shadow-1 no-wrap',
          this.params.colDef.btnClass || ''
        ],
        dense: true,
        rounded: true,
        noWrap: true,
        outline: true
      }

      if (this.params.colDef.btnOptions) {
        Object.assign(options, this.params.colDef.btnOptions)
      }
      return options
    },

    showBtn () {
      // eslint-disable-next-line no-prototype-builtins
      if (this.params.colDef.hasOwnProperty('showBtn')) {
        if (typeof this.params.colDef.showBtn === 'function') {
          return this.params.colDef.showBtn(this.params.data)
        } else return this.params.colDef.showBtn
      }

      return this.params.colDef.showBtn || true
    }
  },

  methods: {
    callBack () {
      if (this.params.colDef.callback) {
        this.params.colDef.callback(this.params.data)
      }
    },
    labelHandler () {
      if (typeof this.params.colDef.btnTitle === 'function') {
        return this.params.colDef.btnTitle(this.params.data)
      } else return this.params.colDef.btnTitle || this.params.colDef.headerName || (this.params.colDef.btnIcon ? '' : 'بدون عنوان')
    }
  }
}
</script>
