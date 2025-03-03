<template>
  <FormWrapper :title="title">
    <safa-status :result="loadObjRes" />
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            label="کد شهرداری"
            label-width="75px"
            v-model="identityCode"
            cdcName="identityCode"
            @keyup.enter="loadObj"
          />
        </FormControl>

        <template v-if="hasEngineeringSystem !== 0">
          <FormControl>
            <safa-text
              label="نام و نام خانوادگی"
              label-width="75px"
              v-model="engName"
              cdcName="EngName"
              @keyup.enter="loadObj"
            />
          </FormControl>
        </template>

        <template v-else>
          <FormControl>
            <safa-text
              label="نام"
              label-width="75px"
              v-model="userName"
              cdcName="userName"
              @keyup.enter="loadObj"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="نام خانوادگی"
              label-width="75px"
              v-model="lastName"
              cdcName="lastName"
              @keyup.enter="loadObj"
            />
          </FormControl>
        </template>

        <div>
          <btn-search label="جستجو" @click="loadObj" />
        </div>
      </FormRow>

      <safa-grid
        v-if="hasEngineeringSystem !== 0"
        :title="title"
        v-model="engineerList"
        cdcName="engineerList"
        :columns="engInfosForEsupColumns"
        :allowMultipleSelection="true"
        :suppressRowClickSelection="false"
        paginate
        :pageSize="20"
        m="r"
        fit
        ref="grid"
      />

      <safa-grid
        v-else
        :title="title"
        v-model="engineerList"
        cdcName="engineerList"
        :columns="engInfosColumns"
        :allowMultipleSelection="true"
        :suppressRowClickSelection="false"
        paginate
        :pageSize="20"
        m="r"
        fit
        ref="grid"
      />
    </fit>
    <template #footer>
      <btn-default label="انتخاب" @click="saveObj" />
    </template>
  </FormWrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin.js"
