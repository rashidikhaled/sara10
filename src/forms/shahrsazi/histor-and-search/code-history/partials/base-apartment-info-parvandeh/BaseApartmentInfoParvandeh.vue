<template>
  <section class="row">
    <safa-status class="col-12" :result="result"/>
    <safa-status class="col-12" :result="resultSave"/>

    <q-tabs
      v-model="currentTab"
      dense
      align="left"
      active-color="white"
      active-bg-color="primary"
      class="p-mb-lg"
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
      <q-tab-panel name="apartmentInfo">
        <TabBaseApartment v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="baseOwners">
        <TabBaseOwner v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="baseUsing">
        <TabBaseUsing v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="baseFront">
        <TabBaseFront v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="baseCommons">
        <TabBaseCommons v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="baseParking">
        <TabBaseParkings v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="baseOther">
        <TabBaseOther v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="baseArchive">
        <TabBaseArchive v-model="currentData" v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="comments">
        <TabBaseComment v-model="currentData" v-bind="passedProps"/>
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
  </section>
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
    readOnly: Boolean
  },

  data () {
    return {
      result: null,
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
        .confirm('آیا از کپی اطلاعات به مجاز پایانکار آپارتمان اطمینان دارید؟')
        .onOk(handler)
    },

    async save () {
      try {
        this.showSending()

        const { data } = await this.$services.SC.saveParvandehApartment({
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

        const { data } = await this.$services.SC.getParvandehApartment({
          PNidBase: this.value.NidBase,
          PLoadFun: 'Base_NosaziCode,Base_RegisterPlack,Base_Owner,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_Parking,Base_ApartmentInfo,Base_SharingInfrastructure,Base_OtherEquipment,Base_AddressInfo,Base_CommonEstate,Base_SubScription,Base_PreCodeInfo,Base_ShahrsaziArchive,Base_ShahrsaziArchiveHouse,Base_Attachment,MapImage,Base_File,Base_ResourceInfo,Base_AddressPostCode,Base_CommissionHistory,Base_Commission77History'
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
    this.currentData = { ...apartmentRequestModel }
  },

  mounted () {
    this.load()
  }
}
</script>
