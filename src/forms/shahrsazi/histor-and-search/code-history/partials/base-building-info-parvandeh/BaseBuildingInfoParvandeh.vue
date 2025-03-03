<template>
  <div class="row">
    <safa-status :result="result" class="col-12"/>
    <safa-status :result="resultSave" class="col-12"/>
    <q-tabs
      v-model="currentTab"
      active-bg-color="primary"
      active-color="white"
      align="left"
      class="p-mb-lg"
      dense
      inline-label
    >
      <q-tab
        v-for="({name, title}) in tabs" :key="name"
        :label="title"
        :name="name"
      />
    </q-tabs>
    <q-tab-panels
      v-model="currentTab"
      animated
    >
      <q-tab-panel name="buildingInfo">
        <tab-base-building-info v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>
      <q-tab-panel name="other">
        <tab-other v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>
      <q-tab-panel name="baseUsing">
        <tab-base-using v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>
      <q-tab-panel name="baseFront">
        <tab-base-front v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>
      <q-tab-panel name="sharingInfrastructure">
        <tab-base-sharing-infrastructure v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>
      <q-tab-panel name="otherEquipment">
        <tab-base-other-equipment v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>
      <q-tab-panel name="controllerInfo">
        <tab-base-controller-info v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>
      <q-tab-panel name="parking">
        <tab-base-parking v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>
      <q-tab-panel name="explanation">
        <tab-explanation v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>
    </q-tab-panels>

    <form-actions
      v-if="!readOnly"
      :m="mode"
      class="col-12"
      @cancel="load"
      @edit="isEditable = true"
      @save="save"
    >
      <template #after>
        <q-btn
          color="primary"
          label="کپی به مجاز پروانه"
          outline
          @click="handleCopyBuildingToMojazParvaneh"
        ></q-btn>
        <q-btn
          color="primary"
          label="کپی از مجاز پروانه"
          outline
          @click="handleCopyFromMojazParvanehToBuildingParvandeh"
        ></q-btn>
        <q-btn
          color="primary"
          label="کپی به مجاز پایانکار"
          outline
          @click="handleCopyToMojazPayankar"
        ></q-btn>
        <q-btn
          color="primary"
          label="کپی اطلاعات"
          outline
        ></q-btn>
        <q-btn
          color="primary"
          label="گزارش"
          outline
        ></q-btn>
      </template>
    </form-actions>

  </div>
</template>

<script>
import requestModel from './config/requestModel'
import TabBaseBuildingInfo from './partials/TabBaseBuildingInfo'
import TabOther from './partials/TabOther'
import TabBaseUsing from './partials/TabBaseUsing'
import TabBaseFront from './partials/TabBaseFront'
import TabBaseSharingInfrastructure from './partials/TabBaseSharingInfrastructure'
import TabBaseOtherEquipment from './partials/TabBaseOtherEquipment'
import TabBaseControllerInfo from './partials/TabBaseControllerInfo'
import TabBaseParking from './partials/TabBaseParking'
import TabExplanation from './partials/TabExplanation'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'BaseBuildingInfoParvandeh',
  mixins: [baseFormMixin],
  components: {
    TabOther,
    TabBaseUsing,
    TabBaseFront,
    TabBaseParking,
    TabExplanation,
    TabBaseBuildingInfo,
    TabBaseOtherEquipment,
    TabBaseControllerInfo,
    TabBaseSharingInfrastructure
  },

  props: {
    value: Object,
    readOnly: Boolean
  },

  data () {
    return {
      result: null,
      resultSave: null,
      currentTab: 'buildingInfo',
      currentData: { ...requestModel },
      tabs: [
        {
          name: 'buildingInfo',
          title: 'مشخصات ساختمان'
        },
        {
          name: 'other',
          title: 'سایر مشخصات'
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
          name: 'sharingInfrastructure',
          title: 'مشترکات'
        },
        {
          name: 'otherEquipment',
          title: 'سایر'
        },
        {
          name: 'controllerInfo',
          title: 'مهندسین ناظر'
        },
        {
          name: 'parking',
          title: 'پارکینگ'
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
    },
    passedProps () {
      return { m: this.mode }
    }
  },

  methods: {
    handleCopyBuildingToMojazParvaneh () {
      const handler = async () => {
        try {
          this.showSending()

          const { data } = await this.$services.SC.copyBuildingToMojazParvaneh({
            pFromNidBase: this.value.NidBase
          }, this.config)
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.success('کپی با موفقیت انجام شد')
          } else {
            this.error('انجام نشد')
          }

          // end
        } catch (e) {
          this.error('خطایی در سرویس رخ داد')
        } finally {
          this.hideLoading()
        }
      }
      this
        .confirm('آیا از کپی اطلاعات به مجاز پروانه اطمینان دارید؟')
        .onOk(handler)
    },
    handleCopyFromMojazParvanehToBuildingParvandeh () {
      const handler = async () => {
        try {
          this.showSending()

          const { data } = await this.$services.SC.copyFromMojazParvanehToBuildingParvandeh({
            pNidNosaziCode_Building: this.value.NidNosaziCode
          }, this.config)
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.success('کپی با موفقیت انجام شد')
          } else {
            this.error('انجام نشد')
          }

          // end
        } catch (e) {
          this.error('خطایی در سرویس رخ داد')
        } finally {
          this.hideLoading()
        }
      }
      this
        .confirm('آیا از کپی اطلاعات از مجاز پروانه به تشکیل پرونده ساختمان اطمینان دارید')
        .onOk(handler)
    },
    handleCopyToMojazPayankar () {
      const handler = async () => {
        try {
          this.showSending()
          const { data } = await this.$services.SC.copyToMojazPayankar({
            pFromNidBase: this.value.NidBase
          }, this.config)
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.success('کپی به مجاز پایانکار با موفقیت انجام شد')
          } else {
            this.error('انجام نشد')
          }

          // end
        } catch (e) {
          this.error('خطایی در سرویس رخ داد')
        } finally {
          this.hideLoading()
        }
      }
      this
        .confirm('آیا از کپی اطلاعات به مجاز پایانکار ساختمان اطمینان دارید؟')
        .onOk(handler)
    },

    async save () {
      try {
        this.resultSave = null
        this.showSending()

        const { data } = await this.$services.SC.saveParvandehBuilding({
          PObj: this.currentData,
          PUser: this.currentUser,
          PDtoWorkflowData: {
            StateName: null,
            WorkflowGuid: '00000000-0000-0000-0000-000000000000'
          }
        }, this.config)
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          this.success('ذخیره با موفقیت انجام شد')
          this.load()
        } else {
          this.error('انجام نشد')
        }

        // end
      } catch (e) {
        this.error('خطایی در سرویس رخ داد')
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      this.isEditable = false
      if (!this.value.NidBase) {
        return
      }
      try {
        this.showLoading()

        const { data } = await this.$services.SC.getParvandehBuilding({
          PNidBase: this.value.NidBase,
          PLoadFun: 'Base_NosaziCode,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_CommonEstate,Base_BuildingInfo,Base_Gap,Base_Wall,Base_Door,Base_Bezel,Base_OtherEquipment,Base_ControllerInfo,Base_Attachment,MapImage,Base_Parking,Base_SharingInfrastructure'
        }, this.config)
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data
        } else {
          this.error('انجام نشد')
        }

        // end
      } catch (e) {
        this.error('خطایی در سرویس رخ داد')
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
