<template>
  <safa-form :id="formKey" :caption="title" class="q-pa-sm"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B">
    <fit>
      <safa-status :result="result" />
      <safa-status :result="resultSave" />
      <div class="q-mb-sm">
        <q-radio
          label="اعیانی"
          :val="true"
          v-model="isAyani"
          size="sm"
          dense
          class="q-mr-sm"
        />
        <q-radio label="شغلی" :val="false" v-model="isAyani" size="sm" dense />
      </div>
      <BaseShopInfoParvandehAyani
        v-model="currentData"
        :activeTabGlobal="activeTabGlobal"
        :nosaziCode="value"
        :getShahrsaziSettings="getShahrsaziSettings"
        :read-only="readOnly"
        @load="load"
        :title="title"
        :name="name"
        :formKey="formKey"
        v-if="isAyani"
        @changeEditMode="setEditStatus"
        :parentBaseNosaziCode="parentBaseNosaziCode"
      />
      <BaseShopInfoParvandehJobs
        v-model="currentData"
        :nosaziCode="value"
        :read-only="readOnly"
        @load="load"
        @save="save"
        :title="title"
        :name="name"
        :formKey="formKey"
        :parentBaseNosaziCode="parentBaseNosaziCode"
        :mainNosaziCodeInfo="mainNosaziCodeInfo"
        v-else
      />
    </fit>
  </safa-form>
</template>

