<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getLicenceExportRes" />
        <safa-status :result="saveTimeLicenceExportRes" />
        <safa-status :result="saveExportLicenseCommentsRes" />
        <safa-status :result="saveExportLicenseMayorCommentRes" />
        <safa-status :result="getIncomeFichebyNidProcRes" />
        <safa-status :result="creInsRes" />
      </template>
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu
              name="ExtensionTime"
              label="مدت زمان تمدید"
              v-if="TabInfoTime"
            />
            <tab-menu name="LicenseSpecifications" label="مشخصات مجوز" />
            <tab-menu name="Calculations" label="محاسبات" />
            <tab-menu name="LicenseDescriptuon" label="توضیحات مجوز" />
            <tab-menu name="PaymentTab" label="تایید پرداخت فیش" v-if="showPaymentTab" />
          </template>
          <tab-content name="ExtensionTime">
            <fit>
              <ExtensionTime
                v-model="model"
                :formKey="formKey"
                :title="title"
                :name="name"
              />
            </fit>
          </tab-content>
          <tab-content name="LicenseSpecifications" :padding="false">
            <fit>
              <LicenseSpecifications
                v-model="model"
                :formKey="formKey"
                :title="title"
                :name="name"
              />
            </fit>
          </tab-content>
          <tab-content name="Calculations">
            <fit>
              <Calculations
                v-model="model"
                :incomeFichebyNidProcResult="incomeFichebyNidProcResult"
                :formKey="formKey"
                :title="title"
                :name="name"
                />
            </fit>
          </tab-content>
          <tab-content name="LicenseDescriptuon">
            <fit>
              <LicenseDescriptuon
                v-model="model"
                :formKey="formKey"
                :title="title"
                :name="name"
                :m="mode"
              />
            </fit>
          </tab-content>
          <tab-content name="PaymentTab">
            <fit>
              <UPaymentDig
                v-model="model"
                :formKey="formKey"
                :title="title"
                :name="name"
                :m="mode"
                :CI_RequesterType="model.ClsLicense.CI_RequesterType"
                :NIdFiche="this.NIdFiche"
              />
            </fit>
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer v-if="!readOnly">
        <div class="row q-gutter-sm">
          <btn-default label="نمایش نقشه" @click="mapHandler" />
          <btn-edit
            v-if="activeTab === 'ExtensionTime' && !isEditable"
            label="ویرایش"
            @click="editClick"
          />
          <btn-save
            v-if="activeTab === 'ExtensionTime' && isEditable"
            label="ذخیره"
            @click="saveObj"
          />
          <btn-cancel
            v-if="activeTab === 'ExtensionTime' && isEditable"
            label="انصراف"
            @click="cancelClick"
          />
          <btn-default
            v-if="activeTab === 'LicenseDescriptuon'"
            label="ذخیره توضیحات"
            @click="saveDesClick"
          />
          <btn-default
            v-if="activeTab === 'LicenseDescriptuon'"
            :label="BtnMayor"
            @click="saveMayorDesClick"
          />

          <btn-default
            label="چاپ مجوز"
            @click="printFicheClick"
            spCaption="چاپ مجوز"
            spId="101f3759-4318-444b-816f-4d3cc2a23a5e"
          />
          <btn-default
            label="پیش نویس مجوز"
            @click="printDraftClick"
          />
          <!-- spCaption="تأیید مجوز"
            spId="256f3759-4318-444b-816f-4d3cc2a23a8d" -->
          <btn-default
            label="تأیید مجوز"
            @click="confirmClick"
            ref="btnConfirm"
          />
          <!-- spCaption="عدم تأیید"
            spId="887f3759-4318-444b-816f-4d3cc2a23d9a" -->
          <btn-default
            label="عدم تأیید"
            @click="cancelFicheClick"
            ref="btncancel"
          />
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import mapMixin from "src/mixins/mapMixin"
import { currentDate } from "src/utils/index"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
import PersianDate from "persian-date"
import LicenseSpecifications from "./partials/LicenseSpecifications.vue"
import Calculations from "./partials/Calculations.vue"
import LicenseDescriptuon from "./partials/LicenseDescriptuon.vue"
import UPaymentDig from "src/forms/dig-menu/others/payment-dig/UPaymentDig.vue"

