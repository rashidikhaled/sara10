<template>
  <fit>
    <div class="q-pa-sm">
      <div class="row q-gutter-sm q-pr-sm">
        <safa-combo
          source-type="local"
          :options="ciPlanOptions"
          label="طرح"
          label-width="75px"
          v-model="newPlan.CI_Plan"
          class="col-md-3"
          :m="m"
        />
        <!-- ciName="CI_Response"
         domainName="Fire" -->

        <div>
          <btn-default label="اضافه" @click="add" :disable="!newPlan.CI_Plan" />
        </div>
        <text-template
          class="col-md-12"
          label="توضیحات طرح"
          label-width="75px"
          :m="m"
          :rows="4"
          v-model="newPlan.Comments"
        />
      </div>
    </div>
    <div class="q-px-sm q-pb-sm fit">
      <safa-datatable
        title="لیست طرح ها"
        v-model="value.Revisit_Plan"
        :columns="resultsRevisitColumns"
        height="100%"
        max-height="100%"
        min-height="200px"
        :show-selected-checkbox="true"
        :allowMultipleSelection="true"
        :addRow="false"
        :deleteRow="true"
        :allowCopy="false"
        paginate
        m="e"
      />
    </div>
  </fit>
</template>

<script>
import { uid } from "quasar"

export default {
  props: {
    ciPlanList: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => {}
    },
    m: String
  },

  data () {
    return {
      name: "UPattern",
      newPlan: {
        CI_Plan: 0,
        Comments: ""
      },
      resultsRevisitColumns: [
        { field: "CI_Plan", title: "کد طرح", width: "100px", editable: false },
        {
          field: "Title",
          title: " طرح",
          width: "200px",
          editable: false,
          render: ({ row }) => this.ciPlanOptionsByID[row.CI_Plan]
        },
        { field: "Comments", title: "توضیحات", width: "800px", editable: false }
      ]
      // list:[]
    }
  },

  methods: {
    add () {
      if (!this.newPlan.CI_Plan) return
      if (
        this.value.Revisit_Plan.some((x) => x.CI_Plan === this.newPlan.CI_Plan)
      ) {
        return this.showError("این طرح قبلا اضافه شده است.")
      }
      const { Title } = this.selectedComboPlan
      this.value.Revisit_Plan.push({
        ...this.newPlan,
        Title,
        NIdPlan: uid(),
        NIdRevisit:
          this.value.Revisit_Info.NIdRevisit ||
          "00000000-0000-0000-0000-000000000000"
      })
      this.$nextTick(() => {
        this.newPlan = {
          CI_Plan: 0,
          Comments: ""
        }
      })
      // this.list = this.value.Revisit_Plan.map(row => ({ ...row, Title: this.ciPlanOptionsByID[row.CI_Plan] }))
    }
  },
  computed: {
    ciPlanOptions () {
      return (
        (this.ciPlanList &&
          this.ciPlanList.map((x) => ({
            ...x,
            Title: `${x.ID} - ${x.Title}`
          }))) ||
        []
      )
    },
    selectedComboPlan () {
      if (!this.newPlan.CI_Plan) return null
      return (
        this.ciPlanOptions.find((x) => x.ID === this.newPlan.CI_Plan) || null
      )
    },
    ciPlanOptionsByID () {
      return this.ciPlanOptions.reduce((obj, item) => {
        obj[item.ID] = item.Title
        return obj
      }, {})
    }
  },

  watch: {
    "newPlan.CI_Plan" () {
      this.newPlan.Comments = this.selectedComboPlan.Description
    }
  }
}
</script>
