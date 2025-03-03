<template>
  <safa-text
    v-model.number="params.data.KCoeffiecient"
    cdcName="KCoeffiecient"
    :m="KCoeffiecientMode"
    type="number"
    @blur="inlineDoCalculateVoteValue"
    v-on:keydown.enter.prevent="inlineDoCalculateVoteValue"
  />
</template>

<script>
export default {
  name: "AgKCoeffiecient",

  computed: {
    KCoeffiecientMode () {
      if (this.params.data.IsHaveVote) return "r"
      return this.params.colDef.isEditable ? "e" : "r"
    }
  },

  methods: {
    getValue () {
      return this.params.data.KCoeffiecient
    },
    onCellValueChanged () {
      // debugger
      // this.params.api.refreshCells()
      // در این بخش خط کد بالا باعث میشد که کل گرید رفرش شود و دیتای سطرهای غیر از سطری که کلیک شده در ستون مبلغ رای ازبین برود . که کامنت شد و در فرم اصلی هندل شد.
      this.inlineDoCalculateVoteValue()
    },

    inlineDoCalculateVoteValue () {
      // debugger
      this.KCoeffiecientMode === "e" && this.params.colDef.callback(this.params.data)
    }
  }
}
</script>
