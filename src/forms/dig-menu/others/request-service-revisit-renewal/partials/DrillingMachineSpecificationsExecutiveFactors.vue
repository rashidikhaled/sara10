<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="مدت تاخیر حفاری"
          v-model="
            value.RevisitRenewal_RequestService.RequestService_Info.CI_DigDelayTime
          "
          cdcName="CI_DigDelayTime"
          ciName="CI_DigDelayTime"
          domainName="Dig"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع انشعاب"
          v-model="
            value.RevisitRenewal_RequestService.RequestService_Info.CI_SplitType
          "
          cdcName="CI_SplitType"
          ciName="CI_SplitType"
          domainName="Dig"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره نامه"
          v-model="value.RevisitRenewal_RequestService.RequestService_Info.LetterNo"
          cdcName="LetterNo"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ نامه"
          v-model="
            value.RevisitRenewal_RequestService.RequestService_Info.LetterDate
          "
          cdcName="LetterDate"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          label="تداخل با سایر طرح ها"
          v-model="
            value.RevisitRenewal_RequestService.RequestService_Info
              .ConfilictWithOther
          "
          cdcName="ConfilictWithOther"
          label-width="100px"
          m="r"
        />
      </FormControl>
    </FormRow>
    <fit>
      <safa-grid
        title="مشخصات عوامل اجرایی"
        v-model="value.RevisitRenewal_RequestService.RequestService_Contractor"
        :columns="requestServiceContractorColumns"
        :defaultNewRow="{
          NIdCompany: null,
          CompanyName: '',
          ManagerMobile: '',
          ManagerTel: '',
          Description: '',
        }"
        paginate
        :m="m"
        fit
        @update="updateGrid"
      />
    </fit>
    <safa-popup
      v-model="showCompanyInfo"
      title="لیست شرکت ها"
      width="900px"
      height="500px"
    >
      <Company @selectedCompany="selectedCompanyHandler" v-model="value" />
    </safa-popup>
  </fit>
</template>

<script>
import Company from "src/forms/dig-menu/register-request/request/partials/Company.vue"

export default {
  props: {
    value: Object,
    m: String,
    formKey: String,
    title: String,
    name: String
  },
  components: {
    Company
  },
  computed: {
    requestServiceContractorColumns () {
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
          this.value.RevisitRenewal_RequestService?.RequestService_Contractor
        if (!Array.isArray(list)) return
        for (
          let i = 0;
          i <
          this.value?.RevisitRenewal_RequestService.RequestService_Contractor
            .length;
          i++
        ) {
          for (let j = 0; j < this.companies.length; j++) {
            if (
              this.value.RevisitRenewal_RequestService.RequestService_Contractor[i]
                .NIdCompany === this.companies[j].NIdCompany
            ) {
              this.value.RevisitRenewal_RequestService.RequestService_Contractor[i].CompanyName = `${this.companies[j].Title} --- ${this.companies[j].CompanyName}`
              this.value.RevisitRenewal_RequestService.RequestService_Contractor[i].ManagerMobile = this.companies[j].ManagerMobile
              this.value.RevisitRenewal_RequestService.RequestService_Contractor[i].ManagerTel = this.companies[j].ManagerTel
            }
          }
        }
      })
      this.$forceUpdate()
    },

    selectedCompanyHandler (e) {
      if (
        this.value.RevisitRenewal_RequestService.RequestService_Contractor.some(
          (s) => s.NIdCompany === e.NIdCompany
        )
      ) {
        return this.showError("این شرکت قبلا اضافه شده است.")
      }

      this.value.RevisitRenewal_RequestService.RequestService_Contractor =
        this.value.RevisitRenewal_RequestService.RequestService_Contractor.map(
          (item) => {
            if (item.NIdCompany === this.selectedRow.NIdCompany) {
              return {
                NIdCompany: e.NIdCompany ?? "",
                CompanyName: `${e.Title} --- ${e.CompanyName}` ?? "",
                ManagerMobile: e.ManagerMobile ?? "",
                ManagerTel: e.ManagerTel ?? ""
              }
            }
            return item
          }
        )
      this.$forceUpdate()
      this.showCompanyInfo = false
      this.selectedRow = null
    },
    searchCompany () {
      this.showCompanyInfo = true
    },
    companyBtnHandler (params) {
      this.selectedRow = params
      this.showCompanyInfo = true
    }
  }
}
</script>
<style scoped lang="scss">
.ckr__btn {
  background-color: #898989;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.ckr__btn_wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  color: #777;
  height: 24px;
  cursor: pointer;
  border-radius: 20px;
  padding: 2px 4px 2px 2px;

  > label {
    margin-left: 4px;
    font-size: 10px;
    pointer-events: none;
  }
}
</style>
