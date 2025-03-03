<template>
  <div class="full-width full-height flex items-center justify-around">
    <q-btn
      size="10px"
      padding="1px 8px"
      @click.stop="callBack"
      v-bind="btnOptions"
    />
  </div>
</template>

<script>
export default {
  name: "AgCallbackBtn",

  computed: {
    btnOptions () {
      const options = {
        color: this.params?.colDef?.btnColor || "primary",
        label:
          this.params?.colDef?.btnTitle ||
          this.params?.colDef?.headerName ||
          "بدون عنوان",
        iconRight: this.params?.colDef?.btnIcon ?? undefined,
        disabled: this.params?.data?.IsDisable === true ?? false,
        class: ["shadow-1 no-wrap", this.params?.colDef?.btnClass ?? ""],
        dense: true,
        rounded: true,
        noWrap: true,
        outline: true
      }

      if (this.params?.colDef?.btnOptions) {
        Object.assign(options, this.params.colDef.btnOptions)
      }
      return options
    }
  },

  methods: {
    callBack () {
      if (this.params?.colDef?.callback) {
        this.params.colDef.callback(this.params.data)
      }
    }
  }
}
</script>
