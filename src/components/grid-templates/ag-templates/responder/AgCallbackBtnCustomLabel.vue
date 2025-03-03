<template>
  <div class="full-width full-height flex items-center justify-around">
    <q-btn
      size="10px"
      dense
      rounded
      no-wrap
      outline
      padding="1px 8px"
      @click.stop="callBack"
      :icon-right="icon"
      class="shadow-1 no-wrap"
      :label="label"
      :title="title"
      :disabled="disabled"
    />
  </div>
</template>

<script>
export default {
  name: "AgCallbackBtnCustomLabel",

  computed: {
    label () {
      const text =
        this.params?.data?.ExecLevel.length <= 10 &&
        this.params?.data?.ExecLevel.length !== 0
          ? this.params?.data?.ExecLevel
          : this.params?.data?.ExecLevel.slice(0, 10) + "..."
      return (
        this.params?.colDef?.headerName ||
        this.params?.colDef?.btnTitle ||
        text ||
        "بدون عنوان"
      )
    },
    title () {
      return (
        this.params?.colDef?.headerName ||
        this.params?.colDef?.btnTitle ||
        this.params?.data?.ExecLevel ||
        ""
      )
    },
    icon () {
      return this.params?.colDef?.btnIcon ?? undefined
    },
    disabled () {
      return this.params?.data?.IsDisable === true ?? false
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
