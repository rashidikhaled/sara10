<template>
  <safa-form
    :id="formKey"
    :caption="title"
  >
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
    <fit>
      <safa-tabs v-model="activeTabGlobal.currentTab">
        <template v-slot:tabs>
          <tab-menu
            v-for="({name, title}) in tabs"
            :key="name"
            :name="name"
            :label="title"
          />
        </template>
        <tab-content
          name="apartmentInfo"
          title="مشخصات آپارتمان"
        >
          <TabBaseApartment
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>

        <tab-content
          name="baseOwners"
          title="مشخصات ثبتی و نوع مالکین"
        >
          <TabBaseOwner
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>

        <tab-content
          name="baseUsing"
          title="نوع استفاده"
           :padding="false"
        >
          <TabBaseUsing
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>

        <tab-content
          name="baseFront"
          title="پیش آمدگی"
           :padding="false"
        >
          <TabBaseFront
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>

        <tab-content
          name="baseCommons"
          title="مشاعات"
           :padding="false"
        >
          <TabBaseCommons
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>

        <tab-content
          name="baseParking"
          title="پارکینگ"
        >
          <TabBaseParkings
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>

        <tab-content
          name="baseOther"
          title="سایر"
           :padding="false"
        >
          <TabBaseOther
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>

        <tab-content
          name="comments"
          title="توضیحات"
           :padding="false"
        >
          <TabBaseComment
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
      </safa-tabs>

      <form-actions
        v-if="!readOnly"
        :m="mode"
        @edit="isEditable = true"
        @save="handleSaveAction"
        @cancel="load"
        editSPId="bef0df04-3687-4868-9885-bc0ecff6d871"
        class="q-my-sm"
      >
      </form-actions>
    </fit>
  </safa-form>
</template>

