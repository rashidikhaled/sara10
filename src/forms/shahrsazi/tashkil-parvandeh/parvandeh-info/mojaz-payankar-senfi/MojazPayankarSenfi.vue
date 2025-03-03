<template>
  <safa-form
    :id="formKey"
    :caption="title"
  >
    <template #header>
      <safa-status :result="result" />
      <safa-status :result="resultSave" />
    </template>

    <fit>
      <safa-tabs
        v-model="currentTab"
        class="fit"
        type="fixed"
      >
        <template v-slot:tabs>
          <tab-menu
            name="addressInfo"
            label="آدرس و امتیازات"
          />
          <tab-menu
            name="specifications"
            label="مشخصات"
          />
          <tab-menu
            name="Owners"
            label="مالکین و سوابق"
          />
          <tab-menu
            name="Using"
            label="کاربری"
          />
          <tab-menu
            name="parkingInfo"
            label="پارکینگ و دهانه"
          />
          <tab-menu
            name="explanation"
            label="توضیحات"
          />
        </template>
        <tab-content
          name="addressInfo"
          title="آدرس و امتیازات"
        >
          <PartialAddressInfo
            :m="mode"
            v-model="currentData"
          />

        </tab-content>
        <tab-content
          name="specifications"
          title="مشخصات"
        >
          <PartialSpecificationsTab
            :m="mode"
            v-model="currentData"
          />

        </tab-content>
        <tab-content
          name="Owners"
          title="مالکین و سوابق"

        >
          <PartialOwnersTab
            :m="mode"
            v-model="currentData"
          />

        </tab-content>
        <tab-content
          name="Using"
          title="کاربری"
          :padding="false"
        >
          <PartialUsingTab
            :m="mode"
            v-model="currentData"
          />

        </tab-content>
        <tab-content
          name="parkingInfo"
          title="پارکینگ و دهانه"
        >
          <PartialParkingInfoTab
            :m="mode"
            v-model="currentData"
          />

        </tab-content>
        <tab-content
          name="explanation"
          title="توضیحات"
          :padding="false"
        >
          <PartialExplanationTab
            :m="mode"
            v-model="currentData"
          />
        </tab-content>
      </safa-tabs>

      <div class="q-my-sm q-ml-sm">
        <form-actions
          :m="mode"
          @edit="handleEdit"
          @cancel="handleCancel"
          @save="save"
        >
          <template #after>
            <div class="q-gutter-sm">
              <btn-default
                label=" کپی به تشکیل پرونده"
                @click="handleCopyFromMojazPayankarToParvandeh"
              ></btn-default>
            </div>
          </template>
        </form-actions>

      </div>
    </fit>
    <!-- </form-wrapper> -->
  </safa-form>
</template>

