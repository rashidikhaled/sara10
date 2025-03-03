<template>
  <td>
    {{ formatDate() }}
  </td>
</template>
<script>
import PersianDate from "persian-date"
export default {
  props: {
    field: String,
    dataItem: Object,
    className: String,
    format: {
      type: String,
      default: "dddd"
    },
    toLocale: {
      type: String,
      default: "fa"
    }
  },
  computed: {
    date () {
      return this.dataItem[this.className] || ""
    }
  },
  methods: {
    formatDate () {
      const normalize = this.normalizeDate()
      if (!normalize) return ""

      return new PersianDate(normalize)
        .toLocale(this.toLocale)
        .format(this.format)
    },
    normalizeDate () {
      if (!this.date) return null

      return this.date.split("/").map((x) => Number(x))
    }
  }
}
</script>
