<template>
  <fit>
    <safa-status :result="result"/>
    <safa-status :result="resultSave"/>

    <safa-tabs
      v-model="currentTab"
      :bordered="false"
      class="fit"
      height="100%"
    >
      <template v-slot:tabs>
        <tab-menu
          v-for="({name, title}) in tabs"
          :key="name"
          :label="title"
          :name="name"
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
        title="مشخصات ثبتی و مالکین"
      >
        <TabBaseOwner
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>

      <tab-content
        :padding="false"
        name="baseUsing"
        title="نوع استفاده"
      >
        <TabBaseUsing
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>

      <tab-content
        :padding="false"
        name="baseFront"
        title="پیشامدگی ها"
      >
        <TabBaseFront
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>

      <tab-content
        name="baseCommons"
        title="مشاعات"
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
      >
        <TabBaseOther
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>

      <tab-content
        name="baseArchive"
        title="سوابق"
      >
        <TabBaseArchive
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>

      <tab-content
        name="comments"
        title="توضیحات"
      >
        <TabBaseComment
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
    </safa-tabs>

    <form-actions
      :m="mode"
      class="q-pb-sm q-pl-sm"
      @cancel="load"
      @edit="isEditable = true"
      @save="handleSaveAction"
    >
      <template #after>
        <btn-default
          label="کپی به مجاز پایانکار"
          @click="handleCopyToMojazPayankar"
        />
        <btn-default label="کپی اطلاعات"/>
        <btn-default label="گزارش" @click="print"/>
      </template>
    </form-actions>
  </fit>
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
import TabBaseArchive from './partials/TabBaseArchive'
import TabBaseComment from './partials/TabBaseComment'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'BaseApartmentInfoParvandeh',
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
    value: Object,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    },
    parentNosaziCode: Object,
    mainNosaziCodeInfo: Object
  },

  data () {
    return {
      result: null,
      resultSave: null,
      currentTab: 'apartmentInfo',
      currentData: { ...apartmentRequestModel },
      isView: false,
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
          title: 'نوع استفاده'
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
        {
          name: 'baseArchive',
          title: 'سوابق'
        },
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
    async print () {
      const reportPath =
        '/Sara8Reports/RptApartmentInfo&ReportParamete='
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidBase: this.mainNosaziCodeInfo.MainObj.NidBase,
        RptDomain: '1@2@3@4@5@6@7@8@9@10@11@12@80',
        District: this.parentNosaziCode.District,
        NidNosaziCode: this.mainNosaziCodeInfo.MainObj.NidNosaziCode
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: 'RptApartmentInfo',
        bizCodeTitle: 'گزارش',
        nosaziCode: this.selectedRequest.BizCode
      })
    },
    // normalizeBaseOwner () {
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
    //       ToftImpart: m.ToftImpart || 0
    //     }
    //   })
    // },
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
          SubScriptionVal: m.SubScriptionVal || null,
          BillID: m.BillID || null,
          CounterSerial: m.CounterSerial || null,
          ElectricityType: m.ElectricityType || null,
          FileNumber: m.FileNumber || null
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
    normalizeBaseFront () {
      return this.currentData.Base_Front.map(m => {
        return {
          ...m,
          CI_RoofType: m.CI_RoofType || null,
          CI_FrontStatus: m.CI_FrontStatus || null,
          DWGObjectID: m.DWGObjectID || 0,
          DWGObjectName: m.DWGObjectName || null
        }
      })
    },
    normalizeBaseInstallation () {
      return this.currentData.Base_Installation.map(m => {
        return {
          ...m,
          Area: m.Area || null,
          Height: m.Height || null,
          Length: m.Length || null,
          Volume: m.Volume || null,
          Width: m.Width || null
        }
      })
    },
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
    normalizeBaseCommission77History () {
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
    newGuid () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    },
    handleSaveAction () {
      if (!this.isValidForm()) return
      this.showLoading()
      if (this.currentData.Base_Owner) {
        for (let i = 0; i < this.currentData.Base_Owner.length; i++) {
          for (let j = 0; j < this.currentData.Base_Owner.length; j++) {
            const x = this.currentData.Base_Owner[i]
            const y = this.currentData.Base_Owner[j]
            if ((x.NidOwner === y.NidOwner || '00000000-0000-0000-0000-000000000000') && i !== j) {
              // return this.showError('تکراری NidOwner')
              y.NidOwner = this.newGuid()
            }
          }
        }
      }
      this.currentData.Base_Owner = this.currentData.Base_Owner.map(x => {
        return {
          ...x,
          NidBase: x.isNew ? undefined : x.NidBase,
          NidOwner: x.isNew ? undefined : x.NidOwner,
          'ActDate': x.ActDate || null,
          'Address': '',
          'AyanDang': x.AyanDang || 0,
          'AyanHabeh': x.AyanHabeh || 0,
          'AyanImpart': x.AyanImpart || 0,
          'AyanSir': x.AyanSir || 0,
          'AyanTotalImpart': x.AyanTotalImpart || 0,
          'BirthDate': x.BirthDate || '',
          'BuildingNo': x.BuildingNo || 0,
          'NidOwnerBank': x.NidOwnerBank || null,
          'ToftDang': x.ToftDang || 0,
          'ToftHabeh': x.ToftHabeh || 0,
          'ToftImpart': x.ToftImpart || 0,
          'ToftSir': x.ToftSir || 0,
          DateCheckSabt: x.DateCheckSabt || null,
          EconomicID: x.EconomicID || null,
          'ToftTotalImpart': x.ToftTotalImpart || 0
        }
      })
      // this.currentData.Base_Owner = this.normalizeBaseOwner()
      this.currentData.Base_Using = this.normalizeBaseUsing()
      this.currentData.Base_SubScription = this.normalizeBaseSubScription()
      this.currentData.Base_Parking = this.normalizeBaseParking()
      this.currentData.Base_OtherEquipment = this.normalizeBaseOtherEquipment()
      this.currentData.Base_Front = this.normalizeBaseFront()
      this.currentData.Base_Installation = this.normalizeBaseInstallation()
      this.currentData.Base_ShahrsaziArchive = this.normalizeBaseShahrsaziArchive()
      this.currentData.Base_ShahrsaziArchiveHouse = this.normalizeBaseShahrsaziArchiveHouse()
      this.currentData.Base_CommissionHistory = this.normalizeBaseCommissionHistory()
      this.currentData.Base_Commission77History = this.normalizeBaseCommission77History()
      const commonEstate = this.currentData.Base_CommonEstate
      commonEstate.FloorDone = commonEstate.FloorDone || 0
      commonEstate.ViewArea = commonEstate.ViewArea || 0
      commonEstate.Populations = commonEstate.Populations || 0
      commonEstate.CommercialGapWidth = commonEstate.CommercialGapWidth || 0

      const apartmentInfo = this.currentData.Base_ApartmentInfo
      apartmentInfo.TotalArea = apartmentInfo.TotalArea || 0
      apartmentInfo.SharingInfrastructure = apartmentInfo.SharingInfrastructure || 0
      apartmentInfo.ToftImpart = apartmentInfo.ToftImpart || 0
      apartmentInfo.CommercialDoorCount = apartmentInfo.CommercialDoorCount || 0

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
            await this.log({
              action: this.logActions.save,
              bizCode: this.currentData._nidBase,
              bizCodeTitle: 'NidBase',
              nosaziCode: this.value.key
            })

            this.showSuccess('ذخیره با موفقیت انجام شد')
            this.load()
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    handleCopyToMojazPayankar () {
      this.showConfirm(
        'آیا از کپی اطلاعات به مجاز پایانکار آپارتمان اطمینان دارید؟'
      ).onOk(() => {
        this.showSending()
        this.$services.SC.copyToMojazPayankar(
          {
            pFromNidBase: this.value.NidBase
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
              await this.log({
                action: this.logActions.copyToMojazPayankar,
                bizCode: this.value.NidBase,
                bizCodeTitle: 'NidBase',
                nosaziCode: this.value.key
              })

              this.showSuccess('کپی به مجاز پایانکار با موفقیت انجام شد')
            } else {
              this.showError('انجام نشد')
            }
          })
          .catch(response => {
            this.result = this.getResponse(response)
            this.showError('ذخیره انجام نشد')
          })
          .finally(() => {
            this.hideLoading()
          })
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
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.value.NidBase,
                bizCodeTitle: 'NidBase',
                nosaziCode: this.value.key
              })
            }
            this.isView = true
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
