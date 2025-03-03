<!-- eslint-disable no-unused-vars -->
<template>
  <!-- appId="DE7014AD-A72A-49A1-862F-1712DD44C166" -->
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="saveObjRes" />
        <safa-status :result="creInsRes" />

        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          :m="mode"
          @fetched="fetched"
        />
      </template>
      <fit>
        <safa-tabs v-model="currentTab" fit>
          <template v-slot:tabs>
            <tab-menu name="totlaInfo" label="اطلاعات کلی" />
            <tab-menu name="drillingInfo" label="مشخصات حفاری" />
            <tab-menu name="executInfo" label="مشخصات عوامل اجرایی" />
            <tab-menu name="inquiry" label="استعلامات" />
            <tab-menu
              name="urbanizationRecords"
              label="سوابق شهرسازی ملک و تایید درخواست"
            />
          </template>
          <tab-content name="totlaInfo">
            <TotlaInfo
              v-model="model.developmentPlans.ClsRequest_Info"
              :docInfo="documentInfo"
              @getMapInfo="getMapInfo"
              :requesterNamesOptions="requesterNamesOptions"
              @getCIRedirectName="getCIRedirectName"
              :m="mode"
              :noSelectinCIRequesterType="
                settingDigModel.Settings.NoSelectinCI_RequesterType
              "
              ref="generalInformation"
            />
          </tab-content>
          <tab-content name="drillingInfo">
            <DrillingSpecification
              v-model="model.developmentPlans.ClsRequest_Info"
              :m="mode"
            />
          </tab-content>
          <tab-content name="executInfo" :padding="false">
            <ExecutiveAgentsSpecification
              v-model="model.developmentPlans.ClsRequest_Info"
              :m="mode"
              ref="executiveRef"
            />
          </tab-content>
          <tab-content name="inquiry" :padding="false">
            <Inquiry
              v-model="model.developmentPlans.ClsRequest_Info"
              :m="mode"
            />
          </tab-content>
          <tab-content name="urbanizationRecords" :padding="false">
            <UrbanizationRecords
              v-model="model.developmentPlans.ClsRequest_Info"
              :gridShahrsazi="model.gridShahrsazi"
            />
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer v-if="!readOnly">
        <form-actions
          :showEditButton="false"
          showNewButton
          :m="mode"
          @save="saveObj"
          @newInfo="newBtnHandler"
          @cancel="isEditable = false"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import mapMixin from "src/mixins/mapMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

import DrillingSpecification from "./partials/DrillingSpecification.vue"
import ExecutiveAgentsSpecification from "./partials/ExecutiveAgentsSpecification.vue"
import Inquiry from "./partials/Inquiry.vue"
import TotlaInfo from "./partials/TotlaInfo.vue"
import UrbanizationRecords from "./partials/UrbanizationRecords.vue"
import { currentDate } from "src/utils/index"
import PersianDate from "persian-date"

const defaultModel = {
  ClsRequest_Info: {
    Base_ShahrsaziArchive: [],
    ClsIncomeFiche: "",
    IsSendCheck: false,
    ListRequest_Info: "",
    NidRequest: "00000000-0000-0000-0000-000000000000",
    NidWorkflowDeff: "00000000-0000-0000-0000-000000000000",
    Request_Contractor: [],
    Request_Info: {
      CI_DigDelayTime: 0,
      CI_RedirectName: 0,
      CI_Region: 0,
      CI_RequesterType: 1,
      CI_SplitType: 0,
      CI_TypeApplicant: 0,
      CellphoneNo: 0,
      Description: "",
      DigPathLength: 0,
      LetterDate: "",
      LetterNo: 0,
      NIdWorkItem: 0,
      PostCode: 0,
      RequesterAddress: "",
      RequesterName: "",
      RequesterNationalCode: 0,
      RequesterRegion: null,
      TelNo: 0,
      MandateNo: 0,
      MandateDate: ""
    },
    Request_Inquiry: [],
    Request_Line: [],
    Request_Operations: [],
    Request_Time: [],
    InquiryList: [],
    Grid_Shahrsazi: [],
    SrvGetMaxLengthAllRequest: ""
  },
  gridShahrsazi: []
}

