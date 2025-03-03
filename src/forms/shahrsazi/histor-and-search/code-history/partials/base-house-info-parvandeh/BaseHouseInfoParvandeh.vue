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
      <q-tab-panel name="address">
        <TabAddress v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>
      <q-tab-panel name="registerPlaque">
        <TabRegisterPlaque v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>
      <q-tab-panel name="baseOwner">
        <TabBaseOwner v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>
      <q-tab-panel name="houseInfo">
        <TabBaseHouseInfo v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>
      <q-tab-panel name="other">
        <TabOther1 v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>
      <q-tab-panel name="other2">
        <TabOther2 v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>
      <q-tab-panel name="archive">
        <TabArchive v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>
      <q-tab-panel name="croquis">
        <TabCroque v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>
      <q-tab-panel name="plans">
        <TabPlans v-model="currentData" v-bind="passedProps"/>
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
          label="کپی اطلاعات"
          outline
        ></q-btn>
        <q-btn
          color="primary"
          label="کپی به مجاز پایانکار"
          outline
          @click="handleCopyToMojazPayankar"
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
import TabAddress from './partials/TabAddress'
import TabRegisterPlaque from './partials/TabRegisterPlaque'
import TabBaseOwner from './partials/TabBaseOwner'
import TabBaseHouseInfo from './partials/TabBaseHouseInfo'
import TabOther1 from './partials/TabOther1'
import TabOther2 from './partials/TabOther2'
import TabArchive from './partials/TabArchive'
import TabCroque from './partials/TabCroque'
import TabPlans from './partials/TabPlans'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'BaseHouseInfoParvandeh',
  mixins: [baseFormMixin],
  components: {
    TabAddress,
    TabRegisterPlaque,
    TabBaseOwner,
    TabBaseHouseInfo,
    TabOther1,
    TabOther2,
    TabArchive,
    TabCroque,
    TabPlans
  },

  props: {
    value: Object,
    readOnly: Boolean
  },

  data () {
    return {
      result: null,
      resultSave: null,
      currentTab: 'address',
      currentData: { ...requestModel },
      tabs: [
        {
          name: 'address',
          title: ' آدرس'
        },
        {
          name: 'registerPlaque',
          title: ' مشخصات سند و پلاک ثبتی'
        },
        {
          name: 'baseOwner',
          title: ' مالکین و جهات اربعه'
        },
        {
          name: 'houseInfo',
          title: ' مشخصات فنی'
        },
        {
          name: 'other',
          title: ' سایر مشخصات'
        },
        {
          name: 'other2',
          title: ' سایر'
        },
        {
          name: 'archive',
          title: ' سوابق و اشتراکات'
        },
        {
          name: 'croquis',
          title: 'کروکی'
        },
        {
          name: 'plans',
          title: 'طرح تفصیلی و توضیحات'
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
            this.error(' انجام نشد')
          }

          // end
        } catch (e) {
          this.error('خطایی در سرویس رخ داد')
        } finally {
          this.hideLoading()
        }
      }
      this
        .confirm('آیا از کپی اطلاعات به مجاز پایانکار اطمینان دارید؟')
        .onOk(handler)
    },
    async save () {
      try {
        this.resultSave = null
        this.showSending()

        const { data } = await this.$services.SC.saveParvandehHouse({
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
          this.error('ذخیره انجام نشد')
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
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getParvandehHouse({
          PNidBase: this.value.NidBase,
          PLoadFun: 'Base_NosaziCode,Base_Owner,Base_AddressInfo,Base_Edge,Base_Wall,Base_RegisterPlack,Base_GreenSpace,Base_Neighbor,Base_OtherEquipment,Base_Scuttle,Base_SubScription,Base_HouseInfo,Base_CommonEstate,Base_PreCodeInfo,Base_ShahrsaziArchive,Base_Attachment,Base_PlanMosavab,Base_PlanMojaz,Base_Door,MapImage,Base_CommissionHistory,Base_Bezel,Base_File,Base_ResourceInfo,Base_RenovationPaymentHistory,Base_AddressPostCode,Base_BlockInfo,Base_Commission77History,Base_MultiBuilding'
        }, this.config)
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data
        } else {
          this.error(' انجام نشد')
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
