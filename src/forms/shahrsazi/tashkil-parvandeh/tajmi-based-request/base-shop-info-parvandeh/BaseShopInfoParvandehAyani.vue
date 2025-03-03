<template>
  <fit>
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
    <safa-tabs
      v-model="currentTab"
      height="100%"
      class="fit"
    >
      <template v-slot:tabs>
        <tab-menu
          v-for="({name, title}) in tabs"
          :key="name"
          :name="name"
          :label="title"
        />

      </template>
      <tab-content
        name="baseOwner"
        title="آدرس و مالکین"
      >
        <TabAddressAndOwner v-bind="passedProps" />
      </tab-content>
      <tab-content
        name="baseInfo"
        title="مشخصات"
      >
        <TabShopInfo v-bind="passedProps" />
      </tab-content>
      <tab-content
        name="baseArchive"
        title="سوابق"
      >
        <TabArchive v-bind="passedProps" />
      </tab-content>
      <tab-content
        name="baseUsing"
        title="نوع استفاده"
        :padding="false"
      >
        <TabBaseUsing v-bind="passedProps" />
      </tab-content>
      <tab-content
        name="baseFront"
        title="پیشامدگی ها"
         :padding="false"
      >
        <TabBaseFront v-bind="passedProps" />
      </tab-content>
      <tab-content
        name="baseSubscription"
        title="امتیازات و اشتراکات"
        :padding="false"
      >
        <TabSubscription v-bind="passedProps" />
      </tab-content>
      <tab-content
        name="baseParking"
        title="پارکینگ و دهانه"
      >
        <TabParking v-bind="passedProps" />
      </tab-content>
      <tab-content
        name="comments"
        title="توضیحات"
      >
        <TabComment v-bind="passedProps" />
      </tab-content>

    </safa-tabs>

    <form-actions
      v-if="!readOnly"
      :m="mode"
      @edit="handleEdit"
      @save="save"
      @cancel="handleCancel"
      class="q-pt-sm"
    >
      <template #after>
        <btn-default
          label="کپی به مجاز پایانکار"
          @click="handleCopyToMojazPayankar"
      />
      </template>
    </form-actions>
  </fit>
</template>

