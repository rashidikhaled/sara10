<template>
  <safa-form
    appId="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    caption="شهرسازی- ویرایش اطلاعات درخواست اداره کل توسعه شهری"
    :id="formKey"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getCrossRequestRes" />
        <safa-status :result="getBaseLibInNosaziCodeRes" />
        <safa-status :result="saveCrossRequestRes" />
      </template>
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="tabRequest" label="اطلاعات درخواست" />
            <tab-menu
              name="tabAttachment"
              label="پیوست"
              :disabled="!isEditable"
              @click="checkLockTabs"
              v-if="archiveBizCode"
            />
            <tab-menu
              name="tabArchive"
              label="آرشیو"
              :disabled="!isEditable"
              @click="checkLockTabs"
              v-if="archiveBizCode"
            />
          </template>
          <tab-content name="tabRequest">
            <tab-request
              v-model="model.crReq.Sh_CrossRequest"
              :m="mode"
              lockFields
              :WKTLoaded="WKTLoaded"
              @getDrawingData="getDrawingData"
              @cancelGetDrawingData="cancelGetDrawingData"
              ref="tabRequestRef"
            />
          </tab-content>
          <tab-content name="tabAttachment">
            <tab-attachment
              v-model="model.crReq"
              :name="name"
              :title="title"
              :formKey="formKey"
              :archiveBizCode="archiveBizCode"
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
          @cancel="isEditable = false"
          @edit="isEditable = true"
          @save="saveObj"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import mapMixin from "src/mixins/mapMixin"
import TabRequest from "../cross-request/partials/TabRequest.vue"
import TabAttachment from "../cross-request/partials/TabAttachment.vue"
import TabArchive from "../cross-request/partials/TabArchive.vue"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