export default {
  mixins: [baseFormMixin],

  props: {
    title: {
      type: String,
      default: "لیست مهندسین ناظر"
    },
    baseNosaziCode: {
      type: Object,
      default: () => {
        return {
          District: 1
        }
      }
    }
  },

  computed: {
    hasEngineeringSystem () {
      return window.getConfigValue("HasEngineeringSystem", 0) // این پارامتر از کانفیگ دریافت میگردد و روی نمایش لود لیست مهندسین ناظر تاثیر میگذارد
    }
  },

  data () {
    return {
      name: "EngineersList",
      formKey: "0E21C73B-9104-47A2-94E1-24E54E7BCCDA",

      loadObjRes: null,
      loading: false,

      identityCode: "",
      engName: "",
      userName: "",
      lastName: "",

      engineerList: [],

      engInfosColumns: [
        {
          field: 'isSelectedNode',
          title: '',
          width: '45px',
          filterable: false,
          resizable: false,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: 'right',
          editor: 'selection'
        },
        { field: "UrbanityCode", title: "کد شهرداری", width: "150px" },
        { field: "JobAgreement", title: "شماره پروانه اشتغال", width: "200px" },
        {
          field: "MembershipNo",
          title: "شماره عضويت نظام مهندسی",
          width: "200px"
        },
        { field: "ControllerName", title: "نام", width: "100px" },
        { field: "ControllerFamily", title: "نام خانوادگی", width: "100px" },
        {
          field: "CI_Ability",
          title: "كد نوع صلاحيت",
          domain: "CI_SaraM1",
          width: "100px"
        },
        { field: "ControllerCode", title: "كد نظام معماری", width: "100px" },
        {
          field: "CommitmentNo",
          title: "ميزان زيربنای تعهد شده",
          width: "100px"
        },
        {
          field: "CommitmentSupervisionNo",
          title: "شماره تعهد نظارت",
          width: "100px"
        },
        {
          field: "CommitmentSupervisionDate",
          title: "تاریخ تعهد نظارت",
          width: "100px"
        },
        { field: "EngBase", title: "پایه مهندس", width: "200px" },
        {
          field: "CI_EngStudyField",
          title: "رشته تحصیلی",
          domain: "CI_SaraM1",
          width: "200px"
        }
      ],

      engInfosForEsupColumns: [
        {
          field: 'isSelectedNode',
          title: '',
          width: '45px',
          filterable: false,
          resizable: false,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: 'right',
          editor: 'selection'
        },
        { field: "IdentityCode", title: "کد شهرداری", width: "150px" },
        {
          field: "CI_EngineerType",
          title: "نوع",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "200px"
        },
        { field: "EngName", title: "نام ", width: "150px" },
        { field: "EngFamily", title: "نام خانوادگی", width: "180px" },
        { field: "BirthDate", title: "تاریخ تولد", width: "100px" },
        { field: "BirthPlace", title: "محل تولد", width: "150px" },
        { field: "IdExportPlace", title: "محل صدور", width: "150px" },
        { field: "IdNo", title: "شماره شناسنامه", width: "150px" },
        { field: "NationalCode", title: "کد ملی", width: "150px" },
        { field: "SaveDate", title: "تاریخ ثبت", width: "150px" },
        { field: "OffCode", title: "کد دفترجاری", width: "150px" },
        {
          field: "CI_Ability",
          title: "صلاحیت",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "150px"
        },
        { field: "Base", title: "پایه", width: "150px" },
        {
          field: "CI_EngStudyField",
          title: "رشته تحصیلی",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "150px"
        },
        {
          field: "JobAgreementNo",
          title: "شماره پروانه اشتغال",
          width: "200px"
        },
        {
          field: "JobAgreementExpireDate",
          title: "تاریخ انقضاء پروانه اشتغال",
          width: "200px"
        }
      ]
    }
  },

  methods: {
    loadObj () {
      const t = this.hasEngineeringSystem
      if (t === 0) {
        this.getEngineerInfoList()
      } else if (t === 1 || t === 2) {
        this.getEngInfoReportForEsup()
      }
    },

    async getEngineerInfoList () {
      try {
        this.showLoading()
        const payload = {
          pName: this.userName,
          pFamilly: this.lastName,
          pUrbanityCode: this.identityCode,
          pFromRow: 0,
          pToRow: 500
        }
        const { data } = await this.$services.SC.getEngineerInfoList(payload)
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          const list = this.loadObjRes?.data?.EngineerInfo_List ?? []
          this.engineerList = list.map(m => {
            return {
              ...m,
              isSelectedNode: false
            }
          })
          await this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: "",
            saveDesc: `بارگذاری لیست مهندسین ناظر انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async getEngInfoReportForEsup () {
      try {
        this.showLoading()
        const { data } = await this.$services.engineers.getEngInfoReportForEsup(
          {
            pRequest: {
              ClsEngInfoReport_ForEsup: {
                EngName: this.engName,
                IdentityCode: this.identityCode
              }
            }
          }
        )
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          const engInfo =
            this.loadObjRes.data?.GetEngInfoReport_ForEsupResult
              ?.ClsEngInfoReport_ForEsup?.EngInfo
          if (engInfo) {
            this.engineerList = engInfo.map((m) => {
              return {
                ...m,
                isSelectedNode: false,
                IdentityCode: m.IdentityCode,
                CI_EngineerType: m.CI_EngineerType,
                EngFamily: m.ControllerFamily || m.EngFamily,
                EngName: m.ControllerName || m.EngName,
                BirthDate: m.BirthDate || "",
                BirthPlace: m.BirthPlace || "",
                IdExportPlace: m.IdExportPlace || "",
                IdNo: m.IdNo || "",
                NationalCode: m.NationalCode || "",
                SaveDate: m.SaveDate || "",
                OffCode: m.OffCode || "",
                CI_Ability: m.CI_Ability || 0,
                Base: m.Base || "",
                CI_EngStudyField: m.CI_EngStudyField || 0,
                JobAgreementNo: m.JobAgreementNo || "",
                JobAgreementExpireDate: m.JobAgreementExpireDate || ""
              }
            })
          }
          await this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: "",
            saveDesc: `بارگذاری لیست مهندسین ناظر انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    saveObj () {
      const list = this.$refs.grid.gridApi.getSelectedRows()
      if (Array.isArray(list) && list.length > 0) {
        this.$emit("getSupervisorEng", list)
      } else this.showError("لطفا حداقل یک مهندس از لیست مهندسین انتخاب نمایید.")
    }
  }
}
</script>
