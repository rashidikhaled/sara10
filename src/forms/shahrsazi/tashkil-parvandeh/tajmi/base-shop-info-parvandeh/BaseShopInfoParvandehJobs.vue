<template>
 <safa-form
    :id="formKey"
    :caption="title"
    class="q-pa-sm"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper :title="title">
      <fit>
        <safa-status :result="result" />
        <safa-status :result="resultSave" />
        <!-- add dir props #487 -->
        <div class="q-mb-sm">
          <q-radio
            label="اعیانی"
            :val="true"
            v-model="isAyani"
            size="sm"
            dense
            class="q-mr-sm"
            @input="radioChanged"
          />
          <q-radio
            label="شغلی"
            :val="false"
            v-model="isAyani"
            size="sm"
            dense
            @input="radioChanged"
          />
        </div>
        <BaseShopInfoParvandehAyani
          v-model="currentData"
          :nosaziCode="value"
          :read-only="readOnly"
          @load="load"
          :title="title"
          :name="name"
          :formKey="formKey"
          v-if="isAyani"
          @changeEditMode="setEditStatus"
        />
        <USTBaseShopInfoParvandeh
          v-model="currentData"
          :nosaziCode="value"
          :read-only="readOnly"
          @load="load"
          @save="save"
          :title="title"
          :name="name"
          :formKey="formKey"
          v-else
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import BaseShopInfoParvandehAyani from './BaseShopInfoParvandehAyani'
// import BaseShopInfoParvandehJobs from './BaseShopInfoParvandehJobs'
import USTBaseShopInfoParvandeh from './USTBaseShopInfoParvandeh'
import shopParvandehRequestModel from './models/shopParvandehRequest'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'BaseShopInfoParvandeh',
  mixins: [baseFormMixin],
  components: {
    BaseShopInfoParvandehAyani,
    // BaseShopInfoParvandehJobs,
    USTBaseShopInfoParvandeh
  },

  props: {
    value: Object,
    readOnly: Boolean
  },

  data () {
    return {
      title: 'شهرسازی- تشکیل پرونده صنفی',
      name: 'BaseShopInfoParvandeh',
      formKey: 'f4ca44a7-cd6f-4437-bbcc-89ccfd2d854a',
      main: true,
      currentTitle: 'تشکیل پرونده صنفی - اعیانی',
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
    radioChanged (e) {
      if (e === true) {
        this.currentTitle = 'تشکیل پرونده صنفی - اعیانی'
      } else {
        this.currentTitle = 'تشکیل پرونده صنفی - شغلی'
      }
    },
    setEditStatus (value) {
      this.$emit('changeEditMode', value)
    },
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
            this.showSuccess('کپی به مجاز پایانکار با موفقیت انجام شد')
            await this.log({
              action: this.logActions.copyToMojazPayankar,
              bizCode: this.value.NidBase,
              bizCodeTitle: 'NidBase',
              saveDesc: `کپی به مجاز پایانکار با موفقیت انجام گردید`
            })
          } else {
            this.showError('انجام نشد')
          }

          // end
        } catch (e) {
          this.showError('خطایی در سرویس رخ داد')
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm(
        'آیا از کپی اطلاعات به مجاز پایانکار اطمینان دارید؟'
      ).onOk(handler)
    },

    async save () {
      if (!this.isValidForm()) return
      try {
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
          this.showSuccess('ذخیره با موفقیت انجام شد')
          await this.log({
            action: this.logActions.save,
            bizCode: this.currentData._nidBase,
            bizCodeTitle: 'NidBase'
          })

          this.load()
        } else {
          this.showError('انجام نشد')
        }

        // end
      } catch (e) {
        this.showError('خطایی در سرویس رخ داد')
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
          await this.log({
            action: this.logActions.view,
            bizCode: this.value.NidBase,
            bizCodeTitle: 'NidBase'
          })
        } else {
          this.showError('انجام نشد')
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
    this.currentData = { ...shopParvandehRequestModel }
  },
  mounted () {
    this.load()
  }
}
</script>
