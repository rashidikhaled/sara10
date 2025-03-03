<template>
  <safa-form
    appId="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    caption="شهرسازی- ثبت درخواست اداره کل توسعه شهری"
    :id="formKey"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getCrossRequestRes" />
        <safa-status :result="getBaseLibInNosaziCodeRes" />
        <safa-status :result="deleteRes" />
        <safa-status :result="saveCrossRequestRes" />
      </template>
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="tabRequest" label="درخواست جدید" />
            <tab-menu
              name="tabAttachment"
              label="پیوست"
              :disabled="lockTabs && isEditable"
              @click="checkLockTabs"
            />
            <tab-menu
              name="tabArchive"
              label="آرشیو"
              :disabled="lockTabs && isEditable"
              @click="checkLockTabs"
            />
          </template>
          <tab-content name="tabRequest">
            <tab-request
              v-model="model.crReq.Sh_CrossRequest"
              :m="mode"
              :lockFields="!lockTabs"
              :WKTLoaded="true"
              @onEnterNosaziCode="uNosaziCode_OnEnterCode"
              @getSelectedRequestType="getSelectedRequestType"
              @getDrawingData="getDrawingData"
              @cancelGetDrawingData="cancelGetDrawingData"
            />
          </tab-content>
          <tab-content name="tabAttachment">
            <tab-attachment
              v-model="model.crReq"
              :archiveBizCode="archiveBizCode"
              :name="name"
              :title="title"
              :formKey="formKey"
              :m="mode"
            />
          </tab-content>
          <tab-content name="tabArchive">
            <tab-archive
              v-model="model.crReq"
              :archiveBizCode="archiveBizCode"
              :showArchive="archiveBizCode !== null"
              :m="mode"
              ref="tabArchive"
            />
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer v-if="activeTab === 'tabRequest'">
        <FormActions
          :m="mode"
          :showNewButton="lockTabs"
          :showEditButton="false"
          @cancel="isEditable = false"
          @edit="isEditable = true"
          @newInfo="newObj"
          @save="saveObj"
        >
          <template v-slot:after>
            <!-- <btn-cancel
              label="ترسیم محل حفاری"
              @click="drowingOnMap"
              v-if="isEditable == true"
            />
            <btn-cancel
              label="حذف مسیرهای انتخاب شده"
              @click="deleteDrowingOnMap"
              v-if="isEditable == true"
            /> -->
          </template>
        </FormActions>
      </template>
    </form-wrapper>
    <!-- <safa-popup
      title="مختصات"
      width="600px"
      height="315px"
      v-model="drawingLengthModal"
      :closable="false"
      :resizable="false"
      :maximizeButton="false"
    >
      <fit>
        <div class="fit">
          <q-scroll-area class="full-height q-px-sm">
            <EditPoint allowEdit />
          </q-scroll-area>
        </div>
        <q-separator class="q-gutter-sm q-mt-sm" />
        <div class="q-gutter-sm q-pa-sm">
          <btn-default label="اعمال" @click="getDrawingData" />
          <btn-cancel @click="cancelGetDrawingData" />
        </div>
      </fit>
    </safa-popup> -->
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"
import mapMixin from "src/mixins/mapMixin"
// import EditPoint from "kais-map/src/lib-components/dialogs/EditPoint.vue"
// import { appendUrls } from "src/utils"
import TabRequest from "./partials/TabRequest.vue"
import TabAttachment from "./partials/TabAttachment.vue"
import TabArchive from "./partials/TabArchive.vue"

// import axios from "axios"
import {
  convertStringToNosaziCodeObject,
  convertNosaziCodeObjectToString
} from "src/utils/nosaziCodeOperation"

const defaultModel = {
  CrossRequestChangeMabarHistoryList: null,
  Dwg_Wrapper: null,
  ErrorResult: null,
  MapFind: null,
  Sh_CrossRequest: {
    ActionDetailes: null,
    Address: null,
    CI_ActionType: null,
    CI_PlanUsingtype: null,
    CellPhone: null,
    Code: null,
    CreateDate: null,
    Description: null,
    District: 0,
    GUID: "00000000-0000-0000-0000-000000000000",
    GlobalID: "00000000-0000-0000-0000-000000000000",
    KarbariMosavab: null,
    KarbariMosavabPriority: null,
    LayerID: 0,
    Name: null,
    NationalCode: null,
    NidProc: null,
    NidWorkitem: null,
    NosaziCodeStr: "0-0-0-0-0-0-0",
    OBJECTID: 0,
    PostalCode: null,
    PreMokatebat: null,
    RegistrationPlate: null,
    RequestType: null,
    RequesterName: null,
    WKT: null,
    WKT_Mabar: null
  },
  Sh_CrossRequestChangeMabarHistory: null,
  Sh_CrossRequestList: null,
  Sh_Workflow: null,
  VerticesList: null
}