export default {
  mixins: [baseFormMixin, mapMixin],
  components: {
    LicenseSpecifications,
    Calculations,
    LicenseDescriptuon,
    UPaymentDig
  },
  props: {
    // value: Object,
    RequestType: String,
    EumLicenseStatus: Number,
    formKey: {
      type: String,
      default: "C3882D17-D5AA-4200-A95D-FFF7EB13C97D"
    },
    name: {
      type: String,
      default: "UExportLicense"
    },
    title: {
      type: String,
      default: "فرم صدور مجوز"
    }
  },
  data () {
    return {
      main: true,
      // #variabels
      activeTab: "LicenseSpecifications",
      readOnly: false,
      model: {
        ClsLicense: {
          ClsDelivery: {
            Lines: ''
          },
          License_Person: [],
          RequestService_Line: [],
          License_Time: [],
          License_Operation: [],
          ExportLicenseInfo: { License_AsphaltCoating: [] },
          ClsIncomeFiche: { Income_Fiche: [] },
          CI_RequesterType: 0
        },
        ClsExportLicense: {
          Request_Info: {},
          ExportLicenseComments: "",
          ExportLicenseMayorComment: "",
          ExportLicenseDate: "",
          ExportLicenseNo: null
        }
      },
      settingDigModel: {
        Settings: {
          NoFicheInCalc: false,
          CancelFicheManual: false,
          CancelFichesInZeroCalc: false,
          CheckApprovalDates: false
        }
      },
      incomeFichebyNidProcResult: {
        IncomeFicheList: [],
        IncomeFiches: []
      },
      requestMessage: {},
      polygonResult: {},
      TabInfoTime: false,
      Nidrequest: "00000000-0000-0000-0000-000000000000",
      BtnMayor: " ذخیره توضیحات عدم تایید",
      NIdFiche: "00000000-0000-0000-0000-000000000000",
      showPaymentTab: false, // این تب در زمل قابل نمایش نبود و درهیچ بخش از زمل مقدارش تغییر نکرده

      // #services
      getLicenceExportRes: null,
      saveTimeLicenceExportRes: null,
      saveExportLicenseCommentsRes: null,
      saveExportLicenseMayorCommentRes: null,
      checkBlackListInExportLicenceRes: null,
      getIncomeFichebyNidProcRes: null,
      getApprovalTaskRes: null,
      setApprovalTaskRes: null,
      setApprovalRes: null,
      getPolygonRes: null,
      procInfo: null,
      creInsRes: null
    }
  },

  // created () {
  // if (this.isSelectedRequest()) {
  // this.loadFormSetting()
  // this.loadObj()
  // } else this.hideSidebar(this.name)
  // },
  async mounted () {
    if (this.selectedRequest) {
      await this.loadObj()
      // await this.polygon()
    } else this.hideSidebar(this.name)
  },

  methods: {
    // async addWorkItem () {
    //   return new Promise(async (resolve, reject) => {
    //     try {
    //       this.procInfo = null
    //       // const WKT = await this.getWKT()
    //       const ProcRequester =

    //       const payload = {
    //         BizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
    //         EumOwnerType: 0,
    //         NidWorkflowDeff: ,
    //         ProcInitiator: this.getNidUser(),
    //         ProcRequester,
    //         ProcInitiatorName: this.getUserDisplayName(),
    //         ProcArea: "سرا10",
    //         GroupName:  ,
    //         GroupTitel:  ,
    //         Domain: ,
    //         IsSara10Request: true
    //         // WKT
    //       }
    //       console.log("createInstance payload :>> ", payload)
    //       const res = await this.$srvWorkflow.createInstance(payload)
    //       this.creInsRes = this.getResponse(res.data)
    //       if (this.creInsRes.success) {
    //         const res = this.creInsRes.data
    //         if (res.status === 200 && res.success) {
    //           this.procInfo = res.data.ProcInfo
    //           return resolve()
    //         } else {
    //           return reject(this.creInsRes.errors[0].text)
    //         }
    //       }
    //     } catch (e) {
    //       console.error(e)
    //       return reject(e)
    //     }
    //   })
    // },
    setBtnColorByState (state) {
      if (state) {
        this.$refs.btnConfirm.$el.style.backgroundColor = "green"
        this.$refs.btnConfirm.$el.style.color = "white"
        this.$refs.btncancel.$el.style.backgroundColor = "unset"
        this.$refs.btncancel.$el.style.color = "unset"
      }
      else {
        this.$refs.btncancel.$el.style.backgroundColor = "red"
        this.$refs.btncancel.$el.style.color = "white"
        this.$refs.btnConfirm.$el.style.backgroundColor = "unset"
        this.$refs.btnConfirm.$el.style.color = "unset"
      }
    },
    async loadObj () {
      const IsMashhad =
        window.getConfigValue("esupParams")?.ClsDigParams?.IsMashhad ?? false
      if (IsMashhad) {
        this.BtnMayor = "ذخیره توضیحات عدم تأیید"
      }
      if (this.EumLicenseStatus === 2) {
        // this.TabInfoTime = true این مقدار تا زمان مشخص شدن بایندینگ تب "مدت زمان تمدید "موقتا کامنت میشود
      }
      // OnClosed();
      //           Common.ClsCommon.InitMadule();
      let payload = {
        pRequest: {
          NidProc: this.selectedRequest.NidProc,
          IssuancecostsRequestType: parseInt(this.RequestType) ?? 0,
          EumLicenseStatus: Number(this.EumLicenseStatus)// خیلی مهم هر فرمی که از این فرم داره استفاده میکنه از بیرون این عدد رو پاس باید بده
          // EumLicenseStatus: Number(this.EumLicenseStatus) // خیلی مهم هر فرمی که از این فرم داره استفاده میکنه از بیرون این عدد رو پاس باید بده
          // NidProc: "c540fd82-6b90-4f54-8937-c2de21d9c18c", //کد حاوی دیتا
          // IssuancecostsRequestType: 0,
          // EumLicenseStatus: 1
        }
      }
      this.showLoading()
      await this.$services.excavation
        .getLicenceExport(payload)
        .then(async ({ data }) => {
          this.getLicenceExportRes = this.getResponse(data)
          if (this.getLicenceExportRes.success) {
            let IsApproval = false
            let IsDisapprove = false
            let EumRequestStatus = 0
            let ExportLicenseNo = ""
            this.model.ClsLicense =
            this.getLicenceExportRes.data.GetLicenceExportResult.ClsLicense
            this.model.ClsExportLicense =
            this.getLicenceExportRes.data.GetLicenceExportResult.ClsExportLicense
            if (
              this.getLicenceExportRes.data.GetLicenceExportResult
                .ClsExportLicense.Request_Info
            ) {
              this.Nidrequest =
                this.getLicenceExportRes.data.GetLicenceExportResult.ClsExportLicense.Request_Info.NIdRequest
              EumRequestStatus =
                this.getLicenceExportRes.data.GetLicenceExportResult
                  .ClsExportLicense.Request_Info.EumRequestStatus ?? 0
              IsApproval =
                this.getLicenceExportRes.data.GetLicenceExportResult
                  .ClsExportLicense.Request_Info.IsApproval
              IsDisapprove =
                this.getLicenceExportRes.data.GetLicenceExportResult
                  .ClsExportLicense.Request_Info.IsDisapprove ?? false
            } else if (
              this.getLicenceExportRes.data.GetLicenceExportResult
                .ClsExportLicense.RequestService_Info
            ) {
              IsApproval =
              this.getLicenceExportRes.data.GetLicenceExportResult
                .ClsExportLicense.RequestService_Info.IsApproval
              IsDisapprove =
              this.getLicenceExportRes.data.GetLicenceExportResult
                .ClsExportLicense.RequestService_Info.IsDisapprove ?? false
              this.Nidrequest =
              this.getLicenceExportRes.data.GetLicenceExportResult.ClsExportLicense.RequestService_Info.NIdRequestService
              EumRequestStatus =
              this.getLicenceExportRes.data.GetLicenceExportResult
                .ClsExportLicense.RequestService_Info.EumRequestStatus ?? 0
            }

            // Button Color
            if (
              this.getLicenceExportRes.data.GetLicenceExportResult
                .ClsExportLicense.ExportLicenseNo
            ) {
              ExportLicenseNo =
                this.getLicenceExportRes.data.GetLicenceExportResult
                  .ClsExportLicense.ExportLicenseNo
              let Condition = false
              this.model.ClsExportLicense.Request_Time =
                this.getLicenceExportRes.data.GetLicenceExportResult.ClsExportLicense.Request_Time
              this.model.ClsExportLicense.RequestService_Time =
                this.getLicenceExportRes.data.GetLicenceExportResult.ClsExportLicense.RequestService_Time
              if (IsApproval) {
                this.$refs.btnConfirm.$el.style.backgroundColor = "green"
                this.$refs.btnConfirm.$el.style.color = "white"
                if (EumRequestStatus === 2) {
                  if (
                    ExportLicenseNo.substring(
                      ExportLicenseNo.length - 4
                    ).includes("-1")
                  ) {
                    Condition = true
                  }
                } else if (EumRequestStatus === 4) {
                  if (
                    ExportLicenseNo.substring(
                      ExportLicenseNo.length - 4
                    ).includes("-1-1")
                  ) {
                    Condition = true
                  }
                } else if (EumRequestStatus === 6) {
                  if (
                    ExportLicenseNo.substring(
                      ExportLicenseNo.length - 4
                    ).includes("-1-2")
                  ) {
                    Condition = true
                  }
                }
              }
              console.log("Condition:", Condition)
              // if (Condition)  // معادل این خط کد باید در سرویس گردش کار جدید پیاده سازی شود
              // {
              //     BtnConfirm.Background = new SolidColorBrush(Color.FromArgb(255, 121, 212, 121));
              //     var TmpExtendedProp = Instance.TaskInfo.ExtendedProp.PropList.FirstOrDefault(f => f.PropName == "IsAcceptApproval");
              //     if (ReferenceEquals(TmpExtendedProp, null))
              //     {
              //         //MessageBox.Show("ApprovalCompleted12");
              //         Instance.TaskInfo.ExtendedProp.PropList.Add(new ApplicationCommon.
              //             TaskService.ClsPropInfo()
              //         {
              //             PropName = "IsAcceptApproval",
              //             PropValue = true.ToString(),
              //             PropType = "Hidden",
              //             PropTitle = "چک کردن ارسال به مرحله بعد"
              //         });
              //     }
              //     else
              //     {
              //         TmpExtendedProp.PropValue = true.ToString();
              //     }
              //     Instance.SaveTaskInfo();
              // }
              // else
              // {
              //     Instance.TaskInfo.ExtendedProp.PropList.RemoveAll(f => f.PropName == "IsAcceptApproval");
              //     Instance.SaveTaskInfo();
              // }
            } else {
              this.$refs.btncancel.$el.style.backgroundColor = "red"
              this.$refs.btncancel.$el.style.color = "white"
              if (
                IsApproval === false &&
                !this.getLicenceExportRes.data.GetLicenceExportResult
                  .ClsExportLicense.ExportLicenseDate &&
                IsDisapprove
              ) {
                // این بخش هم نیاز معادل سازی برای گردش کار قدیم به جدید هست
                // BtnCancelFiche.Background = new SolidColorBrush(Color.FromArgb(255, 247, 132, 132))
                // Instance.TaskInfo.ExtendedProp.PropList.RemoveAll(f => f.PropName == "IsAcceptApproval")
                // Instance.SaveTaskInfo()
              }
            }
            if (
              this.model?.ClsLicense?.ExportLicenseInfo?.License_AsphaltCoating
                .length > 0
            ) {
              if (this.model?.ClsExportLicense?.Request_Time !== null) {
                if (this.model.ClsExportLicense.Request_Time.length === 0) {
                  let TmpEndDate =
                    this.model.ClsExportLicense?.Request_TimeMojavez[0].EndDate
                  TmpEndDate = this.addDayToDate(TmpEndDate, 1)
                  let Tmpphase =
                    this.model.ClsExportLicense.Request_TimeMojavez[0].CI_Phase
                  this.model.ClsExportLicense.Request_Time.push({
                    StartDate: TmpEndDate,
                    CI_Phase: Tmpphase
                  })
                } else {
                  let MaxEndDate = this.model.ClsExportLicense.Request_Time.map(
                    (i) =>
                      new PersianDate([
                        parseInt(i.EndDate.split("/")[0]),
                        i.EndDate.split("/")[1],
                        i.EndDate.split("/")[2]
                      ])
                  ).reduce(
                    (max, date) =>
                      date.valueOf() > max.valueOf() ? date : max,
                    this.model.ClsExportLicense.Request_Time[0]
                  )
                  if (
                    !this.model.ClsExportLicense.Request_Time.some(
                      (i) => i.EndDate === "" || i.EndDate === null
                    )
                  ) {
                    this.model.ClsExportLicense.Request_Time[0].map(
                      (i) => i.EndDate === MaxEndDate
                    ).StatusMaxDate = true
                  }
                }

                this.model.ClsExportLicense.Request_Time =
                  this.model.ClsExportLicense.Request_Time.sort(
                    (a, b) => new Date(b.StartDate) - new Date(a.StartDate)
                  )
              } else {
                if (this.model.ClsExportLicense.RequestService_Time != null) {
                  if (
                    this.model.ClsExportLicense.RequestService_Time.length ===
                    0()
                  ) {
                    let TmpEndDate =
                      this.model.ClsExportLicense.RequestServiceMojavez_Time[0]
                        .EndDate
                    TmpEndDate = this.addDayToDate(TmpEndDate, 1)
                    let Tmpphase =
                      this.model.ClsExportLicense.RequestServiceMojavez_Time[0]
                        .CI_Phase
                    this.model.ClsExportLicense.RequestService_Time.push({
                      StartDate: TmpEndDate,
                      CI_Phase: Tmpphase
                    })
                  } else {
                    let MaxEndDate =
                      this.model.ClsExportLicense.RequestService_Time.map(
                        (i) =>
                          new PersianDate([
                            parseInt(i.EndDate.split("/")[0]),
                            i.EndDate.split("/")[1],
                            i.EndDate.split("/")[2]
                          ])
                      ).reduce(
                        (max, date) =>
                          date.valueOf() > max.valueOf() ? date : max,
                        this.model.ClsExportLicense.RequestService_Time[0]
                      )
                    if (
                      !this.model.ClsExportLicense.RequestService_Time.some(
                        (i) => i.EndDate === "" || i.EndDate === null
                      )
                    ) {
                      this.model.ClsExportLicense.RequestService_Time[0].map(
                        (i) => i.EndDate === MaxEndDate
                      ).StatusMaxDate = true
                    }
                  }
                  this.model.ClsExportLicense.RequestService_Time =
                    this.model.ClsExportLicense.RequestService_Time.sort(
                      (a, b) => new Date(b.StartDate) - new Date(a.StartDate)
                    )
                }
              }
            }
            this.showPathOnMAp()
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} نمایش داده شد.`
            })
            if (this.selectedRequest && this.isNewRequest === false) {
              await this.getLicenceExport()
            }
            this.getIncomeFichebyNidProc()
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
    async getLicenceExport (nidProc = undefined, readOnly = false, issuancecostsRequestType) {
      try {
        this.showLoading()
        if (readOnly) {
          this.readOnly = true
        }
        const IsMashhad =
        window.getConfigValue("esupParams")?.ClsDigParams?.IsMashhad ?? false
        if (IsMashhad) {
          this.BtnMayor = "ذخیره توضیحات عدم تأیید"
        }
        if (this.EumLicenseStatus === 2) {
        // this.TabInfoTime = true این مقدار تا زمان مشخص شدن بایندینگ تب "مدت زمان تمدید "موقتا کامنت میشود
        }
        const { data } =
          await this.$services.excavation.getLicenceExport({
            pRequest: {
              NidProc: nidProc || this.selectedRequest.NidProc,
              IssuancecostsRequestType: Number(issuancecostsRequestType),
              EumLicenseStatus: 1
            }
          })

        this.getLicenceExportRes = this.getResponse(data)
        if (this.getLicenceExportRes.success) {
          const res = this.getLicenceExportRes.data.GetLicenceExportResult
          this.model.ClsLicense =
            this.getLicenceExportRes.data.GetLicenceExportResult.ClsLicense
          this.model.ClsExportLicense =
            this.getLicenceExportRes.data.GetLicenceExportResult.ClsExportLicense
          if (res.ClsLicense) {
            this.model.ClsLicense = res.ClsLicense
            const lines = res?.ClsLicense?.RequestService_Line ?? []
            if (Array.isArray(lines) && lines.length > 0) {
              const WKT = lines[0].Line ?? ""

              this.showWKT({ WKT }, true, null, null, "digline")
            }
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    // async getLicenceExport (nidProc = undefined, readOnly = false) {
    //   try {
    //     this.showLoading()

    //     if (readOnly) {
    //       this.readOnly = true
    //     }

    //     const { data } =
    //       await this.$services.excavation.getLicenceExport({
    //         pRequest: {
    //           NidProc: nidProc || this.selectedRequest.NidProc
    //         }
    //       })
    //     this.getLicenceExportRes = this.getResponse(data)
    //     if (this.getLicenceExportRes.success) {
    //       const res = this.getLicenceExportRes.data.GetLicenceExportResult
    //       if (res.ClsLicense) {
    //         this.model.ClsLicense = res.ClsLicense
    //         const lines = res?.ClsLicense?.RequestService_Line ?? []
    //         if (Array.isArray(lines) && lines.length > 0) {
    //           const WKT = lines[0].Line ?? ""

    //           this.showWKT({ WKT }, true, null, null, "digline")
    //         }
    //       }
    //       // this.$refs.executiveRef.loadObj()
    //       // this.$refs.generalInformation.getRedirectNameList()
    //     }
    //   } catch (e) {
    //     console.error(e)
    //     this.serverError()
    //   } finally {
    //     this.hideLoading()
    //   }
    // },

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
        this.settingDigModel = require("src/utils/mergeSettings").default(
          this.settingDigModel,
          settings
        )
      } catch (e) {
        console.error(e)
      }
    },
    addDayToDate (getDate, addDays) {
      const tmp = getDate.split("/")
      let y = parseInt(tmp[0])
      let m = parseInt(tmp[1])
      let d = parseInt(tmp[2])
      let date = new PersianDate([y, m, d])
      return date.add("days", addDays).toLocale("en").format("L")
    },
    async saveDesClick () {
      try {
        this.showLoading()
        const payload = {
          pRequest: {
            NidProc: this.selectedRequest.NidProc,
            Date: currentDate(),
            Comments: this.model.ClsExportLicense.ExportLicenseComments,
            EumLicenseStatus: this.EumLicenseStatus
          } }
        const { data } = await this.$services.excavation
          .saveExportLicenseComments(payload)
        this.saveExportLicenseCommentsRes = this.getResponse(data)
        if (this.saveExportLicenseCommentsRes.success) {
          this.isEditable = false
          this.showSuccess("توضیحات با موفقیت ذخیره شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: "",
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  توضیحات فرم ${this.title} ذخیره شد.`
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async saveMayorDesClick () {
      try {
        this.showLoading()
        const payload = { pRequest: {
          NidProc: this.selectedRequest.NidProc,
          Date: currentDate(),
          Comments: this.model.ClsExportLicense.ExportLicenseMayorComment,
          EumLicenseStatus: this.EumLicenseStatus
        } }

        const { data } = await this.$services.excavation
          .saveExportLicenseMayorComment(payload)
        this.saveExportLicenseMayorCommentRes = this.getResponse(data)
        if (this.saveExportLicenseMayorCommentRes.success) {
          this.isEditable = false
          this.showSuccess("توضیحات با موفقیت ذخیره شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: "",
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  توضیحات شهردار فرم ${this.title} ذخیره شد.`
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    printFicheClick () {
      if (this.EumLicenseStatus === 2) {
        this.printTamdidFiche()
      } else {
        this.printFiche()
      }
    },
    printDraftClick () {
      if (this.EumLicenseStatus === 2) {
        this.printTamdidFicheDraft()
      } else {
        this.printFicheDraft()
      }
    },
    printTamdidFicheDraft (croquis = "") {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptRenewalLicenceDraft`
      const queryParams = {
        NIdProc: this.selectedRequest.NidProc,
        RequestType: this.RequestType,
        SysCI_LicenseStatus: this.EumLicenseStatus.toString(),
        Koroki: croquis,
        NidUser: this.getNidUser()
      }
      this.showReport(reportPath, queryParams)
      this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.NidWorkItem,
        bizCodeTitle: "NIdWorkItem"
      })
    },
    printFicheDraft (croquis = "") {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptLicenceDraft`
      const queryParams = {
        NIdProc: this.selectedRequest.NidProc,
        RequestType: this.RequestType,
        SysCI_LicenseStatus: this.EumLicenseStatus.toString(),
        Koroki: croquis,
        NidUser: this.getNidUser()
      }
      this.showReport(reportPath, queryParams)
      this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.NidWorkItem,
        bizCodeTitle: "NIdWorkItem"
      })
    },
    printTamdidFiche (croquis = "") {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptRenewalLicence`
      const queryParams = {
        NIdProc: this.selectedRequest.NidProc,
        RequestType: this.RequestType,
        SysCI_LicenseStatus: this.EumLicenseStatus.toString(),
        Koroki: croquis
      }
      this.showReport(reportPath, queryParams)
      this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.NidWorkItem,
        bizCodeTitle: "NIdWorkItem"
      })
    },
    printFiche (croquis = "") {
      this.addPrintToArchive()
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptLicence`
      const queryParams = {
        NIdProc: this.selectedRequest.NidProc,
        RequestType: this.RequestType,
        SysCI_LicenseStatus: this.EumLicenseStatus.toString(),
        Koroki: croquis,
        NIdRequest: this.Nidrequest
      }
      this.showReport(reportPath, queryParams)
      this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.NidWorkItem,
        bizCodeTitle: "NIdWorkItem"
      })
    },
    async addPrintToArchive (croquis = "") {
      debugger
      // let TmpParameters = new Map()
      // TmpParameters.set("NIdProc", this.selectedRequest.NidProc)
      // TmpParameters.set("RequestType", this.RequestType)
      // TmpParameters.set("SysCI_LicenseStatus", this.EumLicenseStatus.toString())
      // TmpParameters.set("Koroki", croquis)
      // TmpParameters.set("NIdRequest", this.Nidrequest)
      // TmpParameters.set("NidUser", this.getNidUser())
      // TmpParameters.set("RequestType", this.RequestType)
      let TmpParameters = [{ Key: "NIdProc", Value: this.selectedRequest.NidProc },
        { Key: "RequestType", Value: this.RequestType },
        { Key: "SysCI_LicenseStatus", Value: this.EumLicenseStatus.toString() },
        { Key: "Koroki", Value: croquis },
        { Key: "NIdRequest", Value: this.Nidrequest },
        { Key: "NidUser", Value: this.getNidUser() }
      ]
      let DomainNameBizCode = [{ Key: "Dig", Value: this.selectedRequest.NidProc }]
      const payLoad = {
        pRequest: {
          NidUser: this.getNidUser(),
          ClsArchive: {
            DomainName: "Dig",
            BizCode: this.selectedRequest.NidProc,
            FileName: "RptLicence_" + this.selectedRequest.NidProc,
            ReportName: "/Dig/DigRpt/RptLicence",
            Parameters: TmpParameters,
            DomainName_BizCode: DomainNameBizCode
          } }
      }
      debugger
      this.loading = true
      try {
        let res = await this.$services.report.exportToArchive(payLoad)
        res = this.getResponse(res)
        if (res.success) {
          await this.log({
            action: this.logActions.save,
            bizCode: '',
            bizCodeTitle: '',
            saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
          })
        }
      } finally {
        this.loading = false
      }
    },
    async showPathOnMAp () {
      try {
        const { data } = await this.$services.excavation.getPolygon({
          pRequest: {
            NidProc: this.selectedRequest.NidProc // "b4701822-ab24-4d6c-90e5-a8e7dd7ad5ea" این دارای دیتا هست
          }
        })
        this.getPolygonRes = this.getResponse(data)
        if (this.getPolygonRes.success) {
          this.polygonResult = this.getPolygonRes.data.GetPolygonResult
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    mapHandler () {
      const wktList = this.model?.ClsLicense?.ClsDelivery?.Lines ?? []
      if (Array.isArray(wktList) && wktList.length > 0) {
        const WKT = wktList[0] ?? ""
        this.setLayout("half")
        setTimeout(() => {
          this.showWKT({ WKT }, true, null, null, "digline")
        }, 500)
      }
    },
    clearMap () {
      this.$KaisMap.StrEDITWKT = ""
      this.$KaisMap.Clear()
      this.mapZoom(5)
    },
    async getApprovalTask (taskInfo) {
      let ppApprovalTask = []
      try {
        this.showLoading()
        const { data } = await this.$services.excavation.getApprovalTask(
          taskInfo.NidTask
        )
        this.getApprovalTaskRes = this.getResponse(data)
        if (this.getApprovalTaskRes.success) {
          let tmpAproval = this.getApprovalTaskRes.data.GetApprovalTaskResult
          if (tmpAproval) {
            ppApprovalTask = tmpAproval.sort((i) => i.NidApproval)[0]
          }
          ppApprovalTask.Result = "Reject"
          this.setApprovalTaskResult(ppApprovalTask)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async setApprovalTaskResult (ppApprovalTask) {
      // این سرویس در زمل نتیجه اش کامنت شده بود
      try {
        this.showLoading()
        const { data } = await this.$services.excavation.setApprovalTaskResult(
          ppApprovalTask
        )
        this.setApprovalTaskRes = this.getResponse(data)
        if (this.setApprovalTaskRes.success) {
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async setApproval (IsApproval, taskInfo) {
      let pRequest = {
        IsApproval: IsApproval,
        NidProc: this.selectedRequest.NidProc,
        Date: currentDate(),
        Comments: this.model.ClsExportLicense.ExportLicenseComments,
        UserName: this.getUserDisplayName() || "",
        CheckApprovalDate: this.settingDigModel.Settings.CheckApprovalDates,
        EumLicenseStatus: this.EumLicenseStatus,
        TaskTitel: taskInfo?.TaskTitel,
        FormName: IsApproval
          ? "UExportLicense-BtnConfirm"
          : "UExportLicense-BtnCancelFiche",
        NidUser: this.getNidUser(),
        UserGroups: this.currentUser.UserGroups
      }
      try {
        this.showLoading()
        const { data } = await this.$services.excavation.setApproval({
          pRequest
        })
        this.setApprovalRes = this.getResponse(data)
        if (this.setApprovalRes.success) {
          this.isEditable = false
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: "",
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات  فرم ${this.title} ذخیره شد.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async approvalCompleted (result) {
      debugger
      const taskInfo = (this.taskInfo || this.selectedRequest?.Task[0]) ?? null
      let isApproval = result === "approve"
      let pRequest = {
        NidProc: this.selectedRequest.NidProc,
        TaskTitel: taskInfo?.TaskTitel,
        FormName: isApproval
          ? "UExportLicense-BtnConfirm"
          : "UExportLicense-BtnCancelFiche",
        UserGroups: this.currentUser.UserGroups
      }

      try {
        this.showLoading()
        const { data } =
          await this.$services.excavation.checkBlackListInExportLicence({
            pRequest
          })
        this.checkBlackListInExportLicenceRes = this.getResponse(data)
        const err =
                this.checkBlackListInExportLicenceRes.data.CheckBlackListInExportLicenceResult.ErrorResult
        if (err.BizErrors.length > 0) {
          return this.showError(err.BizErrors[0].ErrorTitel)
        }
        if (this.checkBlackListInExportLicenceRes.success) {
          // eslint-disable-next-line eqeqeq

          if (isApproval) {
            this.setBtnColorByState(true)
            this.model.ClsExportLicense.ExportLicenseDate = currentDate()
            // this.model.ClsExportLicense.ExportLicenseNo = this.checkBlackListInExportLicenceRes.data.CheckBlackListInExportLicenceResualt.ExportLicenseNo
            // let tmpAsphaltCoating = this.model.ClsLicense.ExportLicenseInfo.License_AsphaltCoating.reduce((sum, item) => sum + parseFloat(item.TotalDamage))
            // let tmpIsAccept = tmpAsphaltCoating > 0 && isApproval && (this.model.ClsExportLicense.IsIncome_Payment || this.tmpAsphaltCoating === 0) && isApproval
            // let tmpExtendedProp = this.taskInfo?.ExtendedProp?.PropList?.find((f) => f.PropName === "IsAcceptApproval")
            // if (tmpExtendedProp === null) {
            //   this.taskInfo.ExtendedProp.PropList.push(
            //     {
            //       PropName: "IsAcceptApproval",
            //       PropValue: tmpIsAccept,
            //       PropType: "Hidden",
            //       PropTitle: "چک کردن ارسال به مرحله بعد"
            //     })
            // } else {
            // // tmpExtendedProp.PropValue = tmpIsAccept
            // }
          } else {
            this.setBtnColorByState(false)

            // taskInfo.ExtendedProp.PropList = this.taskInfo.ExtendedProp.PropList.filter(f => f.PropName !== "IsAcceptApproval")

            // this.getApprovalTask(taskInfo)
          }
          this.setApproval(isApproval, taskInfo)
          this.isEditable = false
          // this.log({
          //   action: this.logActions.save,
          //   bizCode: this.selectedRequest.NidProc,
          //   bizCodeTitle: "NidProc",
          //   nosaziCode: "",
          //   nidWorkItem: this.selectedRequest.NidWorkItem,
          //   saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات  فرم ${this.title} ذخیره شد.`
          // })
        }
      } catch (e) {
        this.showError(e)
        debugger
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    editClick () {
      this.isEditable = true
    },
    cancelClick () {
      this.isEditable = false
    },
    async saveObj () {
      this.showLoading()
      let pRequest = this.model.ClsExportLicense
      await this.$services.excavation
        .saveTimeLicenceExport({ pRequest })
        .then(async ({ data }) => {
          this.saveTimeLicenceExportRes = this.getResponse(data)
          if (this.saveTimeLicenceExportRes.success) {
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: "",
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات  فرم ${this.title} ذخیره شد.`
            })
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
    cancelFicheClick () {
      if (
        this.model.ClsExportLicense.ExportLicenseMayorComment === "" ||
        this.model.ClsExportLicense.ExportLicenseMayorComment === null
        //  &&Common.ClsDigParams.IsMashhad
      ) {
        this.showError("توضیحات عدم تأیید وارد نشده است")
      } else {
        this.CancelFiche()
      }
    },
    CancelFiche () {
      this.approvalCompleted("")
    },
    confirmClick () {
      this.approvalCompleted("approve")
    },
    async getIncomeFichebyNidProc (nidProc) {
      try {
        const payload = {
          pRequest: {
            NidProc: nidProc || this.selectedRequest.NidProc, //  اینجا یا باید از آرگومان بخونه یا باید از درخواست انتخاب شده این متد از دو جا صدا میشه
            EumLicenseStatus: this.eumLicenseStatus,
            IssuancecostsRequestType: this.requestType
          }
        }
        this.showLoading()
        const { data } =
          await this.$services.excavation.getIncomeFichebyNidProc(payload)
        this.getIncomeFichebyNidProcRes = this.getResponse(data)
        if (this.getIncomeFichebyNidProcRes.success) {
          const res =
            this.getIncomeFichebyNidProcRes.data.GetIncomeFichebyNidProcResult
          const incomeFiches = this.normalizedIncomeFiche(
            res?.IncomeFiches ?? []
          )
          this.incomeFichebyNidProcResult = {
            ...res,
            IncomeFicheList:
              res?.IncomeFicheList.sort((a, b) =>
                a.FicheNo > b.FicheNo ? -1 : 1
              ) ?? [],
            IncomeFiches:
              incomeFiches.sort((a, b) => (a.FicheNo > b.FicheNo ? -1 : 1)) ??
              []

          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    normalizedIncomeFiche (arr) {
      return arr.map((m) => {
        return {
          ...m,
          NIdProc: m.NIdProc,
          Comments: m.Comments ?? "",
          IsConfirm: m.IsConfirm ?? false,
          SysCI_LicenseStatus: m.SysCI_LicenseStatus ?? 0,
          PaymentID: m.PaymentID ?? "",
          FicheNo: m.FicheNo ?? 0,
          IsCancel: m.IsCancel ?? false,
          CI_ConfrimFicheType: m.CI_ConfrimFicheType ?? 0,
          ConfirmDate: m.ConfirmDate ?? "",
          PaymentRahgiriCodeHesbRayan: m.PaymentRahgiriCodeHesbRayan ?? "",
          RequestStatus: m.RequestStatus ?? "",
          CancelDate: m.CancelDate ?? "",
          BankPaymentDate: m.BankPaymentDate ?? "",
          PaymentRahgiriCode: m.PaymentRahgiriCode ?? "",
          Discount: m.Discount ?? 0,
          Deptor: m.Deptor ?? 0,
          SysCI_PaymentType: m.SysCI_PaymentType ?? 0,
          FicheDate: m.FicheDate ?? "",
          UserNameConfirmer: m.UserNameConfirmer ?? "",
          MessgeHesbRayan: m.MessgeHesbRayan ?? "",
          PaymentBreakDate: m.PaymentBreakDate ?? "",
          NIdFiche: m.NIdFiche,
          UserName: m.UserName ?? "",
          UserNameShahrdari: m.UserNameShahrdari ?? "",
          BillID: m.BillID ?? "",
          DateCalculated: m.DateCalculated ?? "",
          Creditor: m.Creditor ?? 0,
          PaymentReferenceNo: m.PaymentReferenceNo ?? "",
          Price: m.Price ?? 0,
          TimeCalculated: m.TimeCalculated ?? "",
          PaymentDate: m.BankPaymentDate ?? "",
          UserCalculated: m.UserCalculated ?? "",
          InstallmentPrice: m.InstallmentPrice ?? 0
        }
      })
    }
    // selectedIncomeFicheHandler (params) {
    //   // this.selectedIncomeFiche = params
    // }
  },
  beforeDestroy () {
    this.$KaisMap.Clear()
    this.$KaisMap.ClearAllThings()
    this.$KaisMap.ClearMeasure()
    this.clearMap()
    this.setLayout("full")
  }
}
</script>
