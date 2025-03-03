<template>
  <safa-form :id="formKey" :caption="title" appId="ACE63A06-E835-457D-A1EA-3B477DD9E69B">
    <fit>
      <safa-status :result="getParvandehApartmentRes" />
      <safa-status :result="saveParvandehApartmentRes" />
      <safa-status :result="requestResult" />
      <safa-status :result="copyToMojazPayankarRes" />
      <safa-status :result="copyRequestResult" />
      <safa-tabs
        v-model="activeTabGlobal.currentTab"
        height="100%"
        class="fit"
        :bordered="false"
      >
        <template v-slot:tabs>
          <tab-menu
            v-for="{ name, title } in tabs"
            :key="name"
            :name="name"
            :label="title"
          />
        </template>
        <tab-content name="apartmentInfo" title="مشخصات آپارتمان">
          <TabBaseApartment
            v-model="currentData"
            v-bind="passedProps"
            :baseNosaziCode="baseNosaziCode"
            :settingData="getShahrsaziSettings"
          />
        </tab-content>
        <tab-content name="baseOwners" title="مشخصات ثبتی و مالکین">
          <TabBaseOwner
            v-model="currentData"
            v-bind="passedProps"
            :baseNosaziCode="baseNosaziCode"
            :settingData="getShahrsaziSettings"
          />
        </tab-content>
        <tab-content name="baseUsing" title="نوع استفاده" :padding="false">
          <TabBaseUsing v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="baseFront" title="پیشامدگی ها" :padding="false">
          <TabBaseFront
            v-model="currentData"
            v-bind="passedProps"
            :name="name"
            :title="title"
            :formKey="formKey"
          />
        </tab-content>
        <tab-content name="baseCommons" title="مشاعات" :padding="false">
          <TabBaseCommons v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="baseParking" title="پارکینگ">
          <TabBaseParkings v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="baseOther" title="سایر" :padding="false">
          <TabBaseOther v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="baseArchive" title="سوابق">
          <TabBaseArchive v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="comments" title="توضیحات">
          <TabBaseComment v-model="currentData" v-bind="passedProps" />
        </tab-content>
      </safa-tabs>

      <form-actions
        class="q-pa-sm"
        v-if="!readOnly"
        :m="mode"
        @edit="handleEdit"
        @save="save"
        @cancel="handleCancel"
        editSPId="784d83d7-6e29-49b3-91ff-4278937f5ebd"
      >
        <template #after>
          <btn-default
            label="کپی به مجاز پایانکار"
            @click="handleCopyToMojazPayankar"
            spCaption="کپی به مجاز پایانکار"
            spId="2e278463-76eb-40e2-ac0e-cf6fae740b1c"
          />
          <btn-default
            label="کپی اطلاعات"
            @click="isShowCopyDataModal = true"
            spCaption="کپی اطلاعات"
            spId="17e28a3a-996d-4d03-9e0a-c0d75c99a29f"
          />
          <btn-default label="گزارش" @click="print" />
        </template>
      </form-actions>
      <safa-popup
        title="کپی اطلاعات تشکیل پرونده"
        v-model="isShowCopyDataModal"
        width="400px"
        height="200px"
      >
        <form-wrapper :padding="false">
          <div class="row justify-center">
            <div class="col-auto">
              <nosazi-code-input
                v-model="baseNosaziCode"
                label="کد نوسازی مقصد"
                @input="handleBaseNosaziCodeChanged"
              />
            </div>
          </div>
          <template v-slot:footer>
            <div class="row q-gutter-x-sm">
              <btn-default @click="handleCopyAction" label="کپی" />
              <!-- :disabled="disableCopyBtn" -->
            </div>
          </template>
        </form-wrapper>
      </safa-popup>
    </fit>
  </safa-form>
</template>

