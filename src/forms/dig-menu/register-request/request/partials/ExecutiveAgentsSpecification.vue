<template>
  <fit v-if="isLoaded">
    <safa-grid
      title="مشخصات عملیات اجرایی"
      v-model="value.Request_Contractor"
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
import Company from "src/forms/dig-menu/register-request/request/partials/Company.vue";
export default {
  components: { Company },
  props: {
    m: String,
    value: Object,
  },
  computed: {
    requestContractorColumns() {
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
          editable: false,
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
          editable: false,
        },
        {
          field: "ManagerMobile",
          title: "همراه مدیرعامل",
          width: "150px",
          editable: false,
        },
        {
          field: "ManagerTel",
          title: "تلفن شرکت",
          width: "150px",
          editable: false,
        },
        { field: "Description", title: "توضیحات", width: "auto" },
      ];
    },
  },
  data() {
    return {
      showCompanyInfo: false,
      companies: [],
      selectedRow: null,
      isLoaded: false,
      loading: false,
      useCache: true
    };
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
      if (!Array.isArray(this.value?.Request_Contractor)) return;

      this.value?.Request_Contractor.forEach((row) => {
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
        this.value.Request_Contractor.some((s) => s.NIdCompany === e.NIdCompany)
      ) {
        return this.showError("این شرکت قبلا اضافه شده است.");
      }

      this.value.Request_Contractor = this.value.Request_Contractor.map(
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
};
</script>
