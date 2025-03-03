<template>
   <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <!-- <form-wrapper
      title="شهرسازی- مجاز پایانکار ساختمان"
      vertical
      :padding="false"
      @load="$emit('load') "
    > -->
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
    <fit>
      <safa-tabs v-model="currentTab" class="fit">
        <template v-slot:tabs>
          <tab-menu name="buildingInfo" label="مشخصات ساختمان" />
          <tab-menu name="other" label="سایر مشخصات" />
          <tab-menu name="baseUsing" label="نوع استفاده" />
          <tab-menu name="baseFront" label="پیشامدگی ها" />
          <tab-menu name="sharingInfrastructure" label="مشترکات" />
          <tab-menu name="otherEquipment" label="سایر" />
          <tab-menu name="controllerInfo" label="مهندسین ناظر" />
          <tab-menu name="parking" label="پارکینگ" />
          <tab-menu name="explanation" label="توضیحات" />
        </template>
        <tab-content name="buildingInfo" title="مشخصات ساختمان">
          <partial-base-building-info-tab
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content name="other" title="سایر مشخصات">
          <partial-other-info-tab v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="baseUsing" title="نوع استفاده" :padding="false">
          <partial-base-using-tab v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="baseFront" title="پیشامدگی ها" :padding="false">
          <partial-base-front-tab v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content
          name="sharingInfrastructure"
          title="مشترکات"
          :padding="false"
        >
          <partial-base-sharing-infrastructure-tab
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content name="otherEquipment" title="سایر" :padding="false">
          <partial-base-other-equipment-tab
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content
          name="controllerInfo"
          title="مهندسین ناظر"
          :padding="false"
        >
          <partial-base-controller-info-tab
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content name="parking" title="پارکینگ" :padding="false">
          <partial-base-parking-tab
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content name="explanation" title="توضیحات">
          <partial-explanation-tab v-model="currentData" v-bind="passedProps" />
        </tab-content>
      </safa-tabs>

      <div class="q-my-sm q-ml-sm">
        <form-actions
          v-if="!readOnly"
          :m="mode"
          @edit="isEditable = true"
          @save="save"
          @cancel="load"
          editSPId="edaca5b1-58eb-49d5-a101-85d2fa104b2b"
        >
          <template #after>
            <div class="q-gutter-sm">
              <btn-default
                label=" کپی به تشکیل پرونده"
                @click="handleCopyFromMojazPayankarToParvandeh"
              ></btn-default>
            </div>
          </template>
        </form-actions>
      </div>
    </fit>
    <!-- </form-wrapper> -->
  </safa-form>
</template>

<script>
import requestModel from "./model/requestModel"
import PartialBaseBuildingInfoTab from "./partials/PartialBaseBuildingInfoTab"
import PartialOtherInfoTab from "./partials/PartialOtherInfoTab"
import PartialBaseUsingTab from "./partials/PartialBaseUsingTab"
import PartialBaseFrontTab from "./partials/PartialBaseFrontTab"
import PartialBaseSharingInfrastructureTab from "./partials/PartialBaseSharingInfrastructureTab"
import PartialBaseOtherEquipmentTab from "./partials/PartialBaseOtherEquipmentTab"
import PartialBaseControllerInfoTab from "./partials/PartialBaseControllerInfoTab"
import PartialBaseParkingTab from "./partials/PartialBaseParkingTab"
import PartialExplanationTab from "./partials/PartialExplanationTab"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  name: "MojaazPayankarBuilding",
  mixins: [baseFormMixin],
  components: {
    PartialOtherInfoTab,
    PartialBaseUsingTab,
    PartialBaseFrontTab,
    PartialBaseParkingTab,
    PartialExplanationTab,
    PartialBaseBuildingInfoTab,
    PartialBaseOtherEquipmentTab,
    PartialBaseControllerInfoTab,
    PartialBaseSharingInfrastructureTab
  },

  props: {
    value: Object,
    readOnly: Boolean,
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
    },
    nidNosaziCode: String
  },

  data () {
    return {
      formKey: "5e57061a-db8a-4ab8-9a93-cdbe5207eb04",
      title: "شهرسازی- مجاز پایانکار ساختمان",
      result: null,
      resultSave: null,
      currentTab: "buildingInfo",
      currentData: { ...requestModel },
      tabs: [
        {
          name: "buildingInfo",
          title: "مشخصات ساختمان"
        },
        {
          name: "other",
          title: "سایر مشخصات"
        },
        {
          name: "baseUsing",
          title: "نوع استفاده"
        },
        {
          name: "baseFront",
          title: "پیشامدگی ها"
        },
        {
          name: "sharingInfrastructure",
          title: "مشترکات"
        },
        {
          name: "otherEquipment",
          title: "سایر"
        },
        {
          name: "controllerInfo",
          title: "مهندسین ناظر"
        },
        {
          name: "parking",
          title: "پارکینگ"
        },
        {
          name: "explanation",
          title: "توضیحات"
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
    handleCopyFromMojazPayankarToParvandeh () {
      const handler = async () => {
        try {
          this.showSending()

          const { data } =
            await this.$services.SC.CopyFromMojazPayankarToParvandeh({
              pNidNosaziCode: this.nidNosaziCode
            })
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess(
              "کپی اطلاعات مجاز پایانکار به تشکیل پرونده با موفقیت انجام شد"
            )
            await this.log({
              action: this.logActions.copyToParvandeh,
              bizCode: this.value.NidBase,
              bizCodeTitle: "NidBase"
              // nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
            })
          }
        } catch (e) {
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm(
        "آیا از کپی اطلاعات مجاز پایانکار به تشکیل پرونده اطمینان دارید؟"
      ).onOk(handler)
    },
    async save () {
      if (!this.isValidForm()) return
      try {
        this.showSending()

        const { data } = await this.$services.SC.saveMojazPayankarBuilding(
          {
            pObj: this.currentData,
            pUser: this.currentUser,
            pDtoWorkflowData: {
              StateName: null,
              WorkflowGuid: "00000000-0000-0000-0000-000000000000"
            }
          },
          this.config
        )
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          this.showSuccess("ذخیره با موفقیت انجام شد")
          await this.log({
            action: this.logActions.save,
            bizCode: this.currentData._nidBase,
            bizCodeTitle: "NidBase",
            nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
          })

          this.load()
        }
        // end
      } catch (e) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      this.isEditable = false
      if (!this.value.NidNosaziCode) {
        return
      }
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getMojazPayankarBuilding(
          {
            PNidNosaziCode: this.value.NidNosaziCode,
            PLoadFun:
              "Base_NosaziCode,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_CommonEstate,Base_BuildingInfo,Base_Gap,Base_Door,Base_Wall,Base_Bezel,Base_OtherEquipment,Base_ControllerInfo,Base_Attachment,Base_Parking,Base_HouseInfo,Base_ShahrsaziArchive,Base_SharingInfrastructure,Base_CommissionHistory,Base_RenovationPaymentHistory,Base_SubScription"
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data
          await this.log({
            action: this.logActions.view,
            bizCode: this.value.NidNosaziCode,
            bizCodeTitle: "NidNosaziCode",
            nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
          })
        }
      } catch (e) {
        this.serverError()
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
