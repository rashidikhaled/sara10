<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="searchObjRes" />
        <safa-status :result="getRevisitRequestWithNidProcRes" />
        <safa-status :result="getRevisitRequestServiceWithNidProcRes" />
        <safa-status :result="getCommitteeLicenseRes" />
        <safa-status :result="getCiArrangementsRes" />
        <safa-status :result="saveCommitteeLicenseRes" />
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          m="r"
        />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="تعداد روز حفاری"
              label-width="115px"
              v-model="newModel.Duration"
              type="number"
              validations="required"
            >
              <template v-slot:append>
                <span style="position: relative; right: 5px; font-size: 11px">
                  روز
                </span>
              </template>
            </safa-text>
          </FormControl>
          <FormControl>
            <safa-combo2
              label="تعداد شیفت کاری"
              label-width="115px"
              ciName="shiftList"
              v-model="shiftList"
              :options="shiftOptions"
              type="multiple"
              source-type="local"
              cdcName="shiftList"
              ref="shiftListRef"
              validations="required"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="تعداد ساعت حفاری"
              label-width="115px"
              v-model="newModel.CoordinateDays"
              type="number"
              validations="required"
            >
              <template v-slot:append>
                <span style="position: relative; right: 5px; font-size: 11px">
                  ساعت
                </span>
              </template>
            </safa-text>
          </FormControl>
          <FormControl>
            <safa-text
              label="نماینده سازمان فاوا"
              label-width="115px"
              v-model="newModel.AgentName"
              validations="required"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="تلفن نماینده سازمان فاوا"
              label-width="115px"
              v-model="newModel.FavaAgentTel"
              validations="required"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="نماینده پیمانکار"
              label-width="115px"
              v-model="newModel.AgentSide"
              validations="required"
            />
          </FormControl>
          <FormControl>
            <safa-combo2
              label="تمهیدات و نکات ضروری"
              label-width="115px"
              v-model="Ci_Arrangements"
              cdcName="Ci_Arrangements"
              :options="arrangementsOptions"
              type="multiple"
              source-type="local"
            />
          </FormControl>
        </FormRow>

        <SafaNotice
          :message="`
            به مدت
            ${newModel.Duration}
            روز و
            ${newModel.ShiftCount}
            شیفت کاری
            ${shiftType}
            ،
            ${newModel.CoordinateDays}
            ساعت قبل از حفاری با نماینده سازمان فاوا
            ${newModel.AgentName}
            به شماره تماس
            ${newModel.FavaAgentTel}
            و شماره تماس نماینده پیمانکار
            ${newModel.AgentSide}
            هماهنگ گردد.`"
          type="info"
        />

        <safa-grid
          title="لیست آیتم های ذخیره شده"
          v-model="committeeLicenses"
          cdcName="committeeLicenses"
          :columns="committeeLicensesColumns"
          :suppressRowClickSelection="false"
          m="r"
          min-height="200px"
          fit
          :pageSize="20"
          paginate
          @row:click="selectedRow"
        />
      </fit>
      <template #footer>
        <div class="q-gutter-sm">
          <btn-save label="ذخیره" @click="saveObj" />
          <btn-default label="چاپ" @click="printHandler" />
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate, currentTime } from "src/utils/index"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "ULicenseSafetyCommittee",
      formKey: "79F4261D-450D-4B35-9311-DFA53E699AEA",
      title: "مجوز عملیات حفاری بدون طرح در کمیته ایمنی",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,

      // models
      shiftType: " ---- ",

      newModel: {
        ShiftCount: 0,
        Duration: 0,
        CoordinateDays: 0,
        AgentName: "",
        FavaAgentTel: "",
        AgentSide: "",
        IsAfternoonShift: false,
        IsDayShift: false,
        IsNightShift: false
      },
      Ci_Arrangements: null,

      model: {
        CommitteeLicense: {
          AgentName: "",
          AgentSide: "",
          AgentTel: "",
          CoordinateDays: "",
          CreateDate: "",
          CreateTime: "",
          Description: "",
          Duration: "",
          FavaAgentTel: "",
          NIdRequest: "",
          NidCommitteeLicense: "0",
          NidUser: "",
          ShiftCount: 0,
          UserName: ""
        }
      },

      // res
      searchObjRes: null,
      getRevisitRequestWithNidProcRes: null,
      getRevisitRequestServiceWithNidProcRes: null,
      getCommitteeLicenseRes: null,
      getCiArrangementsRes: null,
      saveCommitteeLicenseRes: null,

      //
      selectedItem: null,
      NidRequest: "00000000-0000-0000-0000-000000000000",
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      arrangementsOptions: [],

      committeeLicenses: [],
      shiftList: [],
      shiftOptions: [
        { ID: 0, Title: "صبح" },
        { ID: 1, Title: "بعدازظهر" },
        { ID: 2, Title: "شب" }
      ],

      // grid
      grdCommitteeLicenses: [],
      committeeLicensesColumns: [
        {
          field: "NidCommitteeLicense",
          title: "کد",
          width: "100px"
        },
        {
          field: "CreateDate",
          title: "تاریخ ایجاد",
          width: "100px"
        },
        {
          field: "CreateTime",
          title: "زمان ایجاد",
          width: "100px"
        },
        { field: "UserName", title: "کاربر ایجاد کننده", width: "auto" }
      ]
    }
  },
  created () {
    if (this.isSelectedRequest()) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.loadObj()
    } else this.hideSidebar(this.name)
  },
  methods: {
    loadObj () {
      const nidProc = this.selectedRequest.NidProc // "e1205ea9-0d6e-463a-a518-bc9564384476"
      this.getCiArrangements()
      this.searchObj(nidProc)
      this.getCommitteeLicense(nidProc)
    },
    searchObj (NidProc) {
      this.showLoading()
      this.$services.excavation
        .getRequestData({ pRequest: { NidProc } })
        .then(({ data }) => {
          this.searchObjRes = this.getResponse(data)
          if (this.searchObjRes.success) {
            const res = this.searchObjRes?.data?.GetRequestDataResult ?? null
            if (
              res?.ClsCheckProcSend?._NIdRequest !==
              "00000000-0000-0000-0000-000000000000"
            ) {
              this.getRevisitRequestWithNidProc(NidProc)
            } else {
              this.getRevisitRequestServiceWithNidProc(NidProc)
            }
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
    async getRevisitRequestWithNidProc (NidProc) {
      try {
        this.showLoading()
        const { data } =
          await this.$services.excavation.getRevisitRequestWithNidProc({
            pRequest: { NidProc }
          })
        this.getRevisitRequestWithNidProcRes = this.getResponse(data)
        if (this.getRevisitRequestWithNidProcRes.success) {
          this.clsReq =
            this.getRevisitRequestWithNidProcRes?.data
              ?.GetRevisit_RequestWithNidProcResult?.ClsRevisit_Request ?? null
          this.NidRequest = this.clsReq?.NidRequest ?? null
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getRevisitRequestServiceWithNidProc (NidProc) {
      try {
        this.showLoading()
        const { data } =
          await this.$services.excavation.getRevisitRequestServiceWithNidProc({
            pRequest: { NidProc }
          })
        this.getRevisitRequestServiceWithNidProcRes = this.getResponse(data)
        if (this.getRevisitRequestServiceWithNidProcRes.success) {
          const res =
            this.getRevisitRequestServiceWithNidProcRes.data
              .GetRevisit_RequestServiceWithNidProcResult ?? null
          if (!res.ClsRevisit_RequestService) {
            this.showError("اطلاعاتی با این کد یافت نشد")
          } else {
            this.clsReq = res.ClsRevisit_RequestService ?? null
            this.NidRequest = this.clsReq?.NidRequest ?? null
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    getCommitteeLicense (NidProc) {
      this.showLoading()
      this.$services.excavation
        .getCommitteeLicense({ pReuqest: { NidProc } })
        .then(({ data }) => {
          this.getCommitteeLicenseRes = this.getResponse(data)
          if (this.getCommitteeLicenseRes.success) {
            this.committeeLicenses =
              this.getCommitteeLicenseRes.data.GetCommitteeLicenseResult
                ?.ClsCommitteeLicense?.CommitteeLicenses ?? []
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
    getCiArrangements () {
      this.showLoading()
      this.$services.excavation
        .getCiArrangements({
          GetCi_Arrangements: null
        })
        .then(({ data }) => {
          this.getCiArrangementsRes = this.getResponse(data)
          if (this.getCiArrangementsRes.success) {
            this.arrangementsOptions =
              this.getCiArrangementsRes.data.GetCi_ArrangementsResult.ClsCommitteeLicense.Ci_Arrangements
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
    saveObj () {
      if (this.NidRequest === null)
      { return this.showError("اطلاعاتی با این کد یافت نشد") }
      if (this.clsReq === null)
      { return this.showError("درخواست گروه حفاری نمی باشد") }
      if (this.newModel.ShiftCount === 0)
      { return this.showError("تعداد شیفت انتخاب نشده است") }
      if (!this.isValidForm()) return
      this.showLoading()
      const payload = {
        pReuqest: {
          ClsCommitteeLicense: {
            Ci_Arrangements: this.Ci_Arrangements,
            CommitteeLicense: {
              ...this.model.CommitteeLicense,

              Duration: this.newModel.Duration || 0,
              ShiftCount: this.newModel.ShiftCount || 0,
              IsDayShift: this.newModel.IsDayShift || false,
              IsAfternoonShift: this.newModel.IsAfternoonShift || false,
              IsNightShift: this.newModel.IsNightShift || false,
              CoordinateDays: this.newModel.CoordinateDays || 0,
              FavaAgentTel: this.newModel.FavaAgentTel || "",
              AgentName: this.newModel.AgentName || "",
              AgentTel: this.newModel.AgentTel || "",
              AgentSide: this.newModel.AgentSide || "",

              CreateDate: currentDate(),
              CreateTime: currentTime(),
              NIdProc: this.selectedRequest.NidProc,
              NIdRequest: this.NidRequest,
              NidUser: this.getNidUser(),
              UserName: this.currentUser.UserName
            },
            CommitteeLicenses: null,
            ErrorResult: null,
            NIdRequest: "00000000-0000-0000-0000-000000000000",
            NidProc: "00000000-0000-0000-0000-000000000000"
          }
        }
      }
      this.$services.excavation
        .saveCommitteeLicense(payload)
        .then(({ data }) => {
          this.saveCommitteeLicenseRes = this.getResponse(data)
          if (this.saveCommitteeLicenseRes.success) {
            this.showSuccess("عملیات با موفقیت انجام گردید")
            this.getCommitteeLicense(this.selectedRequest.NidProc)
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
    selectedRow (e) {
      this.selectedItem = e.data
    },
    async printHandler () {
      if (this.selectedItem === null) {
        return this.showError("ابتدا یک ردیف را انتخاب نمایید")
      }
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptSafetyCommittee`
      const queryParams = {
        NidCommitteeLicense: this.selectedItem.NidCommitteeLicense
      }
      this.showReport(reportPath, queryParams)
      // await this.log({
      //   action: this.logActions.printReport,
      //   bizCode: this.selectedItem.NidCommitteeLicense,
      //   bizCodeTitle: "NidCommitteeLicense"
      // })
    }
  },
  watch: {
    shiftList () {
      const list = this.shiftList ?? []
      this.newModel.ShiftCount = list.length ?? 0
      let tmp = []
      for (let i = 0; i < list.length; i++) {
        if (list[i] === 0) tmp.push("صبح")
        if (list[i] === 1) tmp.push("بعدازظهر")
        if (list[i] === 2) tmp.push("شب")
        this.shiftType = tmp.toString()
      }

      if (list.some((s) => s === 0)) {
        this.newModel.IsDayShift = true
      }
      if (list.some((s) => s === 1)) {
        this.newModel.IsAfternoonShift = true
      }
      if (list.some((s) => s === 2)) {
        this.newModel.IsNightShift = true
      }
    }
  }
}
</script>