<script>
import TabAddressAndOwner from './partials/TabAddressAndOwner'
import TabShopInfo from './partials/TabShopInfo'
import TabArchive from './partials/TabArchive'
import TabBaseUsing from './partials/TabBaseUsing'
import TabBaseFront from './partials/TabBaseFront'
import TabSubscription from './partials/TabSubscription'
import TabParking from './partials/TabParking'
import TabComment from './partials/TabComment'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'BaseShopInfoParvandehAyani',
  mixins: [baseFormMixin],
  components: {
    TabAddressAndOwner,
    TabShopInfo,
    TabArchive,
    TabBaseUsing,
    TabBaseFront,
    TabSubscription,
    TabParking,
    TabComment
  },

  props: {
    value: Object,
    nosaziCode: Object,
    readOnly: Boolean,
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
    }
  },

  data () {
    return {
      result: null,
      resultSave: null,
      currentTab: 'baseOwner',
      tabs: [
        {
          name: 'baseOwner',
          title: 'آدرس و مالکین'
        },
        {
          name: 'baseInfo',
          title: 'مشخصات'
        },
        {
          name: 'baseArchive',
          title: 'سوابق'
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
          name: 'baseSubscription',
          title: ' امتیازات و اشتراکات'
        },
        {
          name: 'baseParking',
          title: 'پارکینگ و دهانه'
        },
        {
          name: 'comments',
          title: 'توضیحات'
        }
      ]
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.nosaziCode.District
        }
      }
    },
    passedProps () {
      return { value: this.value, m: this.mode }
    }
  },

  methods: {
    handleEdit () {
      this.isEditable = true
      this.$emit('changeEditMode', this.isEditable)
    },
    handleCancel () {
      this.load()
      this.isEditable = false
      this.$emit('changeEditMode', this.isEditable)
    },
    handleCopyToMojazPayankar () {
      this.showConfirm('آیا از کپی اطلاعات به مجاز پایانکار اطمینان دارید؟').onOk(
        () => {
          this.showSending()
          this.$services.SC.copyToMojazPayankar(
            {
              pFromNidBase: this.nosaziCode.NidBase
            },
            {
              config: {
                District: this.nosaziCode.District
              }
            }
          )
            .then(async ({ data }) => {
              this.result = this.getResponse(data)
              if (this.result.success) {
                this.showSuccess('کپی به مجاز پایانکار با موفقیت انجام شد')
                await this.log({
                  action: this.logActions.copyToMojazPayankar,
                  bizCode: this.nosaziCode.NidBase,
                  bizCodeTitle: 'NidBase',
                  saveDesc: `کپی به مجاز پایانکار با موفقیت انجام گردید`
                })
              } else {
                this.showError('انجام نشد')
              }
            })
            .catch((response) => {
              this.result = this.getResponse(response)
              this.showError('انجام نشد')
            })
            .finally(() => {
              this.hideLoading()
            })
        }
      )
    },
    normalizeBaseOwner () {
      return this.value.Base_Owner.map(m => {
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
          AyanHabeh: m.AyanHabeh || null,
          ToftSir: m.ToftSir || null,
          EconomicID: m.EconomicID || null,
          IDCardNo: m.IDCardNo || null,
          OwnerFatherName: m.OwnerFatherName || '',
          OwnerLastName: m.OwnerLastName || '',
          OwnerName: m.OwnerName || '',
          Telephone: m.Telephone || null,
          ToftHabeh: m.ToftHabeh || null
        }
      })
    },
    normalizeBaseOtherEquipment () {
      return this.value.Base_OtherEquipment.map(m => {
        return {
          ...m,
          CI_ShahrsazRequestType: m.CI_ShahrsazRequestType || null,
          OtherEquipmentValue: m.OtherEquipmentValue || null,
          CI_Suggest: m.CI_Suggest || null
        }
      })
    },
    normalizeBaseShahrsaziArchive () {
      return this.value.Base_ShahrsaziArchive.map(m => {
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
      return this.value.Base_ShahrsaziArchiveHouse.map(m => {
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
      return this.value.Base_Commission77History.map(m => {
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
      return this.value.Base_CommissionHistory.map(m => {
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
    normalizeBaseSubScription () {
      return this.value.Base_SubScription.map(m => {
        return {
          ...m,
          BillID: m.BillID || null,
          BuildingNo: m.BuildingNo || null,
          InstallationDate: m.InstallationDate || null,
          SubScriptionVal: m.SubScriptionVal || null,
          CounterSerial: m.CounterSerial || null,
          FileNumber: m.FileNumber || null,
          ElectricityType: m.ElectricityType || null
        }
      })
    },
    normalizeBaseInstallationBuilding () {
      return this.value.Base_Installation.map(m => {
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
    normalizeBaseUsing () {
      return this.value.Base_Using.map(m => {
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
    normalizeBase_Front () {
      return this.value.Base_Front.map(m => {
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
      return this.value.Base_Parking.map(m => {
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
    normalizeBaseGap () {
      return this.value.Base_Gap.map(m => {
        return {
          ...m,
          PathWidth: m.PathWidth || null
        }
      })
    },
    async save () {
      if (!this.isValidForm()) return
      try {
        this.showLoading()
        this.value.Base_Owner = this.normalizeBaseOwner()
        this.value.Base_OtherEquipment = this.normalizeBaseOtherEquipment()
        this.value.Base_ShahrsaziArchive = this.normalizeBaseShahrsaziArchive()
        this.value.Base_ShahrsaziArchiveHouse = this.normalizeBaseShahrsaziArchiveHouse()
        this.value.Base_Commission77History = this.normalizeBase_Commission77History()
        this.value.Base_CommissionHistory = this.normalizeBaseCommissionHistory()
        this.value.Base_Using = this.normalizeBaseUsing()
        this.value.Base_Front = this.normalizeBase_Front()
        this.value.Base_SubScription = this.normalizeBaseSubScription()
        this.value.Base_Parking = this.normalizeBaseParking()
        this.value.Base_Gap = this.normalizeBaseGap()
        this.value.Base_Installation = this.normalizeBaseInstallationBuilding()

        const shopInfo = this.value.Base_ShopInfo
        shopInfo.TotalArea = shopInfo.TotalArea || 0
        shopInfo.ToftImpart = shopInfo.ToftImpart || 0
        shopInfo.DarbandCount = shopInfo.DarbandCount || 0
        shopInfo.FreeSpaceNoTradingArea = shopInfo.FreeSpaceNoTradingArea || 0
        shopInfo.Hight = shopInfo.Hight || 0
        shopInfo.ValBlockRowNo = shopInfo.ValBlockRowNo || 0
        const { data } = await this.$services.SC.saveParvandehShop(
          {
            PObj: this.value,
            pUser: this.currentUser,
            pDtoWorkflowData: {
              StateName: null,
              WorkflowGuid: '00000000-0000-0000-0000-000000000000'
            }
          },
          this.config
        )
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          this.showSuccess('ذخیره با موفقیت انجام شد')
          await this.log({
            action: this.logActions.save,
            bizCode: this.value._nidBase,
            bizCodeTitle: '_nidBase'
          })

          this.load()
        }
      } catch (e) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    load () {
      this.isEditable = false
      this.$emit('load')
    }
  }
}
</script>