<script>
import BaseShopInfoParvandehAyani from "./BaseShopInfoParvandehAyani"
import BaseShopInfoParvandehJobs from "./BaseShopInfoParvandehJobs"
import shopParvandehRequestModel from "./models/shopParvandehRequest"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  name: "BaseShopInfoParvandeh",
  mixins: [baseFormMixin],
  components: {
    BaseShopInfoParvandehAyani,
    BaseShopInfoParvandehJobs
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
    mainNosaziCodeInfo: Object,
    parentBaseNosaziCode: Object
  },

  data () {
    return {
      title: "شهرسازی- تشکیل پرونده صنفی",
      name: "BaseShopInfoParvandeh",
      formKey: "f4ca44a7-cd6f-4437-bbcc-89ccfd2d854a",

      BuildingSettings: {
        ShahrsaziSettings: {
          Chk_IsCheckSabt: false,
          Chk_IsCheckSabtJson: false
        }
      },
      result: null,
      resultSave: null,
      currentTab: "ayani",
      currentData: { ...shopParvandehRequestModel },
      tabs: [
        { name: "ayani", title: "اعیانی" },
        { name: "job", title: "شغلی" }
      ],
      isAyani: true,
      isView: false
    }
  },
  computed: {
    getShahrsaziSettings () {
      return this.BuildingSettings?.ShahrsaziSettings
    },
    config () {
      return {
        config: { District: this.value.District }
      }
    }
  },

  methods: {
    setEditStatus (value) {
      this.$emit("changeEditMode", value)
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
            this.showSuccess("کپی به مجاز پایانکار با موفقیت انجام شد")
            const nosaziCode = convertNosaziCodeObjectToString(
              this.parentBaseNosaziCode
            )
            await this.log({
              action: this.logActions.copyToMojazPayankar,
              bizCode: this.value.NidBase,
              bizCodeTitle: "NidBase",
              nosaziCode,
              saveDesc: `کپی به مجاز پایانکار برای کدنوسازی ${nosaziCode
                .split("-")
                .reverse()
                .join("-")} انجام گردید`
            })
          } else {
            this.showError("انجام نشد")
          }

          // end
        } catch (e) {
          this.showError("خطایی در سرویس رخ داد")
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm(
        "آیا از کپی اطلاعات به مجاز پایانکار اطمینان دارید؟"
      ).onOk(handler)
    },

    async save () {
      try {
        this.showSending()

        const { data } = await this.$services.SC.saveParvandehShop(
          {
            PObj: this.currentData,
            pUser: this.currentUser,
            PDtoWorkflowData: {
              StateName: null,
              WorkflowGuid: "00000000-0000-0000-0000-000000000000"
            }
          },
          this.config
        )
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          this.showSuccess("ذخیره با موفقیت انجام شد")

          const nosaziCode = convertNosaziCodeObjectToString(
            this.parentBaseNosaziCode
          )
          await this.log({
            action: this.logActions.save,
            bizCode: this.value.NidBase,
            bizCodeTitle: "NidBase",
            nosaziCode,
            saveDesc: `ذخیره اطلاعات تشکیل پرونده صنفی برای کدنوسازی ${nosaziCode
              .split("-")
              .reverse()
              .join("-")} انجام گردید`
          })

          this.$emit("changeEditMode", false)
          this.load()
        }
      } catch (e) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      debugger
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getParvandehShop(
          {
            PNidBase: this.value.NidBase,
            PLoadFun:
              "Base_NosaziCode,Base_AddressInfo,Base_PreCodeInfo,Base_SupplyParking,Base_Parking,Base_Attachment,Base_ShopInfo,Base_Using,Base_Front,Base_SharingInfrastructure,Base_Gap,Base_SubScription,Base_ShahrsaziArchive,Base_ShahrsaziArchiveHouse,Base_Installation,Base_OtherEquipment,Base_CommonEstate,Base_JobInfo,Base_Owner,MapImage,Base_CommissionHistory,Base_AddressPostCode,Base_Commission77History"
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          const res = this.result.data
          this.currentData = {
            ...res,
            Base_Attachment: res.Base_Attachment ?? [],
            Base_Commission77History: res.Base_Commission77History ?? [],
            Base_CommissionHistory: res.Base_CommissionHistory ?? [],
            Base_Front: res.Base_Front ?? [],
            Base_Gap: res.Base_Gap ?? [],
            Base_Installation: res.Base_Installation ?? [],
            Base_JobInfo: res.Base_JobInfo ?? [],
            Base_OtherEquipment: res.Base_OtherEquipment ?? [],
            Base_Owner: res.Base_Owner ?? [],
            Base_Parking: res.Base_Parking ?? [],
            Base_PreCodeInfo: res.Base_PreCodeInfo.map(m => {
              return { ...m, isSelectedNode: false }
            }) ?? [],
            Base_AddressPostCode: res.Base_AddressPostCode.map(m => {
              return { ...m, isSelectedNode: false }
            }) ?? [],
            Base_ShahrsaziArchive: res.Base_ShahrsaziArchive ?? [],
            Base_ShahrsaziArchiveHouse: res.Base_ShahrsaziArchiveHouse ?? [],
            Base_SharingInfrastructure: res.Base_SharingInfrastructure ?? [],
            Base_SubScription: res.Base_SubScription ?? [],
            Base_SupplyParking: res.Base_SupplyParking ?? [],
            Base_Using: res.Base_Using ?? []
          }
          if (!this.isView) {
            const nosaziCode = convertNosaziCodeObjectToString(
              this.parentBaseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: this.value.NidBase,
              bizCodeTitle: "NidBase",
              nosaziCode,
              saveDesc: `بارگذاری اطلاعات پرونده - عرصه برای کدنوسازی ${nosaziCode
                .split("-")
                .reverse()
                .join("-")} انجام گردید`
            })
          }
          this.isView = true
        }
      } catch (e) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async loadSettings () {
      this.BuildingSettings = await this.loadFormSetting("BuildingSettings", {
        defaultValue: this.BuildingSettings,
        nidProc: GLOBAL_SETTINGS_GUID
      })
    }
  },

  async created () {
    await this.loadSettings()
    this.currentData = { ...shopParvandehRequestModel }
    setTimeout(() => {
      this.load()
    }, 500)
  }
  // mounted () {
  //   this.load()
  // }
}
</script>
