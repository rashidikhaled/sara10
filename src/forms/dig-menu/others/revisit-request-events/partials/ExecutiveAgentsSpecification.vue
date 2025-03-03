<template>
  <fit>
    <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            v-model="value.RequestService_Info.CI_DigDelayTime"
            cdcName="CI_DigDelayTime"
            ciName="CI_DigDelayTime"
            domain-name="Dig"
            label="مدت تاخیر حفاری"
            label-width="90px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            v-model="value.RequestService_Info.CI_SplitType"
            cdcName="CI_SplitType"
            ciName="CI_SplitType"
            domain-name="Dig"
            label="نوع انشعاب"
            label-width="90px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.RequestService_Info.LetterNo"
            cdcName="LetterNo"
            label="شماره نامه"
            label-width="90px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            v-model="value.RequestService_Info.LetterDate"
            cdcName="LetterDate"
            label="تاریخ نامه"
            label-width="90px"
            :m="m"
          />
        </FormControl>
        <div class="row">
          <safa-checkbox
            v-model="value.RequestService_Info.confilictWithOther"
            :m="m"
            label="تداخل با سایر طرح ها"
            cdcName="ConfilictWithOther"
          />
        </div>
      </FormRow>
      <!-- v-model="value.RequestService_Contractor" -->
      <safa-grid
      title="مشخصات عملیات اجرایی"
      v-model="value.RequestService_Contractor"
      cdcName="RequestService_Contractor"
      :columns="RequestServiceContractorColumns"
      :suppressRowClickSelection="false"
      :defaultNewRow="{
        NIdCompany: null,
        CompanyName: '',
        ManagerMobile: '',
        ManagerTel: '',
        Description: '',
      }"
      @model:update="updateGrid"
      :addRow="true"

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
  props: {
    value: Object,
    m: String
  },
  components: {
    Company
  },
  data () {
    return {
      showCompanyInfo: false,
      companies: [],
      selectedRow: null
    }
  },
  computed: {
    RequestServiceContractorColumns () {
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
        let list = this.value?.RequestService_Contractor
        if (!Array.isArray(list)) return
        for (
          let i = 0;
          i < this.value?.RequestService_Contractor.length;
          i++
        ) {
          for (let j = 0; j < this.companies.length; j++) {
            if (
              this.value.RequestService_Contractor[i].NIdCompany ===
              this.companies[j].NIdCompany
            ) {
              this.value.RequestService_Contractor[i].CompanyName =
                `${this.companies[j].Title} --- ${this.companies[j].CompanyName}`
              this.value.RequestService_Contractor[i].ManagerMobile =
               this.companies[j].ManagerMobile
              this.value.RequestService_Contractor[i].ManagerTel =
                this.companies[j].ManagerTel
            }
          }
        }
      })
      this.$forceUpdate()
    },
    // async fetchCompanies() {
    //   try {
    //     if(this.useCache && this.companies.length > 0) return
    //     const response = await this.$services.excavation.getAllCompanyInfo();
    //     const res = this.getResponse(response);
    //     if (res.success) {
    //       this.companies =
    //         res.data?.GetAllCompanyInfoResult?.VCompany_Info ?? [];
    //     }
    //   } catch (e) {
    //     console.error(e);
    //     this.serverError();
    //   } finally {
    //   }
    // },
    // getCompanyItem(nid) {
    //   const found = this.companies?.find(
    //     (x) => `${x.NIdCompany}`.toUpperCase() === `${nid}`.toUpperCase()
    //   );
    //   return found ?? {};
    // },
    // bindGridModel() {
    //   if (!Array.isArray(this.value?.RequestService_Contractor)) return;

    //   this.value?.RequestService_Contractor.forEach((row) => {
    //     const extraInfo = this.getCompanyItem(row.NIdCompany);

    //     row.CompanyName = `${extraInfo?.Title ?? ""} --- ${
    //       extraInfo?.CompanyName ?? ""
    //     }`;
    //     row.ManagerMobile = extraInfo.ManagerMobile ?? "";
    //     row.ManagerTel = extraInfo.ManagerTel ?? "";
    //   });
    // },
    // async loadObj() {
    //   try {
    //     this.isLoaded = false;
    //     this.loading = true;
    //     await this.fetchCompanies();

    //     setTimeout(() => {
    //       this.bindGridModel();
    //     }, 100);
    //   } finally {
    //     this.isLoaded = true;
    //     this.loading = false;
    //   }
    // },
    companyBtnHandler (params) {
      this.selectedRow = params
      this.showCompanyInfo = true
    },
    selectedCompanyHandler (e) {
      if (
        this.value.RequestService_Contractor.some(
          (s) => s.NIdCompany === e.NIdCompany)
      ) {
        return this.showError("این شرکت قبلا اضافه شده است.")
      }

      this.value.RequestService_Contractor = this.value.RequestService_Contractor.map(
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
    }
  },
  mounted () {
    this.getAllCompanyInfo()
  }
}
</script>