const defaultModel = {
  CrossRequestChangeMabarHistoryList: null,
  Dwg_Wrapper: null,
  ErrorResult: null,
  MapFind: null,
  Sh_CrossRequest: {
    ActionDetailes: null, // "قثقفثق",
    Address: null, // "98878",
    CI_ActionType: null, // "2",
    CI_PlanUsingtype: null, // null,
    CellPhone: null, // "09138087838",
    Code: null, // null,
    CreateDate: null, // null,
    Description: null, // null,
    District: 0, // "7",
    GUID: "00000000-0000-0000-0000-000000000000", // "00000000-0000-0000-0000-000000000000",
    GlobalID: "00000000-0000-0000-0000-000000000000", // "00000000-0000-0000-0000-000000000000",
    KarbariMosavab: null, // "9",
    KarbariMosavabPriority: null, // "1",
    LayerID: 0, // "0",
    Name: null, // null,
    NationalCode: null, // "1271322651_",
    NidProc: null, // "431895f6-fb77-43ea-ad44-b4183e4abe0e",
    NidWorkitem: null, // "1208172",
    NosaziCodeStr: "0-0-0-0-0-0-0", // "7-100-100-100-0-0-0",
    OBJECTID: 0, // "0",
    PostalCode: null, // "1234567899",
    PreMokatebat: null, // "1",
    RegistrationPlate: null, // "36",
    RequestType: null, // "cac3dbc5-2c2f-41bf-bf34-de6c0f029499",
    RequesterName: null, // "بلی",
    WKT: null, // "LINESTRING(0.094825748819858 -0.0335769644578824,0.101554876891896 -0.0146255486337046,0.117485050577671 -0.0297317512494218,0.117485050577671 -0.0297317512494218)",
    WKT_Mabar: null // null,
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
      name: "UEditCrossRequest",
      title: "ویرایش اطلاعات درخواست اداره کل توسعه شهری",
      formKey: "35ABA874-225E-4DCB-A8E6-9761A562B1B2",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,

      WKTLoaded: false,

      // #region servises
      getCrossRequestRes: null,
      saveCrossRequestRes: null,
      getBaseLibInNosaziCodeRes: null,
      // #endregion

      // #region variables
      currentWKT: "",
      activeTab: "tabRequest",
      model: { crReq: { ...defaultModel } },
      archiveBizCode: null,
      isView: false,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      currentNidNosaziCode: "00000000-0000-0000-0000-000000000000"
      // #endregion
    }
  },

  created () {
    this.clearMap()
    if (this.isSelectedRequest()) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.loadObj()
    } else this.hideSidebar(this.name)
  },

  methods: {
    async loadObj () {
      this.showLoading()
      try {
        const { data } = await this.$services.SC.getCrossRequest(
          { pNidProc: this.selectedRequest.NidProc },
          this.config
        )
        this.getCrossRequestRes = this.getResponse(data)
        if (this.getCrossRequestRes.success) {
          this.model.crReq = this.getCrossRequestRes.data

          await this.uNosaziCode_OnEnterCode()
          this.currentWKT = this.model.crReq.Sh_CrossRequest.WKT ?? ""

          this.setLayout("half")
          this.WKTLoaded = true
          // this.$KaisMap.StrEDITWKT = this.currentWKT
          // this.showWKT(this.model.crReq.Sh_CrossRequest, false)
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              saveDesc: `اطلاعات کد ${this.selectedRequest.BizCode} در فرم ${this.title} نمایش داده شد.`
            })
          }
          this.isView = true
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async uNosaziCode_OnEnterCode () {
      this.showLoading()
      try {
        const b = this.baseNosaziCode
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
            Id: null,
            IsRoot: false,
            NidBase: "00000000-0000-0000-0000-000000000000",
            NidNosaziCode: "00000000-0000-0000-0000-000000000000",
            NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
            NidRevisit: "00000000-0000-0000-0000-000000000000",
            NidUser: "00000000-0000-0000-0000-000000000000",
            ParentId: null,
            Region: b.Region,
            Shop: b.Shop,
            UserName: null
          },
          pLoadFunc: "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
          pIsLoadDeletedNosaziCode: false
        }
        const { data } = await this.$services.SA.getBaseLibInNosaziCode(
          payload,
          this.config
        )
        this.getBaseLibInNosaziCodeRes = this.getResponse(data)
        if (this.getBaseLibInNosaziCodeRes.success) {
          const res = this.getBaseLibInNosaziCodeRes.data
          // this.showCodeOnMap(convertNosaziCodeObjectToString(b))
          this.currentNidNosaziCode =
            res.MainObj?.NidNosaziCode ??
            "00000000-0000-0000-0000-000000000000"
          if (res?.ArchiveWrapper) {
            this.archiveBizCode = res.ArchiveWrapper.BizCode
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
    async saveObj () {
      if (!this.isValidForm()) return
      if (this.currentWKT === "") {
        return this.showError(
          "لطفا معبر مورد نظر را بر روی نقشه ترسیم نمایید و روی اعمال ترسیم محل حفاری کلیک کنید."
        )
      } else {
        await this.saveRequest()
      }
    },
    async saveRequest () {
      this.model.crReq.Sh_CrossRequest = {
        ...this.model.crReq.Sh_CrossRequest,
        WKT: this.currentWKT
      }
      try {
        const payload = {
          pCrossRequest: this.model.crReq,
          IsEdit: true,
          pDtoWorkflowData: {
            StateName: null,
            WorkflowGuid: this.model.crReq.Sh_CrossRequest.RequestType
          },
          pNidNosaziCode: this.currentNidNosaziCode,
          pUser: this.currentUser,
          IsSara10Request: true
        }

        this.showLoading()
        const { data } = await this.$services.SC.saveCrossRequest(
          payload,
          this.config
        )
        this.saveCrossRequestRes = this.getResponse(data)
        if (this.saveCrossRequestRes.success) {
          this.showSuccess("عملیات با موفقیت انجام شد")
          // await this.log({
          //   action: this.logActions.save,
          //   bizCode: this.selectedRequest.NidProc,
          //   bizCodeTitle: "NidProc",
          //   nosaziCode: this.selectedRequest.BizCode,
          //   saveDesc: `اطلاعات کد ${this.selectedRequest.BizCode} در فرم ${this.title ?? ''} ذخیره شد.`
          // })
          this.isEditable = false
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    checkLockTabs () {
      if (!this.isEditable) {
        this.activeTab = "tabRequest"
      }
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
    },
    cancelGetDrawingData () {
      this.$KaisMap.StrEDITWKT = ""
      this.clearMap()
    },
    clearMap () {
      this.$KaisMap.StrEDITWKT = ""
      this.currentWKT = ""
      this.$KaisMap.Clear()
      this.$KaisMap.CMap.getView().setZoom(16)
    }
  },
  computed: {
    config () {
      return {
        config: {
          District: convertStringToNosaziCodeObject(
            this.selectedRequest.BizCode
          ).District
        }
      }
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
    },
    isEditable () {
      this.$refs.tabRequestRef.loadWKT()
    }
  },
  beforeDestroy () {
    this.clearMap()
    this.setLayout("full")
  }
}
</script>
