<template>
  <div class="full-height">
    <fit>
      <safa-status :result="result"/>
      <safa-status :result="resultSave"/>
      <div class="q-py-sm q-px-sm">
        <div class="row q-col-gutter-x-md">
          <safa-radio
            v-model="isAyani"
            :val="true"
            class="col-auto"
            dense
            label="اعیانی"
          />
          <safa-radio
            v-model="isAyani"
            :val="false"
            class="col-auto"
            dense
            label="شغلی"
          />
        </div>
      </div>

      <div
        v-if="isAyani"
        class="full-height"
      >
        <base-shop-info-revisit-ayani
          v-model="currentData"
          :nosaziCode="value"
          :read-only="readOnly"
          @load="fetch"
        />
      </div>
      <div
        v-else
        class="full-height q-px-sm"
      >
        <base-shop-info-revisit-jobs
          v-model="currentData"
          :nosaziCode="value"
          :read-only="readOnly"
          @load="fetch"
          @save="handleSaveAction"
        />
      </div>
    </fit>
  </div>
</template>

<script>
import BaseShopInfoRevisitAyani from './BaseShopInfoRevisitAyani'
import BaseShopInfoRevisitJobs from './BaseShopInfoRevisitJobs'
import shopParvandehRequestModel from './models/shopParvandehRequest'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'BaseShopInfoRevisit',
  mixins: [baseFormMixin],
  components: {
    BaseShopInfoRevisitAyani,
    BaseShopInfoRevisitJobs
  },

  props: {
    value: Object,
    readOnly: Boolean,
    formKey: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
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
      ],
      isAyani: true
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
    async handleSaveAction () {
      try {
        this.showSending()
        const { data } = await this.$services.SC.saveRevisitShop(
          {
            PObj: this.currentData,
            pUser: this.currentUser,
            pNidProc: this.value.NidProc,
            PNidRevisit: this.value.NidRevisit,
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
          this.fetch()
          await this.log({
            action: this.logActions.save,
            bizCode: this.value.NidProc,
            bizCodeTitle: 'NidProc'
          })
        } else {
          this.showError('ذخیره انجام نشد')
        }

        // end
      } catch (e) {
        console.error(e)
        this.showError('خطایی در سرویس رخ دارد')
      } finally {
        this.hideLoading()
      }
    },

    async fetch () {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getRevisitShop(
          {
            PNidBase: this.value.NidBase,
            PLoadFun:
              'Base_NosaziCode,Base_AddressInfo,Base_PreCodeInfo,Base_SupplyParking,Base_Parking,Base_Attachment,Base_ShopInfo,Base_Using,Base_Front,Base_SharingInfrastructure,Base_Gap,Base_SubScription,Base_ShahrsaziArchive,Base_ShahrsaziArchiveHouse,Base_Installation,Base_OtherEquipment,Base_CommonEstate,Base_JobInfo,Base_Owner,MapImage,Base_CommissionHistory,Base_AddressPostCode,Base_Commission77History'
          },
          this.config
        )

        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data
          await this.log({
            action: this.logActions.save,
            bizCode: this.value.NidProc,
            bizCodeTitle: 'بارگذاری اطلاعات صنفی'
          })
        } else {
          this.showError('بارگذاری اطلاعات صنفی انجام نشد')
        }
        // end
      } catch (e) {
        console.error(e)
        this.showError('خطایی در سرویس رخ دارد')
      } finally {
        this.hideLoading()
      }
    }
  },
  created () {
    this.currentData = { ...shopParvandehRequestModel }
  },
  mounted () {
    this.fetch()
  }
}
</script>