<script>
import requestModel from './model/requestModel'
import PartialAddressInfo from './partials/PartialAddressInfo'
import PartialOwnersTab from './partials/PartialOwnersTab'
import PartialParkingInfoTab from './partials/PartialParkingInfoTab'
import PartialUsingTab from './partials/PartialUsingTab'
import PartialSpecificationsTab from './partials/PartialSpecificationsTab'
import PartialExplanationTab from './partials/PartialExplanationTab'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  name: 'MojazPayankarSenfi',
  mixins: [baseFormMixin],
  components: {
    PartialAddressInfo,
    PartialOwnersTab,
    PartialParkingInfoTab,
    PartialSpecificationsTab,
    PartialUsingTab,
    PartialExplanationTab
  },

  props: {
    value: Object,
    readOnly: Boolean,
    name: {
      type: String,
      default: '',
      required: true
    },
    baseNosaziCode: Object,
    nidNosaziCode: String
  },

  data () {
    return {
      formKey: '5e57061a-db8a-4ab8-9a93-cdbe5207eb04',
      title: 'شهرسازی- مجاز پایانکار صنفی',
      main: true,
      result: null,
      resultSave: null,
      currentTab: 'addressInfo',
      currentData: { ...requestModel },
      tabs: [
        {
          name: 'addressInfo',
          title: 'آدرس و امتیازات'
        },
        {
          name: 'specifications',
          title: 'مشخصات'
        },
        {
          name: 'Owners',
          title: 'مالکین و سوابق'
        },
        {
          name: 'Using',
          title: 'کاربری'
        },
        {
          name: 'parkingInfo',
          title: 'پارکینگ و دهانه'
        },
        {
          name: 'explanation',
          title: 'توضیحات'
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
    }
  },

  methods: {
    handleEdit () {
      this.isEditable = true
      this.$emit("changeEditMode", this.isEditable)
    },
    handleCancel () {
      this.load()
      this.isEditable = false
      this.$emit("changeEditMode", this.isEditable)
    },
    normalizeBaseShahrsaziArchive () {
      return this.currentData.Base_ShahrsaziArchive.map((m) => {
        return {
          ...m,
          NidProc: m.NidProc || null,
          BuildingNo: m.BuildingNo || null,
          SerialNo: m.SerialNo || null,
          CertificateNo: m.CertificateNo || null,
          NidWorkItem: m.NidWorkItem || null,
          CertificateDate: m.CertificateDate || null,
          CreditDate: m.CreditDate || null
        }
      })
    },
    normalizeBaseSubScription () {
      return this.currentData.Base_SubScription.map((m) => {
        return {
          ...m,
          BillID: m.BillID || null,
          BuildingNo: m.BuildingNo || null,
          CounterSerial: m.CounterSerial || null,
          ElectricityType: m.ElectricityType || null,
          FileNumber: m.FileNumber || null
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
          CI_UsingPlace: m.CI_UsingPlace || null,
          CI_ViewCode: m.CI_ViewCode || null,
          ConversionDate: m.ConversionDate || null,
          DWGObjectID: m.DWGObjectID || null,
          DWGObjectName: m.DWGObjectName || null,
          Depth1Area: m.Depth1Area || null,
          Depth1No: m.Depth1No || null,
          Depth2Area: m.Depth2Area || null,
          Depth2No: m.Depth2No || null,
          Depth3Area: m.Depth3Area || null,
          Depth3No: m.Depth3No || null,
          GenerateDate: m.GenerateDate || null,
          GarbageUnit: m.GarbageUnit || null,
          IllegalInfrastructure: m.IllegalInfrastructure || null,
          MassDistance_Main: m.MassDistance_Main || null,
          MassDistance_Sub: m.MassDistance_Sub || null,
          OverOnArea: m.OverOnArea || null,
          OverOnLengthNear: m.OverOnLengthNear || null,
          OverOnTarakom: m.OverOnTarakom || null,
          OverOrNoParvaneh: m.OverOrNoParvaneh || null,
          RepairArea: m.RepairArea || null,
          UnUsefulHeight: m.UnUsefulHeight || null }
      })
    },
    normalizeBaseOtherEquipment () {
      return this.currentData.Base_OtherEquipment.map(m => {
        return {
          ...m,
          CI_ShahrsazRequestType: m.CI_ShahrsazRequestType || 0,
          Comments: m.Comments || null,
          CreateDate: m.CreateDate || null
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
    normalizeBaseGap () {
      if (this.currentData.Base_Gap) {
        return this.currentData.Base_Gap.map(m => {
          return {
            ...m,
            PathWidth: m.PathWidth || null
          }
        })
      }
    },
    normalizeBaseSharingInfrastructure () {
      return this.currentData.Base_SharingInfrastructure.map(m => {
        return {
          ...m,
          CI_SharingInfrastructureState: m.CI_SharingInfrastructureState || 0
        }
      })
    },

    handleCopyFromMojazPayankarToParvandeh () {
      const handler = async () => {
        try {
          this.showSending()

          const {
            data
          } = await this.$services.SC.CopyFromMojazPayankarToParvandeh(
            {
              pNidNosaziCode: this.nidNosaziCode
            }
          )
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess(
              'کپی اطلاعات مجاز پایانکار به تشکیل پرونده با موفقیت انجام شد'
            )
            await this.log({
              action: this.logActions.copyToParvandeh,
              bizCode: this.value.NidBase,
              bizCodeTitle: 'NidBase',
              nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
            })
          }
        } catch (e) {
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm(
        'آیا از کپی اطلاعات مجاز پایانکار به تشکیل پرونده اطمینان دارید؟'
      ).onOk(handler)
    },
    async load () {
      this.isEditable = false
      if (!this.value.NidNosaziCode) {
        return
      }
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getMojazPayankarShop({
          PNidNosaziCode: this.value.NidNosaziCode,
          PLoadFun:
            'Base_NosaziCode,Base_Owner,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_ApartmentInfo,Base_SharingInfrastructure,Base_OtherEquipment,Base_AddressInfo,Base_CommonEstate,Base_SubScription,Base_ShahrsaziArchive,Base_Attachment,MapImage,Base_AddressPostCode,Base_HouseInfo,Base_ShopInfo'
        },
        this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data
          await this.log({
            action: this.logActions.view,
            bizCode: this.value.NidNosaziCode,
            bizCodeTitle: 'NidNosaziCode',
            nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
          })
        }
      } catch (e) {
        console.error('load error ...', e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async save () {
      try {
        this.showSending()
        // const jobStatus = this.currentData.Base_ShopInfo
        // jobStatus.CI_JobStateStatus = jobStatus.CI_JobStateStatus || null
        this.currentData.Base_ShahrsaziArchive = this.normalizeBaseShahrsaziArchive()
        this.currentData.Base_SubScription = this.normalizeBaseSubScription()
        this.currentData.Base_Using = this.normalizeBaseUsing()
        this.currentData.Base_Installation = this.normalizeBaseInstallation()
        this.currentData.Base_SharingInfrastructure = this.normalizeBaseSharingInfrastructure()
        this.currentData.Base_Gap = this.normalizeBaseGap()
        const { data } = await this.$services.SC.saveMojazPayankarShop(
          {
            pObj: this.currentData,
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
            bizCode: this.currentData._nidBase,
            bizCodeTitle: 'NidBase',
            nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
          })
          this.load()
        } // end
      } catch (e) {
        console.error('save error ...', e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  },
  created () {
    this.currentData = { ...requestModel }
  },
  mounted () {
    this.load()
  }
}
</script>
