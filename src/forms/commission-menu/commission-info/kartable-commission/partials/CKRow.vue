<template>
  <div :class="rootClass" :style="rootStyle" :data-comid="row.NidCommission">
    <div
      :class="[
        'ck__summary no-wrap cursor-pointer q-pa-sm flex items-center',
        rowBgColor
      ]"
      @click="rowClickHandler"
    >
      <div class="ckrow__cell" style="min-width: 880px; padding: 0 !important">
        <div class="flex items-center q-gutter-x-sm">
          <span style="min-width: 14px"
            ><q-checkbox
              dense
              size="xs"
              @input="changeSelectedValue"
              :value="isSelected"
          /></span>
          <span class="text-grey" style="min-width: 12px">{{
            row.rownumber
          }}</span>
          <span class="ckrow__expandable">
            <q-icon
              size="17px"
              :color="isExpanded ? 'positive' : 'grey'"
              dense
              :name="isExpanded ? 'check' : 'expand_more'"
          /></span>
          <CKDotAgentColor :row="row" />
          <CKInlinePercentage
            :percent="row.CompeletPrecent"
            :color="percentageColor"
          />
          <CKNoteDescription :row="row" @showNote="$emit('showNote')" />
          <CKLaterTime :row="row" />
          <span class="ckrow__separator"><q-separator vertical /></span>
          <span class="ckrow__region">{{ regionText }}</span>
          <span
            class="ckrow__priority"
            :class="
              priorityText === 'آنی' || priorityText === 'فوری'
                ? 'ckr__urgent'
                : ''
            "
            >{{ priorityText }}</span
          >
          <div>
            <div
              class="flex items-center q-gutter-x-sm"
              style="min-width: 351px"
            >
              <span
                :class="`ckrow__badge text-lime-8 ${
                  row.IsRelapse ? 'is__active' : 'not__active'
                }`"
                >عودتی</span
              >
              <span
                :class="`ckrow__badge text-green-5 ${
                  row.IsPast ? 'is__active' : 'not__active'
                }`"
                >سابقه</span
              >
              <span
                :class="`ckrow__badge text-teal-5 ${
                  row.IsKarbari ? 'is__active' : 'not__active'
                }`"
                >تغییر کاربری</span
              >
              <span
                :class="`ckrow__badge text-deep-purple-6 ${
                  row.IsMeeting ? 'is__active' : 'not__active'
                }`"
                >حضور نماینده</span
              >
              <span
                :class="`ckrow__badge text-indigo-5 ${
                  row.HasTasmim ? 'is__active' : 'not__active'
                }`"
                >دارای رای تصمیم</span
              >
            </div>
          </div>
          <CKRAgents :row="row" />
          <span class="ckrow__separator"><q-separator vertical /></span>
          <VoteDate :row="row" />
        </div>
      </div>
      <!--      <span class="ckrow__separator"><q-separator vertical/></span>-->
      <div
        style="min-width: 100px"
        class="code-number text-center ckrow__cell"
        dir="ltr"
      >
        {{ row.UrbanNidRequest }}
      </div>
      <div
        style="min-width: 140px; max-width: 140px"
        :title="row.BizCode"
        class="code-number ellipsis nodesazi-code ckrow__cell"
        dir="ltr"
      >
        {{ row.BizCode }}
      </div>
      <div style="min-width: 160px" class="ckrow__cell text-center">
        {{ row.WorkflowTitel }}
      </div>
      <!-- <div style="min-width: 80px;" class="code-number ckrow__cell text-center" dir="ltr"><div class="ckrow__agentCount" :class="row.AgentCount === 0 ? 'ckr__more': ''">{{ row.AgentCount }}</div></div> -->
      <div
        style="min-width: 80px"
        class="code-number ckrow__cell text-center"
        dir="ltr"
      >
        <div :class="['ckrow__agentCount', agentCountColor]">
          {{ row.AgentCount }}
        </div>
      </div>
      <div
        style="min-width: 80px"
        class="code-number ckrow__cell text-center"
        dir="ltr"
      >
        {{ row.SecrNo }}
      </div>
      <div
        style="min-width: 200px; max-width: 200px"
        class="ckrow__cell text-center ellipsis"
        :title="row.OwnerName"
      >
        {{ row.OwnerName }}
      </div>
      <div
        style="min-width: 120px; max-width: 120px"
        class="ckrow__cell text-center ellipsis"
        :title="row.Requester"
      >
        {{ row.Requester }}
      </div>
      <div
        style="min-width: 200px; max-width: 200px"
        class="ckrow__cell ellipsis"
        :title="row.Regplaque"
      >
        {{ row.Regplaque }}
      </div>
      <div
        style="min-width: 150px; max-width: 150px"
        class="ckrow__cell ellipsis"
        :title="row.BackStateTitle"
      >
        {{ row.BackStateTitle }}
      </div>
      <div
        style="min-width: 150px; max-width: 150px"
        class="ckrow__cell ellipsis"
        :title="row.TaskTitel"
      >
        {{ row.TaskTitel }}
      </div>
      <div
        dir="ltr"
        style="min-width: 100px; max-width: 100px"
        class="ckrow__cell text-center ellipsis"
      >
        {{ row.SendDate }}
      </div>
      <div
        dir="ltr"
        style="min-width: 100px; max-width: 100px"
        class="ckrow__cell text-center ellipsis"
      >
        {{ row.CommissionDate }}
      </div>
      <div
        dir="ltr"
        style="min-width: 120px; max-width: 120px"
        class="ckrow__cell text-center ellipsis"
      >
        {{ row.CommissionDateExpert }}
      </div>
      <div
        dir="ltr"
        style="min-width: 100px; max-width: 100px"
        class="ckrow__cell text-center ellipsis"
      >
        {{ row.DateCommissionExpert }}
      </div>
      <div
        dir="ltr"
        style="min-width: 140px; max-width: 140px"
        class="ckrow__cell text-center ellipsis"
      >
        {{ row.RandomCommissionDate }}
      </div>
      <div
        dir="ltr"
        style="min-width: 100px; max-width: 100px"
        class="ckrow__cell text-center ellipsis"
      >
        {{ row.VoteDate }}
      </div>
      <div
        dir="ltr"
        style="min-width: 100px; max-width: 100px"
        class="ckrow__cell text-center ellipsis"
      >
        {{ row.Commission }}
      </div>
    </div>
    <q-slide-transition :duration="250">
      <CKMorePanel
        :percentageColor="percentageColor"
        :currentCommission="currentCommission"
        :row="row"
        v-if="isExpanded"
      />
    </q-slide-transition>
  </div>
</template>

<script>
import CKInlinePercentage from "./CKInlinePercentage"
import CKDotAgentColor from "./CKDotAgentColor"
import CKNoteDescription from "./CKNoteDescription"
import CKLaterTime from "./CKLaterTime"
import CKRAgents from "./CKRAgents"
import VoteDate from "./VoteDate"
import CKMorePanel from "./CKMorePanel"

export default {
  name: "CKRow",
  components: {
    CKMorePanel,
    VoteDate,
    CKRAgents,
    CKNoteDescription,
    CKLaterTime,
    CKInlinePercentage,
    CKDotAgentColor
  },
  props: {
    row: Object,
    rowBgColor: {
      type: String,
      default: "bg__s0"
    }
  },
  data () {
    return {
      regionText: "",
      priorityText: "",
      currentCommission: "",
      commissionType: ""
    }
  },
  computed: {
    isSelected () {
      return this.$store.getters["commission/selectedIds"].includes(
        this.row[this.rowKey]
      )
    },
    isExpanded () {
      return this.$store.getters["commission/expandedIds"].includes(
        this.row[this.rowKey]
      )
    },
    rowKey () {
      return this.$store.getters["commission/RowKey"]
    },
    rootClass () {
      return `ck-row ${this.isExpanded ? "is-active" : ""}`
    },
    rootStyle () {
      // const r = this.row
      return {
        borderRight: `5px solid ${this.lateDaysColor}`
      }
    },
    percentageColor () {
      const { CompeletPrecent } = this.row
      let bgColor = ""
      if (CompeletPrecent > 85) {
        bgColor = "#4caf50"
      } else if (CompeletPrecent > 50) {
        bgColor = "#fdd835"
      } else if (CompeletPrecent > 25) {
        bgColor = "#f79300"
      } else {
        bgColor = "#ff5722"
      }
      return bgColor
    },
    lateDaysColor () {
      const { LaterTime } = this.row
      let color = ""
      if (LaterTime > 900) {
        color = "#ff5722"
      } else if (LaterTime > 600) {
        color = "#f79300"
      } else if (LaterTime > 300) {
        color = "#e5c01f"
      } else {
        color = "#4caf50"
      }
      return color
    },
    agentCountColor () {
      let agentColor = "s0"
      if (this.row.AgentCount === 0 || this.row.AgentCount === 2) {
        agentColor = "s0"
      } else if (this.row.AgentCount === 1) {
        agentColor = "s1"
      } else if (this.row.AgentCount === 3) {
        agentColor = "s3"
      } else {
        agentColor = "s0"
      }

      return `ckr__${agentColor}`
    }
  },
  methods: {
    changeSelectedValue (value) {
      this.$emit("update:selected", value)
    },
    getRegion () {
      this.$ci
        .getName({
          name: "CI_Region",
          domain: "Commission100",
          value: this.row.CI_Region
        })
        .then((data) => {
          this.regionText = data
        })
    },
    getCommissionType () {
      this.$ci
        .getName({
          name: "CI_CommissionType",
          domain: "Commission100",
          value: this.row.CI_CommissionType
        })
        .then((data) => {
          this.commissionType = data
        })
    },
    getCurrentCommission () {
      this.$ci
        .getName({
          name: "CI_VoteCorrection",
          domain: "Commission100",
          value: this.row.CI_VoteCorrection
        })
        .then((data) => {
          this.currentCommission = data
        })
    },
    getPriority () {
      this.$ci
        .getName({
          name: "CI_CommissionPriority",
          domain: "Commission100",
          value: this.row.CI_CommissionPriority
        })
        .then((data) => {
          this.priorityText = data
        })
    },
    rowClickHandler () {
      this.$store.dispatch("commission/setSelectedCommission", this.row)
      this.$emit("update:expandable", !this.isExpanded)
      this.$emit("row:click", this.row)
    }
  },
  created () {
    this.getRegion()
    this.getPriority()
    this.getCurrentCommission()
  },
  watch: {
    row () {
      this.getRegion()
      this.getPriority()
      this.getCurrentCommission()
    }
  }
}
</script>

<style lang="scss">
.ck-row {
  transition: 0.2s all ease;
  position: relative;
  min-height: 35px;

  .ck__summary {
    height: 35px;

    &.bg__s0 {
      background-color: White;
    }
    &.bg__s1 {
      background-color: #d1fbfb;
    }
    &.bg__s2 {
      background-color: #fdfdc9;
    }
    &.bg__s7 {
      background-color: #f1c2c2;
    }
    &.bg__s8 {
      background-color: #b4b4f9;
    }
    &.bg__s9 {
      background-color: #f78484ad;
    }

    body.body--dark & {
      &.bg__s0 {
        background-color: var(--dark);
      }
      &.bg__s1 {
        background-color: darken($dark, 3%);
      }
      &.bg__s2 {
        background-color: darken(rgba(#fdfdc9, 0.15), 30%);
      }
      &.bg__s7 {
        background-color: darken(rgba(#f1c2c2, 0.25), 15%);
      }
      &.bg__s8 {
        background-color: darken(rgba(#b4b4f9, 0.25), 10%);
      }
      &.bg__s9 {
        background-color: darken(rgba(#f78484, 0.25), 15%);
      }
    }
  }

  .ckrow__cell {
    padding: 0 8px;
    position: relative;
    font-size: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    min-height: 16px;

    &:after {
      content: "";
      width: 1px;
      height: 12px;
      background-color: rgba(0, 0, 0, 0.1);
      align-self: stretch;
      display: inline-block;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      margin: 0;
      padding: 0;
    }
  }

  &:not(.is-active) {
    box-shadow: none;

    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
      //box-shadow: 0px 0px 6px rgba(0, 0, 0, .1);
    }
  }

  .ck__more {
    border-top: 1px solid rgba(0, 0, 0, 0.1);

    .ck__more_panel {
      //border: 1px solid #ededed;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      border-radius: 15px;
      flex-grow: 1;
      width: 1280px;

      .ckm__header {
        font-weight: bold;
        margin-bottom: 8px;
        font-size: 11px;
        color: var(--q-color-primary);

        > i {
          margin-top: -3px;
          font-size: 19px;
        }
      }
    }
  }

  .ckrow__separator {
    &,
    & > hr {
      height: 12px;
      display: inline-block;
    }
  }

  .nodesazi-code {
    letter-spacing: 2px;
    font-size: 11px;
    color: #004ec1;

    body.body--dark & {
      color: var(--dark-text-color);
    }
  }

  .ckrow__region {
    background-color: #e6f0ff;
    border: 1px solid #e6f0ff;
    color: #0067ff;
    min-width: 54px;
    white-space: nowrap;
    border-radius: 20px;
    text-align: center;
    font-size: 10px;

    body.body--dark & {
      background-color: var(--lighten2);
      border-color: var(--dark-border);
    }
  }

  .ckrow__priority {
    background-color: #fdf1d0;
    border: 1px solid #fdf1d0;
    color: #a17704;
    min-width: 54px;
    white-space: nowrap;
    border-radius: 20px;
    text-align: center;
    font-size: 10px;

    body.body--dark & {
      background-color: var(--lighten3);
      border-color: var(--dark-border);
    }

    &.ckr__urgent {
      background-color: #ffe8e6;
      color: red;

      body.body--dark & {
        background-color: var(--lighten2);
        color: var(--dark-text-color);
      }
    }
  }

  .ckrow__agentCount {
    background-color: #fdf1d0;
    border: 1px solid #fdf1d0;
    color: #a17704;
    white-space: nowrap;
    border-radius: 20px;
    text-align: center;
    font-size: 10px;
    text-shadow: -1px 1px 2px rgb(0, 0, 0, 0.45);

    body.body--dark & {
      background-color: var(--lighten3);
      border-color: var(--dark-border);
    }

    &.ckr__more {
      background-color: #ffe8e6;
      color: red;

      body.body--dark & {
        background-color: var(--lighten2);
        color: var(--dark-text-color);
      }
    }

    &.ckr__s0,
    &.ckr__s2 {
      background-color: white;
      border-color: #ddd;

      body.body--dark & {
        background-color: var(--dark);
      }
    }

    &.ckr__s1 {
      background-color: #fe6062;
      border-color: #fe6062;
      color: white;

      body.body--dark & {
        background-color: darken(rgba(#f78484, 0.25), 15%);
      }
    }

    &.ckr__s3 {
      background-color: #fba300b5;
      border-color: #fba300b5;
      color: white;

      body.body--dark & {
        background-color: darken(rgba(#fba300, 0.25), 10%);
      }
    }
  }

  .ckrow__badge {
    color: #1e95cb;
    min-width: 32px;
    padding: 0 4px;
    white-space: nowrap;
    font-size: 10px;
    border: 1px solid;
    line-height: normal;
    background-color: #fff;
    border-radius: 20px;
    text-align: center;
    position: relative;

    body.body--dark & {
      border-color: var(--dark-border);
      background-color: var(--dark);
      color: var(--dark-text-color);
    }

    &:before {
      content: "";
      width: 5px;
      height: 5px;
      display: inline-block;
      border-radius: 50px;
      background-color: currentColor;
      margin-right: 4px;
    }

    &.not__active {
      color: #777777 !important;
      opacity: 0.3;

      body.body--dark & {
        color: var(--dark-text-color) !important;
        opacity: 0.65;
      }
    }
  }
}

.data-info {
  font-size: 11px;

  > * {
    padding-top: 5px;
    padding-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    //&:not(:last-child) {
    //  border-bottom: 1px solid #eee;
    //  margin-bottom: 4px;
    //}

    > label {
      margin-right: 8px;

      &:before {
        content: "";
        width: 5px;
        height: 5px;
        background: #ffa726;
        border-radius: 50px;
        display: inline-block;
        margin-right: 7px;
      }
    }

    > span {
      color: #000;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
