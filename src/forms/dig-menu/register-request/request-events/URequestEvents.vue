<template>
  <FormWrapper :title="title" :padding="false">
    <!-- app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902" -->
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
          <tab-menu label="مشخصات عملیات حفاری" name="digInfo" />
          <tab-menu
            label="مشخصات دستگاه حفار و عوامل اجرایی"
            name="performanceInfo"
          />
          <tab-menu label="استعلامات" name="queries" />
        </template>
        <!-- first tab -->
        <tab-content name="info_tab">
          <generalInfo
            v-model="model.eventsPlans"
            @getMapInfo="getMapInfo"
            @updateRequestServiceTime="updateRequestServiceTime"
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
        <!-- second tab -->
        <tab-content name="digInfo">
          <digInfo
            v-model="model.eventsPlans"
            :m="mode"
            :formKey="formKey"
            :title="title"
            :name="name"
          />
        </tab-content>
        <!-- third tab -->
        <tab-content name="performanceInfo">
          <performanceInfo
            v-model="model.eventsPlans"
            :m="mode"
            :formKey="formKey"
            :title="title"
            :name="name"
          />
        </tab-content>
        <!-- forth tab -->
        <tab-content name="queries" :padding="true">
          <queries
            v-model="model.eventsPlans"
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
            @click="drow"
            v-if="isEditable == true"
          />
          <btn-cancel
            label="حذف مسیرهای انتخاب شده"
            @click="deleteRow"
            v-if="isEditable == true"
          />
        </template> -->
      </FormActions>
    </template>
  </FormWrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"
import PersianDate from "persian-date"

import generalInfo from "./partials/generalInfo.vue"
import digInfo from "./partials/digInfo.vue"
import performanceInfo from "./partials/performanceInfo.vue"
import queries from "./partials/queries.vue"
import mapMixin from "src/mixins/mapMixin"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

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
      CI_RedirectName: 0,
      CI_Region: 1,
      CI_RequesterType: 0,
      CI_SplitType: 0,
      Description: "",
      DigPathLength: 0,
      FollowerCellphoneNo: "",
      FollowerName: "",
      LetterDate: "",
      LetterNo: "",
      MainAlley: "",
      MainStreet: "",
      NIdWorkItem: 0,
      RequesterRegion: "",
      CreatedRequestName: ""
    },
    Request_Contractor: [],
    RequestService_Inquiry: [],
    RequestService_Line: [],
    RequestService_Operations: [
      // {
      //   uniqueID: "7315d839-f9ff-4ea0-8158-c094b225a570",
      //   isNew: true,
      //   inEdit: true,
      //   selected: false,
      //   CI_Phase: 0,
      //   CI_Section: 0,
      //   CI_DigType: 0,
      //   CI_MaterialsType: 0,
      //   CI_PathType: 0,
      //   CI_Diggings: 0,
      //   Length: 0,
      //   Width: 0,
      //   Depth: 0,
      //   Description: ""
      // }
    ],
    RequestService_Time: [
      // {
      //   uniqueID: "efb81d7f-4329-4937-a797-0f0c32421ff9",
      //   isNew: true,
      //   inEdit: true,
      //   selected: false,
      //   CI_Phase: 0,
      //   StartDateExtension: "",
      //   EndDate: "",
      //   Duration: ""
      // }loadObj
    ],
    SearchID: null,
    SrvGetMaxLengthAllRequest: null
  }
}

