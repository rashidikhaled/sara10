<template>
  <div class="full-width full-height no-wrap flex items-center justify-start">
    <q-btn
      size="10px"
      padding="1px 8px"
      @click.stop="callBack"
      icon="more_horiz"
      v-bind="btnOptions"
    />
  </div>
</template>

<script>
export default {
  name: "AgCompanyCallbackBtn",

  computed: {
    companyName () {
      let field = this.params?.colDef?.field
      return this.params?.data?.[field] ?? ''
    },
    btnOptions () {
      const options = {
        color: this.params?.colDef?.btnColor || "primary",
        label: "",
        // this.params?.colDef?.btnTitle ||
        // this.params?.colDef?.headerName ||
        // "",
        title: "",
        iconRight: this.params?.colDef?.btnIcon ?? undefined,
        disable: this.params?.colDef?.IsDisable === true ?? false,
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
