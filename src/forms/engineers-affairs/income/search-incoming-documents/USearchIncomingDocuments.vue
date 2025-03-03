<template>
  <form-wrapper :title="title">
    <fit>
      <div class="row q-col-gutter-sm items-center q-mb-sm">
        <engineer-actions
          v-model="identityCode"
          :disable="!identityCode"
          class="col-12"
        />
      </div>
      <safa-datatable
        :columns="incomeSearcheItemsColumns"
        v-model="incomeSearcheItems"
        m="r"
        fit
        paginate
        min-height="200px"
        height="100%"
        max-height="100%"
        title=""
        :show-selected-checkbox="true"
        :allowMultipleSelection="false"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
        @row-click="selectedRow"
      />
    </fit>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "جستجو در اسناد دریافتی",
      name: "USearchIncomingDocuments",
      formKey: "7385758a-2f9a-45bb-a574-3e5d17be746b",
      main: true,
      sidebarCompatible: true,

      identityCode: null,
      incomeSearcheItems: [],
      incomeSearcheItemsColumns: [
        { field: "FishNo", title: "شماره فیش", width: "100px" },
        { field: "IdentityCode", title: "کد عضویت", width: "100px" },
        { field: "EngName", title: "نام", width: "100px" },
        { field: "EngFamily", title: "نام خانوادگی", width: "150px" },
        { field: "CI_StudyField", title: "فعالیت", width: "100px" },
        { field: "Comments", title: "شرح ردیف", width: "250px" },
        {
          field: "CI_IncomeDocType",
          title: "نوع سند",
          width: "100px",
          domain: "CI_SaraM1",
          editor: "combo"
        },
        { field: "IncomeDate", title: "تاریخ", width: "100px", editor: "date" },
        { field: "CI_Years", title: "سال", width: "100px", editor: "combo" },
        {
          field: "Debit",
          title: "بدهکار",
          width: "100px",
          cell: "grid-money-format"
        },
        {
          field: "Credit",
          title: "بستانکار",
          width: "100px",
          cell: "grid-money-format"
        }
      ]
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          CI_RequestType: 0,
          CI_Years: 0,
          NidCheckerGroup: "00000000-0000-0000-0000-000000000000",
          NidEng: "00000000-0000-0000-0000-000000000000",
          NidFil: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.engineers
        .searchIncome(payLoad)
        .then((response) => {
          const res = this.getResponse(response.data)
          if (res.success) {
            this.incomeSearcheItems =
              res.data.SearchIncomeResult.IncomeSearcheItems
          }
        })
        .catch((error) => {
          console.error("searchIncome error", error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedRow (val) {
      this.identityCode = val.IdentityCode
    }
  }
}
</script>
