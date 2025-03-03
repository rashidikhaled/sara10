<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="مدت تاخیر حفاری"
          label-width="80px"
          v-model="
            value.ClsRequestService_Info.RequestService_Info.CI_DigDelayTime
          "
          :m="m"
          ciName="CI_DigDelayTime"
          cdcName="CI_DigDelayTime"
          domain-name="Dig"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع انشعاب"
          label-width="80px"
          v-model="
            value.ClsRequestService_Info.RequestService_Info.CI_SplitType
          "
          :m="m"
          ciName="CI_SplitType"
          cdcName="CI_SplitType"
          domain-name="Dig"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره نامه"
          label-width="80px"
          :m="m"
          cdcName="LetterNo"
          v-model="value.ClsRequestService_Info.RequestService_Info.LetterNo"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ نامه"
          label-width="80px"
          :m="m"
          v-model="value.ClsRequestService_Info.RequestService_Info.LetterDate"
          cdcName="LetterDate"
        />
      </FormControl>
    </FormRow>
    <!-- <safa-grid
      title="مشخصات عملیات اجرایی"
      v-model="value.ClsRequestService_Info.RequestService_Contractor"
      cdcName="RequestService_Contractor"
      :columns="requestServiceContractorColumns"
      :defaultNewRow="{
        Company: '',
        RegisterNo: '',
        CompanyName: '',
        ManagerName: '',
        Description: '',
        ManagerTel: '',
        ManagerMobile: '',
      }"
      paginate
      m="e"
      :addRow="false"
      :searchable="false"
      fit
    >
      <template #header>
        <div
          class="ckr__btn_wrap text-light-blue-9 q-mx-sm"
          @click="searchCompany"
        >
          <span class="ckr__btn bg-light-blue-9">
            <q-icon name="search" size="14px" title="جستجوی شرکت" />
          </span>
          <label>جستجوی شرکت</label>
        </div>
      </template>
    </safa-grid> -->
    <safa-grid
      title="مشخصات عملیات اجرایی"
      v-model="value.ClsRequestService_Info.RequestService_Contractor"
      cdcName="RequestService_Contractor"
      :columns="requestServiceContractorColumns"
      :suppressRowClickSelection="false"
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
    />
    <safa-popup
      v-model="showCompanyInfo"
      title="لیست شرکت ها"
      width="900px"
      height="500px"
    >
      <Company
        @selectedCompany="selectedCompanyHandler"
      />
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
      showCompanyInfo: false,
      companies: [],
      selectedRow: null,
      isLoaded: false,
      loading: false,
      useCache: true

    }
  },
  methods: {
    async fetchCompanies() {
      try {
        if(this.useCache && this.companies.length > 0) return
        const response = await this.$services.excavation.getAllCompanyInfo();
        const res = this.getResponse(response);
        if (res.success) {
          this.companies =
            res.data?.GetAllCompanyInfoResult?.VCompany_Info ?? [];
        }
      } catch (e) {
        console.error(e);
        this.serverError();
      } finally {
      }
    },
    getCompanyItem(nid) {
      const found = this.companies?.find(
        (x) => `${x.NIdCompany}`.toUpperCase() === `${nid}`.toUpperCase()
      );
      return found ?? {};
    },
    bindGridModel() {
      if (!Array.isArray(this.value?.ClsRequestService_Info?.RequestService_Contractor)) return;

      this.value?.ClsRequestService_Info?.RequestService_Contractor.forEach((row) => {
        const extraInfo = this.getCompanyItem(row.NIdCompany);

        row.CompanyName = `${extraInfo?.Title ?? ""} --- ${
          extraInfo?.CompanyName ?? ""
        }`;
        row.ManagerMobile = extraInfo.ManagerMobile ?? "";
        row.ManagerTel = extraInfo.ManagerTel ?? "";
      });
    },
    async loadObj() {
      try {
        this.isLoaded = false;
        this.loading = true;
        await this.fetchCompanies();
          
        setTimeout(() => {
          this.bindGridModel();
        }, 100);
      } finally {
        this.isLoaded = true;
        this.loading = false;
      }
    },
    companyBtnHandler(params) {
      this.selectedRow = params;
      this.showCompanyInfo = true;
    },
    selectedCompanyHandler(e) {
      if (
        this.value.ClsRequestService_Info.RequestService_Contractor.some((s) => s.NIdCompany === e.NIdCompany)
      ) {
        return this.showError("این شرکت قبلا اضافه شده است.");
      }

      this.value.ClsRequestService_Info.RequestService_Contractor = this.value.ClsRequestService_Info.RequestService_Contractor.map(
        (item) => {
          if (item.NIdCompany === this.selectedRow.NIdCompany) {
            return {
              NIdCompany: e.NIdCompany ?? "",
              CompanyName: `${e.Title} --- ${e.CompanyName}` ?? "",
              ManagerMobile: e.ManagerMobile ?? "",
              ManagerTel: e.ManagerTel ?? "",
            };
          }
          return item;
        }
      );
      this.$forceUpdate();
      this.showCompanyInfo = false;
      this.selectedRow = null;
    },
  },
  created() {
    this.loadObj();
  },
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
