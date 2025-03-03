<template>
  <!-- <td v-if="!dataItem.inEdit" :class="className">{{ dataItem[field] }}</td> -->
  <td class="grid-template">
    <btn-default
      style="white-space: nowrap;"
      @click="onClick"
      :dense="true"
      class="full-width"
      :color="color"
      :label="text"
    />
  </td>
</template>
<script>
export default {
  data: function () {
    return {
      model: true
    }
  },
  computed: {
    text () {
      return this.isReleased ? "خروج از آزادسازی" : " آزادسازی"
    },
    color () {
      return this.isReleased ? "primary" : "secondary"
    },
    isReleased () {
      return this.dataItem.IsRelease
    }
  },
  props: {
    field: String,
    dataItem: Object,
    format: String,
    className: String,
    columnIndex: Number,
    columnsCount: Number,
    rowType: String,
    level: Number,
    expanded: Boolean,
    editor: String,
    values: String
  },
  methods: {
    onClick (e) {
      const dataParams = {
        e,
        field: this.field,
        dataItem: this.dataItem
      }

      if (this.isReleased) {
        this.$emit("customEvent", "exitFreeCapacity", dataParams)
      } else {
        this.$emit("customEvent", "freeCapacityAccept", dataParams)
      }
    }
  },
  mounted () {
    // // console.log(this)
    // // console.log(this.dataItems[this.field])
  }
}
</script>
