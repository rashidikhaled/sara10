<template>
  <div>
    <div
      class="ck__summary no-wrap cursor-pointer q-pa-sm flex items-center"
      @click="rowClickHandler"
    >
      <span style="min-width: 14px">
        <q-icon
          size="17px"
          :color="isExpanded ? 'positive' : 'grey'"
          dense
          :name="isExpanded ? 'check' : 'expand_more'"
        />
      </span>
      <div
        style="min-width: 100px; max-width: 100px"
        :title="row.CommentsExpert"
        class="code-number ellipsis text-center ckrow__cell"
      >
        {{ row.CommentsExpert }}
      </div>
      <div
        style="min-width: 100px; max-width: 100px"
        class="ckrow__cell text-center ellipsis"
        :title="row.SecretariatNo"
      >
        {{ row.SecretariatNo }}
      </div>
      <div
        style="min-width: 140px; max-width: 140px"
        class="ckrow__cell text-center ellipsis"
      >
        <safa-combo
          domainName="Commission100"
          ciName="CI_RelapseType"
          m="r"
          v-model="row.CI_RelapseType"
          cdcName="CI_RelapseType"
          class="col-12 col-sm-3 col-md-2"
        />
      </div>
      <div
        style="min-width: 100px; max-width: 100px"
        class="ckrow__cell text-center ellipsis"
        :title="row.RelapseDate"
      >
        {{ row.RelapseDate }}
      </div>
      <div
        style="min-width: 100px; max-width: 100px"
        class="ckrow__cell text-center ellipsis"
        :title="row.RelapseTime"
      >
        {{ row.RelapseTime }}
      </div>
      <div
        style="min-width: 100px; max-width: 100px"
        class="ckrow__cell text-center ellipsis"
        :title="row.RelapseComments"
      >
        {{ row.RelapseComments }}
      </div>
      <div
        style="min-width: 100px; max-width: 100px"
        class="ckrow__cell text-center ellipsis"
        :title="row.UserNameDone"
      >
        {{ row.UserNameDone }}
      </div>
    </div>
    <div v-if="isExpanded">
      <q-slide-transition :duration="250">
        <safa-datatable2
          v-model="filterdCommissionTrepassHistoryRelapse"
          cdcName="filterdCommissionTrepassHistoryRelapse"
          height="250px"
          width="250px"
          min-height="100px"
          max-height="100%"
          paginate
          m="r"
          :showSelectedCheckbox="false"
          :allowMultipleSelection="false"
          :disableSelectionOnClick="false"
          :checkboxSelection="true"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          helper="Comm_HistoryRelapseColumns"
        >
          <!-- تاریخ قابل ویرایش نیست -->
        </safa-datatable2>
      </q-slide-transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryTemplate",
  data () {
    return {
      isExpanded: false
    }
  },
  computed: {
    filterdCommissionTrepassHistoryRelapse () {
      return this.CommissionTrepass_HistoryRelapse.filter(
        (x) => x.NidCommission === this.row.NidCommission
      )
    }
  },
  props: {
    CommissionTrepass_HistoryRelapse: Array,
    row: Object,
    m: String,
    selectable: Boolean,
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.isExpanded = this.row.isExpanded
  },
  methods: {
    onEditVote () {
      this.$emit("editVote", this.row)
    },
    changeSelectedValue (value) {
      this.$emit("update:selected", value)
    },
    rowClickHandler () {
      this.isExpanded = !this.isExpanded
      this.$emit("row:click", this.row)
      this.$emit("update:expandable", !this.isExpanded)
      this.onEditVote()
    }
  },
  watch: {
    "row.isExpanded": {
      handler () {
        this.isExpanded = this.row.isExpanded
      },
      deep: true
    }
  }
}
</script>
