<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
    <fit>

      <safa-tabs
        v-model="currentTab"
        class="fit"
        height="100%"
        type="fixed"
        :bordered="false"
      >
        <template v-slot:tabs>
          <tab-menu
            name="baseUsing"
            label="کاربریها"
          />
          <tab-menu
            name="baseFront"
            label="پیشامدگی ها"
          />
          <tab-menu
            name="baseParking"
            label="مهندسین و پارکینگ"
          />
          <tab-menu
            name="buildingInfo"
            label="مشخصات ساختمان"
          />
          <tab-menu
            name="other"
            label="سایر مشخصات"
          />
          <tab-menu
            name="comments"
            label="توضیحات"
          />
          <tab-menu
            name="archive"
            label="سوابق و اشتراکات"
          />
        </template>
        <tab-content
          name="baseUsing"
          title="کاربریها"
          :padding="false"
        >
          <tab-base-using
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content
          name="baseFront"
          title="پیشامدگی ها"
          :padding="false"
        >
          <tab-base-front
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content
          name="baseParking"
          title="مهندسین و پارکینگ"
        >
          <tab-base-parkings
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content
          name="buildingInfo"
          title="مشخصات ساختمان"
        >
          <tab-base-building-info
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content
          name="other"
          title="سایر مشخصات"
        >
          <tab-other
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content
          name="comments"
          title="توضیحات"
        >
          <tab-comment
            v-model="currentData"
            v-bind="passedProps"
            :formKey="formKey"
          />
        </tab-content>
        <tab-content
          name="archive"
          title="سوابق و اشتراکات"
        >
          <tab-archive
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
      </safa-tabs>

      <form-actions
        v-if="!readOnly"
        :m="mode"
        @edit="isEditable = true"
        @save="save"
        @cancel="load"
        editSPId="c5bb4f8b-abb2-43c3-a1c2-2b0e593438a0"
        class="q-pb-sm q-pl-sm"
      />
    </fit>

  </safa-form>
</template>

<script>
import requestModel from './model/requestModel'
import TabBaseUsing from './partials/TabBaseUsing'
import TabBaseFront from './partials/TabBaseFront'
import TabBaseParkings from './partials/TabBaseParkings'
import TabBaseBuildingInfo from './partials/TabBaseBuildingInfo'
import TabOther from './partials/TabOther'
import TabComment from './partials/TabComment'
import TabArchive from './partials/TabArchive'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'MojaazMovafeghatOsooli',
  mixins: [baseFormMixin],
  components: {
    TabBaseUsing,
    TabBaseFront,
    TabBaseParkings,
    TabBaseBuildingInfo,
    TabOther,
    TabComment,
    TabArchive
  },

  props: {
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
    name: {
      type: String,
      default: '',
      required: true
    },
    baseNosaziCode: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      formKey: 'ede1ff2c-f64a-4e17-b475-f0c07d11cee7',
      title: 'شهرسازی- مجاز موافقت اصولی عرصه',
      result: null,
      resultSave: null,
      currentTab: 'baseUsing',
      isView: false,
      currentData: { ...requestModel },
      tabs: [
        {
          name: 'baseUsing',
          title: 'کاربریها'
        },
        {
          name: 'baseFront',
          title: 'پیشامدگی ها'
        },
        {
          name: 'baseParking',
          title: 'مهندسین و پارکینگ'
        },
        {
          name: 'buildingInfo',
          title: 'مشخصات ساختمان'
        },
        {
          name: 'other',
          title: 'سایر مشخصات'
        },
        {
          name: 'comments',
          title: 'توضیحات'
        },
        {
          name: 'archive',
          title: 'سوابق و اشتراکات'
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
    async save () {
      try {
        if (!this.isValidForm()) return
        this.showLoading()
        this.currentData.Base_Using = this.normalizeBaseUsing()
        const { data } = await this.$services.SC.saveMojazMovafeghatOsooliHouse(
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
          await this.log({
            action: this.logActions.save,
            bizCode: this.currentData._nidBase,
            bizCodeTitle: 'NidBase',
            nosaziCode: this.value.key
          })
          this.showSuccess('ذخیره با موفقیت انجام شد')
          this.load()
        }
      } catch (e) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      this.isEditable = false
      if (!this.value.NidNosaziCode) {
        return
      }

      try {
        this.showLoading()

        const { data } = await this.$services.SC.getMojazMovafeghatOsooliHouse(
          {
            PNidNosaziCode: this.value.NidNosaziCode,
            PLoadFun:
              'Base_NosaziCode,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_CommonEstate,Base_BuildingInfo,Base_Gap,Base_Door,Base_Wall,Base_Bezel,Base_OtherEquipment,Base_ControllerInfo,Base_Attachment,Base_Parking,Base_HouseInfo,Base_ShahrsaziArchive,Base_SharingInfrastructure,Base_CommissionHistory,Base_RenovationPaymentHistory,Base_SubScription'
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.value.NidNosaziCode,
              bizCodeTitle: 'NidNosaziCode',
              nosaziCode: this.value.key
            })
          }
          this.isView = true
        }
      } catch (e) {
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
