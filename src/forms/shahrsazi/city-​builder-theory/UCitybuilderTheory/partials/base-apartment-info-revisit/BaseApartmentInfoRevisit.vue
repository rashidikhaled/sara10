<template>
  <safa-form
    :id="formKey"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    caption="شهرسازی- بازدید آپارتمان"
  >
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
    <fit>
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="baseParking" label="پارکینگ"/>
        <tab-menu name="baseUsing" label="کاربری ها"/>
        <tab-menu name="baseOther" label="سایر"/>

      </template>
      <tab-content name="baseParking" :padding="false">
         <TabBaseParkings  v-model="currentData" v-bind="passedProps"/>
         </tab-content>
      <tab-content name="baseUsing" :padding="false">
         <TabBaseUsing  v-model="currentData" v-bind="passedProps"/>
         </tab-content>
         <tab-content name="baseOther" :padding="false">
         <TabBaseOther  v-model="currentData" v-bind="passedProps"/>
         </tab-content>

      </safa-tabs>
      <!-- <safa-tabs
        v-model="currentTab"
        :bordered="false"
        class="fit"
        height="100%"
      >
        <template v-slot:tabs>
          <tab-menu
            v-for="{ name, title } in tabs"
            :key="name"
            :label="title"
            :name="name"
          /> -->
        <!-- </template> -->
        <!-- <tab-content name="apartmentInfo" title="مشخصات آپارتمان">
          <TabBaseApartment v-model="currentData" v-bind="passedProps" />
        </tab-content> -->
        <!-- <tab-content name="baseOwners" title="مشخصات ثبتی و مالکین">
          <TabBaseOwner v-model="currentData" v-bind="passedProps" />
        </tab-content> -->
        <!-- <tab-content :padding="false" name="baseUsing" title="کاربری ها">
          <TabBaseUsing v-model="currentData" v-bind="passedProps" />
        </tab-content> -->
        <!-- <tab-content :padding="false" name="baseFront" title="پیشامدگی ها">
          <TabBaseFront v-model="currentData" v-bind="passedProps" />
        </tab-content> -->
        <!-- <tab-content :padding="false" name="baseCommons" title="مشترکات">
          <TabBaseCommons
            v-model="currentData"
            :formkey="formKey"
            :title="title"
            v-bind="passedProps"
          />
        </tab-content> -->
        <!-- <tab-content name="baseParking" title=" پارکینگ">
          <TabBaseParkings v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content :padding="false" name="baseOther" title="سایر">
          <TabBaseOther v-model="currentData" v-bind="passedProps" />
        </tab-content> -->
        <!-- <tab-content name="baseArchive" title="سوابق">
          <TabBaseArchive v-model="currentData" v-bind="passedProps" />
        </tab-content> -->
        <!-- <tab-content name="comments" title="توضیحات">
          <TabBaseComment v-model="currentData" v-bind="passedProps" />
        </tab-content> -->
      <!-- </safa-tabs> -->

      <form-actions
        v-if="!forceReadonly"
        :m="mode"
        class="q-pa-sm"
        editSPCaption="ویرایش"
        editSPId="be22589a-f652-45b7-bf11-b5c9227909ad"
        @cancel="load"
        @edit="isEditable = true"
        @save="save"
      >
        <template #after>
          <btn-default
            label="کپی از مجاز پایانکار"
            spCaption="کپی از مجاز پایانکار"
            spId="6dcd27b8-dcdf-4e02-8ef4-8138987d0b18"
            @click="handleCopyFromMojazPayankar"
          />
        </template>
      </form-actions>
    </fit>
  </safa-form>
</template>

