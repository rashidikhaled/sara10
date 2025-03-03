<template>
  <safa-form
    id="1f54e08d-a240-4daa-971f-4535102e903e"
    caption="شهرسازی- اطلاعات ممیزی صنفی"
  >
    <fit>
      <safa-status :result="result" />
      <safa-status :result="resultSave" />
      <div>
        <q-radio label="اعیانی" :val="true" v-model="isAyani"></q-radio>
        <q-radio label="شغلی" :val="false" v-model="isAyani"></q-radio>
      </div>
      <BaseShopInfoAuditAyani
        v-model="currentData"
        :read-only="readOnly"
        :activeTabGlobal="activeTabGlobal"
        :nosaziCode="value"
        @load="load"
        :formKey="formKey"
        :title="title"
        :name="name"
        :baseNosaziCode="baseNosaziCode"
        v-if="isAyani"
      />

      <BaseShopInfoAuditJobs
        v-model="currentData"
        :read-only="readOnly"
        :nosaziCode="value"
        @load="load"
        :formKey="formKey"
        :title="title"
        :name="name"
        :baseNosaziCode="baseNosaziCode"
        v-else
      />
    </fit>
  </safa-form>
</template>

<script>
import BaseShopInfoAuditAyani from "./BaseShopInfoAuditAyani"
import BaseShopInfoAuditJobs from "./BaseShopInfoAuditJobs"
import shopParvandehRequestModel from "./models/shopParvandehRequest"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  name: "BaseShopInfoAudit",
  mixins: [baseFormMixin],
  components: {
    BaseShopInfoAuditAyani,
    BaseShopInfoAuditJobs
  },

  props: {
    activeTabGlobal: {
      type: Object,
      default: () => {
        return {
          currentTab: "ayani"
        }
      }
    },
    value: Object,
    readOnly: Boolean,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
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
      result: null,
      resultSave: null,
      currentTab: "ayani",

      currentData: { ...shopParvandehRequestModel },
      isAyani: true
    }
  },

  methods: {
    handleSaveAction () {
      if (!this.isValidForm()) return
      this.showSending()
      this.$services.SC.saveParvandehShop(
        {
          PObj: this.currentData,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: null,
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          }
        },
        {
          config: {
            District: this.value.District
          }
        }
      )
        .then(async ({ data }) => {
          this.resultSave = this.getResponse(data)
          if (this.resultSave.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد")

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی"
            })

            this.load()
          } else {
            this.showError("انجام نشد")
          }
        })
        .catch((response) => {
          this.result = this.getResponse(response)
          this.showError("انجام نشد")
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    async load () {
      this.showLoading()
      const config = {
        config: {
          District: this.value.District
        }
      }
      const payload = {
        PNidBase: this.value.NidBase,
        PLoadFun:
              "Base_NosaziCode,Base_AddressInfo,Base_PreCodeInfo,Base_SupplyParking,Base_Parking,Base_Attachment,Base_ShopInfo,Base_Using,Base_Front,Base_SharingInfrastructure,Base_Gap,Base_SubScription,Base_ShahrsaziArchive,Base_ShahrsaziArchiveHouse,Base_Installation,Base_OtherEquipment,Base_CommonEstate,Base_JobInfo,Base_Owner,MapImage,Base_CommissionHistory,Base_AddressPostCode,Base_Commission77History"
      }
      try {
        const { data } = await this.$services.SC.getParvandehShop(payload, config)
        const res = this.getResponse(data)
        if (res.success) {
          this.currentData = res.data

          // const strNosaziCode = convertNosaziCodeObjectToString(
          //   this.baseNosaziCode ?? {}
          // )

          // await this.log({
          //   action: this.logActions.view,
          //   bizCode: strNosaziCode ?? "",
          //   bizCodeTitle: "کد نوسازی"
          // })
        }
      } catch (error) {
        this.showError("انجام نشد")
      } finally {
        this.hideLoading()
      }
    }
  },
  created () {
    this.currentData = { ...shopParvandehRequestModel }
  },
  mounted () {
    setTimeout(() => {
      this.load()
    }, 500)
  }
}
</script>
