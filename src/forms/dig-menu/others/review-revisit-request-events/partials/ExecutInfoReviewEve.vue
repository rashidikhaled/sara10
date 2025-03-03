<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          v-model="
            value.ClsRevisit_RequestService.RequestService_Info.CI_DigDelayTime
          "
          cdcName="CI_DigDelayTime"
          ciName="CI_DigDelayTime"
          domain-name="Dig"
          label="مدت تاخیر حفاری"
          label-width="90px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="
            value.ClsRevisit_RequestService.RequestService_Info.CI_SplitType
          "
          cdcName="CI_SplitType"
          ciName="CI_SplitType"
          domain-name="Dig"
          label="نوع انشعاب"
          label-width="90px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_RequestService.RequestService_Info.LetterNo"
          cdcName="LetterNo"
          label="شماره نامه"
          label-width="90px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="
            value.ClsRevisit_RequestService.RequestService_Info.LetterDate
          "
          cdcName="LetterDate"
          label="تاریخ نامه"
          label-width="90px"
          m="r"
        />
      </FormControl>
      <div class="row">
        <safa-checkbox
          v-model="
            value.ClsRevisit_RequestService.RequestService_Info
              .ConfilictWithOther
          "
          m="r"
          label="تداخل با سایر طرح ها"
          cdcName="ConfilictWithOther"
        />
      </div>
    </FormRow>
    <safa-grid
    title="1111مشخصات عوامل اجرایی"
      v-model="value.ClsRevisit_RequestService.RequestService_Contractor"
      cdcName="drillingOperations"
      :columns="requestEveOperationsColumns"
      :suppressRowClickSelection="false"
      :defaultNewRow="{
        NIdCompany: null,
        CompanyName: '',
        ManagerMobile: '',
        ManagerTel: '',
        Description: '',
      }"
      paginate
      m="r"
      fit
      @update="updateGrid"
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
  props: {
    value: Object,
    m: String
  },
  computed: {
    requestEveOperationsColumns () {
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
  components: {
    Company
  },
  data () {
    return {
      // name: "ExecutInfoReviewEve",
      showCompanyInfo: false
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
    updateGrid () {
      this.$nextTick(() => {
        let list =
        this.value.ClsRevisit_RequestService?.RequestService_Contractor
        if (!Array.isArray(list)) return
        for (
          let i = 0;
          i <
          this.value?.ClsRevisit_RequestService?.RequestService_Contractor
            .length;
          i++
        ) {
          for (let j = 0; j < this.companies.length; j++) {
            if (
              this.value.ClsRevisit_RequestService.RequestService_Contractor[i]
                .NIdCompany === this.companies[j].NIdCompany
            ) {
              this.value.ClsRevisit_RequestService.RequestService_Contractor[i].CompanyName = `${this.companies[j].Title} --- ${this.companies[j].CompanyName}`
              this.value.ClsRevisit_RequestService.RequestService_Contractor[i].ManagerMobile = this.companies[j].ManagerMobile
              this.value.ClsRevisit_RequestService.RequestService_Contractor[i].ManagerTel = this.companies[j].ManagerTel
            }
          }
        }
      })
      this.$forceUpdate()
    },
    companyBtnHandler (params) {
      this.selectedRow = params
      this.showCompanyInfo = true
    },
    companyInfo () {
      this.showCompanyInfo = true
    },
    selectedCompanyHandler (e) {
      if (
        this.value.ClsRevisit_RequestService.RequestService_Contractor.some(
          (s) => s.NIdCompany === e.NIdCompany
        )
      ) { return this.showError("این شرکت قبلا اضافه شده است.") }

      this.value.ClsRevisit_RequestService.RequestService_Contractor = this.value.ClsRevisit_RequestService.RequestService_Contractor.map((item) => {
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
    }
  },
  created () {
    this.getAllCompanyInfo()
  }
}
</script>
