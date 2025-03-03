<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper :title="title" :padding="false" @load="$emit('load')">
      <template #header>
        <safa-status :result="checkIsConfirmOutputRes" />
        <safa-status :result="loadObjRes" />
        <safa-status :result="reqSecRes" />

        <safa-status :result="OtherResult" />
        <safa-status :result="confirmOutputResult" />
        <safa-status :result="saveResult" />
        <safa-status :result="saveRequestSecRes" />
      </template>

      <ArchiveWrap
        :name="archiveConfig.username"
        :pass="archiveConfig.password"
        :biz-code="archiveBizCode"
        :options="archiveOptions"
        v-if="hasSodor"
        ref="archiveRef"
      />
      <safa-tabs v-else v-model="activeTab" :bordered="false">
        <template v-slot:tabs>
          <tab-menu name="specTab" label="مشخصات ساختمان" />
          <tab-menu name="otherSpecTab" label="سایر مشخصات" />
          <tab-menu name="userTab" label="کاربری ها" />
          <tab-menu name="eventTab" label=" پیش آمدگی ها" />
          <tab-menu name="korokiTab" label="پارکینگ و کروکی" />
          <tab-menu name="commentTab" label="توضیحات" />
        </template>

        <tab-content name="specTab">
          <PrincipalAgreementSpecification
            :m="mode"
            v-model="results"
            :cboSecOptions="requestSecList"
            @selectedSecChange="selectedSecChange"
            ref="agrSpeRef"
          />
        </tab-content>
        <tab-content name="otherSpecTab">
          <PrincipalAgreementOtherSpecification :m="mode" v-model="results" />
        </tab-content>
        <tab-content :padding="false" name="userTab">
          <PrincipalAgreementUser :m="mode" v-model="results" />
        </tab-content>
        <tab-content :padding="false" name="eventTab">
          <PrincipalAgreementEvent :m="mode" v-model="results" />
        </tab-content>
        <tab-content name="korokiTab" :padding="false">
          <PrincipalAgreementKoroki :m="mode" v-model="results" />
        </tab-content>
        <tab-content name="commentTab" v-if="activeTab === 'commentTab'">
          <PrincipalAgreementComment :m="mode" v-model="results" />
        </tab-content>
      </safa-tabs>

      <template v-slot:footer>
        <FormActions
          :m="mode"
          :showEditButton="!hasSodor"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="loadObj"
        >
          <template #before v-if="hasSodor">
            <btn-default label="ابطال گواهی" @click="revokeCertificat" />
            <btn-default label="چاپ" @click="getPrint" />
          </template>
          <template #after v-else>
            <btn-new @click="secregistration" label="ثبت دبیرخانه" />
            <btn-default
              @click="certificatIssuance"
              label=" صدور گواهی"
              v-show="!isEditable"
            />
            <btn-default
              @click="print"
              label=" چاپ پیش نویس"
              v-show="!isEditable"
            />
            <btn-default @click="copyMovafaghatOsooli" label="کپی از بازدید" />

            <!-- اکشنی نداره -->
            <!-- <btn-default
              label="tag درخواست"
              spId="1b642c59-baae-4dbc-83e1-2ad3623d3aa3"
              spCaption="درخواستtag"
            /> -->

            <btn-default
              v-show="activeTab === 'korokiTab' && !isEditable"
              label="مشاهده کروکی"
              @load="loadObj"
              @click="showCroquie = true"
            />
            <btn-default
              v-show="activeTab === 'korokiTab' && isEditable"
              label="رسم کروکی"
              @load="loadObj"
              @click="showCroquie = true"
            />
          </template>
        </FormActions>
      </template>

      <safa-popup
        v-model="showCroquie"
        title="رسم کروکی"
        width="980px"
        height="730px"
      >
        <UDrawCroque
          v-model="results"
          :m="isEditable"
          @cancel="showCroquie = false"
        />
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import PrincipalAgreementSpecification from "./partials/PrincipalAgreementSpecification.vue"
import PrincipalAgreementOtherSpecification from "./partials/PrincipalAgreementOtherSpecification.vue"
import PrincipalAgreementUser from "./partials/PrincipalAgreementUser.vue"
import PrincipalAgreementEvent from "./partials/PrincipalAgreementEvent.vue"
import PrincipalAgreementKoroki from "./partials/PrincipalAgreementKoroki.vue"
import PrincipalAgreementComment from "./partials/PrincipalAgreementComment.vue"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import { ClsEnumEumSecNoGroup } from "src/forms/shahrsazi/config/enums.js"
import baseFormMixin from "src/mixins/baseFormMixin"
import UDrawCroque from "./partials/UDrawCroque"
import PersianDate from "persian-date"

