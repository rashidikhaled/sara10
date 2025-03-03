<template>
  <fit>
    <safa-grid
      title="مشخصات عملیات اجرایی"
      v-model="value.ClsRevisit_Request.Request_Contractor"
      cdcName="Request_Contractor"
      :columns="requestContractorColumns"
      :suppressRowClickSelection="false"
      :defaultNewRow="{
        NIdCompany: null,
        CompanyName: '',
        ManagerMobile: '',
        ManagerTel: '',
        Description: '',
      }"
      @update="updateGrid"
      paginate
      :m="m"
      fit
    />
    <safa-popup
      v-model="showCompanyInfo"
      title="شرکت"
      width="900px"
      height="500px"
    >
      <Company @selectedCompany="selectedCompanyHandler" />
    </safa-popup>
  </fit>
</template>

<script>
import Company from "src/forms/dig-menu/register-request/request/partials/Company.vue"
export default {
  components: { Company },
  props: {
    m: {
      type: String,
      default: "r"
    },
    value: Object
  },
  computed: {
    requestContractorColumns () {
      return [
        {
          field: "", // NIdCompany
          title: "",
          editor: "action",
          IsDisable: this.m === "r",
          cellRenderer: "agCompanyCallbackBtn",
          callback: (params) => this.companyBtnHandler(params),
          width: "60px",
          filterable: false,
          resizable: false,
          lockPosition: true,
          pinned: "right",
          editable: false
        },
        // {
        //   field: "NIdCompany",
        //   title: "NIdCompany",
        //   width: "300px",
        //   editable: false
        // },
        {
          field: "CompanyName",
          title: "شرکت",
          width: "250px",
          editable: false
        },
        {
          field: "ManagerMobile",
          title: "همراه مدیرعامل",
          width: "150px",
          editable: false
        },
        {
          field: "ManagerTel",
          title: "تلفن شرکت",
          width: "150px",
          editable: false
        },
        { field: "Description", title: "توضیحات", width: "auto" }
      ]
    }
  },
  data () {
    return {
      name: "ExecutiveAgentsSpecifications",
      showCompanyInfo: false,
      Request_Contractor: [],
      companies: [],
      selectedRow: null
    }
  },
  methods: {
    async getAllCompanyInfo () {
      try {
        const response = await this.$services.excavation.getAllCompanyInfo()
        const res = this.getResponse(response)
        if (res.success) {
          this.companies =
            res.data?.GetAllCompanyInfoResult?.VCompany_Info ?? []
          this.updateGrid()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
      }
    },
    companyBtnHandler (params) {
      this.selectedRow = params
      this.showCompanyInfo = true
    },
    selectedCompanyHandler (e) {
      if (
        this.value.ClsRevisit_Request.Request_Contractor.some(
          (s) => s.NIdCompany === e.NIdCompany
        )
      ) { return this.showError("این شرکت قبلا اضافه شده است.") }

      this.value.ClsRevisit_Request.Request_Contractor = this.value.ClsRevisit_Request.Request_Contractor.map((item) => {
        if (item.NIdCompany === this.selectedRow.NIdCompany) {
          return {
            NIdCompany: e.NIdCompany ?? '',
            CompanyName: `${e.Title} --- ${e.CompanyName}` ?? '',
            ManagerMobile: e.ManagerMobile ?? '',
            ManagerTel: e.ManagerTel ?? ''
          }
        }
        return item
      })
      this.$forceUpdate()
      this.showCompanyInfo = false
      this.selectedRow = null
    },
    updateGrid () {
      this.$nextTick(() => {
        let list = this.value.ClsRevisit_Request?.Request_Contractor
        if (!Array.isArray(list)) return
        for (
          let i = 0;
          i < this.value?.ClsRevisit_Request.Request_Contractor.length;
          i++
        ) {
          for (let j = 0; j < this.companies.length; j++) {
            if (
              this.value.ClsRevisit_Request.Request_Contractor[i].NIdCompany ===
              this.companies[j].NIdCompany
            ) {
              this.value.ClsRevisit_Request.Request_Contractor[i].CompanyName =
                `${this.companies[j].Title} --- ${this.companies[j].CompanyName}`
              this.value.ClsRevisit_Request.Request_Contractor[i].ManagerMobile =
               this.companies[j].ManagerMobile
              this.value.ClsRevisit_Request.Request_Contractor[i].ManagerTel =
                this.companies[j].ManagerTel
            }
          }
        }
      })
      this.$forceUpdate()
    }
  },
  created () {
    this.getAllCompanyInfo()
  }
}
</script>