export default {
  mixins: [baseFormMixin, mapMixin],
  components: { TabRequest, TabAttachment, TabArchive }, // EditPoint
  data () {
    return {
      name: "UCrossRequest",
      title: "ثبت درخواست اداره کل توسعه شهری",
      formKey: "8AA30169-FF4A-449D-B46D-B941BDECF445",
      main: true,

      // #region servises
      getCrossRequestRes: null,
      deleteRes: null,
      getBaseLibInNosaziCodeRes: null,
      saveCrossRequestRes: null,
      // #endregion

      // #region variables
      drawingLengthModal: false,
      currentWKT: "",
      activeTab: "tabRequest",
      model: { crReq: { ...defaultModel } },
      archiveBizCode: null,
      baseNosaziCode: null,
      lockTabs: true,
      requestType: null,

      polygon: null,
      procInfo: null,
      currentNidNosaziCode: "00000000-0000-0000-0000-000000000000"
      // #endregion
    }
  },
  mounted () {
    this.clearMap()
    this.isEditable = true
    this.setLayout("half")
  },
  methods: {
    async getSelectedRequestType (e) {
      this.requestType = e ?? null
    },
    async saveObj () {
      if (this.checkBeforSave()) {
        await this.startSaveRequestProcess()
      }
    },
    checkBeforSave () {
      const nidWfdList =
        window.getConfigValue("esupParams")?.MabarNidWorkflowDeff ?? null
      if (!nidWfdList) {
        // اعتبارسنجی تنظیمات کانفیگ برای معابر
        this.showError(
          "کلید گردشکار مربوط به درخواست شورای معابر تعریف نشده است. لطفا به راهبر سیستم اطلاع دهید."
        )
        return false
      }
      if (this.baseNosaziCode === null) {
        // اعتبار سنجی کدنوسازی
        this.showError("لطفا کدنوسازی را وارد نمایید.")
        return false
      }
      if (!this.isValidForm()) return false
      if (this.currentWKT === "") {
        this.setLayout("half")
        this.showError("لطفا معبر مورد نظر را بر روی نقشه ترسیم نمایید.")
        return false
      }
      return true
    },

    async startSaveRequestProcess () {
      try {
        this.showLoading()
        await this.createInstance()
        await this.saveCrossRequest()
        await this.log({
          action: this.logActions.save,
          bizCode: this.procInfo.NidProc,
          bizCodeTitle: "NidProc",
          nosaziCode: this.procInfo.BizCode,
          nidWorkItem: this.procInfo.NidWorkItem,
          saveDesc: `ثبت درخواست شورای معابر با شماره درخواست ${this.procInfo.NidWorkItem} انجام گردید.`
        })
        this.showSuccess(
          `ثبت درخواست شورای معابر با شماره درخواست ${this.procInfo.NidWorkItem} انجام گردید.`
        ).onDismiss(async () => {
          this.hideLoading()
          await this.getCrossRequest()
        })
      } catch (e) {
        // console.error(e)
        await this.deleteRequest()
        await this.deleteProc()
        this.showError("متاسفانه عملیات ثبت درخواست شورای معابر متوقف شد.")
      } finally {
        this.refreshKartable()
        this.sendSMS()
        this.hideLoading()
      }
    },

    async createInstance () {
      return new Promise(async (resolve, reject) => {
        const payload = {
          BizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
          EumOwnerType: 1,
          NidWorkflowDeff: this.requestType.ID,
          ProcInitiator: this.getNidUser(),
          ProcInitiatorName: this.getUserDisplayName(),
          ProcRequester: this.model.crReq.Sh_CrossRequest.RequesterName,
          ProcArea: "سرا10",
          GroupName: "ثبت درخواست اداره کل توسعه شهری",
          GroupTitel: "ثبت درخواست اداره کل توسعه شهری",
          Domain: this.baseNosaziCode.District,
          IsSara10Request: true,
          WKT: this.currentWKT
        }
        const { data } = await this.$srvWorkflow.createInstance(payload)
        this.createInstanceRes = this.getResponse(data)
        if (this.createInstanceRes.success) {
          if (
            this.createInstanceRes.data.status === 200 &&
            this.createInstanceRes.data.success
          ) {
            this.procInfo = this.createInstanceRes.data.data.ProcInfo
            return resolve()
          } else {
            return reject(this.createInstanceRes.errors[0].text)
          }
        }
      })
    },

    async saveCrossRequest () {
      return new Promise(async (resolve, reject) => {
        try {
          const obj = this.model.crReq
          const WKT = this.currentWKT
          this.model.crReq.Sh_CrossRequest = {
            ...this.model.crReq.Sh_CrossRequest,

            District: this.baseNosaziCode.District,
            KarbariMosavab: obj.CI_PlanUsingtype,
            NidProc: this.procInfo.NidProc,
            NidWorkitem: this.procInfo.NidWorkItem,
            NosaziCodeStr: convertNosaziCodeObjectToString(this.baseNosaziCode),
            RequestType: this.procInfo.NidWorkflowDeff,

            // این اطلاعات از ترسیم نقشه بدست می آید
            // WKT_Mabar: null,
            // Name: null,
            // GUID: "00000000-0000-0000-0000-000000000000",
            // Code: null,
            // LayerID: 0,
            // OBJECTID: 0,
            WKT
            // WKT: "LINESTRING(0.094825748819858 -0.0335769644578824,0.101554876891896 -0.0146255486337046,0.117485050577671 -0.0297317512494218,0.117485050577671 -0.0297317512494218)",

            // زیریا موقتا کامنت شد تا بتونم سرویس رو بنویسم. باید از کامنت خارج بشه و بعد ارسال بشه
            // WKT_Mabar: WKT,
            // Name: this.polygon?.Name ?? null,
            // GUID: this.polygon?.Nid ?? null,
            // Code: this.polygon?.Code ?? null,
            // LayerID: this.polygon?.Url ?? null,
          }
          const payload = {
            pCrossRequest: this.model.crReq,
            IsEdit: false,
            pDtoWorkflowData: {
              StateName: null,
              WorkflowGuid: this.procInfo.NidWorkflowDeff
            },
            pNidNosaziCode: this.currentNidNosaziCode,
            pUser: this.currentUser,
            IsSara10Request: true
          }

          const { data } = await this.$services.SC.saveCrossRequest(payload, {
            config: { District: this.baseNosaziCode.District }
          })
          this.saveCrossRequestRes = this.getResponse(data)
          if (this.saveCrossRequestRes.success) {
            return resolve()
          } else {
            return reject(this.saveCrossRequestRes.errors[0].text)
          }
        } catch (e) {
          console.error(e)
          return reject()
        }
      })
    },

    async getCrossRequest () {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getCrossRequest(
          { pNidProc: this.procInfo.NidProc },
          { config: { District: this.baseNosaziCode.District } }
        )
        this.getCrossRequestRes = this.getResponse(data)
        if (this.getCrossRequestRes.success) {
          this.model.crReq = this.getCrossRequestRes.data
          this.lockTabs = false
          if (this.getBaseLibInNosaziCodeRes?.data?.ArchiveWrapper) {
            this.archiveBizCode =
              this.getBaseLibInNosaziCodeRes.data.ArchiveWrapper?.BizCode
            this.$refs.tabArchive.updateArchiveBizCode()
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async deleteRequest () {
      try {
        const { data } = await this.$services.SC.deleteRequest(
          { pNidProc: this.procInfo.NidProc },
          { config: { District: this.baseNosaziCode.District } }
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
          { config: { District: this.baseNosaziCode.District } }
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

    async sendSMS () {
      try {
        const payLoad = {
          pParameter: {
            AppName: "Sara8",
            BizCode: this.procInfo.BizCode,
            Number: this.model.crReq.Sh_CrossRequest.CellPhone,
            SMSType: "ثبت درخواست شورای معابر",
            ScheduleSendDate: currentDate(),
            Text: `درخواست شما با شماره پیگیری ${this.procInfo.NidWorkItem} در سیستم شهرسازی ثبت گردید.`,
            UserID: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        }
        const { data } = await this.$services.sendSMS.SendSMS(payLoad)
        const res = this.getResponse(data)
        if (res.success) this.showSuccess("پیامک با موفقیت ارسال شد.")
      } catch (e) {
        console.error(e)
      }
    },
    async getMapFindForCrossRequest () {
      // var srv = Class.ClsCommon.GetSrvSc()
      // srv.GetMapFindForCrossRequestCompleted += (s, e1) =>
      // {
      //   // RadBusyIndicator1.IsBusy = false;
      //   if (e1.Error == null)
      //   {
      //     if (e1.Result.ErrorResult.BizErrors.Count == 0)
      //     {
      //       if (e1.Result.MapFind.Count > 0)
      //       {
      //         IsValid = true
      //         wkt_Network = e1.Result.MapFind.First().WKT
      //         Name_Network = e1.Result.MapFind.First().Name
      //         GUID_Network = e1.Result.MapFind.First().Guid
      //         code_Network = e1.Result.MapFind.First().Code
      //         LayerID_Network = e1.Result.MapFind.First().LayerID
      //         txtSelectedMabar.Text = "محدوده " + Name_Network + " انتخاب شد "
      //         txtSelectedMabar.Foreground = new SolidColorBrush(Colors.Green)
      //         // this.showError("محدوده " + Name_Network + " انتخاب شد ");
      //         Save()
      //       }
      //       else
      //       {
      //         Save()
      //         // IsValid = false;
      //         // this.showError("هیچ معبری انتخاب نشده است");
      //       }
      //     }
      //     else
      //     { SafaException.ShowBizError(e1.Result.ErrorResult.BizErrors) }
      //   }
      //   else
      //   {
      //     SafaException.ShowMessage(e1.Error.Message, "خطا در متد GetMapFindForCrossRequest")
      //   }
      // }
      // var WKTList = new List<string>()
      // WKTList.Add(_Wkt)
      // srv.GetMapFindForCrossRequestAsync(WKTList, ApplicationCommon.ClsCommon.InitialParameters.InitParams["NetworkLayerId"])
      // if (IsValid) {
      //   return true
      // }
      // else {
      //   this.showError("لطفا معبر را انتخاب نمایید.")
      //   return false
      // }
    },
    newObj () {
      this.model.crReq = {
        CrossRequestChangeMabarHistoryList: null,
        Dwg_Wrapper: null,
        ErrorResult: null,
        MapFind: null,
        Sh_CrossRequest: {
          ActionDetailes: null,
          Address: null,
          CI_ActionType: null,
          CI_PlanUsingtype: null,
          CellPhone: null,
          Code: null,
          CreateDate: null,
          Description: null,
          District: 0,
          GUID: "00000000-0000-0000-0000-000000000000",
          GlobalID: "00000000-0000-0000-0000-000000000000",
          KarbariMosavab: null,
          KarbariMosavabPriority: null,
          LayerID: 0,
          Name: null,
          NationalCode: null,
          NidProc: null,
          NidWorkitem: null,
          NosaziCodeStr: "0-0-0-0-0-0-0",
          OBJECTID: 0,
          PostalCode: null,
          PreMokatebat: null,
          RegistrationPlate: null,
          RequestType: null,
          RequesterName: null,
          WKT: null,
          WKT_Mabar: null
        },
        Sh_CrossRequestChangeMabarHistory: null,
        Sh_CrossRequestList: null,
        Sh_Workflow: null,
        VerticesList: null
      }
      this.activeTab = "tabRequest"
      this.archiveBizCode = null
      this.baseNosaziCode = null
      this.lockTabs = true
      this.polygon = null
      this.procInfo = null
      this.currentNidNosaziCode = "00000000-0000-0000-0000-000000000000"
      this.isEditable = true
      this.clearMap()
    },
    uNosaziCode_OnEnterCode () {
      this.baseNosaziCode = null
      const b = convertStringToNosaziCodeObject(
        this.model.crReq.Sh_CrossRequest.NosaziCodeStr
      )
      const payload = {
        pNosaziCode: {
          Apartment: b.Apartment,
          Block: b.Block,
          Building: b.Building,
          CI_City: 0,
          District: b.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: b.House,
          IsRoot: false,
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          Region: b.Region,
          Shop: b.Shop
        },
        pLoadFunc:
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_PreCodeInfo",
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(payload, {
        config: { District: b.District }
      })
        .then(async ({ data }) => {
          this.getBaseLibInNosaziCodeRes = this.getResponse(data)
          if (this.getBaseLibInNosaziCodeRes.success) {
            const res = this.getBaseLibInNosaziCodeRes.data
            this.baseNosaziCode = b
            // this.showCodeOnMap(
            //   convertNosaziCodeObjectToString(this.baseNosaziCode)
            // )
            const _m = res.MainObj
            this.model.crReq.Sh_CrossRequest.District = _m?.District
            this.currentNidNosaziCode =
              _m?.NidNosaziCode ?? "00000000-0000-0000-0000-000000000000"

            var owner = res.Base_Owner
            if (owner.length > 0) {
              const o = owner[0]
              this.model.crReq.Sh_CrossRequest.RequesterName =
                o.OwnerName + " " + o.OwnerLastName
              this.model.crReq.Sh_CrossRequest.NationalCode = o.NationalCode
              this.model.crReq.Sh_CrossRequest.Address = o.Address
              this.model.crReq.Sh_CrossRequest.CellPhone = o.CellPhone
            }

            if (
              res.Base_AddressInfo != null &&
              res.Base_CommonEstate_Address != null
            ) {
              this.model.crReq.Sh_CrossRequest.Address = res.Base_AddressInfo
                .MainAddress
                ? ""
                : res.Base_AddressInfo.MainAddress +
                  " " +
                  res.Base_CommonEstate_Address.Plack
                  ? ""
                  : "پلاک: " +
                  res.Base_CommonEstate_Address.Plack +
                  " " +
                  res.Base_CommonEstate_Address.Vahed
                    ? ""
                    : "واحد: " + res.Base_CommonEstate_Address.Vahed
            }

            if (res.Base_AddressPostCode != null) {
              this.model.crReq.Sh_CrossRequest.PostalCode =
                res.Base_AddressPostCode.length === 0
                  ? ""
                  : res.Base_AddressPostCode[0].PostCode
            }

            this.model.crReq.Sh_CrossRequest.RegistrationPlate =
              res.Base_RegisterPlack_Str

            if (res.ArchiveWrapper) {
              this.archiveBizCode = res.ArchiveWrapper.BizCode
              this.$refs.tabArchive.updateArchiveBizCode()
            }
          } else {
            this.baseNosaziCode = null
            this.model.crReq.Sh_CrossRequest.RequesterName = null
            // this.model.crReq.Sh_CrossRequest.NosaziCodeStr = "0-0-0-0-0-0"
            this.model.crReq.Sh_CrossRequest.NationalCode = null
            this.model.crReq.Sh_CrossRequest.Address = null
            this.model.crReq.Sh_CrossRequest.CellPhone = null
            this.model.crReq.Sh_CrossRequest.District = null
            this.model.crReq.Sh_CrossRequest.PostalCode = null
            this.model.crReq.Sh_CrossRequest.RegistrationPlate = null

            // this.model = { crReq: { ...defaultModel } }
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
    checkLockTabs () {
      if (this.lockTabs) {
        this.activeTab = "tabRequest"
      }
    },
    drowingOnMap () {
      this.drawingLengthModal = true
    },
    // deleteDrowingOnMap () {
    //   this.clearMap()
    //   this.drawingLengthModal = false
    // },
    clearMap () {
      this.$KaisMap.StrEDITWKT = ""
      this.currentWKT = ""
      this.$KaisMap.Clear()
      // this.mapZoom(1)
    },
    getDrawingData () {
      const _WKT = this.$KaisMap.StrEDITWKT
      if (
        _WKT === "" ||
        _WKT === "()" ||
        _WKT === "POLYGON(())" ||
        _WKT === "POINT()" ||
        _WKT === "LINESTRING()"
      ) {
        this.currentWKT = ""
      } else this.currentWKT = this.$KaisMap.StrEDITWKT
      this.drawingLengthModal = false
    },
    cancelGetDrawingData () {
      this.clearMap()
      this.drawingLengthModal = false
    }
  },
  watch: {
    activeTab () {
      if (this.activeTab === "tabArchive") {
        if (this.getBaseLibInNosaziCodeRes.data.ArchiveWrapper) {
          this.archiveBizCode =
            this.getBaseLibInNosaziCodeRes.data.ArchiveWrapper?.BizCode ?? null
          this.$refs.tabArchive.updateArchiveBizCode()
        }
      }
    }
  },
  beforeDestroy () {
    this.clearMap()
    this.setLayout("full")
  }
}
</script>