export default {
  mixins: [baseFormMixin],

  components: {
    PrincipalAgreementSpecification,
    PrincipalAgreementOtherSpecification,
    PrincipalAgreementUser,
    PrincipalAgreementEvent,
    PrincipalAgreementKoroki,
    PrincipalAgreementComment,
    UDrawCroque
    // BtnBase
  },

  data () {
    return {
      title: "شهرسازی- گواهی موافقت اصولی",
      formKey: "348e2520-e086-4ae5-b239-274da710068b",
      name: "PrincipalAgreement",
      main: true,
      workflowCompatible: true,

      isView: false,
      hasSodor: false,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      confirmOutputResult: null,
      acceptCopy: false,
      showCroquie: false,
      archiveBizCode: "",
      activeTab: "specTab",
      archiveOptions: {
        showOnlyStates: null,
        showTree: true
      },
      results: {
        Base_ApartmentInfo: [],
        Base_Attachment: [],
        Base_Bezel: [],
        Base_BuildingInfo: {},
        Base_CommonEstate: {},
        Base_Door: [],
        Base_Front: [],
        Base_Gap: [],
        Base_GreenSpace: [],
        Base_Installation: [],
        Base_OtherEquipment: [],
        Base_Parking: [],
        Base_SupplyParking: [],
        Base_Using: [],
        Base_Wall: [],
        MapImage: {},
        ErrorResult: {},
        MovafeghatOsooli_History: {},
        NidLib: {},
        NidProc: "00000000-0000-0000-0000-000000000000",
        Sh_MovafeghatOsooli: {
          CertificateNo: "",
          CertificateDate: "",
          Comments: "",
          ControlComments: ""
        }
      },
      requestSecList: [],

      loadObjRes: null,
      OtherResult: null,
      checkIsConfirmOutputRes: null,
      reqSecRes: null,
      saveRequestSecRes: null,
      saveResult: null
    }
  },

  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("archiveCore").district.ApprovalCertificate
    },
    config () {
      return { config: { District: this.selectedDistrict } }
    }
  },

  methods: {
    async onLoad () {
      try {
        const payload = {
          pNidProc: this.selectedRequest.NidProc,
          pOutputEngTitle: "Output_MovafeghatOsooli"
        }
        this.showLoading()
        const { data } = await this.$services.SC.checkIsConfirmOutput(
          payload,
          this.config
        )
        this.checkIsConfirmOutputRes = this.getResponse(data)
        if (this.checkIsConfirmOutputRes.success) {
          const o = this.checkIsConfirmOutputRes.data?.Sh_Output ?? null
          if (o) {
            this.hasSodor = true
            this.updateArchiveBizCode(o.ArchiveBizCode)
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `بارگذاری اطلاعات درخواست ${this.selectedRequest.NidWorkItem} در فرم ${this.title} انجام گردید.`
              })
            }
            this.isView = true
          } else {
            this.hasSodor = false
            this.loadObj()
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async loadObj () {
      this.isEditable = false
      const { BizCode, NidProc, NidWorkItem } = this.selectedRequest
      try {
        this.showLoading()
        const response = await this.$services.SC.loadMovafeghatOsooli(
          { pNidProc: NidProc, pIsLoadDeletedNosaziCode: false },
          this.config
        )
        this.loadObjRes = this.getResponse(response.data)
        if (this.loadObjRes.success === true) {
          this.results = this.loadObjRes.data
          await this.loadRequestSec()
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: BizCode,
              nidWorkItem: NidWorkItem,
              saveDesc: `بارگذاری اطلاعات درخواست ${NidWorkItem} در فرم ${this.title} انجام گردید.`
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
    async loadRequestSec () {
      const payload = {
        pNidProc: this.selectedRequest.NidProc,
        pEumSecNoGroup: ClsEnumEumSecNoGroup.MovafeghatOsooli.value // 8
      }
      try {
        const { data } = await this.$services.SI.loadRequestSec(
          payload,
          this.config
        )
        this.reqSecRes = this.getResponse(data)
        if (this.reqSecRes.success) {
          const _l = this.reqSecRes?.data?.Sh_RequestSec_List ?? []
          this.requestSecList = _l
            .map((m) => {
              return {
                ...m,
                ID: m.NidSec,
                Title: `شماره: ${m?.SecNo ?? "---"}  تاریخ: ${
                  m?.SecDate ?? "---"
                }`
              }
            })
            .sort((a, b) => b.SecDate - a.SecDate)
          if (this.requestSecList.length > 0) {
            this.$refs.agrSpeRef.selectedSec = this.requestSecList[0].ID
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    selectedSecChange (e) {
      // debugger
      //  اگر سرویس لیستی رو برگردوند توی کمبو مقدار اول رو نمایش بده (این بخش توی کد هم به این صورت بود)
      // ولی این که کمبو رو تغییر کنه ، دیتای جدیدش مشخص نیست توی کدوم سرویس باید ارسال بشه ، توی سورس کد چیزی وجود نداشت
      // با توجه به صحبت خانم روستا به همین صورت اوکی هست و کمبو تغییری داده نمیشه
    },
    revokeCertificat () {
      this.showLoading()
      const payload = {
        pDtoOut: {
          NidOutput: "00000000-0000-0000-0000-000000000000",
          NidProc: this.selectedRequest.NidProc,
          OutputEngTitle: "Output_MovafeghatOsooli",
          OutputNo: null,
          OutputPerTitle: "موافقت اصولی",
          ReportName: "/Sara8Reports/RptMovafeghatOsooli",
          RevokeDate: new PersianDate().toLocale("en").format("L"),
          RevokeNidUser: this.getNidUser(),
          RevokeUserName: this.currentUser.UserName,
          RevokeComment: ""
        },
        pDomain: this.selectedDistrict
      }
      this.$services.SC.revokeOutput(payload, this.config)
        .then(async ({ data }) => {
          this.revokeResult = this.getResponse(data)
          if (this.revokeResult.success) {
            await this.log({
              action: this.logActions.cancel,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ابطال گواهی درخواست ${this.selectedRequest.NidWorkItem} در فرم ${this.title} انجام گردید.`
            })
            this.showSuccess("ابطال گواهی با موفقیت انجام شد.")
            this.onLoad()
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
      let self = this
      let pData = { Base_Door: [], Base_Using: [] }
      if (this.results.Base_Door) {
        this.results.Base_Door.forEach((element) => {
          let cls = element
          cls.DoorCount = Number(element.DoorCount)
            ? Number(element.DoorCount)
            : 0
          cls.DoorWidth = Number(element.DoorWidth)
            ? Number(element.DoorWidth)
            : 0
          cls.UnitNo = null
          pData.Base_Door.push(cls)
        })
      }
      pData.Base_Using = this.normalizeBaseUsing()
      this.results.Base_GreenSpace = this.normalizeBaseGreenSpace()
      this.results.Base_Front = this.normalizeBase_Front()
      this.results.Base_Parking = this.normalizeBaseParking()
      this.results.Base_OtherEquipment = this.normalizeBase_OtherEquipment()
      this.results.Base_Bezel = this.normalizeBase_Bezel()
      let data = {
        pMovafeghatOsooli: {
          Base_Attachment: this.results.Base_Attachment,
          Base_Bezel: this.results.Base_Bezel,
          Base_BuildingInfo: this.results.Base_BuildingInfo,
          Base_CommonEstate: this.results.Base_CommonEstate,
          Base_Door: pData.Base_Door,
          Base_Front: this.results.Base_Front,
          Base_Gap: this.results.Base_Gap,
          Base_GreenSpace: this.results.Base_GreenSpace,
          Base_Installation: this.results.Base_Installation,
          Base_OtherEquipment: this.results.Base_OtherEquipment,
          Base_Parking: this.results.Base_Parking,
          Base_SupplyParking: this.results.Base_SupplyParking,
          Base_Using: pData.Base_Using,
          Base_Wall: this.results.Base_Wall,
          ErrorResult: this.results.ErrorResult,
          MapImage: {},
          MovafeghatOsooli_History: {},
          NidLib: this.results.NidLib,
          NidProc: this.selectedRequest.NidProc,
          Sh_MovafeghatOsooli: this.results.Sh_MovafeghatOsooli
        },
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: this.selectedRequest.NidWorkflowDeff,
          WorkflowGuid: this.selectedRequest.NidWorkflowDeff
        }
      }
      this.showLoading()
      this.$services.SC.saveMovafeghatOsooli(data, this.config)
        .then(async ({ data }) => {
          self.saveResult = this.getResponse(data)
          if (self.saveResult.success) {
            // self.results = self.saveResult.data
            await this.loadObj()
            this.showSuccess("ذخیره  با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ذخیره اطلاعات درخواست ${this.selectedRequest.NidWorkItem} در فرم ${this.title} انجام گردید.`
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
    async secregistration () {
      if (this.requestSecList.length > 0) {
        this.showConfirm(
          "درخواست مورد نظر قبلا ثبت دبیرخانه شده است آیا تمایل دارید دوباره ثبت شود؟"
        ).onOk(async () => {
          await this.saveRequestSec()
        })
      } else {
        await this.saveRequestSec()
      }
    },
    async saveRequestSec () {
      try {
        this.showLoading()
        const payload = {
          pRequestSec: {
            ErrorResult: null,
            EumSecNoGroup: ClsEnumEumSecNoGroup.MovafeghatOsooli.value,
            NidProc: this.selectedRequest.NidProc,
            SecretariatReceiver: null,
            SecretariatSummary: null,
            SecretariatTypeDesc: null,
            Sh_RequestSec: {
              EumSecNoGroup: ClsEnumEumSecNoGroup.MovafeghatOsooli.value,
              NidProc: this.selectedRequest.NidProc,
              NidSec: "00000000-0000-0000-0000-000000000000",
              ReportPath: "/Sara8Reports/RptMovafeghatOsooli",
              SecDate: null,
              SecNo: null
            },
            Sh_RequestSec_List: null
          },
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: this.selectedRequest.NidWorkflowDeff,
            WorkflowGuid: this.selectedRequest.NidWorkflowDeff
          }
        }
        const { data } = await this.$services.SI.saveRequestSec(
          payload,
          this.config
        )
        this.saveRequestSecRes = this.getResponse(data)
        if (this.saveRequestSecRes.success) {
          this.showSuccess("ثبت دبیرخانه با موفقیت انجام شد")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ثبت دبیرخانه درخواست ${this.selectedRequest.NidWorkItem} در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    certificatIssuance () {
      this.showLoading()
      const { District, Region, Block, House, Building, Apartment, Shop } =
        this.baseNosaziCode
      let payload = {
        pDtoOut: {
          ExportNidUser: this.getNidUser(),
          ExportUserName: this.getUserDisplayName(),
          NidOutput: "00000000-0000-0000-0000-000000000000",
          NidProc: this.selectedRequest.NidProc,
          OutputEngTitle: "Output_MovafeghatOsooli",
          OutputPerTitle: "موافقت اصولی",
          ReportName: "/Sara8Reports/RptMovafeghatOsooli",
          OutputDate: this.results.Sh_MovafeghatOsooli.CertificateDate,
          OutputNo: this.results.Sh_MovafeghatOsooli.CertificateNo
        },
        pNosaziCode: {
          Apartment,
          Block,
          Building,
          CI_City: 0,
          District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: House,
          IsRoot: false,
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
          NidRevisit: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          Region,
          Shop
        },
        pReportPath: "/Sara8Reports/RptMovafeghatOsooli",
        pArchiveDomain: District,
        pReportDomain: District,
        pEntityId: 0,
        pCurrentDate: false
      }
      this.$services.SC.confirmOutput(payload, this.config)
        .then(async ({ data }) => {
          this.confirmOutputResult = this.getResponse(data)
          if (this.confirmOutputResult.success) {
            this.showSuccess("صدور گواهی با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.certificateExport,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `صدور گواهی برای ${this.selectedRequest.NidWorkItem} انجام گردید`
            })
            this.onLoad()
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
    async getPrint () {
      let imageUrl =
        this.$archivePlugins.getFileUrl({
          // eslint-disable-next-line no-undef
          currentFile: archiveStore.selectedFileItem,
          // eslint-disable-next-line no-undef
          param: "&mode=max&ZL=" + archiveStore.thumbnailSize
        }) || null
      // to do ArchiveObj.Print()
      // http://172.16.8.183/Report/RptViewer/Viewer/RptViewer.aspx/RptArchiveimgPath;http://sarch.mashhad.ir:8048/Handlers/ImagePivotProvider.ashx?qq=Rk5hbWU9MTYwNjA0NyZab29tTGV2ZWw9LTEmQml6Q29kZT0xNjQxY2MyNi1jZTRlLTQ2MGYtYjcyNC1lYTk0MDYzNTE0ZTQmRG9tYWluTmFtZT1BcHByb3ZhbENlcnRpZmljYXRlJk5pZENhdGVnb3J5PTAmUj0mcz1NRGt2TURVdk1qQXlNeUF4TkRveU9Eb3lNQT09,NidFiles;1606047,NidUser;89e8deff-c832-45d2-a376-1bc6cbee003e HTTP/1.1
      const reportPath = "/RptArchive"
      const queryParams = {
        imgPath: imageUrl,
        // eslint-disable-next-line no-undef
        NidFiles: archiveStore.selectedFileItem.ID,
        NIdUser: this.getNidUser()
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: "RptArchive",
        bizCodeTitle: "گزارش",
        nosaziCode: this.selectedRequest.BizCode,
        nidWorkItem: this.selectedRequest.NidWorkItem,
        saveDesc: `چاپ گزارش درخواست ${this.selectedRequest.NidWorkItem} در فرم ${this.title} انجام گردید.`
      })
    },
    async print () {
      const reportPath = "/Sara8Reports/RptMovafeghatOsooli_Pishnevis"
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidProc: this.selectedRequest.NidProc,
        RptDomain: "1@2@3@4@5@6@7@8@9@10@11@12@80",
        District: convertStringToNosaziCodeObject(this.selectedRequest.BizCode)
          .District,
        TokenKey: "HTTP/1.1"
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: "RptMovafeghatOsooli_Pishnevis",
        bizCodeTitle: "گزارش",
        nosaziCode: this.selectedRequest.BizCode,
        nidWorkItem: this.selectedRequest.NidWorkItem,
        saveDesc: `چاپ گزارش درخواست ${this.selectedRequest.NidWorkItem} در فرم ${this.title} انجام گردید.`
      })
    },
    copyClick () {
      this.acceptCopy = true
    },
    copyMovafaghatOsooli () {
      this.showConfirm(
        "آیا از کپی اطلاعات بازدید به موافقت اصولی اطمینان دارید؟"
      ).onOk(() => {
        this.showLoading()
        // let self = this
        let data = {
          pNidBase_MovafeghatOsooli: this.results.Sh_MovafeghatOsooli.NidBase
        }
        this.$services.SC.copyFromRevisitToOneOfMovafeghatOsooli(data, {
          config: { District: this.selectedDistrict }
        })
          .then(async ({ data }) => {
            this.OtherResult = this.getResponse(data)
            if (this.OtherResult.success) {
              this.loadObj()
              this.showSuccess("اطلاعات بازدید با موفقیت کپی شد.")
              await this.log({
                action: this.logActions.copyFromRevisit,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `کپی اطلاعات بازدید به موافقت اصولی درخواست ${this.selectedRequest.NidWorkItem} در فرم ${this.title} انجام گردید.`
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
      })
    },

    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    },
    normalizeBaseUsing () {
      return this.results.Base_Using.map((m) => {
        return {
          ...m,
          ActDate: m.ActDate || null,
          BusyArea: m.BusyArea || null,
          CI_BuildingType: m.CI_BuildingType || null,
          CI_HowChangeBuilding: m.CI_HowChangeBuilding || null,
          CI_Repair: m.CI_Repair || null,
          CI_ViewCode: m.CI_ViewCode || null,
          CI_UsingStatus: m.CI_UsingStatus || null,
          DWGObjectID: m.DWGObjectID || null,
          DWGObjectName: m.DWGObjectName || null,
          Depth1Area: m.Depth1Area || null,
          Depth1No: m.Depth1No || null,
          Depth2Area: m.Depth2Area || null,
          Depth2No: m.Depth2No || null,
          Depth3Area: m.Depth3Area || null,
          GenerateDate: m.GenerateDate || null,
          IllegalInfrastructure: m.IllegalInfrastructure || null,
          MassDistance_Main: m.MassDistance_Main || null,
          MassDistance_Sub: m.MassDistance_Sub || null,
          OverOnArea: m.OverOnArea || null,
          OverOnLengthNear: m.OverOnLengthNear || null,
          OverOnTarakom: m.OverOnTarakom || null,
          OverOrNoParvaneh: m.OverOrNoParvaneh || null,
          RepairArea: m.RepairArea || null,
          UnUsefulHeight: m.UnUsefulHeight || null,
          CI_UsingPlace: m.CI_UsingPlace || null,
          ConversionDate: m.ConversionDate || null,
          Depth3No: m.Depth3No || null,
          GarbageUnit: m.GarbageUnit || null
        }
      })
    },
    normalizeBase_Bezel () {
      return this.results.Base_Bezel.map((m) => {
        return {
          ...m,
          CI_BezelType: m.CI_BezelType || 0,
          CI_SideCode: m.CI_SideCode || 0,
          CI_ShahrsazRequestType: m.CI_ShahrsazRequestType || 0,
          Dimension: m.Dimension || null,
          IsObserve: m.IsObserve || null
        }
      })
    },
    normalizeBase_OtherEquipment () {
      return this.results.Base_OtherEquipment.map((m) => {
        return {
          ...m,
          CI_OtherEquipmentGroup: m.CI_OtherEquipmentGroup || 0,
          CI_OtherEquipmentType: m.CI_OtherEquipmentType || 0,
          CI_ShahrsazRequestType: m.CI_ShahrsazRequestType || 0,
          CI_Suggest: m.CI_Suggest || 0,
          Comments: m.Comments || null,
          CreateDate: m.CreateDate || null,
          OtherEquipmentValue: m.OtherEquipmentValue || null
        }
      })
    },
    normalizeBase_Front () {
      return this.results.Base_Front.map((m) => {
        return {
          ...m,
          CI_FrontStatus: m.CI_FrontStatus || null,
          CI_RoofType: m.CI_RoofType || null,
          ConversionDate: m.ConversionDate || null,
          DWGObjectID: m.DWGObjectID || null,
          DWGObjectName: m.DWGObjectName || null,
          GenerateDate: m.GenerateDate || null
        }
      })
    },
    normalizeBaseParking () {
      return this.results.Base_Parking.map((m) => {
        return {
          ...m,
          CI_RequiredParkingType: m.CI_RequiredParkingType || null,
          InspectedNo: m.InspectedNo || null,
          ProductYear: m.ProductYear || null,
          SupplyNo: m.SupplyNo || null,
          TrespassYear: m.TrespassYear || null
        }
      })
    },
    normalizeBaseGreenSpace () {
      return this.results.Base_GreenSpace.map((m) => {
        return {
          ...m,
          CI_GreenSpaceType: m.CI_GreenSpaceType || 0,
          Comments: m.Comments || null,
          GreenSpaceCount: m.GreenSpaceCount || null,
          GreenSpaceValue: m.GreenSpaceValue || 0
        }
      })
    }
  },

  beforeMount () {
    // eslint-disable-next-line no-undef
    archiveStore.showTree = true
  },

  beforeDestroy () {
    // eslint-disable-next-line no-undef
    // archiveStore.showOnlyStates = null
    this.archiveOptions.showOnlyStates = null
  },

  created () {
    if (this.isSelectedRequest()) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.onLoad()
    } else this.hideSidebar(this.name)
  }
}
</script>
