<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <FormWrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="getPolygonRes" />
        <safa-status :result="saveObjRes" />
        <safa-status :result="creInsRes" />
        <safa-status :result="deleteRes" />
      </template>
      <fit>
        <safa-tabs fit v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu label="اطلاعات کلی" name="info_tab" />
            <tab-menu label="مشخصات عملیات حفاری" name="op_tab" />
            <tab-menu
              label="مشخصات دستگاه حفار وعوامل اجرایی"
              name="machine_tab"
            />
            <tab-menu label="استعلامات" name="queries_tab" />
          </template>

          <tab-content name="info_tab">
            <GeneralInformation
              v-model="model.developmentPlans"
              @updateRequestServiceTime="updateRequestServiceTime"
              @getMapInfo="getMapInfo"
              :m="mode"
              :formKey="formKey"
              :title="title"
              :name="name"
              ref="generalInformation"
              :noSelectinCIRequesterType="
                settingDigModel.Settings.NoSelectinCI_RequesterType
              "
            />
          </tab-content>
          <tab-content name="op_tab">
            <SpecificationsOperations
              v-model="model.developmentPlans"
              :m="mode"
              :formKey="formKey"
              :title="title"
              :name="name"
            />
          </tab-content>
          <tab-content name="machine_tab">
            <SpecificationsMachine
              v-model="model.developmentPlans"
              :m="mode"
              :formKey="formKey"
              :title="title"
              :name="name"
              ref="machine_tabRef"
            />
          </tab-content>
          <tab-content name="queries_tab">
            <Queries
              v-model="model.developmentPlans"
              :m="mode"
              :formKey="formKey"
              :title="title"
              :name="name"
            />
          </tab-content>
        </safa-tabs>
      </fit>

      <template v-slot:footer v-if="!readOnly">
        <FormActions
          :m="mode"
          :showEditButton="false"
          :showNewButton="!isEditable"
          @cancel="cancelObj"
          @save="saveObj"
          @newInfo="newObj"
        >
          <!-- <template v-slot:after>
            <btn-cancel
              label="ترسیم محل حفاری"
              @click="drowingOnMap"
              v-if="isEditable == true"
            />
            <btn-cancel
              label="حذف مسیرهای انتخاب شده"
              @click="deleteDrowingOnMap"
              v-if="isEditable == true"
            />
          </template> -->
        </FormActions>
      </template>
    </FormWrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"
import PersianDate from "persian-date"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

import GeneralInformation from "./partials/GeneralInformation.vue"
import SpecificationsOperations from "./partials/SpecificationsOperations.vue"
import SpecificationsMachine from "./partials/SpecificationsMachine.vue"
import Queries from "./partials/Queries.vue"
import mapMixin from "../../../../mixins/mapMixin"

const defaultModel = {
  ClsRequestService_Info: {
    ClsIncomeFiche: {
      ExportLicenseInfo: null,
      Income_Fiche: null,
      ListIncome_Fiche: null,
      NIdProc: "00000000-0000-0000-0000-000000000000",
      OddmentAccount: null
    },
    IsEvents: false,
    IsExportLicence: false,
    NIdRequestService: "00000000-0000-0000-0000-000000000000",
    RequestService_Contractor: [],
    RequestService_Info: {
      Boulevard: "",
      ByAlley: "",
      ByStreet: "",
      CI_DigDelayTime: 0,
      CI_Project: 0,
      CI_RedirectName: 102,
      CI_Region: 1,
      CI_RequesterType: 7,
      CI_SplitType: 0,
      Description: "",
      DigPathLength: 0,
      FollowerCellphoneNo: "",
      FollowerName: "",
      LetterDate: "",
      LetterNo: "",
      MainAlley: "",
      MainStreet: "",
      NIdWorkItem: null,
      RequesterRegion: ""
      // CreatedRequestName: ""
    },
    RequestService_Inquiry: [],
    RequestService_Line: [],
    RequestService_Operations: [],
    RequestService_Time: [],
    SearchID: null,
    SrvGetMaxLengthAllRequest: null
  }
}

