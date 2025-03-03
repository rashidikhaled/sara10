<template>
  <fit>
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
    <safa-tabs v-model="currentTab">
      <template v-slot:tabs>
        <tab-menu
          v-for="{ name, title } in tabs"
          :key="name"
          :name="name"
          :label="title"
        />
      </template>
      <tab-content
        name="address"
        title="آدرس"
      >
        <TabAddress
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="registerPlaque"
        title="مشخصات سند و پلاک ثبتی"
      >
        <TabRegisterPlaque
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="baseOwner"
        title="مالکین و جهات اربعه"
      >
        <TabBaseOwner
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="houseInfo"
        title="مشخصات فنی"
      >
        <TabBaseHouseInfo
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="other"
        title="سایر مشخصات"
      >
        <TabOther1
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="other2"
        title="سایر"
      >
        <TabOther2
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="archive"
        title="سوابق و اشتراکات"
      >
        <TabArchive
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <!-- <tab-content
        name="croquis"
        title="کروکی"
      >
        <TabCroque
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content> -->
      <tab-content
        name="plans"
        title="طرح تفضیلی و توضیحات"
      >
        <TabPlans
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
    </safa-tabs>

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
          label="کپی اطلاعات"
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
          label="گزارش"
        ></q-btn>
      </template>
    </form-actions>
  </fit>
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
// import TabCroque from './partials/TabCroque'
import TabPlans from './partials/TabPlans'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
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
    // TabCroque,
    TabPlans
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
    baseNosaziCode: Object
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
        // {
        //   name: 'croquis',
        //   title: 'کروکی'
        // },
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
    async handleCopyToMojazPayankar () {
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
            const nosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.copyToMojazPayankar,
              bizCode: this.value.NidBase,
              bizCodeTitle: "NidBase",
              nosaziCode,
              saveDesc: `کپی به مجاز پایانکار با موفقیت برای کدنوسازی ${nosaziCode
                .split("-")
                .reverse()
                .join("-")} انجام گردید`
            })
          } else {
            this.showError(' انجام نشد')
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
      try {
        this.resultSave = null
        this.showSending()

        const { data } = await this.$services.SC.saveParvandehHouse(
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
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )

          await this.log({
            action: this.logActions.save,
            bizCode: this.currentData._nidBase,
            bizCodeTitle: 'کد نوسازی',
            nosaziCode: strNosaziCode
          })

          this.showSuccess('ذخیره با موفقیت انجام شد')
          this.load()
        } else {
          this.showError('ذخیره انجام نشد')
        }

        // end
      } catch (e) {
        this.showError('خطایی در سرویس رخ داد')
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      this.isEditable = false
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getParvandehHouse(
          {
            PNidBase: this.value.NidBase,
            PLoadFun:
              'Base_NosaziCode,Base_Owner,Base_AddressInfo,Base_Edge,Base_Wall,Base_RegisterPlack,Base_GreenSpace,Base_Neighbor,Base_OtherEquipment,Base_Scuttle,Base_SubScription,Base_HouseInfo,Base_CommonEstate,Base_PreCodeInfo,Base_ShahrsaziArchive,Base_Attachment,Base_PlanMosavab,Base_PlanMojaz,Base_Door,MapImage,Base_CommissionHistory,Base_Bezel,Base_File,Base_ResourceInfo,Base_RenovationPaymentHistory,Base_AddressPostCode,Base_BlockInfo,Base_Commission77History,Base_MultiBuilding'
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.view,
            bizCode: this.value.NidBase,
            bizCodeTitle: 'NidBase',
            nosaziCode: strNosaziCode
          })
        } else {
          this.showError(' انجام نشد')
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
    this.currentData = { ...requestModel }
  },
  mounted () {
    this.load()

    // console.log('//////this.value', this.value)
  }
}
</script>