<script>
import apartmentRequestModel from './models/apartmentRequest'
import TabBaseApartment from './partials/TabBaseApartment'
import TabBaseOwner from './partials/TabBaseOwner'
import TabBaseUsing from './partials/TabBaseUsing'
import TabBaseFront from './partials/TabBaseFront'
import TabBaseCommons from './partials/TabBaseCommons'
import TabBaseParkings from './partials/TabBaseParkings'
import TabBaseOther from './partials/TabBaseOther'
import TabBaseComment from './partials/TabBaseComment'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  name: 'BaseApartmentInfoAudit',
  mixins: [baseFormMixin],
  components: {
    TabBaseApartment,
    TabBaseOwner,
    TabBaseUsing,
    TabBaseFront,
    TabBaseCommons,
    TabBaseParkings,
    TabBaseOther,
    // TabBaseArchive,
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
    value: Object,
    readOnly: Boolean,
    // formKey: {
    //   type: String,
    //   default: '',
    //   required: true
    // },
    // title: {
    //   type: String,
    //   default: '',
    //   required: true
    // },
    // name: {
    //   type: String,
    //   default: '',
    //   required: true
    // },
    baseNosaziCode: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      name: 'BaseApartmentInfoAudit',
      formKey: '99607e1d-b772-482c-93d7-608268a8d105',
      title: 'شهرسازی- اطلاعات ممیزی آپارتمان',
      result: null,
      main: true, // این فرم به صورت فرم اصلی هم در گردش کار استفاده شده برای همین این فید باید اضافه بشه
      resultSave: null,
      currentTab: 'apartmentInfo',
      currentData: { ...apartmentRequestModel },
      tabs: [
        {
          name: 'apartmentInfo',
          title: ' مشخصات آپارتمان'
        },
        {
          name: 'baseOwners',
          title: 'مشخصات ثبتی و مالکین'
        },
        {
          name: 'baseUsing',
          title: 'کاربری ها'
        },
        {
          name: 'baseFront',
          title: 'پیشامدگی ها'
        },
        {
          name: 'baseCommons',
          title: ' مشاعات'
        },
        {
          name: 'baseParking',
          title: 'پارکینگ'
        },
        {
          name: 'baseOther',
          title: 'سایر'
        },
        // {
        //   name: 'baseArchive',
        //   title: 'سوابق'
        // },
        {
          name: 'comments',
          title: 'توضیحات'
        }
      ]
    }
  },

  computed: {
    passedProps () {
      return { m: this.mode }
    }
  },

  methods: {
    normalizeBaseShahrsaziArchive () {
      return this.currentData.Base_ShahrsaziArchive.map(m => {
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
      return this.currentData.Base_ShahrsaziArchiveHouse.map(m => {
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
    normalizeBase_Commission77History () {
      return this.currentData.Base_Commission77History.map(m => {
        return {
          ...m,
          CI_Commission: m.CI_Commission || null,
          CI_RequestType: m.CI_RequestType || null,
          CI_VoteType: m.CI_VoteType || null,
          IsStatusRunVote: m.IsStatusRunVote || null,
          NidProc: m.NidProc || null,
          ProclamationDate: m.ProclamationDate || null,
          SendNo: m.SendNo || null,
          VoteNo: m.VoteNo || null
        }
      })
    },
    normalizeBaseCommissionHistory () {
      return this.currentData.Base_CommissionHistory.map(m => {
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
      return this.currentData.Base_OtherEquipment.map(m => {
        return {
          ...m,
          CI_ShahrsazRequestType: m.CI_ShahrsazRequestType || null
        }
      })
    },
    normalizeBase_Front () {
      return this.currentData.Base_Front.map(m => {
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
    normalizeBaseOwner () {
      return this.currentData.Base_Owner.map(m => {
        return {
          ...m,
          ActDate: m.ActDate || null,
          Address: m.Address || null,
          AyanSir: m.AyanSir || null,
          BirthDate: m.BirthDate || null,
          BuildingNo: m.BuildingNo || null,
          CellPhone: m.CellPhone || null,
          Comments: m.Comments || null,
          DocNo: m.DocNo || null,
          EmissionPlace: m.EmissionPlace || null,
          NationalCode: m.NationalCode || null,
          NidOwnerBank: m.NidOwnerBank || null,
          PostCode: m.PostCode || null,
          ToftSir: m.ToftSir || null,
          AyanHabeh: m.AyanHabeh || 0,
          AyanImpart: m.AyanImpart || 0,
          IDCardNo: m.IDCardNo || 0,
          ToftHabeh: m.ToftHabeh || 0,
          ToftImpart: m.ToftImpart || 0
        }
      })
    },

    normalizeBaseUsing () {
      return this.currentData.Base_Using.map(m => {
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
      return this.currentData.Base_SubScription.map(m => {
        return {
          ...m,
          BuildingNo: m.BuildingNo || null,
          InstallationDate: m.InstallationDate || null,
          SubScriptionVal: m.SubScriptionVal || null
        }
      })
    },
    normalizeBaseParking () {
      return this.currentData.Base_Parking.map(m => {
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
      return this.currentData.Base_OtherEquipment.map(m => {
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
    normalizeBaseInstallation () {
      return this.currentData.Base_Installation.map(m => {
        return {
          ...m,
          Area: m.Area || null,
          Length: m.Length || null,
          Volume: m.Volume || null,
          Width: m.Width || null,
          Height: m.Height || null
        }
      })
    },
    handleSaveAction () {
      if (!this.isValidForm()) return
      this.showSending()
      this.currentData.Base_ShahrsaziArchive = this.normalizeBaseShahrsaziArchive()
      this.currentData.Base_ShahrsaziArchiveHouse = this.normalizeBaseShahrsaziArchiveHouse()
      this.currentData.Base_Commission77History = this.normalizeBase_Commission77History()
      this.currentData.Base_SubScription = this.normalizeBaseSubScription()
      this.currentData.Base_Parking = this.normalizeBaseParking()
      this.currentData.Base_OtherEquipment = this.normalizeBaseOtherEquipment()
      this.currentData.Base_CommissionHistory = this.normalizeBaseCommissionHistory()
      this.currentData.Base_Installation = this.normalizeBaseInstallation()
      const apartmentInfo = this.currentData.Base_CommonEstate
      apartmentInfo.FloorDone = apartmentInfo.FloorDone || 0
      apartmentInfo.ViewArea = apartmentInfo.ViewArea || 0
      apartmentInfo.RegisterSection =
                apartmentInfo.RegisterSection || 0
      apartmentInfo.Populations = apartmentInfo.Populations || 0
      apartmentInfo.CommercialGapWidth =
                apartmentInfo.CommercialGapWidth || 0

      const apartmentOwner = this.currentData.Base_ApartmentInfo
      apartmentOwner.TotalArea = apartmentOwner.TotalArea || 0
      apartmentOwner.SharingInfrastructure =
                apartmentOwner.SharingInfrastructure || 0
      apartmentOwner.ToftImpart = apartmentOwner.ToftImpart || 0
      apartmentOwner.CommercialDoorCount =
                apartmentOwner.CommercialDoorCount || 0
      apartmentOwner.CommercialGapWidth =
                apartmentOwner.CommercialGapWidth || 0
      apartmentOwner.CommercialDoorCount =
                apartmentOwner.CommercialDoorCount || 0
      this.currentData.Base_Commission77History.forEach(function (itm) {
        itm.CI_RequestType = itm.CI_Commission
      })

      this.currentData.Base_OtherEquipment = this.normalizeBase_OtherEquipment()

      this.currentData.Base_Front = this.normalizeBase_Front()
      this.currentData.Base_Owner = this.normalizeBaseOwner()
      this.currentData.Base_Using = this.normalizeBaseUsing()
      this.$services.SC.saveParvandehApartment(
        {
          PObj: this.currentData,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: null,
            WorkflowGuid: '00000000-0000-0000-0000-000000000000'
          }
        },
        {
          config: {
            District: this.value.District
          }
        }
      )
        .then(async ({ data }) => {
          this.resultSave = this.getResponse(data)
          if (this.resultSave.success) {
            this.showSuccess('ذخیره با موفقیت انجام شد')

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: this.strNosaziCode
            })

            this.load()
          } else {
            this.showError('انجام نشد')
          }
        })
        .catch(response => {
          this.resultSave = this.getResponse(response)
          this.showError('ذخیره انجام نشد')
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    load () {
      this.isEditable = false
      this.showLoading()

      return this.$services.SC.getParvandehApartment(
        {
          PNidBase: this.value.NidBase,
          PLoadFun:
            'Base_NosaziCode,Base_RegisterPlack,Base_Owner,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_Parking,Base_ApartmentInfo,Base_SharingInfrastructure,Base_OtherEquipment,Base_AddressInfo,Base_CommonEstate,Base_SubScription,Base_PreCodeInfo,Base_ShahrsaziArchive,Base_ShahrsaziArchiveHouse,Base_Attachment,MapImage,Base_File,Base_ResourceInfo,Base_AddressPostCode,Base_CommissionHistory,Base_Commission77History'
        },
        {
          config: {
            District: this.value.District
          }
        }
      )
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.currentData = this.result.data

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })
          } else {
            this.showError('انجام نشد')
          }
        })
        .catch(data => {
          this.getResponse(data)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  created () {
    this.currentData = { ...apartmentRequestModel }
  },
  mounted () {
    this.load()
  }
}
</script>
