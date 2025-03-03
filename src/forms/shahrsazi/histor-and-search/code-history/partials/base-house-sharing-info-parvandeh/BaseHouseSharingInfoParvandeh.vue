<template>
  <div class="row">
    <safa-status class="col-12" :result="result"/>
    <safa-status class="col-12" :result="resultSave"/>

    <q-tabs
      v-model="currentTab"
      dense
      inline-label
      align="left"
      active-color="white"
      active-bg-color="primary"
      class="col-12 p-mb-lg"
    >
      <q-tab
        v-for="({name, title}) in tabs" :key="name"
        :name="name"
        :label="title"
      />
    </q-tabs>

    <q-tab-panels
      v-model="currentTab"
      animated
    >
      <q-tab-panel name="address">
        <TabAddressAndRegisterPlaque v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="doc">
        <TabDocumentInfo v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="baseOwner">
        <TabBaseOwnerAndBaseEdge v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="baseInfo">
        <TabBaseHouse v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="houseSharingInfo">
        <TabHouseSharingInfo v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="other">
        <TabOther v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="baseUsing">
        <TabBaseUsing v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="baseFront">
        <TabBaseFront v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="baseParking">
        <TabParking v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="baseArchive">
        <TabArchive v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="croquie">
        <TabCroque v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="engineer">
        <TabEngineer v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="comment">
        <TabComment v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

    </q-tab-panels>

    <form-actions
      v-if="!readOnly"
      :m="mode"
      class="col-12"
      @edit="isEditable = true"
      @save="save"
      @cancel="load"
    >
      <template #after>
        <q-btn
          outline
          color="primary"
          label="کپی به مجاز پروانه"
          @click="handleCopyBuildingToMojazParvaneh"
        ></q-btn>
        <q-btn
          outline
          color="primary"
          label="کپی از مجاز پروانه"
          @click="handleCopyFromMojazParvanehToBuildingParvandeh"
        ></q-btn>
        <q-btn
          outline
          color="primary"
          label="کپی به مجاز پایانکار"
          @click="handleCopyToMojazPayankar"
        ></q-btn>
        <q-btn
          outline
          color="primary"
          label="کپی اطلاعات"
        ></q-btn>
        <q-btn
          outline
          color="primary"
          label="گزارش"
        ></q-btn>
      </template>
    </form-actions>
  </div>
</template>

<script>
import requestModel from './models/houseSharingRequest'
import TabAddressAndRegisterPlaque from './partials/TabAddressAndRegisterPlaque'
import TabDocumentInfo from './partials/TabDocumentInfo'
import TabBaseOwnerAndBaseEdge from './partials/TabBaseOwnerAndBaseEdge'
import TabBaseHouse from './partials/TabBaseHouse'
import TabHouseSharingInfo from './partials/TabHouseSharingInfo'
import TabOther from './partials/TabOther'
import TabBaseUsing from './partials/TabBaseUsing'
import TabBaseFront from './partials/TabBaseFront'
import TabParking from './partials/TabParking'
import TabArchive from './partials/TabArchive'
import TabCroque from './partials/TabCroque.vue'
import TabEngineer from './partials/TabEngineer'
import TabComment from './partials/TabComment'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'BaseHouseSharingInfoParvandeh',
  mixins: [baseFormMixin],
  components: {
    TabAddressAndRegisterPlaque,
    TabDocumentInfo,
    TabBaseOwnerAndBaseEdge,
    TabBaseHouse,
    TabHouseSharingInfo,
    TabOther,
    TabBaseUsing,
    TabBaseFront,
    TabParking,
    TabArchive,
    TabCroque,
    TabEngineer,
    TabComment
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
          title: ' آدرس و پلاک ثبتی'
        },
        {
          name: 'doc',
          title: 'مشخصات سند'
        },
        {
          name: 'baseOwner',
          title: 'مالکین و جهات اربعه'
        },
        {
          name: 'baseInfo',
          title: 'مشخصات فنی'
        },
        {
          name: 'houseSharingInfo',
          title: 'مشخصات دستگاه'
        },
        {
          name: 'other',
          title: 'سایر مشخصات'
        },
        {
          name: 'baseUsing',
          title: ' کاربریها'
        },
        {
          name: 'baseFront',
          title: 'پیشامدگیها'
        },
        {
          name: 'baseParking',
          title: 'پارکینگ'
        },
        {
          name: 'baseArchive',
          title: 'سوابق'
        },
        {
          name: 'engineer',
          title: 'مهندسین'
        },
        {
          name: 'croquie',
          title: 'کروکی'
        },
        {
          name: 'comment',
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

          const { data } = await this.$services.SC.copyHouseSharingToMojazParvaneh({
            pFromNidBase: this.value.NidBase
          }, this.config)
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.success('کپی به مجاز پروانه با موفقیت انجام شد')
          } else {
            this.error('کپی به مجاز پروانه انجام نشد')
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
            this.error('کپی انجام نشد')
          }

          // end
        } catch (e) {
          this.error('خطایی در سرویس رخ داد')
        } finally {
          this.hideLoading()
        }
      }
      this
        .confirm('آیا از کپی اطلاعات از مجاز پروانه به تشکیل پرونده دستگاه اطمینان دارید؟')
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
            this.success('کپی با موفقیت انجام شد')
          } else {
            this.error('کپی انجام نشد')
          }

          // end
        } catch (e) {
          this.error('خطایی در سرویس رخ داد')
        } finally {
          this.hideLoading()
        }
      }
      this
        .confirm('آیا از کپی اطلاعات به مجاز پایانکار دستگاه اطمینان دارید؟')
        .onOk(handler)
    },

    async save () {
      try {
        this.showSending()

        const { data } = await this.$services.SC.saveParvandehHouseSharing({
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
      try {
        this.showLoading()

        const { data } = await this.$services.SC.getParvandehHouseSharing({
          PNidBase: this.value.NidBase,
          PLoadFun: 'Base_NosaziCode,Base_AddressInfo,Base_PreCodeInfo,Base_Edge,Base_BuildingInfo,Base_HouseInfo,Base_CommonEstate,Base_GreenSpace,Base_RegisterPlack,Base_Owner,Base_SubScription,Base_ShahrsaziArchive,Base_Door,Base_Scuttle,Base_Neighbor,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_OtherEquipment,Base_Attachment,Base_ControllerInfo,MapImage,Base_CommissionHistory,Base_AddressPostCode,Base_Parking,Base_SupplyParking,Base_Wall,Base_Commission77History'
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