<script>
import apartmentRequestModel from "./models/apartmentRequest"
// import TabBaseApartment from "./partials/TabBaseApartment"
// import TabBaseOwner from "./partials/TabBaseOwner"
import TabBaseUsing from "./partials/TabBaseUsing"
// import TabBaseFront from "./partials/TabBaseFront"
// import TabBaseCommons from "./partials/TabBaseCommons"
import TabBaseParkings from "./partials/TabBaseParkings"
import TabBaseOther from "./partials/TabBaseOther"
// import TabBaseArchive from "./partials/TabBaseArchive"
// import TabBaseComment from "./partials/TabBaseComment"
import requestModel from "../base-building-info-revisit/config/requestModel"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  name: "BaseApartmentInfoRevisit",
  mixins: [baseFormMixin],
  components: {
    // TabBaseApartment,
    // TabBaseOwner,
    TabBaseUsing,
    // TabBaseFront,
    // TabBaseCommons,
    TabBaseParkings,
    TabBaseOther
    // TabBaseArchive,
    // TabBaseComment
  },

  props: {
    value: Object,
    readOnly: Boolean,
    name: String
  },

  data () {
    return {
      formKey: "fe04cccd-40ab-4328-a5a6-f48b0b793b0a",
      title: "اطلاعات بازدید آپارتمان",
      result: null,
      resultSave: null,
      currentTab: "apartmentInfo",
      activeTab: "baseParking",
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
          title: "کاربری ها"
        },
        {
          name: "baseFront",
          title: "پیشامدگی ها"
        },
        {
          name: "baseCommons",
          title: " مشترکات"
        },
        {
          name: "baseParking",
          title: "سایر امکانات و پارکینگ"
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
      ]
    }
  },

  computed: {
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
    handleCopyFromMojazPayankar () {
      const handler = async () => {
        try {
          this.showLoading()
          const { data } =
            await this.$services.SC.copyFromMojazPayankarToRevisit(
              { pNidBase_Revisit: this.value.NidBase },
              this.config
            )
          this.result = this.getResponse(data)
          if (this.result.success !== true) {
            this.showSuccess("اطلاعات از مجاز پایانکار با موفقیت کپی شد")
            await this.log({
              action: this.logActions.copyFromMojazPayankar,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `کپی اطلاعات از مجاز پایانکار برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
            })
          } else return this.showError("عملیات ناموفق بود")
        } catch (e) {
          console.error(e)
          this.showError("خطایی در سرویس رخ دارد")
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm("آیا از کپی اطلاعات مجاز پایانکار اطمینان دارید؟").onOk(
        handler
      )
    },

    normalizeBaseShahrsaziArchive () {
      return this.currentData.Base_ShahrsaziArchive.map((m) => {
        return {
          ...m,
          Comments: m.Comments || null,
          CertificateDate: m.CertificateDate || null,
          CertificateNo: m.CertificateNo || null,
          CreditDate: m.CreditDate || null,
          NidProc: m.NidProc || null,
          BuildingNo: m.BuildingNo || null,
          NidWorkItem: m.NidWorkItem || null
        }
      })
    },
    normalizeBaseShahrsaziArchiveHouse () {
      return this.currentData.Base_ShahrsaziArchiveHouse.map((m) => {
        return {
          ...m,
          Comments: m.Comments || null,
          CertificateDate: m.CertificateDate || null,
          CertificateNo: m.CertificateNo || null,
          CreditDate: m.CreditDate || null,
          NidProc: m.NidProc || null,
          BuildingNo: m.BuildingNo || null,
          NidWorkItem: m.NidWorkItem || null,
          SerialNo: m.SerialNo || 0
        }
      })
    },
    normalizeBaseCommissionHistory () {
      return this.currentData.Base_CommissionHistory.map((m) => {
        return {
          ...m,
          BuildingNo: m.BuildingNo || null,
          SendNo: m.SendNo || null,
          CI_RequestType: m.CI_RequestType || null,
          NidProc: m.NidProc || null,
          VoteNo: m.VoteNo || null
        }
      })
    },
    normalizeBase_OtherEquipment () {
      return this.currentData.Base_OtherEquipment.map((m) => {
        return {
          ...m,
          CI_ShahrsazRequestType: m.CI_ShahrsazRequestType || null
        }
      })
    },
    normalizeBase_Front () {
      return this.currentData.Base_Front.map((m) => {
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
    // normalizeBaseOwner () {
    //   // const defaultNidBase = this.value.NidBase
    //   return this.currentData.Base_Owner.map(m => {
    //     return {
    //       ...m,
    //       ActDate: m.ActDate || null,
    //       Address: m.Address || null,
    //       AyanSir: m.AyanSir || null,
    //       BirthDate: m.BirthDate || null,
    //       BuildingNo: m.BuildingNo || null,
    //       CellPhone: m.CellPhone || null,
    //       Comments: m.Comments || null,
    //       DocNo: m.DocNo || null,
    //       EmissionPlace: m.EmissionPlace || null,
    //       NationalCode: m.NationalCode || null,
    //       NidOwnerBank: m.NidOwnerBank || null,
    //       PostCode: m.PostCode || null,
    //       ToftSir: m.ToftSir || null,
    //       AyanHabeh: m.AyanHabeh || 0,
    //       AyanImpart: m.AyanImpart || 0,
    //       IDCardNo: m.IDCardNo || 0,
    //       ToftHabeh: m.ToftHabeh || 0,
    //       ToftImpart: m.ToftImpart || 0,
    //       NidBase: m.isNew ? undefined : m.NidBase,
    //       NidOwner: m.isNew ? undefined : m.NidOwner
    //       // NidBase: m.NidBase === '00000000-0000-0000-0000-000000000000' ? defaultNidBase : m.NidBase,
    //       // NidOwner: m.IsNew || m.NidOwner === '00000000-0000-0000-0000-000000000000' ? this.newGuid() : m.NidOwner
    //     }
    //   })
    // },
    normalizeBaseUsing () {
      return this.currentData.Base_Using.map((m) => {
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
    normalizeBaseSubScription () {
      return this.currentData.Base_SubScription.map((m) => {
        return {
          ...m,
          BuildingNo: m.BuildingNo || null,
          InstallationDate: m.InstallationDate || null,
          SubScriptionVal: m.SubScriptionVal || null
        }
      })
    },
    normalizeBaseParking () {
      return this.currentData.Base_Parking.map((m) => {
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
    normalizeBaseOtherEquipment () {
      return this.currentData.Base_OtherEquipment.map((m) => {
        return {
          ...m,
          CI_ShahrsazRequestType: m.CI_ShahrsazRequestType || null,
          CI_Suggest: m.CI_Suggest || null,
          Comments: m.Comments || null,
          CreateDate: m.CreateDate || null,
          OtherEquipmentValue: m.OtherEquipmentValue || null
        }
      })
    },
    findDuplicateInBaseOwnerArray (arra1) {
      var object = {}
      var DuplicateResult = []

      arra1.forEach(function (item) {
        if (!object[item]) {
          object[item] = 0
        }
        object[item] += 1
      })

      for (var prop in object) {
        if (object[prop] >= 2) {
          DuplicateResult.push(prop)
        }
      }
      return DuplicateResult
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
    async save () {
      if (
        this.currentData.Base_Owner &&
        this.currentData.Base_Owner.length > 0
      ) {
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
      }
      this.currentData.Base_Owner = this.currentData.Base_Owner.map((x) => {
        return {
          ...x,
          NidBase: x.isNew ? undefined : x.NidBase,
          NidOwner: x.isNew ? undefined : x.NidOwner,
          ActDate: x.ActDate || null,
          Address: x.Address || null,
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
          DateCheckSabt: x.DateCheckSabt || null,
          EconomicID: x.EconomicID || null,
          ToftTotalImpart: x.ToftTotalImpart || 0
        }
      })
      try {
        const commonEstate = this.currentData.Base_CommonEstate
        commonEstate.BlockNo = commonEstate.BlockNo || 0
        commonEstate.FloorDone = commonEstate.FloorDone || 0
        commonEstate.Vahed = commonEstate.Vahed || 0
        commonEstate.ViewArea = commonEstate.ViewArea || 0
        commonEstate.Populations = commonEstate.Populations || 0
        commonEstate.CommercialGapWidth = commonEstate.CommercialGapWidth || 0

        const apartmentInfo = this.currentData.Base_ApartmentInfo
        apartmentInfo.EntranceDoorNo = apartmentInfo.EntranceDoorNo || 0
        apartmentInfo.TotalArea = apartmentInfo.TotalArea || 0
        apartmentInfo.SharingInfrastructure =
          apartmentInfo.SharingInfrastructure || 0
        apartmentInfo.ToftImpart = apartmentInfo.ToftImpart || 0
        apartmentInfo.CommercialDoorCount =
          apartmentInfo.CommercialDoorCount || 0

        this.currentData.Base_ShahrsaziArchive =
          this.normalizeBaseShahrsaziArchive()
        this.currentData.Base_ShahrsaziArchiveHouse =
          this.normalizeBaseShahrsaziArchiveHouse()
        this.currentData.Base_SubScription = this.normalizeBaseSubScription()
        this.currentData.Base_Parking = this.normalizeBaseParking()
        this.currentData.Base_OtherEquipment =
          this.normalizeBaseOtherEquipment()
        this.currentData.Base_CommissionHistory =
          this.normalizeBaseCommissionHistory()
        this.currentData.Base_OtherEquipment =
          this.normalizeBase_OtherEquipment()
        this.currentData.Base_Front = this.normalizeBase_Front()
        // this.currentData.Base_Owner = this.normalizeBaseOwner()
        this.currentData.Base_Using = this.normalizeBaseUsing()

        this.showSending()
        const { data } = await this.$services.SC.saveRevisitApartment(
          {
            PObj: this.currentData,
            pUser: this.currentUser,
            pNidProc: this.value.NidProc,
            PNidRevisit: this.value.NidRevisit,
            pDtoWorkflowData: {
              StateName: null,
              WorkflowGuid: "00000000-0000-0000-0000-000000000000"
            }
          },
          this.config
        )
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          this.showSuccess("ذخیره با موفقیت انجام شد")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ذخیره اطلاعات بازدید آپارتمان برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
          })
          this.load()
        }
      } catch (e) {
        console.log("error", e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      // Reset State
      this.isEditable = false
      try {
        this.showLoading()

        // Fetch
        const { data } = await this.$services.SC.getRevisitApartment(
          {
            PNidBase: this.value.NidBase,
            PLoadFun:
              "Base_NosaziCode,Base_RegisterPlack,Base_Owner,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_Parking,Base_ApartmentInfo,Base_SharingInfrastructure,Base_OtherEquipment,Base_AddressInfo,Base_CommonEstate,Base_SubScription,Base_Attachment,MapImage,Base_ShahrsaziArchive,Base_ShahrsaziArchiveHouse,Base_File,Base_PreCodeInfo,Base_AddressPostCode,Base_CommissionHistory",
            pIsLoadDeletedNosaziCode: false
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `نمایش اطلاعات بازدید آپارتمان برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
          })
        } else return this.showError("اطلاعات بازدید بارگذاری نشد")
      } catch (e) {
        console.error(e)
        this.showError("خطایی در سرویس رخ دارد")
      } finally {
        this.hideLoading()
      }
    }
  },

  mounted () {
    this.load()
  },
  created () {
    this.currentData = { ...requestModel }
  }
}
</script>
