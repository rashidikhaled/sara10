<template>
  <fit >
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
    <div class="q-pa-sm">
      <q-radio
        label="اعیانی"
        :val="true"
        v-model="isAyani"
        dense
        class="q-mr-sm"
        size="sm"
      ></q-radio>
      <q-radio
        label="شغلی"
        :val="false"
        v-model="isAyani"
         dense
        size="sm"
      ></q-radio>
    </div>
    <BaseShopInfoParvandehAyani
      v-if="isAyani"
      v-model="currentData"
      :nosaziCode="value"
      :read-only="readOnly"
      @load="load"
      :formKey="formKey"
      :title="title"
      :name="name"
    />
    <BaseShopInfoParvandehJobs
      v-else
      v-model="currentData"
      :nosaziCode="value"
      :read-only="readOnly"
      @load="load"
      @save="save"
      :formKey="formKey"
      :title="title"
      :name="name"
      :mainNosaziCodeInfo="mainNosaziCodeInfo"
      :parentNosaziCode="parentNosaziCode"
    />
  </fit>
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
    readOnly: Boolean,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    },

    mainNosaziCodeInfo: Object,
    parentNosaziCode: Object
  },

  data () {
    return {
      result: null,
      resultSave: null,
      currentTab: 'ayani',
      isView: false,
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
    handleCopyToMojazPayankar () {
      const handler = async () => {
        try {
          this.showSending()

          const { data } = await this.$services.SC.copyToMojazPayankar(
            {
              pFromNidBase: this.value.NidBase
            },
            this.config
          )
          this.result = this.getResponse(data)
          if (this.result.success) {
            await this.log({
              action: this.logActions.copyToMojazPayankar,
              bizCode: this.value.NidBase,
              bizCodeTitle: 'NidBase',
              nosaziCode: this.value.key
            })

            this.showSuccess('کپی به مجاز پایانکار با موفقیت انجام شد')
          }
        } catch (e) {
          console.error('error', e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm(
        'آیا از کپی اطلاعات به مجاز پایانکار اطمینان دارید؟'
      ).onOk(handler)
    },

    async save () {
      try {
        if (!this.isValidForm()) return
        this.showSending()

        const { data } = await this.$services.SC.saveParvandehShop(
          {
            PObj: this.currentData,
            pUser: this.currentUser,
            PDtoWorkflowData: {
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
        console.error('error', e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      try {
        this.showLoading()

        const { data } = await this.$services.SC.getParvandehShop(
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
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.value.NidBase,
              bizCodeTitle: 'NidBase',
              nosaziCode: this.value.key
            })
          }
          this.isView = true
        }
      } catch (e) {
        console.error('error', e)
        this.serverError()
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
