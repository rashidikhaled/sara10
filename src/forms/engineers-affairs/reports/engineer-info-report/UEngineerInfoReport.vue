<template>
 <safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
  <form-wrapper :title="title">
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            @keyup.enter="onSearchEngInfo"
            label="کد عضویت"
            label-width="80px"
            v-model="identityCode"
          />
        </FormControl>
        <FormControl>
          <safa-text
            @keyup.enter="onSearchEngInfo"
            label="کد نظام مهندسی"
            label-width="80px"
            class="col-md-3"
            v-model="municipalityCode"
          />
        </FormControl>
        <FormControl>
          <safa-text
            @keyup.enter="onSearchEngInfo"
            label="کد نظام معماری"
            label-width="80px"
            class="col-md-3"
            v-model="architectureCode"
          />
        </FormControl>
        <FormControl>
          <safa-text
            @keyup.enter="onSearchEngInfo"
            label="نام و نام خانوادگی"
            label-width="80px"
            class="col-md-3"
            v-model="nameAndFamilyEng"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            @keyup.enter="onSearchEngInfo"
            ciName="CI_StudyField"
            domainName="engineer"
            label="رشته تحصیلی"
            label-width="80px"
            class="col-md-3"
            v-model="studyField"
          />

        </FormControl>
        <FormControl>
          <safa-combo
            @keyup.enter="onSearchEngInfo"
            ciName="CI_University"
            domainName="engineer"
            label="محل اخذ مدرک"
            label-width="80px"
            class="col-md-3"
            v-model="university"
          />

        </FormControl>
        <FormControl>
          <safa-text
            @keyup.enter="onSearchEngInfo"
            label="کد ملی"
            label-width="80px"
            class="col-md-3"
            v-model="nationalCode"
          />

        </FormControl>
        <FormControl>
          <safa-text
            @keyup.enter="onSearchEngInfo"
            label="شماره پروانه اشتغال"
            label-width="80px"
            class="col-md-3"
            v-model="jobAgreementNo"
          />

        </FormControl>
        <FormControl>
          <safa-text
            @keyup.enter="onSearchEngInfo"
            label="تلفن همراه"
            label-width="80px"
            class="col-md-3"
            v-model="mobileNo"
          />
        </FormControl>
        <FormControl>
          <div>
            <btn-search @click="onSearchEngInfo" />
          </div>
        </FormControl>
      </FormRow>
      <safa-datatable
        helper="engInfoListColumns"
        @dbclick="onRowDblClick"
        v-model="engInfoList"
        fit
        height="100%"
        max-height="100%"
        min-height="200px"
        :show-selected-checkbox="true"
        :allowMultipleSelection="false"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
        class="fit"
      />
    </fit>
  </form-wrapper>
 </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  components: {},
  mixins: [baseFormMixin],
  data () {
    return {
      title: "گزارش اطلاعات مهندس",
      formKey: "f3c7083f-5d11-4d4d-aee2-521b1908cf84",
      name: "UEngineerInfoReport",
      main: true,
      engInfoListColumns: [
        {
          field: "IdentityCode",
          title: "کد عضویت",
          width: "100px"
        },
        {
          field: "EngineerType",
          title: "نوع",
          width: "100px"
        },
        {
          field: "EngName",
          title: "نام",
          width: "100px"
        },
        {
          field: "EngFamily",
          title: "نام خانوادگی",
          width: "150px"
        },
        {
          field: "BirthDate",
          title: "تاریخ تولد",
          editor: 'date',
          width: "100px"
        },
        {
          field: "BirthPlace",
          title: "محل تولد",
          width: "100px"
        },
        {
          field: "IdExportPlace",
          title: "محل صدور",
          width: "100px"
        },
        {
          field: "IdNo",
          title: "شماره شناسنامه",
          width: "100px"
        },
        {
          field: "NationalCode",
          title: "شماره ملی",
          width: "100px"
        },
        {
          field: "SaveDate",
          title: "تاریخ ثبت",
          editor: 'date',
          width: "100px"
        },
        {
          field: "OffCode",
          title: "کد دفتر جاری",
          width: "100px"
        },
        {
          field: "Ability",
          title: "فعالیت",
          width: "150px",
          editor: "combo",
          domain: "engineer"
        },
        {
          field: "Base",
          title: "پایه",
          width: "150px"
        },
        {
          field: "StudyField",
          title: "رشته تحصیلی",
          width: "100px"
        },
        {
          field: "JobAgreementNo",
          title: "شماره پروانه اشتغال",
          width: "100px"
        },
        {
          field: "JobAgreementExpireDate",
          title: "تاریخ پروانه اشتغال",
          editor: 'date',
          width: "100px"
        },
        {
          field: "MunicipalityCode",
          title: "کد نظام مهندسی",
          width: "100px"
        },
        {
          field: "ArchitectureCode",
          title: "کد نظام معماری",
          width: "100px"
        },
        {
          field: "MobileNo",
          title: "تلفن همراه",
          width: "100px"
        }
      ],
      sidebarCompatible: true,
      architectureCode: null,
      nameAndFamilyEng: null,
      identityCode: null,
      jobAgreementNo: null,
      municipalityCode: null,
      nationalCode: null,
      studyField: null,
      university: null,
      mobileNo: null,
      engInfoList: []
    }
  },
  methods: {
    onSearchEngInfo () {
      this.showLoading()
      const clsEngInfoReport = {}
      if (this.architectureCode !== null) {
        clsEngInfoReport.ArchitectureCode = this.architectureCode
      }
      if (this.nameAndFamilyEng !== null) {
        clsEngInfoReport.EngName = this.nameAndFamilyEng
      }
      if (this.identityCode !== null) {
        clsEngInfoReport.IdentityCode = this.identityCode
      }
      if (this.jobAgreementNo !== null) {
        clsEngInfoReport.JobAgreementNo = this.jobAgreementNo
      }
      if (this.mobileNo !== null) {
        clsEngInfoReport.MobileNo = this.mobileNo
      }
      if (this.municipalityCode !== null) {
        clsEngInfoReport.MunicipalityCode = this.municipalityCode
      }
      if (this.nationalCode !== null) {
        clsEngInfoReport.NationalCode = this.nationalCode
      }
      if (this.studyField !== null) {
        clsEngInfoReport.StudyField = this.studyField
      }
      if (this.university !== null) {
        clsEngInfoReport.University = this.university
      }
      const payload = { pRequest: { ClsEngInfoReport: clsEngInfoReport } }
      this.$services.engineers
        .GetEngInfoReport(payload)
        .then((response) => {
          this.engInfoList =
            response.data.GetEngInfoReportResult.ClsEngInfoReport.EngInfo
        })
        .catch(() => {
          this.showServerError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    onRowDblClick ({ event, target, row }) {
      this.$emit("selectedEngInfo", row)
    }
  }
}
</script>