<script>
import apartmentRequestModel from "./models/apartmentRequest"
import TabBaseApartment from "./partials/TabBaseApartment"
import TabBaseOwner from "./partials/TabBaseOwner"
import TabBaseUsing from "./partials/TabBaseUsing"
import TabBaseFront from "./partials/TabBaseFront"
import TabBaseCommons from "./partials/TabBaseCommons"
import TabBaseParkings from "./partials/TabBaseParkings"
import TabBaseOther from "./partials/TabBaseOther"
import TabBaseArchive from "./partials/TabBaseArchive"
import TabBaseComment from "./partials/TabBaseComment"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  mixins: [baseFormMixin],
  components: {
    TabBaseApartment,
    TabBaseOwner,
    TabBaseUsing,
    TabBaseFront,
    TabBaseCommons,
    TabBaseParkings,
    TabBaseOther,
    TabBaseArchive,
    TabBaseComment
  },

  props: {
    activeTabGlobal: {
      type: Object,
      default: () => {
        return {
          currentTab: "apartmentInfo"
        }
      }
    },
    baseNosaziCode: Object,
    parentBaseNosaziCode: Object,
    value: Object,
    readOnly: Boolean,
    mainNosaziCodeInfo: Object
  },

  data () {
    return {
      title: "شهرسازی- تشکیل پرونده آپارتمان",
      formKey: "4e10b4e4-f3f3-4b05-ba87-04d8a3384a26",
      name: "BaseApartmentInfoParvandeh",

      BuildingSettings: {
        ShahrsaziSettings: {
          Chk_IsCheckSabt: false,
          Chk_IsCheckSabtJson: false
        }
      },

      isView: false,
      isShowCopyDataModal: false,
      getParvandehApartmentRes: null,
      copyToMojazPayankarRes: null,
      saveParvandehApartmentRes: null,
      currentTab: "apartmentInfo",
      currentData: { ...apartmentRequestModel },
      tabs: [
        {
          name: "apartmentInfo",
          title: " مشخصات آپارتمان"
        },
        {
          name: "baseOwners",
          title: "مشخصات ثبتی و مالکین"
        },
        {
          name: "baseUsing",
          title: "نوع استفاده"
        },
        {
          name: "baseFront",
          title: "پیشامدگی ها"
        },
        {
          name: "baseCommons",
          title: " مشاعات"
        },
        {
          name: "baseParking",
          title: "پارکینگ"
        },
        {
          name: "baseOther",
          title: "سایر"
        },
        {
          name: "baseArchive",
          title: "سوابق"
        },
        {
          name: "comments",
          title: "توضیحات"
        }
      ],
      requestResult: null,
      copyRequestResult: null,
      baseLibResults: { MainObj: {} },
      disableCopyBtn: true
      // baseNosaziCode: {
      //   District: 0,
      //   Region: 0,
      //   Block: 0,
      //   House: 0,
      //   Building: 0,
      //   Apartment: 0,
      //   Shop: 0
      // }
    }
  },

  computed: {
    getShahrsaziSettings () {
      return this.BuildingSettings?.ShahrsaziSettings
    },
    config () {
      return {
        config: {
          District: this.value.District
        }
      }
    },
    passedProps () {
      return { m: this.mode }
    }
  },

  methods: {
    async print () {
      const nosaziCode = convertNosaziCodeObjectToString(
        this.parentBaseNosaziCode
      )
      const reportPath =
        "/Sara8Reports/RptApartmentInfo"
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidBase: this.mainNosaziCodeInfo.MainObj.NidBase,
        RptDomain: "1@2@3@4@5@6@7@8@9@10@11@12@80",
        District: this.parentBaseNosaziCode.District
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.mainNosaziCodeInfo.MainObj.NidBase,
        bizCodeTitle: "NidBase",
        nosaziCode: convertNosaziCodeObjectToString(this.parentBaseNosaziCode),
        saveDesc: `بارگذاری اطلاعات پرونده - آپارتمان با موفقیت برای کدنوسازی ${nosaziCode
          .split("-")
          .reverse()
          .join("-")} انجام گردید`
      })
    },
    handleBaseNosaziCodeChanged () {
      this.getBaseLibInNosaziCode()
    },
    getBaseLibInNosaziCode () {
      this.showLoading()
      let data = {
        pNosaziCode: {
          Apartment: this.baseNosaziCode.Apartment,
          Block: this.baseNosaziCode.Block,
          Building: this.baseNosaziCode.Building,
          CI_City: 0,
          District: this.baseNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.baseNosaziCode.House,
          IsRoot: "false",
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
        pIsLoadDeletedNosaziCode: false
      }

      this.$services.SA.getBaseLibInNosaziCode(data)
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.baseLibResults = this.requestResult.data
            // this.disableCopyBtn = false
            await this.log({
              action: this.logActions.view,
              bizCode: this.mainNosaziCodeInfo.MainObj.NidBase,
              bizCodeTitle: "NidBase",
              nosaziCode: convertNosaziCodeObjectToString(
                this.parentBaseNosaziCode
              )
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
    handleCopyAction () {
      this.transferResult = null
      this.showConfirm("آیااز کپی اطلاعات اطمینان دارید؟").onOk(() => {
        this.copyInfo()
      })
    },
    copyInfo () {
      this.showLoading()
      let payLoad = {
        pFromNidBase: this.mainNosaziCodeInfo.MainObj.NidBase,
        pToNidBase:
          this.baseLibResults.MainObj && this.baseLibResults.MainObj.NidBase,
        pCount: 1,
        pNidUser: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        pFillGap: true
      }
      this.$services.SC.copy(payLoad)
        .then(async ({ data }) => {
          this.copyRequestResult = this.getResponse(data)

          if (this.copyRequestResult.success) {
            this.showSuccess("کپی اطلاعات با موفقیت انجام شد.")
            const nosaziCode = convertNosaziCodeObjectToString(
              this.parentBaseNosaziCode
            )
            await this.log({
              action: this.logActions.copy,
              bizCode: this.mainNosaziCodeInfo.MainObj.NidBase,
              bizCodeTitle: "NidBase",
              nosaziCode,
              saveDesc: `کپی اطلاعات پرونده - آپارتمان با موفقیت برای کدنوسازی ${nosaziCode
                .split("-")
                .reverse()
                .join("-")} انجام گردید`
            })
            this.isShowCopyDataModal = false
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
    handleEdit () {
      this.isEditable = true
      this.$emit("changeEditMode", this.isEditable)
    },
    handleCancel () {
      this.load()
      this.isEditable = false
      this.$emit("changeEditMode", this.isEditable)
    },
    handleCopyToMojazPayankar () {
      const handler = async () => {
        try {
          this.showSending()

          const { data } = await this.$services.SC.copyToMojazPayankar(
            { pFromNidBase: this.value.NidBase },
            this.config
          )
          this.copyToMojazPayankarRes = this.getResponse(data)
          if (this.copyToMojazPayankarRes.success) {
            this.showSuccess("کپی به مجاز پایانکار با موفقیت انجام شد")
            const nosaziCode = convertNosaziCodeObjectToString(
              this.parentBaseNosaziCode
            )
            await this.log({
              action: this.logActions.copyToMojazPayankar,
              bizCode: this.value.NidBase,
              bizCodeTitle: "NidBase",
              nosaziCode,
              saveDesc: `کپی به مجاز پایانکار اطلاعات پرونده - آپارتمان با موفقیت برای کدنوسازی ${nosaziCode
                .split("-")
                .reverse()
                .join("-")} انجام گردید`
            })
          }
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm(
        "آیا از کپی اطلاعات به مجاز پایانکار آپارتمان اطمینان دارید؟"
      ).onOk(handler)
    },
    newGuid () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8
          return v.toString(16)
        }
      )
    },
    normalizeBaseSubScription () {
      return this.currentData.Base_SubScription.map((m) => {
        return {
          ...m,
          BuildingNo: m.BuildingNo || null,
          InstallationDate: m.InstallationDate || null,
          SubScriptionVal: m.SubScriptionVal || null,
          BillID: m.BillID || null,
          CounterSerial: m.CounterSerial || null,
          ElectricityType: m.ElectricityType || null,
          FileNumber: m.FileNumber || null
        }
      })
    },
    normalizeBaseShahrsaziArchive () {
      return this.currentData.Base_ShahrsaziArchive.map((m) => {
        return {
          ...m,
          NidProc: m.NidProc || null,
          CertificateDate: m.CertificateDate || null,
          CertificateNo: m.CertificateNo || null,
          CreditDate: m.CreditDate || null,
          BuildingNo: m.BuildingNo || 0
        }
      })
    },
    async save () {
      for (let i = 0; i < this.currentData.Base_Owner.length; i++) {
        for (let j = 0; j < this.currentData.Base_Owner.length; j++) {
          const x = this.currentData.Base_Owner[i]
          const y = this.currentData.Base_Owner[j]
          if (
            (x.NidOwner === y.NidOwner ||
              "00000000-0000-0000-0000-000000000000") &&
            i !== j
          ) {
            // return this.showError('تکراری NidOwner')
            y.NidOwner = this.newGuid()
          }
        }
      }
      this.currentData.Base_Owner = this.currentData.Base_Owner.map((x) => {
        return {
          ...x,
          NidBase: x.isNew ? undefined : x.NidBase,
          NidOwner: x.isNew ? undefined : x.NidOwner,
          ActDate: x.ActDate || null,
          Address: x.Address || "",
          AyanDang: x.AyanDang || 0,
          AyanHabeh: x.AyanHabeh || 0,
          AyanImpart: x.AyanImpart || 0,
          AyanSir: x.AyanSir || 0,
          AyanTotalImpart: x.AyanTotalImpart || 0,
          BirthDate: x.BirthDate || "",
          BuildingNo: x.BuildingNo || 0,
          NidOwnerBank: x.NidOwnerBank || null,
          ToftDang: x.ToftDang || 0,
          ToftHabeh: x.ToftHabeh || 0,
          ToftImpart: x.ToftImpart || 0,
          ToftSir: x.ToftSir || 0,
          ToftTotalImpart: x.ToftTotalImpart || 0
        }
      })
      this.currentData.Base_SubScription = this.normalizeBaseSubScription()
      this.currentData.Base_ShahrsaziArchive =
        this.normalizeBaseShahrsaziArchive()
      try {
        this.showSending()
        const { data } = await this.$services.SC.saveParvandehApartment(
          {
            PObj: this.currentData,
            pUser: this.currentUser,
            PDtoWorkflowData: {
              StateName: null,
              WorkflowGuid: "00000000-0000-0000-0000-000000000000"
            }
          },
          this.config
        )
        this.saveParvandehApartmentRes = this.getResponse(data)
        if (this.saveParvandehApartmentRes.success) {
          this.showSuccess("ذخیره اطلاعات با موفقیت انجام شد.")
          const nosaziCode = convertNosaziCodeObjectToString(
            this.parentBaseNosaziCode
          )
          await this.log({
            action: this.logActions.save,
            bizCode: this.mainNosaziCodeInfo.MainObj.NidBase,
            bizCodeTitle: "NidBase",
            nosaziCode,
            saveDesc: `ذخیره اطلاعات پرونده - آپارتمان با موفقیت برای کدنوسازی ${nosaziCode
              .split("-")
              .reverse()
              .join("-")} انجام گردید`
          })
          this.$emit("changeEditMode", false)
          this.load()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      this.isEditable = false
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getParvandehApartment(
          {
            PNidBase: this.value.NidBase,
            PLoadFun:
              "Base_NosaziCode,Base_RegisterPlack,Base_Owner,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_Parking,Base_ApartmentInfo,Base_SharingInfrastructure,Base_OtherEquipment,Base_AddressInfo,Base_CommonEstate,Base_SubScription,Base_PreCodeInfo,Base_ShahrsaziArchive,Base_ShahrsaziArchiveHouse,Base_Attachment,MapImage,Base_File,Base_ResourceInfo,Base_AddressPostCode,Base_CommissionHistory,Base_Commission77History"
          },
          this.config
        )
        this.getParvandehApartmentRes = this.getResponse(data)
        if (this.getParvandehApartmentRes.success) {
          this.getParvandehApartmentRes.data.Base_Dig =
            this.getParvandehApartmentRes.data.Base_Dig || []
          this.currentData = this.getParvandehApartmentRes.data
          if (!this.isView) {
            const nosaziCode = convertNosaziCodeObjectToString(
              this.parentBaseNosaziCode ?? {}
            )
            await this.log({
              action: this.logActions.view,
              bizCode: this.value?.NidBase ?? "",
              bizCodeTitle: "NidBase",
              nosaziCode,
              saveDesc: `بارگذاری اطلاعات پرونده - آپارتمان با موفقیت برای کدنوسازی ${nosaziCode
                .split("-")
                .reverse()
                .join("-")} انجام گردید`
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
    async loadSettings () {
      this.BuildingSettings = await this.loadFormSetting("BuildingSettings", {
        defaultValue: this.BuildingSettings,
        nidProc: GLOBAL_SETTINGS_GUID
      })
    }
  },

  async created () {
    await this.loadSettings()
    this.currentData = { ...apartmentRequestModel }
    setTimeout(() => {
      this.load()
    }, 500)
  }
  // mounted () {
  //   this.load()
  // }
}
</script>
