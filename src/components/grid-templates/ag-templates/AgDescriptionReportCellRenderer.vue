<template>
  <div class="flex items-center" style="padding-top: 2px">
    <span @click="clickHandler(params.data)" :class="`ckrow__badgeBtn`"
      >گزارش توضیحات</span
    >
    <!-- <div v-if="noteDialog">
      <safa-popup
        v-model="noteDialog"
        width="600px"
        height="500px"
        title="یادداشت"
      >
        hello
      </safa-popup>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "AgDescriptionReportCellRenderer",

  components: {},

  data () {
    return {
      noteDialog: false
    }
  },
  methods: {
    clickHandler (e) {
      console.log("e :>> ", e)
    //   debugger
    }
  }
}
</script>