export default {
  mixins: [baseFormMixin, mapMixin],
  components: {
    GeneralInformation,
    SpecificationsOperations,
    SpecificationsMachine,
    Queries
  },

  data () {
    return {
      title: "ثبت درخواست طرح های توسعه",
      formKey: "98DAAEF7-0AEA-4693-96D2-77D4F787ACA2",
      name: "URequestDevelopmentPlans",
      main: true,

      // UsersSetting
      listUserFromSetting: [],

      // #services
      loadObjRes: null,
      loadSettingUserRes: null,
      getPolygonRes: null,
      saveObjRes: null,
      creInsRes: null,
      deleteRes: null,

      // #variables
      activeTab: "info_tab",
      isNewRequest: false,
      readOnly: false,
      model: { developmentPlans: { ...defaultModel } },
      settingDigModel: {
        Settings: {
          CI_Years: 0,
          NoSelectinCI_RequesterType: null
        }
      },
      nidWorkflowDeff: null,
      currentWKT: "",

      procInfo: null
    }
  },

  methods: {
    closeForm () {
      this.hideSidebar("URequestDevelopmentPlans")
    },
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
                      }))
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
                  Promise.resolve([])
                ).then((list) => this.$refs.generalInformation.fillRequesterInfoSource(list, true))
              })
            }
            this.model.developmentPlans.ClsRequestService_Info.RequestService_Info.CI_RequesterType = ConditionSetUser[0].CI_RequesterType
            // this.model.developmentPlans.ClsRequestService_Info.RequestService_Info.CI_RedirectName = ConditionSetUser[0].CI_RedirectName
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
    async loadObj () {
      try {
        this.showLoading()
        const payload = {
          pRequest: {
            NidProc: this.selectedRequest.NidProc
          }
        }
        const { data } =
          await this.$services.excavation.getRequestServiceInfoWithNidProc(payload)
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          if (
            this.loadObjRes.data.GetRequestService_InfoWithNidProcResult &&
            this.loadObjRes.data.GetRequestService_InfoWithNidProcResult
              .ClsRequestService_Info
          ) {
            this.model.developmentPlans =
              this.loadObjRes.data.GetRequestService_InfoWithNidProcResult
            this.normaliedRequestTime()
            const wktList =
              this.model.developmentPlans.ClsRequestService_Info
                .RequestService_Line ?? []
            if (Array.isArray(wktList) && wktList.length > 0) {
              const WKT = wktList[0].Line ?? ""
              this.showWKT({ WKT }, true, null, null, "digline")
            }
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem} اطلاعات ثبت درخواست توسعه نمایش داده شد.`
            })
          }
          if (this.selectedRequest && this.isNewRequest === false) {
            await this.getRequestInfoWithNidProc()
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getRequestInfoWithNidProc (nidProc = undefined, readOnly = false) {
      debugger
      try {
        this.showLoading()

        if (readOnly) {
          this.readOnly = true
        }

        const { data } =
          await this.$services.excavation.getRequestServiceInfoWithNidProc({
            pRequest: {
              NidProc: nidProc || this.selectedRequest.NidProc
            }
          })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          const res = this.loadObjRes.data.GetRequestService_InfoWithNidProcResult
          if (res.ClsRequestService_Info) {
            this.model.developmentPlans.ClsRequestService_Info = res.ClsRequestService_Info
            const lines = res?.ClsRequestService_Info?.RequestService_Line ?? []
            if (Array.isArray(lines) && lines.length > 0) {
              const WKT = lines[0].Line ?? ""

              this.showWKT({ WKT }, true, null, null, "digline")
            }
            setTimeout(() => {
              this.model.developmentPlans.ClsRequestService_Info.Request_Info.CI_RequesterType =
                this.loadObjRes.data.GetGetRequest_InfoWithNidProcResult.ClsRequestService_Info.Request_Info.CI_RequesterType
            }, 500)
          }
          this.$refs.machine_tabRef.loadObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    // async polygon () {
    //   try {
    //     this.showLoading()
    //     const { data } = await this.$services.excavation.getPolygon({
    //       pRequest: {
    //         NidProc: this.selectedRequest.NidProc
    //         // NidProc: "a6d12497-7556-433e-ba12-0d15fd388352"
    //       }
    //     })
    //     this.getPolygonRes = this.getResponse(data)
    //     if (this.getPolygonRes.success) {
    //       // this.reviewPreformance = this.getPolygonRes.data.GetPolygonResult
    //     }
    //   } catch (e) {
    //     console.error(e)
    //     this.serverError()
    //   } finally {
    //     this.hideLoading()
    //   }
    // },

    async saveObj () {
      if (!this.isValidForm()) return
      const reqServOp =
        this.model.developmentPlans.ClsRequestService_Info
          .RequestService_Operations
      if (Array.isArray(reqServOp) && reqServOp.length > 0) {
        const isEmpty = reqServOp.some(
          (s) =>
            s.Width === null ||
            s.Length === null ||
            s.Depth === null ||
            s.Width === "0" ||
            s.Length === "0" ||
            s.Depth === "0"
        )
        if (isEmpty) {
          return this.showError(
            "مقدار نامشخص یا صفر برای طول و عرض و عمق برای اطلاعات عملیات حفاری وارد شده، مجاز نمی باشد."
          )
        }
      } else {
        this.activeTab = "op_tab"
        this.showError("لطفا اطلاعات عملیات حفاری را وارد نمائید.")
        return
      }
      if (
        this.model.developmentPlans.ClsRequestService_Info.RequestService_Info
          .DigPathLength === 0
      ) {
        this.showError("لطفا مسیر حفاری را مشخص نمائید")
        return
      }
      const obj =
        window.getConfigValue("esupParams")?.Dig_NidWorkflowDeff ?? null
      if (obj && obj.NidWorkFlowDef_Request_Service) {
        this.nidWorkflowDeff = obj.NidWorkFlowDef_Request_Service
      } else {
        this.showError(
          "کلید گردشکار ثبت درخواست طرح های توسعه تعریف نشده است . لطفا به راهبر سیستم اطلاع دهید."
        )
        return
      }
      try {
        this.showLoading()
        console.log("addWorkItem")
        await this.addWorkItem()
        console.log("saveRequest")
        await this.saveRequest()

        await this.log({
          action: this.logActions.save,
          bizCode: this.procInfo.NidProc,
          bizCodeTitle: "NidProc",
          // nosaziCode: this.procInfo.BizCode,
          nidWorkItem: this.procInfo.NidWorkItem,
          saveDesc: `عملیات ثبت درخواست طرح های توسعه با شماره ${this.procInfo.NidWorkItem} انجام گردید.`
        })

        this.showSuccess(
          `عملیات ثبت درخواست طرح های توسعه با شماره ${this.procInfo.NidWorkItem} انجام گردید.`
        ).onDismiss(() => {
          this.hideLoading()
          this.setLayout("full")
          this.redirectToKartable()
          this.hideSidebar(this.name)
          this.mapClear()
        })
      } catch (e) {
        console.error("@@@@@SaveObj Error", e)
        if (this.procInfo) {
          await this.deleteRequest()
          await this.deleteProc()
        }
        this.showError("متاسفانه عملیات ثبت درخواست طرح های توسعه متوقف شد.")
      } finally {
        this.hideLoading()
      }
    },
    async deleteRequest () {
      try {
        const { data } = await this.$services.SC.deleteRequest(
          { pNidProc: this.procInfo.NidProc },
          this.config
        )
        this.deleteRes = this.getResponse(data)
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
      }
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

    async addWorkItem () {
      if (!this.isValidForm()) return
      return new Promise(async (resolve, reject) => {
        try {
          this.procInfo = null
          const payload = {
            BizCode: " ", // با توجه به صحبت انجام شده با آقای صالحی برای پارامتر بیزکد مقدار به صورت خالی ارسال شد. درخواست های توسعه بر روی ملک نیستن برای همین کدنوسازی ندارند . مثل حفاری تو خیابونها
            EumOwnerType: 0,
            NidWorkflowDeff: this.nidWorkflowDeff,
            ProcInitiator: this.getNidUser(),
            ProcRequester: this.$refs.generalInformation.ciRequesterTypeTitle,
            ProcInitiatorName: this.getUserDisplayName(),
            ProcArea: "سرا10",
            GroupName: "ثبت درخواست طرح های توسعه",
            GroupTitel: "ثبت درخواست طرح های توسعه",
            Domain: 0,
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
        CI_Project,
        // eslint-disable-next-line camelcase
        CI_RedirectName,
        // eslint-disable-next-line camelcase
        CI_Region,
        // eslint-disable-next-line camelcase
        CI_RequesterType,
        // eslint-disable-next-line camelcase
        CI_SplitType,
        Boulevard,
        ByAlley,
        ByStreet,
        Description,
        DigPathLength,
        FollowerCellphoneNo,
        FollowerName,
        LetterDate,
        LetterNo,
        MainAlley,
        MainStreet,
        // NIdWorkItem,
        RequesterRegion
      } =
        this.model.developmentPlans.ClsRequestService_Info.RequestService_Info
      const currentYear = currentDate().split("/")[0]
      const _ciy = this.settingDigModel?.Settings?.CI_Years ?? 0
      const reqInfo = {
        // AgainRenewal: null,
        // AreaCode: RequesterRegion,
        Boulevard,
        ByAlley,
        ByStreet,
        CI_DigDelayTime,
        CI_ExtendedDue: 0,
        CI_Project,
        CI_RedirectName,
        CI_Region,
        // CI_RequestType: 0,
        CI_RequesterType,
        CI_SplitType,
        CI_Years: _ciy === 0 ? _ciy : +currentYear,
        ConfilictWithOther: false,
        CreatedRequestID: this.getNidUser(),
        CreatedRequestName: this.getUserDisplayName(),
        // DateCancelRequest: null,
        Description,
        DigPathLength,
        // EntityKey: null,
        EumRequestStatus: null,
        // ExportLicenseComments: null,
        // ExportLicenseDate: null,
        // ExportLicenseMayorComment: null,
        // ExportLicenseNo: null,
        // ExportingLicenseUserId: null,
        // ExportingUserLicense: null,
        FollowerCellphoneNo,
        FollowerName,
        // IsApproval: false,
        // IsDisapprove: false,
        // IsRenewal: false,
        // IsRevisit: false,
        IsSara10: true,
        LetterDate,
        LetterNo,
        MainAlley,
        MainStreet,
        NIdRequest: "00000000-0000-0000-0000-000000000000",
        NIdProc: this.procInfo.NidProc,
        NIdRequestService: "00000000-0000-0000-0000-000000000000",
        NIdWorkItem: this.procInfo.NidWorkItem,
        // NidUserCancelRequest: "00000000-0000-0000-0000-000000000000",
        // OriginalLicenseComments: null,
        // OriginalLicenseDate: null,
        // OriginalLicenseNo: null,
        Region: 0,
        // RequestServiceDate: "",
        // RequestServiceerName: "",
        // RequestServiceerRegion: "",
        RequesterRegion
        // SysCI_RequestServiceStatus: "0",
        // TimeCancelRequest: null,
        // UrbanCI_RequestServiceType: "0",
        // UrbanNIdKartablItem: null,
        // UrbanNIdRequestService: "0",
        // UrbanRequestServiceType: null,
        // UserNameCancelRequest: null
      }
      const clsReqInfo = this.model.developmentPlans.ClsRequestService_Info
      this.normaliedRequestTimeSaving()
      return {
        pRequest: {
          ClsRequestService_Info: {
            Base_ShahrsaziArchive: this.model?.gridShahrsazi ?? null,
            ClsIncomeFiche: {
              ExportLicenseInfo: null,
              Income_Fiche: null,
              ListIncome_Fiche: null,
              NIdProc: "00000000-0000-0000-0000-000000000000",
              OddmentAccount: null
            },
            ErrorResult: null,
            IsEvents: false,
            IsExportLicence: false,
            // NidRequest: "00000000-0000-0000-0000-000000000000",
            NIdRequestService: "00000000-0000-0000-0000-000000000000",
            // NidWorkflowDeff: this.procInfo.NidWorkflowDeff,
            // RequestService_Contractor: this.normalizeRequestServiceContractor(),
            RequestService_Contractor: clsReqInfo?.RequestService_Contractor,
            RequestService_Info: reqInfo,
            RequestService_Inquiry: clsReqInfo.Request_Inquiry ?? [],
            RequestService_Line: [
              {
                Geog: null,
                Line: this.currentWKT ?? "",
                NidRequest: "00000000-0000-0000-0000-000000000000",
                NidRequestLine: "00000000-0000-0000-0000-000000000000"
              }
            ],
            RequestService_Operations: this.normalizeRequestServiceOperations(),
            RequestService_Time: clsReqInfo?.RequestService_Time ?? [],
            SaveRequestInSara: false,
            SearchID: null,
            SrvGetMaxLengthAllRequest: null
          },
          IsSara10: true
        }
      }
    },
    normaliedRequestTime () {
      let normaliedRequestTime =
        this.model.developmentPlans.ClsRequestService_Info.RequestService_Time.map(
          (e) => {
            return {
              ...e,
              StartDateExtension: e.StartDate,
              EndDateExtension: e.EndDate
            }
          }
        )
      this.model.developmentPlans.ClsRequestService_Info.RequestService_Time =
        normaliedRequestTime
    },
    normaliedRequestTimeSaving () {
      let normaliedRequestTime =
        this.model.developmentPlans.ClsRequestService_Info.RequestService_Time.map(
          (e) => {
            return {
              ...e,
              StartDate: e.StartDateExtension
              // EndDate: e.EndDateExtension
            }
          }
        )
      this.model.developmentPlans.ClsRequestService_Info.RequestService_Time =
        normaliedRequestTime
    },

    async saveRequest () {
      return new Promise(async (resolve, reject) => {
        const payload = this.normalizedSaveModel()
        try {
          const { data } =
            await this.$services.excavation.saveRequestServiceInfo(
              payload
            )
          console.log("saveRequest payload", this.model.developmentPlans)
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.model.developmentPlans =
              this.saveObjRes.data.SaveRequestService_InfoResult
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

    newObj () {
      this.resetValidation()
      this.model = { developmentPlans: { ...defaultModel } }
      this.model.developmentPlans.ClsRequestService_Info.RequestService_Time = [
        {
          CI_Phase: 1,
          StartDateExtension: currentDate(),
          EndDate: "",
          Duration: 0,
          Description: ""
        }
      ]
      this.isEditable = true
    },
    cancelObj () {
      this.model.developmentPlans.ClsRequestService_Info.RequestService_Time =
        []
      this.isEditable = false
    },

    drowingOnMap () {
      this.$refs.generalInformation.drawingLengthModal = true
    },
    deleteDrowingOnMap () {
      this.$KaisMap.Clear()
    },
    async getMapInfo (e) {
      this.currentWKT = e?.WKT ?? ""
    },
    normalizeRequestServiceOperations () {
      return (
        this.model.developmentPlans.ClsRequestService_Info?.RequestService_Operations?.map(
          (m) => {
            return {
              ...m,
              CI_Phase: m.CI_Phase || 0,
              CI_Section: m.CI_Section || 0,
              CI_DigType: m.CI_DigType || 0,
              CI_MaterialsType: m.CI_MaterialsType || 0,
              CI_Diggings: m.CI_Diggings || 0,
              CI_PathType: m.CI_PathType || 0,
              Width: m.Width || 0,
              Length: m.Length || 0,
              Depth: m.Depth || 0,
              Description: m.Description || ""

              // Area: m.Area || 0,
              // AsphaltLife: m.AsphaltLife || 0,
              // CI_AsphaltQuality: m.CI_AsphaltQuality || 0,
              // CI_CrossType: m.CI_CrossType || 0,
              // CI_CutType: m.CI_CutType || 0,
              // CI_DigRepeat: m.CI_DigRepeat || 0,
              // CI_DigTime: m.CI_DigTime || 0,

              // CI_RepairPavemen: m.CI_RepairPavemen || 0,
              // CavalryWidth: m.CavalryWidth || 0,
              // CrossLength: m.CrossLength || 0,

              // LengthRevisit: m.LengthRevisit || 0,
              // NIdOperations: m.NIdOperations || "00000000-0000-0000-0000-000000000000",
              // NIdRequestService: m.NIdRequestService || "00000000-0000-0000-0000-000000000000",
              // RegionPrice: m.RegionPrice || 0,
              // TrenchesWidthExcess: m.TrenchesWidthExcess || 0,

              // WidthRevisit: m.WidthRevisit || 0,
            }
          }
        ) ?? []
      )
    },
    normalizeRequestServiceInquiry () {
      return (
        this.model.developmentPlans.ClsRequestService_Info?.RequestService_Inquiry?.map(
          (m) => {
            return {
              ...m,
              CI_RedirectName: m.CI_AsphaltQuality || 102,
              CI_TypeAcceptInquiry: m.CI_CrossType || 0,
              Date: m.CI_CutType || 0,
              Tell: m.CI_DigRepeat || 0,
              CreatorUserName: m.CI_DigTime || 0,
              AcceptDate: m.CI_DigType || 0,
              AcceptUserName: m.CI_Diggings || 0,
              ExpireInquiryDate: m.CI_MaterialsType || 0,
              IsExpire: m.CI_PathType || 0,
              IsAnswerEnable: m.CI_Phase || 0,
              Description: m.CI_RepairPavemen || 0
            }
          }
        ) ?? []
      )
    },
    normalizeRequestServiceLine () {
      return (
        this.model.developmentPlans.ClsRequestService_Info?.RequestService_Line?.map(
          (m) => {
            return {
              ...m,
              CI_RedirectName: m.CI_AsphaltQuality || 102,
              CI_TypeAcceptInquiry: m.CI_CrossType || 0,
              Date: m.CI_CutType || 0,
              Tell: m.CI_DigRepeat || 0,
              CreatorUserName: m.CI_DigTime || 0,
              AcceptDate: m.CI_DigType || 0,
              AcceptUserName: m.CI_Diggings || 0,
              ExpireInquiryDate: m.CI_MaterialsType || 0,
              IsExpire: m.CI_PathType || 0,
              IsAnswerEnable: m.CI_Phase || 0,
              Description: m.CI_RepairPavemen || 0
            }
          }
        ) ?? []
      )
    },
    updateRequestServiceTime () {
      const info = this.model.developmentPlans.ClsRequestService_Info
      if (
        info &&
        info.RequestService_Time &&
        info.RequestService_Time.length > 0
      ) {
        const list =
          info.RequestService_Time?.map((m) => {
            const StartDateExtension = m.StartDateExtension || currentDate()
            m.Duration =
              this.compareDays(StartDateExtension, m.EndDate) < 0
                ? 0
                : this.compareDays(StartDateExtension, m.EndDate)
            m.EndDate = m.Duration === 0 ? "" : m.EndDate
            return {
              ...m,
              CI_Phase: m.CI_Phase || 0,
              StartDateExtension
            }
          }) ?? []
        this.model.developmentPlans.ClsRequestService_Info.RequestService_Time =
          list
      }
    },

    compareDays (date1, date2) {
      if (!date1 || !date2) return ""
      PersianDate.toCalendar("persian")
      const normalizeDate1 = new PersianDate(
        date1.split("/").map((x) => Number(x))
      )
      const normalizeDate2 = new PersianDate(
        date2.split("/").map((x) => Number(x))
      )
      const res = normalizeDate2.diff(normalizeDate1, "days")
      return res
      // if (res < 0) {
      // this.showError('تاریخ انتها نمیتواند کمتر تاریخ ابتدا باشد.')
      //   return 0
      // } else return res
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
    }
  },

  beforeDestroy () {
    this.$KaisMap.Clear()
    this.$KaisMap.ClearAllThings()
    this.$KaisMap.ClearMeasure()
    this.setLayout("full")
  },

  async created () {
    this.loadFormSetting()
    this.loadSettingUser()
    this.setLayout("half")

    if (this.selectedRequest) {
      await this.loadObj()
    }
  }
}
</script>
