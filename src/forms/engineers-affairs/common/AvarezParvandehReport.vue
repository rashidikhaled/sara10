<template>
  <form-wrapper :title="title">
    <fit>
      <div class="row q-col-gutter-sm q-mb-sm">
        <engineer-info-box
          label="کد عضویت"
          labelWidth="60px"
          class="col-md-5"
          v-model="currentIdentityCode"
          @fetched="getEngineerInfo"
        />
        <safa-combo
          v-model="getFilIncomeReportResult.CI_Years"
          label="سال"
          label-width="60px"
          class="col-md-3"
          ciName="CI_Years"
          domainName="engineer"
        />
        <div class="col"></div>
      </div>
      <safa-datatable
        :columns="columns"
        title=""
        v-model="getFilIncomeReportResult.FilIncomeReport"
        m="r"
        fit
        height="100%"
        max-height="100%"
        min-height="100px"
        :show-selected-checkbox="true"
        :allowMultipleSelection="false"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
      />
    </fit>
    <template v-slot:footer>
      <form-actions
        :showEditButton="false"
        :showNewButton="false"
      >
        <template v-slot:after>
          <btn-default label="چاپ گزارش" />
        </template>
      </form-actions>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  props: ["currentIdentityCode"],
  data () {
    return {
      title: "گزارش عوارض پرونده",
      name: "AvarezParvandehReport",
      formKey: "deaf0169-0e1b-4641-91f2-44574ff977c2",
      main: true,
      expansionState: true,
      getFilIncomeReportResult: {
        FilIncomeReport: []
      },
      columns: [
        { field: "NidWorkItem", title: "کد ارجاع" },
        {
          field: "Meter",
          title: "متراژ",
          cell: "grid-money-format",
          calculateFunc: "sum"
        },
        {
          field: "Floor",
          title: "تعداد طبقه",
          calculateFunc: "sum",
          cell: "grid-money-format"
        },
        { field: "Ability", title: "صلاحیت" },
        { field: "CI_Years", title: "سال کاری" },
        { field: "AccYear", title: "سال مالی" },
        {
          field: "Debit",
          title: "بدهکاری",
          cell: "grid-money-format",
          calculateFunc: "sum"
        },
        {
          field: "Credit",
          title: "بستانکاری",
          cell: "grid-money-format",
          calculateFunc: "sum"
        }
      ]
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          CI_RequestType: 0,
          CI_Years: 0,
          EngineerCode: this.currentIdentityCode
        }
      }
      this.$services.engineers
        .getFilIncomeReport(payLoad)
        .then(async (response) => {
          let res = this.getResponse(response.data)
          if (res.success) {
            this.getFilIncomeReportResult = res.data.GetFilIncomeReportResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.currentIdentityCode,
              bizCodeTitle: "کد عضویت"
            })
          }
        })
        .catch((error) => {
          console.error("load error", error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getEngineerInfo () {
      this.load()
    }
  }
}
</script>
