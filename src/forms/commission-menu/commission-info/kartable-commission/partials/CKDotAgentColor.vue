<template>
  <div
    class="flex items-center justify-center"
    :style="`width: 16px; height: 16px;cursor: ${
      showTooltip ? 'help' : 'default'
    }`"
  >
    <q-icon
      name="help"
      v-if="showTooltip"
      size="16px"
      :style="`color: ${colorInKartable}`"
    />
    <!--    <span class="dot-agent-color" v-if="showTooltip">-->
    <!--  </span>-->
    <q-tooltip
      v-if="showTooltip"
      content-class="bg-white text-grey-8 shadow-3"
      :delay="700"
      :offset="[0, 10]"
    >
      <div class="data-info">
        <div>
          <label>نوع کمیسیون:</label>
          <span>{{ row.CommissionType }}</span>
        </div>
        <div>
          <label>شماره کمیسیون:</label>
          <span>{{ row.Commission }}</span>
        </div>
        <div>
          <label>تاریخ کمیسیون:</label>
          <span>{{ row.CommissionDate }}</span>
        </div>
        <div>
          <label>تاریخ رای:</label>
          <span>{{ row.VoteDate }}</span>
        </div>
        <div>
          <label>درصد انجام کار:</label>
          <span>{{ row.CompeletPrecent }} درصد</span>
        </div>
      </div>
    </q-tooltip>
  </div>
</template>

<script>
export default {
  name: "CKDotAgentColor",
  props: {
    row: Object
  },
  computed: {
    colorInKartable () {
      if (!this.row) return "#fff"
      let { AgentCount, ColorInKartabl = "" } = this.row
      if (AgentCount === 3) {
        ColorInKartabl = "#d75528"
      } else if (AgentCount === 1) {
        ColorInKartabl = "#f1364b"
      }

      return ColorInKartabl
    },
    showTooltip () {
      if (!this.row) return false
      let { GuidAgent } = this.row
      const isUserMatch = (guid) =>
        guid.toLowerCase().indexOf(this.currentUser.NidUser.toLowerCase()) > -1
      return GuidAgent && isUserMatch(GuidAgent)
    }
  }
}
</script>

<style scoped lang="scss">
.dot-agent-color {
  width: 14px;
  height: 14px;
  display: inline-block;
  border-radius: 50px;
}
</style>
