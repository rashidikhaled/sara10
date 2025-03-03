<template>
  <safa-form
    app-id="58819065-F293-4972-A718-E79C4E50D277"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <safa-status :result="result" />
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              label="وضعیت درخواست"
              label-width="90px"
              source-type="local"
              :options="requestStatus"
              v-model="model.HasRequest"
              cdcName="HasRequest"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="از تاریخ"
              label-width="90px"
              v-model="model.FromWarningDate"
              cdcName="FromWarningDate"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تا تاریخ"
              label-width="90px"
              v-model="model.ToWarningDate"
              cdcName="ToWarningDate"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="وضعیت اخطار"
              label-width="90px"
              domainName="BuildingPolice"
              ciName="CI_EumWarningStatus"
              v-model="model.EumWarningStatus"
              cdcName="EumWarningStatus"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ مهلت اخطار"
              label-width="90px"
              v-model="model.BreakDate"
              cdcName="BreakDate"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="نوع اخطار"
              label-width="90px"
              domainName="BuildingPolice"
              ciName="CI_WarningType"
              v-model="model.CI_WarningType"
              cdcName="CI_WarningType"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره اخطار"
              label-width="90px"
              v-model="model.WarningNo"
              cdcName="WarningNo"
            />
          </FormControl>
          <nosazi-code-input
            label="کد نوسازی"
            label-width="90px"
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
          />
          <div class="flex item-center">
            <btn-search @click="loadData" />
          </div>
        </FormRow>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="warningList" label="لیست اخطار" />
            <tab-menu name="registerRquest" label="ثبت درخواست" />
          </template>

          <tab-content name="warningList">
            <fit>
              <div class="row q-gutter-sm q-mb-sm">
                <btn-default label="ثبت درخواست" @click="onFormRequest" />
                <btn-default
                  label="جلوگیری از عملیات ساختمانی"
                  @click="onOpenConstructionCouncil"
                />
                <btn-default
                  label="جمع آوری مصالح ساختمانی"
                  @click="onOpenToolsCouncil"
                />
              </div>
              <safa-grid
                fit
                height="100%"
                max-height="100%"
                title="اخطارها"
                v-model="AllWarningList"
                cdcName="AllWarningList"
                :columns="allWarningListColumns"
                :allowMultipleSelection="false"
                :paginate="true"
                @fixViolationClick="onFixViolation"
                :suppressRowClickSelection="false"
                :show-selected-checkbox="true"
                @row:click="selectedRow"
                @reportClick="onOpenReport"
                :take="20"
                :pageSize="20"
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
                m="r"
              />
            </fit>
          </tab-content>
          <tab-content name="registerRquest">
            <RegisterRequest
              :model="RequestModel"
              ref="formRequestRef"
              :selectedRow="selectRow"
              @reset="reset"
            />
          </tab-content>
        </safa-tabs>
      </fit>
      <safa-popup v-model="showWarningForm">
        <UBuildingPoliceWarning
          :selectedWarning="selectRow"
          ref="BulingPoliceWarningRef"
          @hide="showWarningForm = false"
        />
      </safa-popup>
      <safa-popup v-model="showfixViolation">
        <FixViolation
          ref="fixViolationRef"
          :selectedRow="selectRow"
          @getAllwarningList="loadData"
          @backToMainForm="showfixViolation = false"
        />
      </safa-popup>
      <safa-popup v-model="showConstructionCouncil">
        <ConstructionCouncil
          :selectedRow="selectRow"
          ref="ConstructionCouncilRef"
        />
      </safa-popup>
      <safa-popup v-model="showToolsCouncil">
        <ToolsCouncil :selectedRow="selectRow" ref="ToolsCouncilRef" />
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import RegisterRequest from "./partials/RegisterRequest"
import UBuildingPoliceWarning from "../register-warning/UBuildingPoliceWarning.vue"
import FixViolation from "./partials/FixViolation"
import ConstructionCouncil from "./partials/ConstructionCouncil"
import ToolsCouncil from "./partials/ToolsCouncil"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  components: {
    RegisterRequest,
    UBuildingPoliceWarning,
    FixViolation,
    ConstructionCouncil,
    ToolsCouncil
  },

  data () {
    return {
      title: "لیست اخطارها",
      name: "UAllWarningList",
      formKey: "2610930b-4a45-4369-9f28-f4b97cc088fb",
      main: true,
      requestStatus: [
        { Id: 1, Title: "اخطار های دارای درخواست" },
        { Id: 2, Title: "اخطار های فاقد درخواست" }
      ],
      activeTab: "warningList",
      model: {
        FromWarningDate: null,
        HasRequest: -1,
        ToWarningDate: null,
        EumWarningStatus: 0,
        BreakDate: null,
        CI_WarningType: 0,
        WarningNo: null
      },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      AllWarningList: [],
      allWarningListColumns: [
        {
          field: "agCallbackBtn",
          title: "ویرایش اخطار",
          btnTitle: "ویرایش اخطار",
          callback: (params) => this.onOpenWarning(params)
        },
        {
          field: "agCallbackBtn",
          title: "رفع تخلف",
          btnTitle: "رفع تخلف",
          callback: (params) => this.onFixViolation(params)
        },
        {
          field: "agCallbackBtn",
          title: "گزارش",
          btnTitle: "گزارش",
          callback: (params) => this.onOpenReport(params)
        },
        {
          field: "NosaziCode",
          title: "کد نوسازی",
          width: "120px"
        },
        {
          field: "WarningNo",
          title: "شماره اخطار",
          width: "100px"
        },
        {
          field: "CI_WarningType",
          title: "نوع اخطار",
          width: "180px",
          editor: "combo",
          domain: "BuildingPolice"
        },
        {
          field: "EumWarningStatus_Title",
          title: "وضعیت اخطار",
          width: "120px"
        },
        {
          field: "WarningDate",
          title: "تاریخ اخطار",
          width: "100px"
        },
        {
          field: "BreakTime",
          title: "مهلت اخطار به ساعت",
          width: "100px"
        },
        {
          field: "UserName",
          title: "نام کاربر",
          width: "150px"
        },
        {
          field: "NosaziCodeCount",
          title: "تعداد اخطار",
          width: "100px"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "300px"
        }
      ],
      result: null,
      showWarningForm: false,
      showfixViolation: false,
      selectRow: null,
      RequestModel: {
        Warning: {
          WarningNo: null
        },
        Request: {
          CI_RequesterType: null,
          RequesterName: "",
          RequesterTelephone: "",
          RequesterCellphone: "",
          LetterNo: "",
          LetterDate: "",
          RequesterAddress: "",
          Comments: ""
        }
      },
      showConstructionCouncil: false,
      showToolsCouncil: false
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    onFixViolation (dataItem) {
      this.showfixViolation = true
      this.selectRow = dataItem
      this.$nextTick(() => {
        this.$refs.fixViolationRef.loadForm()
      })
    },
    loadData () {
      this.selectRow = null
      this.activeTab = "warningList"
      this.showLoading()
      if (this.model.HasRequest !== 1 && this.model.HasRequest !== 2) {
        this.model.HasRequest = -1
      }
      const payload = {
        pHasRequest: this.model.HasRequest,
        pPEumWarningStatus: this.model.EumWarningStatus,
        pDistrict: this.baseNosaziCode.District,
        pRegion: this.baseNosaziCode.Region,
        pBlock: this.baseNosaziCode.Block,
        pHouse: this.baseNosaziCode.House,
        pBuilding: this.baseNosaziCode.Building,
        pApartment: this.baseNosaziCode.Apartment,
        pShop: this.baseNosaziCode.Shop,
        pFromRow: 0,
        pToRow: 1000,
        CI_WarningType: this.model.CI_WarningType,
        pFromWarningDate: this.model.FromWarningDate,
        pToWarningDate: this.model.ToWarningDate,
        pBreakDate: this.model.BreakDate,
        pWarningNo: this.model.WarningNo
      }
      this.$services.SH.getAllWarningList(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.AllWarningList = this.result.data.AllWarningList
            const strNosazi = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosazi,
              bizCodeTitle: "کد نوسازی",
              saveDesc: `نمایش لیست اخطارها با شماره ${strNosazi} انجام گردید.`
            })
            this.$refs.formRequestRef.getWorkFlowList()
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    onOpenWarning (params) {
      this.selectRow = params
      this.showWarningForm = true
      // this.$nextTick(() => {
      //   this.$refs.BulingPoliceWarningRef.baseNosaziCode = params.NosaziCode
      // })
    },
    onFormRequest () {
      if (this.selectRow === null) {
        this.showError("لطفا یک اخطار را از گرید اخطارها انتخاب نمائید.")
      }
      this.$refs.formRequestRef.setBasenosaziCode()
      if (this.selectRow.CI_WarningType === 1) {
        this.activeTab = "registerRquest"
        this.RequestModel.Warning.WarningNo = this.selectRow.WarningNo
      } else {
        this.showError("فقط اخطار های اصلی ، قابلیت ثبت درخواست را دارند")
      }
    },

    selectedRow (row) {
      debugger
      this.selectRow = row.data
    },
    onOpenConstructionCouncil () {
      if (this.selectRow === null) {
        this.showError("لطفا یک اخطار را از گرید اخطارها انتخاب نمائید.")
        return
      }
      this.showConstructionCouncil = true
      this.$nextTick(() => {
        this.$refs.ConstructionCouncilRef.loadObj()
      })
    },
    onOpenToolsCouncil () {
      if (this.selectRow === null) {
        this.showError("لطفا یک اخطار را از گرید اخطارها انتخاب نمائید.")
        return
      }
      this.showToolsCouncil = true
      this.$nextTick(() => {
        this.$refs.ToolsCouncilRef.loadObj()
      })
    },
    onOpenReport (dataItem) {
      this.selectRow = dataItem
      const reportPath = "/BuildingPolice/RptWarning"
      const queryParams = {
        NidWarning: this.selectRow.NidWarning
      }
      this.showReport(reportPath, queryParams)
    },
    reset () {
      this.resetValidation()
      this.RequestModel = {
        Warning: {
          WarningNo: 0
        },
        Request: {
          CI_RequesterType: null,
          RequesterName: "",
          RequesterTelephone: "",
          RequesterCellphone: "",
          LetterNo: "",
          LetterDate: "",
          RequesterAddress: "",
          Comments: ""
        }
      }
      this.loadData()
    }
  }
}
</script>
