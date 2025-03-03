<template>
  <section class="row">
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
      <q-tab-panel name="ayani">
        <BaseShopInfoParvandehAyani
          v-model="currentData"
          :nosaziCode="value"
          :read-only="readOnly"
          @load="load"
        />
      </q-tab-panel>

      <q-tab-panel name="job">
        <BaseShopInfoParvandehJobs
          v-model="currentData"
          :nosaziCode="value"
          :read-only="readOnly"
          @load="load"
          @save="save"
        />
      </q-tab-panel>

    </q-tab-panels>
  </section>
</template>

<script>
import BaseShopInfoParvandehAyani from './BaseShopInfoParvandehAyani'
import BaseShopInfoParvandehJobs from './BaseShopInfoParvandehJobs'
import shopParvandehRequestModel from './models/shopParvandehRequest'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'BaseShopInfoParvandeh',
  mixins: [baseFormMixin],
  components: {
    BaseShopInfoParvandehAyani,
    BaseShopInfoParvandehJobs
  },

  props: {
    value: Object,
    readOnly: Boolean
  },

  data () {
    return {
      result: null,
      resultSave: null,
      currentTab: 'ayani',
      currentData: { ...shopParvandehRequestModel },
      tabs: [
        {
          name: 'ayani',
          title: 'اعیانی'
        },
        {
          name: 'job',
          title: 'شغلی'
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
        .confirm('آیا از کپی اطلاعات به مجاز پایانکار اطمینان دارید؟')
        .onOk(handler)
    },

    async save () {
      try {
        this.showSending()

        const { data } = await this.$services.SC.saveParvandehShop({
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
      try {
        this.showLoading()

        const { data } = await this.$services.SC.getParvandehShop({
          PNidBase: this.value.NidBase,
          PLoadFun: 'Base_NosaziCode,Base_AddressInfo,Base_PreCodeInfo,Base_SupplyParking,Base_Parking,Base_Attachment,Base_ShopInfo,Base_Using,Base_Front,Base_SharingInfrastructure,Base_Gap,Base_SubScription,Base_ShahrsaziArchive,Base_ShahrsaziArchiveHouse,Base_Installation,Base_OtherEquipment,Base_CommonEstate,Base_JobInfo,Base_Owner,MapImage,Base_CommissionHistory,Base_AddressPostCode,Base_Commission77History'
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
    this.currentData = { ...shopParvandehRequestModel }
  },

  mounted () {
    this.load()
  }
}
</script>
