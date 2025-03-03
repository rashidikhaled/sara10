<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
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
            label="آدرس و اشتراکات"
          />
          <tab-menu
            name="Using"
            label="کاربریها و پیش آمدگیها"
          />
          <tab-menu
            name="DocumentInfo"
            label="مشخصات سند"
          />
          <tab-menu
            name="Owners"
            label="مالکین و جهات اربعه"
          />
          <tab-menu
            name="TechnicalInfo"
            label="مشخصات فنی"
          />
          <tab-menu
            name="DeviceInfo"
            label="مشخصات دستگاه"
          />
          <tab-menu
            name="Others"
            label="سایر مشخصات"
          />
          <tab-menu
            name="Archive"
            label="کروکی و سوابق"
          />
          <tab-menu
            name="explanation"
            label="توضیحات"
          />
        </template>
        <tab-content
          name="addressInfo"
          title="آدرس و اشتراکات"
        >
          <PartialAddressInfo
            :m="mode"
            v-model="currentData"
          />

        </tab-content>
        <tab-content
          name="Using"
          title="کاربریها و پیش آمدگیها"
        >
          <PartialUsingTab
            :m="mode"
            v-model="currentData"
          />

        </tab-content>
        <tab-content
          name="DocumentInfo"
          title="مشخصات سند"
        >
          <PartialDocumentInfoTab
            :m="mode"
            v-model="currentData"
          />

        </tab-content>
        <tab-content
          name="Owners"
          title="مالکین و جهات اربعه"
          :padding="false"
        >
          <PartialOwnersTab
            :m="mode"
            v-model="currentData"
          />

        </tab-content>
        <tab-content
          name="TechnicalInfo"
          title="مشخصات فنی"
        >
          <PartialTechnicalInfoTab
            :m="mode"
            v-model="currentData"
          />

        </tab-content>
        <tab-content
          name="DeviceInfo"
          title="مشخصات دستگاه"
        >
          <PartialDeviceInfoTab
            :m="mode"
            v-model="currentData"
          />

        </tab-content>
        <tab-content
          name="Others"
          title="سایر مشخصات"
        >
          <PartialOthersTab
            :m="mode"
            v-model="currentData"
          />

        </tab-content>
        <tab-content
          name="Archive"
          title="کروکی و سوابق"
        >
          <PartialArchiveTab
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
import PartialArchiveTab from './partials/PartialArchiveTab'
import PartialDeviceInfoTab from './partials/PartialDeviceInfoTab'
import PartialTechnicalInfoTab from './partials/PartialTechnicalInfoTab'
import PartialDocumentInfoTab from './partials/PartialDocumentInfoTab'
import PartialOthersTab from './partials/PartialOthersTab'
import PartialOwnersTab from './partials/PartialOwnersTab'
import PartialUsingTab from './partials/PartialUsingTab'
import PartialExplanationTab from './partials/PartialExplanationTab'
import baseFormMixin from 'src/mixins/baseFormMixin'
// import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  name: 'MojazPayankarDastgah',
  mixins: [baseFormMixin],
  components: {
    PartialAddressInfo,
    PartialOwnersTab,
    PartialUsingTab,
    PartialExplanationTab,
    PartialArchiveTab,
    PartialDeviceInfoTab,
    PartialDocumentInfoTab,
    PartialOthersTab,
    PartialTechnicalInfoTab
  },

  props: {
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
      formKey: '58530fc0-bbbf-4e32-a19f-7b0f300293ec',
      title: 'شهرسازی- مجاز پایانکار دستگاه',
      main: true,
      result: null,
      resultSave: null,
      currentTab: 'addressInfo',
      currentData: { ...requestModel }
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
    normalizeBaseUsing () {
      return this.currentData.Base_Using.map((m) => {
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
          UnUsefulHeight: m.UnUsefulHeight || null
        }
      })
    },
    normalizeBaseFront () {
      return this.currentData.Base_Front.map((m) => {
        return {
          ...m,
          CI_RoofType: m.CI_RoofType || null,
          CI_FrontStatus: m.CI_FrontStatus || null,
          DWGObjectName: m.DWGObjectName || null,
          ConversionDate: m.ConversionDate || null,
          GenerateDate: m.GenerateDate || null
        }
      })
    },

    normalizeBaseEdgeRows () {
      return this.currentData.Base_Edge.map((m) => {
        return {
          ...m,
          ActDate: m.ActDate || '',
          AddLen: m.AddLen || 0,
          AfterEditBarLen: m.AfterEditBarLen || 0,
          AfterEditSideLen: m.AfterEditSideLen || 0,
          AfterEditWidth: m.AfterEditWidth || 0,
          BackwardLen: m.BackwardLen || 0,
          BarLenEffective: m.BarLenEffective || 0,
          CI_Moshrefiat: m.CI_Moshrefiat || null,
          CI_PathType: m.CI_PathType || 0,
          CI_Privacy: m.CI_Privacy || null,
          CI_SideCode: m.CI_SideCode || 0,
          CI_ValBlockFord: m.CI_ValBlockFord || 0,
          CI_ViewCode: m.CI_ViewCode || null,
          Comments: m.Comments || '',
          Depth1: m.Depth1 || 0,
          Depth2: m.Depth2 || 0,
          Depth3: m.Depth3 || 0,
          DesignLen: m.DesignLen || 0,
          EdgeAndSideCurrent: m.EdgeAndSideCurrent || 0,
          EdgeAndSideDoc: m.EdgeAndSideDoc || 0,
          EdgeBarCurrent: m.EdgeBarCurrent || 0,
          EdgeBarDoc: m.EdgeBarDoc || 0,
          EdgeLenCurrent: m.EdgeLenCurrent || 0,
          EdgeLenDoc: m.EdgeLenDoc || 0,
          EntranceWith: m.EntranceWith || 0,
          GoFrontLen: m.GoFrontLen || 0,
          GoFrontLenAllow: m.GoFrontLenAllow || 0,
          GoFrontLenOther: m.GoFrontLenOther || 0,
          GoFrontLenOtherAllow: m.GoFrontLenOtherAllow || 0,
          PathKaf: m.PathKaf || 0,
          PathName: m.PathName || '',
          PathWidth: m.PathWidth || 0,
          RegisterPlack: m.RegisterPlack || null,
          Remain: m.Remain || 0,
          RemainBarLen: m.RemainBarLen || 0,
          RemainSideLen: m.RemainSideLen || 0,
          SideWalkWidth: m.SideWalkWidth || 0,
          ValBlockRowNo: m.ValBlockRowNo || null,
          // GoFrontLen: m.GoFrontLen || 0,
          NidBase: m.NidBase || '00000000-0000-0000-0000-000000000000',
          NidEdge: m.NidOther || '00000000-0000-0000-0000-000000000000'
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
    handleCopyFromMojazPayankarToParvandeh () {
      const handler = async () => {
        try {
          this.showSending()

          const { data } =
            await this.$services.SC.CopyFromMojazPayankarToParvandeh({
              pNidNosaziCode: this.nidNosaziCode
            })
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess(
              'کپی اطلاعات مجاز پایانکار به تشکیل پرونده با موفقیت انجام شد'
            )
            await this.log({
              action: this.logActions.copyToParvandeh,
              bizCode: this.value.NidBase,
              bizCodeTitle: 'NidBase'
              // nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
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
        const { data } = await this.$services.SC.getMojazPayankarHouseSharing(
          {
            PNidNosaziCode: this.value.NidNosaziCode,
            PLoadFun:
              'Base_NosaziCode,Base_AddressInfo,Base_Edge,Base_BuildingInfo,Base_HouseInfo,Base_CommonEstate,Base_GreenSpace,Base_RegisterPlack,Base_Owner,Base_SubScription,Base_ShahrsaziArchive,Base_Door,Base_Scuttle,Base_Neighbor,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_OtherEquipment,Base_Attachment,Base_ControllerInfo,MapImage,Base_AddressPostCode'
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data
          await this.log({
            action: this.logActions.view,
            bizCode: this.value.NidNosaziCode,
            bizCodeTitle: 'NidNosaziCode'
            // nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
          })
        }
      } catch (e) {
        this.showError('خطایی در سرویس رخ داد')
      } finally {
        this.hideLoading()
      }
    },
    async save () {
      if (!this.isValidForm()) return
      try {
        this.showSending()
        this.currentData.Base_Using = this.normalizeBaseUsing()
        this.currentData.Base_Front = this.normalizeBaseFront()
        this.currentData.Base_Edge = this.normalizeBaseEdgeRows()
        this.currentData.Base_SubScription = this.normalizeBaseSubScription()
        const { data } = await this.$services.SC.saveMojazPayankarHouseSharing(
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
            bizCodeTitle: 'NidBase'
            // nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
          })
          this.load()
        } // end
      } catch (e) {
        this.showError(e, 'خطایی در سرویس رخ داد')
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
