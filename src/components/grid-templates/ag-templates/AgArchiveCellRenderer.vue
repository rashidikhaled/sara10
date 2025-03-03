<template>
  <div class="flex no-wa items-center" style="padding-top: 2px">
    <span @click="clickHandler(params.data)" :class="`ckrow__badgeBtn`"
      >آرشیو گزارشات</span
    >
    <div v-if="showReportsArchive">
      <safa-popup title="آرشیو" v-model="showReportsArchive">
        <ReportsArchive :selectedRow="selectedRow" />
      </safa-popup>
    </div>
  </div>
</template>

<script>
import ReportsArchive from "../../../forms/engineers-operation/kartable-references/partials/ReportsArchive.vue"
export default {
  name: "AgArchiveCellRenderer",
  components: { ReportsArchive },
  data () {
    return {
      selectedRow: null,
      showReportsArchive: false
    }
  },
  methods: {
    clickHandler (e) {
      this.selectedRow = e
      this.showReportsArchive = true
    }
  }
}
</script>

<style lang="scss">
.ckrow__badgeBtn {
  color: $primary;
  min-width: 32px;
  padding: 2px 6px;
  white-space: nowrap;
  font-size: 10px;
  border: 1px solid $primary;
  line-height: normal;
  background-color: #fff;
  border-radius: 20px;
  text-align: center;
  position: relative;
  cursor: pointer;

  body.body--dark & {
    border-color: var(--dark-border);
    background-color: var(--dark);
    color: var(--dark-text-color);
  }
}
</style>
