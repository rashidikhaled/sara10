<template>
  <form-wrapper :padding="false">
    <safa-status :result="loadObjRes" />
    <fit>
      <safa-grid
        v-model="companies"
        :columns="companiesColumns"
        cdcName="companies"
        fit
        @row:click="rowClick"
        :m="m"
        paginate
        :pageSize="20"
        :suppressRowClickSelection="false"
      />
    </fit>
    <template #footer>
      <btn-default label="انتخاب" @click="chooseHandler" />
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    m: String,
    value: Object
  },
  data () {
    return {
      companiesColumns: [
        {
          field: "Title",
          title: "شرکت",
          width: "150px",
          editable: false
        },
        {
          field: "RegisterCode",
          title: "شماره ثبت",
          width: "100px",
          editable: false
        },
        {
          field: "CompanyName",
          title: "نام شرکت",
          width: "120px",
          editable: false
        },
        {
          field: "ManagerName",
          title: "نام مدیر عامل",
          width: "120px",
          editable: false
        },
        {
          field: "ManagerMobile",
          title: "همراه مدیرعامل",
          width: "120px",
          editable: false
        },
        {
          field: "ManagerTel",
          title: "تلفن شرکت",
          width: "120px",
          editable: false
        },
        {
          field: "CI_RequesterType",
          title: "شرکت خدماتی متقاضی",
          editor: "combo",
          domain: "Dig",
          width: "auto",
          editable: false
        }
      ],
      companies: [],
      loadObjRes: null,
      selectedCompany: []
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.excavation.getAllCompanyInfo()
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          const res =
            this.loadObjRes.data?.GetAllCompanyInfoResult?.VCompany_Info ?? []
          const ciRequesterType =
            this.value?.ClsRequestService_Info?.RequestService_Info
              ?.CI_RequesterType ?? 0
          if (ciRequesterType !== 0) {
            this.companies = res.filter(
              (f) => f.CI_RequesterType === ciRequesterType
            )
          } else {
            this.companies = res
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    rowClick ({ data }) {
      this.selectedCompany = data ?? null
    },
    chooseHandler () {
      if (this.selectedCompany === null) {
        this.showError("لطفا از لیست، یک شرکت انتخاب نمایید.")
      } else {
        this.$emit("selectedCompany", this.selectedCompany)
      }
    }
  }
}
</script>