export default {
  components: { generalInfo, digInfo, performanceInfo, queries },
  mixins: [baseFormMixin, mapMixin],
  data () {
    return {
      title: "ثبت درخواست اتفاقات",
      formKey: "96960f1c-3e6c-489e-b135-27932fdd1c89",
      name: "URequestEvents",
      main: true,

      // #services
      loadObjRes: null,
      getPolygonRes: null,
      saveObjRes: null,
      creInsRes: null,
      deleteRes: null,
      // #variables
      isNewRequest: false,
      readOnly: false,
      activeTab: "info_tab",
      model: { eventsPlans: { ...defaultModel } },
      nidWorkflowDeff: null,
      procInfo: null,
      currentWKT: "",
      settingDigModel: {
        Settings: {
          CI_Years: 0,
          NoSelectinCI_RequesterType: null
        }
      }
    }
  },

  methods: {
    closeForm () {
      this.hideSidebar("URequestEvents")
    },
    async getRequestInfoWithNidProc (nidProc = undefined, readOnly = false) {
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
          debugger
          const res = this.loadObjRes.data.GetRequestService_InfoWithNidProcResult
          if (res.ClsRequestService_Info) {
            this.model.eventsPlans.ClsRequestService_Info = res.ClsRequestService_Info
            const lines = res?.ClsRequestService_Info?.RequestService_Line ?? []
            if (Array.isArray(lines) && lines.length > 0) {
              const WKT = lines[0].Line ?? ""

              this.showWKT({ WKT }, true, null, null, "digline")
            }
            setTimeout(() => {
              this.model.eventsPlans.ClsRequestService_Info.Request_Info.CI_RequesterType =
                this.loadObjRes.data.GetGetRequest_InfoWithNidProcResult.ClsRequestService_Info.Request_Info.CI_RequesterType
            }, 500)
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
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
            this.model.eventsPlans.ClsRequestService_Info.RequestService_Info.CI_RequesterType = ConditionSetUser[0].CI_RequesterType
            // this.model.eventsPlans.ClsRequestService_Info.RequestService_Info.CI_RedirectName = ConditionSetUser[0].CI_RedirectName
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
    async getMapInfo (e) {
      this.currentWKT = e?.WKT ?? ""
    },
    async loadObj () {
      try {
        this.showLoading()
        const { data } =
          await this.$services.excavation.getRequestServiceInfoWithNidProc({
            pRequest: {
              NidProc: this.selectedRequest.NidProc
              // NidProc: "a6d12497-7556-433e-ba12-0d15fd388352"
            }
          })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          const res = this.loadObjRes.data.GetRequestService_InfoWithNidProcResult
          if (
            res && res.ClsRequestService_Info) {
            this.model.eventsPlans = res
            this.normaliedRequestTime()
            const lines = res?.ClsRequestService_Info?.RequestService_Line ?? []
            if (Array.isArray(lines) && lines.length > 0) {
              const WKT = lines[0].Line ?? ""
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
    normaliedRequestTime () {
      let normaliedRequestTime =
        this.model.eventsPlans.ClsRequestService_Info.RequestService_Time.map(
          (e) => {
            return {
              ...e,
              StartDateExtension: e.StartDate,
              EndDateExtension: e.EndDate
            }
          }
        )
      this.model.eventsPlans.ClsRequestService_Info.RequestService_Time =
        normaliedRequestTime
    },
    normaliedRequestTimeSaving () {
      let normaliedRequestTime =
        this.model.eventsPlans.ClsRequestService_Info.RequestService_Time.map(
          (e) => {
            return {
              ...e,
              StartDate: e.StartDateExtension
              // EndDate: e.EndDateExtension
            }
          }
        )
      this.model.eventsPlans.ClsRequestService_Info.RequestService_Time =
        normaliedRequestTime
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
        this.model.eventsPlans.ClsRequestService_Info.RequestService_Info
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
      const clsReqInfo = this.model.eventsPlans.ClsRequestService_Info
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
            RequestService_Contractor: this.normalizeRequestServiceContractor(),
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
    //       debugger
    //       // this.reviewPreformance = this.getPolygonRes.data.GetPolygonResult
    //     }
    //   } catch (e) {
    //     console.error(e)
    //     this.serverError()
    //   } finally {
    //     this.hideLoading()
    //   }
    // },
    normalizeRequestServiceTime () {
      return (
        this.model.eventsPlans.ClsRequestService_Info?.RequestService_Time?.map(
          (m) => {
            return {
              ...m,
              uniqueID: m.uniqueID || "00000000-0000-0000-0000-000000000000",
              isNew: m.isNew || true,
              inEdit: m.inEdit || true,
              selected: m.selected || false,
              CI_Phase: m.CI_Phase || 0,
              StartDateExtension: m.StartDateExtension || "",
              EndDate: m.EndDate || "",
              Duration: m.Duration || ""

              // AgainRenewal: m.AgainRenewal || null,
              // CI_CauseRenewal: m.CI_CauseRenewal || 0,
              // Delay: m.Delay || 0,
              // Description: m.Description || null,
              // EndTime: m.EndTime || null,
              // NIdRequestService: m.NIdRequestService || "00000000-0000-0000-0000-000000000000",
              // NIdTime: m.NIdTime || "00000000-0000-0000-0000-000000000000",
              // RegDate: m.RegDate || null,
              // StartDate: m.StartDate || "",
              // StartTime: m.StartTime || null,
              // Total: m.Total || 0
            }
          }
        ) ?? []
      )
    },
    normalizeRequestServiceOperations () {
      return (
        this.model.eventsPlans.ClsRequestService_Info?.RequestService_Operations?.map(
          (m) => {
            return {
              ...m,
              uniqueID: m.uniqueID || "00000000-0000-0000-0000-000000000000",
              isNew: m.isNew || true,
              inEdit: m.inEdit || true,
              selected: m.selected || false,
              CI_Phase: m.CI_Phase || 0,
              CI_Section: m.CI_Section || 0,
              CI_DigType: m.CI_DigType || 0,
              CI_MaterialsType: m.CI_MaterialsType || 0,
              CI_Diggings: m.CI_Diggings || 0,
              CI_PathType: m.CI_PathType || 0,
              Width: m.Width || "",
              Length: m.Length || "",
              Depth: m.Depth || "",
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
        this.model.eventsPlans.ClsRequestService_Info?.RequestService_Inquiry?.map(
          (m) => {
            return {
              ...m,
              CI_RedirectName: m.CI_AsphaltQuality || 0,
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
        this.model.eventsPlans.ClsRequestService_Info?.RequestService_Line?.map(
          (m) => {
            return {
              ...m,
              CI_RedirectName: m.CI_AsphaltQuality || 0,
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
    normalizeRequestServiceContractor () {
      return (
        this.model.eventsPlans.ClsRequestService_Info?.RequestService_Contractor?.map(
          (m) => {
            return {
              ...m,
              CompanyCaption: m.CI_AsphaltQuality || 0,
              ManagerMobile: m.CI_CrossType || 0,
              ManagerTel: m.CI_CutType || 0,
              Description: m.Description || 0
            }
          }
        ) ?? []
      )
    },

    async saveObj () {
      if (!this.isValidForm()) return
      const reqServOp =
        this.model.eventsPlans.ClsRequestService_Info.RequestService_Operations
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
        this.activeTab = "digInfo"
        this.showError("لطفا اطلاعات عملیات حفاری را وارد نمائید.")
        return
      }
      if (
        this.model.eventsPlans.ClsRequestService_Info.RequestService_Info
          .DigPathLength === 0
      ) {
        this.showError("لطفا مسیر حفاری را مشخص نمائید")
        return
      }
      const obj =
        window.getConfigValue("esupParams")?.Dig_NidWorkflowDeff ?? null
      if (obj && obj.NidWorkFlowDef_Request_Events) {
        this.nidWorkflowDeff = obj.NidWorkFlowDef_Request_Events
      } else {
        this.showError(
          "کلید گردشکار ثبت درخواست اتفاقات تعریف نشده است . لطفا به راهبر سیستم اطلاع دهید."
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
          saveDesc: `عملیات ثبت درخواست اتفاقات با شماره ${this.procInfo.NidWorkItem} انجام گردید.`
        })

        this.showSuccess(
          `عملیات ثبت درخواست اتفاقات با شماره ${this.procInfo.NidWorkItem} انجام گردید.`
        ).onDismiss(() => {
          this.hideLoading()
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
        this.showError("متاسفانه عملیات ثبت درخواست اتفاقات متوقف شد.")
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
            GroupName: "ثبت درخواست اتفاقات",
            GroupTitel: "ثبت درخواست اتفاقات",
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
    async saveRequest () {
      return new Promise(async (resolve, reject) => {
        this.model.eventsPlans.ClsRequestService_Info.RequestService_Info = {
          ...this.model.eventsPlans.ClsRequestService_Info.RequestService_Info,
          NIdWorkItem: this.procInfo.NidWorkItem,
          CreatedRequestName: this.getUserDisplayName()
        }
        this.model.eventsPlans.ClsRequestService_Info.RequestService_Operations =
          this.normalizeRequestServiceOperations()
        this.model.eventsPlans.ClsRequestService_Info.RequestService_Info.IsSara10 = true
        // this.model. eventsPlans.ClsRequestService_Info.RequestService_Inquiry = this.normalizeRequestServiceInquiry()
        // this.model. eventsPlans.ClsRequestService_Info.RequestService_Line = this.normalizeRequestServiceLine()
        // this.model. eventsPlans.ClsRequestService_Info.RequestService_Contractor = this.normalizeRequestServiceContractor()
        try {
          const { data } =
            await this.$services.excavation.saveRequestServiceInfo(this.normalizedSaveModel())
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            // this.model.eventsPlans =
            //   this.saveObjRes.data.SaveRequestService_InfoResult
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

    updateRequestServiceTime () {
      const info = this.model.eventsPlans.ClsRequestService_Info
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
        this.model.eventsPlans.ClsRequestService_Info.RequestService_Time =
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

    newObj () {
      this.resetValidation()
      this.model = { eventsPlans: { ...defaultModel } }
      this.model.eventsPlans.ClsRequestService_Info.RequestService_Time = [
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
      this.model.eventsPlans.ClsRequestService_Info.RequestService_Time = []
      this.isEditable = false
    },
    drow () {},
    deleteRow () {}
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
