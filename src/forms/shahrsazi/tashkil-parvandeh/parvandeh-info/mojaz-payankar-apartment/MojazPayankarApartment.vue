<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <!-- <form-wrapper
      title="شهرسازی- مجاز پایانکار ساختمان"
      vertical
      :padding="false"
      @load="$emit('load') "
    > -->
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
            name="apartmentInfo"
            label="مشخصات آپارتمان"
          />
          <tab-menu
            name="baseOwner"
            label="مشخصات ثبتی و مالکین"
          />
          <tab-menu
            name="baseUsing"
            label="کاربری ها"
          />
          <tab-menu
            name="baseFront"
            label="پیشامدگی ها"
          />
          <tab-menu
            name="otherEquipment"
            label="سایر امکانات"
          />
          <tab-menu
            name="explanation"
            label="توضیحات"
          />
        </template>
        <tab-content
          name="apartmentInfo"
          title="مشخصات آپارتمان"
        >
          <PartialBaseApartmentInfoTab
            :m="mode"
            v-model="currentData"
          />

        </tab-content>
        <tab-content
          name="baseOwner"
          title="مشخصات ثبتی و مالکین"
        >
          <PartialBaseOwnerTab
            :m="mode"
            v-model="currentData"
          />

        </tab-content>
        <tab-content
          name="baseUsing"
          title="کاربری ها"
          :padding="false"
        >
          <PartialBaseUsingTab
            :m="mode"
            v-model="currentData"
          />

        </tab-content>
        <tab-content
          name="baseFront"
          title="پیشامدگی ها"
          :padding="false"
        >
          <PartialBaseFrontTab
            :m="mode"
            v-model="currentData"
          />

        </tab-content>
        <tab-content
          name="otherEquipment"
          title="سایر امکانات"
        >
          <PartialBaseOtherEquipmentTab
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
import PartialBaseApartmentInfoTab from './partials/PartialBaseApartmentInfoTab'
import PartialBaseOwnerTab from './partials/PartialBaseOwnerTab'
import PartialBaseUsingTab from './partials/PartialBaseUsingTab'
import PartialBaseFrontTab from './partials/PartialBaseFrontTab'
import PartialBaseOtherEquipmentTab from './partials/PartialBaseOtherEquipmentTab'
import PartialExplanationTab from './partials/PartialExplanationTab'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from '../../../../../utils/nosaziCodeOperation'
// import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  name: 'MojazPayankarApartment',
  mixins: [baseFormMixin],
  components: {
    PartialBaseApartmentInfoTab,
    PartialBaseOwnerTab,
    PartialBaseUsingTab,
    PartialBaseFrontTab,
    PartialBaseOtherEquipmentTab,
    PartialExplanationTab
  },

  props: {
    baseNosaziCode: Object,
    value: Object,
    readOnly: Boolean,
    name: {
      type: String,
      default: '',
      required: true
    },
    nidNosaziCode: String
  },

  data () {
    return {
      formKey: '6b866bfb-0fbb-4f82-bd8b-5cf79d8f670b',
      title: 'شهرسازی- مجاز پایانکار آپارتمان',
      main: true,
      result: null,
      resultSave: null,
      currentTab: 'apartmentInfo',
      currentData: { ...requestModel },
      tabs: [
        {
          name: 'apartmentInfo',
          title: 'مشخصات آپارتمان'
        },
        {
          name: 'baseOwner',
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
          name: 'otherEquipment',
          title: 'امکانات'
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
    normalizeBaseFront () {
      return this.currentData.Base_Front.map(m => {
        return {
          ...m,
          CI_RoofType: m.CI_RoofType || null,
          CI_FrontStatus: m.CI_FrontStatus || null,
          DWGObjectID: m.DWGObjectID || 0,
          DWGObjectName: m.DWGObjectName || null,
          ConversionDate: m.ConversionDate || null,
          GenerateDate: m.GenerateDate || null
        }
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
      return this.value.Base_Installation.map(m => {
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
            const strNosaziCode = convertNosaziCodeObjectToString(this.baseNosaziCode)
            await this.log({
              action: this.logActions.copyToParvandeh,
              bizCode: this.value.NidBase,
              bizCodeTitle: 'NidBase',
              nosaziCode: strNosaziCode,
              saveDesc: `کپی اطلاعات مجاز پایانکار به تشکیل پرونده برای کد نوسازی ${strNosaziCode.split("-").reverse().join("-")} انجام شد.`
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
    handleEdit () {
      this.isEditable = true
      this.$emit("changeEditMode", this.isEditable)
    },
    handleCancel () {
      this.load()
      this.isEditable = false
      this.$emit("changeEditMode", this.isEditable)
    },
    async load () {
      this.isEditable = false
      if (!this.value.NidNosaziCode) {
        return
      }
      try {
        this.showLoading()
        // debugger
        const { data } = await this.$services.SC.getMojazPayankarApartment({
          PNidNosaziCode: this.value.NidNosaziCode,
          PLoadFun:
            'Base_NosaziCode,Base_Owner,Base_RegisterPlack,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_ApartmentInfo,Base_SharingInfrastructure,Base_OtherEquipment,Base_AddressInfo,Base_CommonEstate,Base_SubScription,Base_ShahrsaziArchive,Base_Attachment,MapImage,Base_AddressPostCode,Base_HouseInfo'
        },
        this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data
          const strNosaziCode = convertNosaziCodeObjectToString(this.baseNosaziCode)
          await this.log({
            action: this.logActions.view,
            bizCode: this.value.NidNosaziCode,
            bizCodeTitle: 'NidNosaziCode',
            nosaziCode: strNosaziCode,
            saveDesc: `بارگذاری اطلاعات فرم مجاز پایانکار آپارتمان برای کدنوسازی ${strNosaziCode.split("-").reverse().join("-")} انجام شد.`
          })
        }
      } catch (e) {
        this.showError(e, 'خطایی در سرویس رخ داد')
      } finally {
        this.hideLoading()
      }
    },
    async save () {
      try {
        this.resultSave = null
        this.showSending()
        this.currentData.Base_ShahrsaziArchive = this.normalizeBaseShahrsaziArchive()
        this.currentData.Base_SubScription = this.normalizeBaseSubScription()
        this.currentData.Base_Using = this.normalizeBaseUsing()
        this.currentData.Base_Front = this.normalizeBaseFront()
        // this.currentData.Base_Installation = this.normalizeBaseInstallation()
        this.currentData.Base_OtherEquipment = this.normalizeBaseOtherEquipment()
        const { data } = await this.$services.SC.SaveMojazPayankarApartment(
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
          const strNosaziCode = convertNosaziCodeObjectToString(this.baseNosaziCode)
          await this.log({
            action: this.logActions.save,
            bizCode: this.currentData._nidBase,
            bizCodeTitle: 'NidBase',
            nosaziCode: strNosaziCode,
            saveDesc: `ذخیره اطلاعات فرم مجاز پایانکار آپارتمان برای کدنوسازی ${strNosaziCode.split("-").reverse().join("-")} انجام شد.`
          })
          this.load()
        } else {
          this.showError('ذخیره انجام نشد')
        }
        // end
      } catch (e) {
        this.showError('خطایی در سرویس رخ داد')
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
