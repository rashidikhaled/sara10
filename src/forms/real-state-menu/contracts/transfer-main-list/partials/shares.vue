<template>
    <fit>
    <safa-grid
        title="مشخصات تحویل دهنده"
        v-model="value.TransferMain_Other07"
        helper="agTransferMain_Other07Columns"
        fit
        cdcName="TransferMain_Other07"
        class="q-mb-sm"
        :m="m"
      />
    </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: {
      type: String,
      default: "r"
    }
  },
  data () {
    return {
      name: "shares",
      Result: {
        TransferMain_Other07: []
      }
      // agTransferMain_Other07Columns: [
      //   {
      //     title: "شماره اشتراک آب",
      //     field: "g01"
      //   },
      //   {
      //     title: "شماره اشتراک برق",
      //     field: "g02"
      //   },
      //   {
      //     title: "شماره اشتراک گاز",
      //     field: "g03"
      //   },
      //   {
      //     title: "شماره اشتراک تلفن",
      //     field: "g04"
      //   },
      //   {
      //     title: "نوع نما",
      //     field: "g05"
      //   }
      // ]
    }
  }
}
</script>
