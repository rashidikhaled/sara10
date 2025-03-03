<template>
  <fit>
    <div class="q-pa-sm">
      <div class="row">
        <safa-combo
          ciName="CI_Response"
          domainName="Fire"
          label="پاسخ"
          label-width="75px"
          v-model="ciResponse"
          class="col-md-3"
          :m="m"
        />
      </div>
    </div>
    <div class="fit">
      <safa-datatable2
        title="لیست نتایج بازدید"
        v-model="value.Plan_Details"
        :columns="revisitPlanColumns"
        :defaultNewRow="defaultNewRowItems"
        height="100%"
        max-height="100%"
        min-height="200px"
        paginate
        fit
        :m="ciResponse === 0 ? 'e' : 'r'"
      > <!-- تاریخ ندارد  -->
        <template #cell-CI_Plan="{ row, col, onChangeCellValue }">
          <safa-combo2
            :value="row[col.field]"
            @input="onSelectCIPlan($event, row, onChangeCellValue)"
            source-type="local"
            :options="ciPlanOptions"
          />
          <!-- ciName="CI_Plan"
        domainName="Fire" -->
        </template>
      </safa-datatable2>
    </div>
  </fit>
</template>

<script>
import { uid } from "quasar"

export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: String,
    ciPlanList: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      name: "UResultsRevisit",
      ciResponse: 0,

      defaultNewRowItems: () => ({
        Revisit_Plan: {
          CI_Plan: null,
          Comments: "",
          NIdPlan: null,
          NIdRevisit: null
        },
        Revisit_Details: {
          CI_Visit: 0,
          CI_VisitCause: 0,
          NIdDetails: null,
          NIdRevisit: null,
          Comments: "",
          IncompleteValue: "",
          ShortageValue: "",
          Value: null,
          VisitSafetyItemCode: null,
          VisitSafetyItemName: null
        },
        CI_Plan: null,
        Comments: "",
        NIdPlan: null,
        NIdRevisit: null,
        Comments2: "",
        IncompleteValue: "",
        ShortageValue: ""
      }),

      revisitPlanColumns: [
        {
          field: "CI_Plan",
          title: "طرح",
          width: "200px",
          editor: "combo",
          domain: "Fire",
          validations: "required"
        },
        { field: "Comments", title: "توضیحات طرح", width: "500px" },
        { field: "ShortageValue", title: "وضعیت", width: "100px" },
        { field: "IncompleteValue", title: "نتیجه", width: "100px" },
        { field: "Comments2", title: "توضیحات", width: "300px" }
      ]
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
    }
  },
  methods: {
    onSelectCIPlan (value, row, onChangeCellValue) {
      let tempComment =
        this.ciPlanOptions.find((f) => f.ID === value).Description || ""
      let tempId = uid()
      onChangeCellValue({
        field: ["CI_Plan", "Comments", "NIdPlan"],
        dataItem: row,
        value: [value, tempComment, tempId]
      })
    }
  }
}
</script>