export default {
  mixins: [baseFormMixin, mapMixin],
  components: {
    DrillingSpecification,
    ExecutiveAgentsSpecification,
    Inquiry,
    TotlaInfo,
    UrbanizationRecords
  },
  data () {
    return {
      name: "URequest",
      title: "ثبت درخواست انشعابات شخصی",
      formKey: "2a5a6224-9573-42d6-a2de-253196a447d7",
      main: true,

      // #services
      loadObjRes: null,
      saveObjRes: null,
      creInsRes: null,

      // #variables
      currentTab: "totlaInfo",
      model: { developmentPlans: { ...defaultModel } },
      nidWorkflowDeff: null,
      requesterNamesOptions: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      documentInfo: { RequesterAddress: "", PostCode: "" },
      procInfo: null,
      isValidNosaziCode: null,
      currentWKT: "",
      settingDigModel: {
        Settings: {
          CI_Years: 0,
          NoSelectinCI_RequesterType: null
        }
      },
      isNewRequest: false,
      readOnly: false
    }
  },

  methods: {
    async loadSettingUser () {
      try {
        this.showLoading()
        const { data } =
          await this.$services.excavation.getAssignRequestToUser()
        this.loadSettingUserRes = this.getResponse(data)
        if (this.loadSettingUserRes.success) {
          let list =
            this.loadSettingUserRes.data?.GetAssignRequestToUserResult
              ?.ClsAssignRequestToUser?.AssignRequesterToUser ?? []
          this.listUserFromSetting = list.sort((a, b) => {
            return Number(a.StrDate ?? 0) - Number(b.StrDate ?? 0)
          })

          // فیلتر شرکت های خدماتی مرتبط به کاربر فعلی در فرم تنظیمات کاربر حفاری
          const ConditionSetUser = this.listUserFromSetting.filter((i) => i.UserGUID.toUpperCase() === this.currentUser.UserGuid.toUpperCase())

          if (ConditionSetUser.length > 0) {
            // `درصورت فعال بودن `چک باکس عدم انتخاب شرکت خدماتی از فرم تنظیمات کاربر
            if (this.settingDigModel.Settings.NoSelectinCI_RequesterType === true) {
              this.$nextTick(() => {
                this.$ci.get({
                  name: "CI_RequesterType",
                  domain: "Dig",
                  callback: (list) => {
                    this.$refs.generalInformation.fillRequesterInfoSource(
                      list.map((e, _i) => ({
                        RequesterType: [e],
                        RedirectName: ConditionSetUser[0].CI_RedirectName
                      })),
                      false
                    )
                  }
                })
              })
            } else {
              this.$nextTick(() => {
                ConditionSetUser.reduce(
                  (acc, item) =>
                    acc.then(async (value) => {
                      try {
                        const requesterType = await this.$ci.getItem({
                          value: item.CI_RequesterType,
                          name: "CI_RequesterType",
                          domain: "Dig"
                        })

                        if (!requesterType || !requesterType.ID) return Promise.resolve(value)

                        const redirectName = await this.$ci.getItem({
                          value: item.CI_RedirectName,
                          name: "CI_RedirectName",
                          domain: "Dig"
                        })

                        if (value[requesterType.ID]) {
                          value[requesterType.ID].RedirectName.push(redirectName)
                        } else {
                          Object.assign(value, {
                            [requesterType.ID]: {
                              RequesterType: { ...requesterType },
                              RedirectName: [redirectName]
                            }
                          })
                        }
                        return Promise.resolve(value)
                      } catch (ex) {
                        return Promise.reject(ex)
                      }
                    }),
                  Promise.resolve({})
                ).then((list) => this.$refs.generalInformation.fillRequesterInfoSource(list, true))
              })
            }
            this.model.developmentPlans.ClsRequest_Info.Request_Info.CI_RequesterType = ConditionSetUser[0].CI_RequesterType
            // this.model.developmentPlans.ClsRequest_Info.Request_Info.CI_RedirectName = ConditionSetUser[0].CI_RedirectName
          } else {
            this.showError("لطفا شرکت خدماتی را از تنظیمات کاربر (حفاری) انتخاب کنید.")
            this.hideSidebar(this.name)
          }

          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `بارگذاری اطلاعات ${this.title} انجام گردید.`
            })
          }
          this.isView = true
          this.currentNidUser = null
        }
      } catch (e) {
        console.error()
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    codeIsValid (code) {
      return !`${code}`
        .split("-")
        .map(Number)
        .every((x) => x === 0)
    },
    async fetched (value) {
      let l = value?.Base_Owner ?? []
      this.requesterNamesOptions = l.map(m => {
        return { ...m, ID: m.NidOwner || "", Title: `${m.OwnerName ?? ""}` + " " + `${m.OwnerLastName ?? ""}` || "" }
      })
      const strNosaziCode = convertNosaziCodeObjectToString(
        value?._NosaziCode ?? "0-0-0-0-0-0-0"
      )
      this.isValidNosaziCode = this.codeIsValid(strNosaziCode)
      if (this.isValidNosaziCode) {
        await this.loadObj()
      }
    },
    async loadObj () {
      try {
        const payload = {
          pNosaziCode: {
            Apartment: this.baseNosaziCode.Apartment,
            Block: this.baseNosaziCode.Block,
            Building: this.baseNosaziCode.Building,
            CI_City: this.baseNosaziCode.CI_City,
            District: this.baseNosaziCode.District,
            House: this.baseNosaziCode.House,
            Region: this.baseNosaziCode.Region,
            Shop: this.baseNosaziCode.Shop,
            UserName: ""
          },
          pLoadFunc:
            "Base_AddressInfo,Base_Owner,Base_CommonEstate,Base_AddressPostCode"
        }
        this.showLoading()
        const { data } = await this.$services.SC.getBaseParvandehInfo(payload, {
          config: { District: this.baseNosaziCode.District }
        })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          const res = this.loadObjRes.data.Base_ParvandehInfo
          const owner = res?.Base_Owner[0] ?? null
          if (owner) {
            this.model.developmentPlans.ClsRequest_Info.Request_Info.RequesterAddress =
              owner.Address
            this.model.developmentPlans.ClsRequest_Info.Request_Info.CellphoneNo =
              owner.CellPhone
            this.model.developmentPlans.ClsRequest_Info.Request_Info.RequesterNationalCode =
              owner.NationalCode
            this.model.developmentPlans.ClsRequest_Info.Request_Info.RequesterName = `${
              owner.OwnerName + " " + owner.OwnerLastName
            }`
            this.model.developmentPlans.ClsRequest_Info.Request_Info.PostCode =
              data.PostCode
          }

          this.model.developmentPlans.ClsRequest_Info.Base_ShahrsaziArchive =
            res?.Base_ShahrsaziArchive ?? null
          this.documentInfo = {
            RequesterAddress: res.Base_AddressInfo?.MainAddress ?? "",
            PostCode:
              (res.Base_AddressPostCode &&
                res.Base_AddressPostCode.length > 0 &&
                res.Base_AddressPostCode[0]?.PostCode) ||
              ""
          }
          this.showOnMap()
          if (this.selectedRequest && this.isNewRequest === false) {
            await this.getRequestInfoWithNidProc()
          }
          this.getBazdid()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getRequestInfoWithNidProc (nidProc = undefined, readOnly = false) {
      try {
        this.showLoading()

        if (readOnly) {
          this.readOnly = true
        }

        const { data } =
          await this.$services.excavation.getRequestInfoWithNidProc({
            pRequest: {
              NidProc: nidProc || this.selectedRequest.NidProc
            }
          })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          const res = this.loadObjRes.data.GetGetRequest_InfoWithNidProcResult
          if (res.ClsRequest_Info) {
            this.model.developmentPlans.ClsRequest_Info = res.ClsRequest_Info
            const lines = res?.ClsRequest_Info?.Request_Line ?? []
            if (Array.isArray(lines) && lines.length > 0) {
              const WKT = lines[0].Line ?? ""

              this.showWKT({ WKT }, true, null, null, "digline")
            }
            setTimeout(() => {
              this.model.developmentPlans.ClsRequest_Info.Request_Info.CI_RequesterType =
                this.loadObjRes.data.GetGetRequest_InfoWithNidProcResult.ClsRequest_Info.Request_Info.CI_RequesterType
            }, 500)
          }
          this.$refs.executiveRef.loadObj()
          // this.$refs.generalInformation.getRedirectNameList()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    getCIRedirectName () {
      if (this.isNewRequest === false) {
        this.model.developmentPlans.ClsRequest_Info.Request_Info.CI_RedirectName =
        this.loadObjRes?.data?.GetGetRequest_InfoWithNidProcResult
          ?.ClsRequest_Info?.Request_Info?.CI_RedirectName ?? null
      } else {
        this.model.developmentPlans.ClsRequest_Info.Request_Info.CI_RedirectName = null
      }
    },
    showOnMap () {
      const strNosazi = convertNosaziCodeObjectToString(this.baseNosaziCode)
      this.mapClear()
      this.showCodeOnMap(strNosazi)
    },
    async getMapInfo (e) {
      this.currentWKT = e?.WKT ?? ""
    },

    async saveObj () {
      const obj =
        window.getConfigValue("esupParams")?.Dig_NidWorkflowDeff ?? null
      if (obj && obj.NidWorkFlowDef_Request) {
        this.nidWorkflowDeff = obj.NidWorkFlowDef_Request
      } else {
        this.showError(
          "کلید گردشکار ثبت درخواست طرح های توسعه تعریف نشده است . لطفا به راهبر سیستم اطلاع دهید."
        )
        return
      }
      if (!this.isValidForm()) return
      if (!this.isValidNosaziCode) {
        return this.showError("کد نوسازی معتبر نمی باشد.")
      }
      let tmpObj = this.model.developmentPlans.ClsRequest_Info
      if (!tmpObj.Request_Info.CI_Region) {
        return this.showError("لطفا منطقه را وارد نمایید.")
      }
      if (
        Array.isArray(tmpObj.Request_Time) &&
        tmpObj.Request_Time.length === 0
      ) {
        this.currentTab = "drillingInfo"
        return this.showError(
          "درج اطلاعات در جدول 'مدت و زمان اجرای عملیات حفاری' الزامی می باشد."
        )
      }
      this.normalizedRequestTime(tmpObj.Request_Time)
      if (
        tmpObj.Request_Time.some((s) => s.EndDate === "" || s.StartDate === "")
      ) {
        this.currentTab = "drillingInfo"
        return this.showError(
          "در جدول 'مدت و زمان اجرای عملیات حفاری' مقدار درج تاریخ شروع و پایان الزامی می باشد."
        )
      }
      if (tmpObj.Request_Time.some((s) => s.Duration < 0)) {
        this.currentTab = "drillingInfo"
        return this.showError(
          "در جدول 'مدت و زمان اجرای عملیات حفاری' مقدار وارد شده برای تاریخ شروع و پایان صحیح نمی باشد."
        )
      }

      if (
        Array.isArray(tmpObj.Request_Operations) &&
        tmpObj.Request_Operations.length === 0
      ) {
        this.currentTab = "drillingInfo"
        return this.showError(
          "درج اطلاعات در جدول 'مشخصات عملیات حفاری' الزامی می باشد."
        )
      }
      if (
        tmpObj.Request_Operations.some(
          // eslint-disable-next-line eqeqeq
          (s) => s.Length == 0 || s.Width == 0 || s.Depth == 0
        )
      ) {
        this.currentTab = "drillingInfo"
        return this.showError(
          "در جدول 'مشخصات عملیات حفاری' درج اطلاعات  طول، عرض، عمق الزامی می باشد."
        )
      }

      try {
        this.showLoading()
        await this.addWorkItem()
        await this.saveRequest()
        // await this.log({
        //   action: this.logActions.save,
        //   bizCode: this.procInfo.NidProc,
        //   bizCodeTitle: "NidProc",
        //   // nosaziCode: this.procInfo.BizCode,
        //   nidWorkItem: this.procInfo.NidWorkItem,
        //   saveDesc: `عملیات ثبت درخواست انشعابات شخصی با شماره ${this.procInfo.NidWorkItem} انجام گردید.`
        // })
        this.showSuccess(
          `عملیات ثبت درخواست انشعابات شخصی با شماره ${this.procInfo.NidWorkItem} انجام گردید.`
        ).onDismiss(() => {
          this.hideLoading()
          this.mapClear()
          this.setLayout("full")
          this.redirectToKartable()
          this.isNewRequest = false
          this.hideSidebar(this.name)
        })
      } catch (e) {
        console.error(e)
        await this.deleteProc()
        this.showError("متاسفانه عملیات ثبت درخواست انشعابات شخصی متوقف شد.")
      } finally {
        this.hideLoading()
      }
    },
    async addWorkItem () {
      if (!this.isValidForm()) return
      return new Promise(async (resolve, reject) => {
        try {
          this.procInfo = null
          const payload = {
            BizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
            EumOwnerType: 0,
            NidWorkflowDeff: this.nidWorkflowDeff,
            ProcInitiator: this.getNidUser(),
            ProcRequester: this.model.developmentPlans.ClsRequest_Info.Request_Info.RequesterName,
            ProcInitiatorName: this.getUserDisplayName(),
            ProcArea: "سرا10",
            GroupName: this.name,
            GroupTitel: this.title,
            Domain: this.baseNosaziCode?.District,
            IsSara10Request: true,
            WKT: this.currentWKT ?? ""
          }
          const res = await this.$srvWorkflow.createInstance(payload)
          this.creInsRes = this.getResponse(res.data)
          if (this.creInsRes.success) {
            const res = this.creInsRes.data
            if (res.status === 200 && res.success) {
              this.procInfo = res.data.ProcInfo
              return resolve()
            } else {
              return reject(this.creInsRes.errors[0].text)
            }
          }
        } catch (e) {
          console.error(e)
          return reject(e)
        }
      })
    },
    normalizedSaveModel () {
      const {
        // eslint-disable-next-line camelcase
        CI_DigDelayTime,
        // eslint-disable-next-line camelcase
        CI_RedirectName,
        // eslint-disable-next-line camelcase
        CI_Region,
        // eslint-disable-next-line camelcase
        CI_RequesterType,
        // eslint-disable-next-line camelcase
        CI_SplitType,
        // eslint-disable-next-line camelcase
        CI_TypeApplicant,
        CellphoneNo,
        Description,
        DigPathLength,
        LetterDate,
        MandateDate,
        LetterNo,
        MandateNo,
        // PostCode,
        // RequesterAddress,
        RequesterName,
        RequesterNationalCode,
        RequesterRegion,
        TelNo
      } = this.model.developmentPlans.ClsRequest_Info.Request_Info
      const currentYear = currentDate().split("/")[0]
      const _ciy = this.settingDigModel?.Settings?.CI_Years ?? 0
      const reqInfo = {
        AgainRenewal: null,
        AreaCode: RequesterRegion, // این فیلد مربوط به ناحیه است که طبق گفته آقای صالحی باید از اطلاعات نقشه دریافت گردد
        CI_DigDelayTime,
        CI_Duration: 0,
        CI_RedirectName,
        CI_Region,
        CI_RequestType: 0,
        CI_RequesterType,
        CI_SplitType,
        CI_TypeApplicant,
        CI_Years: _ciy === 0 ? _ciy : +currentYear,
        CellphoneNo,
        CodeString: convertNosaziCodeObjectToString(this.baseNosaziCode),
        ConfilictWithOther: false,
        CreatedRequestID: this.getNidUser(),
        CreatedRequestName: this.getUserDisplayName(),
        DateCancelRequest: null,
        Description,
        DigPathLength,
        EntityKey: null,
        EumRequestStatus: null,
        ExportLicenseComments: null,
        ExportLicenseDate: null,
        ExportLicenseMayorComment: null,
        ExportLicenseNo: null,
        ExportingLicenseUserId: null,
        ExportingUserLicense: null,
        IsApproval: false,
        IsDisapprove: false,
        IsRenewal: false,
        IsRevisit: false,
        IsSara10: true,
        LetterDate,
        MandateDate,
        LetterNo,
        MandateNo,
        NIdProc: this.procInfo.NidProc,
        NIdRequest: "00000000-0000-0000-0000-000000000000",
        NIdWorkItem: this.procInfo.NidWorkItem,
        NidUserCancelRequest: null,
        OriginalLicenseComments: null,
        OriginalLicenseDate: null,
        OriginalLicenseNo: null,
        PostCode: this.documentInfo.PostCode,
        RequestDate: null,
        RequesterAddress: this.documentInfo.RequesterAddress,
        RequesterName,
        RequesterNationalCode,
        RequesterRegion,
        SysCI_RequestStatus: "0",
        TelNo,
        TimeCancelRequest: null,
        UrbanCI_RequestType: "0",
        UrbanNIdKartablItem: null,
        UrbanNIdRequest: "0",
        UrbanRequestType: null,
        UserNameCancelRequest: null

      }
      const clsReqInfo = this.model.developmentPlans.ClsRequest_Info

      return {
        pRequest: {
          ClsRequest_Info: {
            Base_ShahrsaziArchive: this.model?.gridShahrsazi ?? null,
            ClsIncomeFiche: null,
            ErrorResult: null,
            IsSendCheck: false,
            ListRequest_Info: null,
            NidRequest: "00000000-0000-0000-0000-000000000000",
            NidWorkflowDeff: this.procInfo.NidWorkflowDeff,
            Request_Contractor: clsReqInfo?.Request_Contractor ?? null,
            Request_Info: reqInfo,
            Request_Inquiry: clsReqInfo.Request_Inquiry ?? [],
            Request_Line: [
              {
                Geog: null,
                Line: this.currentWKT ?? "",
                NidRequest: "00000000-0000-0000-0000-000000000000",
                NidRequestLine: "00000000-0000-0000-0000-000000000000"
              }
            ],
            Request_Operations: this.normalizeRequestServiceOperations(),
            Request_Time: this.normalizeRequestServiceTime(),
            SaveRequestInSara: false,
            SearchID: null,
            SrvGetMaxLengthAllRequest: null
          },
          IsSara10: true
        }
      }
    },
    async saveRequest () {
      return new Promise(async (resolve, reject) => {
        try {
          const payload = this.normalizedSaveModel()
          console.debug("saveRequestInfo payload :>> ", payload)
          this.showLoading()
          const { data } = await this.$services.excavation.saveRequestInfo(
            payload
          )
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            // const res = this.saveObjRes.data.SaveRequest_InfoResult
            return resolve()
          } else {
            return reject(this.saveObjRes.errors[0].text)
          }
        } catch (e) {
          console.error(e)
          return reject(e)
        }
      })
    },

    normalizeRequestServiceTime () {
      return (
        this.model.developmentPlans.ClsRequest_Info?.Request_Time?.map((m) => {
          return {
            ...m,
            AgainRenewal: m.AgainRenewal || false,
            CI_CauseRenewal: m.CI_CauseRenewal || 0,
            CI_Phase: m.CI_Phase || 0,
            Delay: m.Delay || 0,
            Description: m.Description || "",
            Duration: m.Duration || 0,
            EndDate: m.EndDate || "",
            EndTime: m.EndTime || "",
            NIdRequest: m.NIdRequest || "00000000-0000-0000-0000-000000000000",
            NIdTime: m.NIdTime || "00000000-0000-0000-0000-000000000000",
            RegDate: m.RegDate || "",
            StartDate: m.StartDate || "",
            StartTime: m.StartTime || "",
            Total: m.Total || 0
          }
        }) ?? []
      )
    },
    normalizeRequestServiceOperations () {
      return (
        this.model.developmentPlans.ClsRequest_Info?.Request_Operations?.map(
          (m) => {
            return {
              ...m,
              Area: m.Area || 0,
              AsphaltLife: m.AsphaltLife || 0,
              AsphaltThickness: m.AsphaltThickness || 0,
              CI_AsphaltQuality: m.CI_AsphaltQuality || 0,
              CI_CrossType: m.CI_CrossType || 0,
              CI_CutType: m.CI_CutType || 0,
              CI_DigRepeat: m.CI_DigRepeat || 0,
              CI_DigTime: m.CI_DigTime || 0,
              CI_DigType: m.CI_DigType || 0,
              CI_Diggings: m.CI_Diggings || 0,
              CI_MaterialsType: m.CI_MaterialsType || 0,
              CI_PathType: m.CI_PathType || 0,
              CI_Phase: m.CI_Phase || 0,
              CI_Section: m.CI_Section || 0,
              CavalryWidth: m.CavalryWidth || 0,
              Depth: m.Depth || 0,
              Description: m.Description || "",
              DigLenghtExcess: m.DigLenghtExcess || 0,
              Length: m.Length || 0,
              NIdRequest:
                m.NIdRequest || "00000000-0000-0000-0000-000000000000",
              NIdRequestOperations:
                m.NIdRequestOperations ||
                "00000000-0000-0000-0000-000000000000",
              RegionPrice: m.RegionPrice || 0,
              ShowingCrossing: m.ShowingCrossing || 0,
              TrenchesWidthExcess: m.TrenchesWidthExcess || 0,
              Width: m.Width || 0
            }
          }
        ) ?? []
      )
    },
    async deleteProc () {
      try {
        const { data } = await this.$srvWorkflow.deleteProc(
          { NidProc: this.procInfo.NidProc },
          this.config
        )
        if (!data.success) {
          this.showError(data.msg)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
      }
    },
    compareDays (date1, date2) {
      if (!date1 || !date2) return ""
      PersianDate.toCalendar("persian")
      const _d1 = new PersianDate(date1.split("/").map((x) => Number(x)))
      const _d2 = new PersianDate(date2.split("/").map((x) => Number(x)))
      const res = _d2.diff(_d1, "days")
      return res
    },
    normalizedRequestTime () {
      this.model.developmentPlans.ClsRequest_Info.Request_Time.forEach(
        (element) => {
          element.Duration = this.compareDays(
            element.StartDate,
            element.EndDate
          )
        }
      )
    },
    async loadFormSetting () {
      try {
        const settings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          {
            key: "SettingDig",
            defaultValue: this.settingDigModel,
            nidProc: GLOBAL_SETTINGS_GUID // unique guid for global settings
            // useCache: false,
          }
        )
        this.settingDigModel = settings
      } catch (e) {
        console.error(e)
      }
    },
    newBtnHandler () {
      this.assignRequest()
      this.$nextTick(() => {
        this.isNewRequest = true
        this.model = { developmentPlans: { ...defaultModel } }
        this.currentTab = "totlaInfo"
        this.baseNosaziCode = {
          District: 0,
          Region: 0,
          Block: 0,
          House: 0,
          Building: 0,
          Apartment: 0,
          Shop: 0
        }
        this.documentInfo = { RequesterAddress: "", PostCode: "" }
        this.model.developmentPlans.ClsRequest_Info.Request_Info.RequesterAddress =
          ""
        this.model.developmentPlans.ClsRequest_Info.Request_Info.CellphoneNo =
          ""
        this.model.developmentPlans.ClsRequest_Info.Request_Info.RequesterNationalCode =
          ""
        this.model.developmentPlans.ClsRequest_Info.Request_Info.RequesterName =
          ""
        this.model.developmentPlans.ClsRequest_Info.Request_Info.PostCode = ""
        this.model.developmentPlans.ClsRequest_Info.Base_ShahrsaziArchive = ""

        this.procInfo = null
        this.isValidNosaziCode = null
        this.currentWKT = ""
      })
      this.$forceUpdate()
      this.mapClear()
      this.isEditable = true
    },
    // assignRequest () {
    //   const tmpSTR = "";
    //   const InitMessage = Common.ClsCommon.InitMessage
    //   tmpSTR += "a" + Environment.NewLine;
    //   if (!ReferenceEquals(InitMessage, null)) {
    //       tmpSTR += "b" + Environment.NewLine;
    //       if (InitMessage.AssignRequesterToUser != null && InitMessage.AssignRequesterToUser.FirstOrDefault().CI_RedirectName != default(short)) {
    //           tmpSTR += "b1" + Environment.NewLine;
    //           if (!ViewModels.ClsSettingDig.Settings.NoSelectinCI_RequesterType) {
    //               Context.ClsRequest_Info.Request_Info.CI_RedirectName = InitMessage.AssignRequesterToUser.FirstOrDefault().CI_RedirectName;
    //               ComboRedirect.Editable = false;
    //               ComboRedirect.ControlMode = SF.EumControlMode.ReadMode;
    //           }
    //       }

    //       if (InitMessage.AssignRequesterToUser != null &&
    //           InitMessage.AssignRequesterToUser.FirstOrDefault().CI_RequesterType != default(short)) {
    //           tmpSTR += "عدم انتخاب شرکت خدماتی از فرم تنظیمات کاربر" + "= " + ViewModels.ClsSettingDig.Settings.NoSelectinCI_RequesterType.ToString() + Environment.NewLine;

    //   if (!this.settingDigModel.Settings.NoSelectinCI_RequesterType) {
    //     this.model.developmentPlans.ClsRequest_Info.Request_Info.CI_RequesterType = InitMessage.AssignRequesterToUser.FirstOrDefault().CI_RequesterType
    //     this.$refs.generalInformation.ciRequesterMode = 'r'
    //   }
    //           } else {
    //               tmpSTR += "AssignRequesterToUser.CI_RequesterType is null" + Environment.NewLine;
    //           }
    //       } else {
    //           tmpSTR += "Common.ClsCommon.InitMessage is null!" + Environment.NewLine;
    //       }

    //     UIDig.Common.ClsCommon.MyEsupLog(tmpSTR + Environment.NewLine);
    // },
    async assignRequest () {
      try {
        this.showLoading()
        const { data } =
          await this.$services.excavation.getAssignRequestToUser()
        const res = this.getResponse(data)
        if (res.success) {
          let list =
            res.data?.GetAssignRequestToUserResult?.ClsAssignRequestToUser
              ?.AssignRequesterToUser ?? []
          const user = list.find(
            (f) => f.UserGUID.toUpperCase() === this.getNidUser().toUpperCase()
          )
          this.model.developmentPlans.ClsRequest_Info.Request_Info.CI_RequesterType =
            user?.CI_RequesterType ?? null
          setTimeout(() => {
            this.model.developmentPlans.ClsRequest_Info.Request_Info.CI_RedirectName =
              user?.CI_RedirectName ?? null
          }, 100)
        }
      } catch (e) {
        console.error()
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    getBazdid () {
      const payload = {
        pNosaziCode: {
          District: this.baseNosaziCode.District,
          Region: this.baseNosaziCode.Region,
          Block: this.baseNosaziCode.Block,
          House: this.baseNosaziCode.House,
          Building: this.baseNosaziCode.Building,
          Apartment: this.baseNosaziCode.Apartment,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc: "Base_ShahrsaziArchive"
      }
      this.showLoading()
      this.$services.SC.getBaseParvandehInfo(payload, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(({ data }) => {
          this.getBaseParvandehInfoRes = this.getResponse(data)
          if (this.getBaseParvandehInfoRes.success) {
            this.model.gridShahrsazi =
              this.getBaseParvandehInfoRes.data.Base_ParvandehInfo.Base_ShahrsaziArchive
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },

  beforeDestroy () {
    this.mapClear()
    this.setLayout("full")
  },

  created () {
    this.loadFormSetting()
    this.loadSettingUser()
    this.setLayout("half")
  }
}
</script>
