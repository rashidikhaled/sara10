<template>
  <safa-form :id="formKey" :caption="title">
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
    <fit>
      <TabBaseUsing v-model="currentData" v-bind="passedProps" />
      <form-actions
        :m="mode"
        @edit="handleEdit"
        @save="handleSaveAction"
        @cancel="load"
        editSPId="c578f4eb-39eb-4372-892a-02c51fbc2658"
        class="q-pb-sm q-pl-sm"
      />
    </fit>
  </safa-form>
</template>

<script>
import apartmentRequestModel from "./models/apartmentRequest"
import TabBaseUsing from "./partials/TabBaseUsing"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  name: "BaseApartmentInfoParvandeh",
  mixins: [baseFormMixin],
  components: {
    TabBaseUsing
  },

  props: {
    value: Object,
    selectedNosaziCode: String
  },

  data () {
    return {
      name: "BaseBuildingInfoParvandeh",
      formKey: "3a8ff4fe-f7c8-45bb-9003-efca68da8b0c",
      title: "شهرسازی- تشکیل پرونده آپارتمان ساده",
      isView: false,
      result: null,
      resultSave: null,
      currentTab: "baseUsing",
      currentData: { ...apartmentRequestModel },
      tabs: [
        {
          name: "baseUsing",
          title: "نوع استفاده"
        }
      ]
    }
  },

  computed: {
    passedProps () {
      return { m: this.mode }
    }
  },

  methods: {
    normalizeBaseUsing () {
      return this.currentData.Base_Using.map((m) => {
        return {
          ...m,
          ActDate: m.ActDate || null,
          BusyArea: m.BusyArea || null,
          CI_BuildingType: m.CI_BuildingType || null,
          CI_HowChangeBuilding: m.CI_HowChangeBuilding || null,
          CI_Repair: m.CI_Repair || null,
          CI_ViewCode: m.CI_ViewCode || null,
          CI_UsingStatus: m.CI_UsingStatus || null,
          DWGObjectID: m.DWGObjectID || null,
          DWGObjectName: m.DWGObjectName || null,
          Depth1Area: m.Depth1Area || null,
          Depth1No: m.Depth1No || null,
          Depth2Area: m.Depth2Area || null,
          Depth2No: m.Depth2No || null,
          Depth3Area: m.Depth3Area || null,
          GenerateDate: m.GenerateDate || null,
          IllegalInfrastructure: m.IllegalInfrastructure || null,
          MassDistance_Main: m.MassDistance_Main || null,
          MassDistance_Sub: m.MassDistance_Sub || null,
          OverOnArea: m.OverOnArea || null,
          OverOnLengthNear: m.OverOnLengthNear || null,
          OverOnTarakom: m.OverOnTarakom || null,
          OverOrNoParvaneh: m.OverOrNoParvaneh || null,
          RepairArea: m.RepairArea || null,
          UnUsefulHeight: m.UnUsefulHeight || null,
          CI_UsingPlace: m.CI_UsingPlace || null,
          ConversionDate: m.ConversionDate || null,
          Depth3No: m.Depth3No || null,
          GarbageUnit: m.GarbageUnit || null
        }
      })
    },
    handleSaveAction () {
      if (!this.isValidForm()) return
      this.showSending()
      this.currentData.Base_Using = this.normalizeBaseUsing()
      this.$services.SC.saveParvandehApartment(
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
            await this.log({
              action: this.logActions.save,
              bizCode: this.currentData._nidBase,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: this.value.nosaziCodeString
            })

            this.showSuccess("ذخیره با موفقیت انجام شد")
            this.load()
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
          this.isEditable = false
          this.$emit("changeEditMode", this.isEditable)
        })
    },
    handleEdit () {
      this.isEditable = true
      this.$emit("changeEditMode", this.isEditable)
    },
    load () {
      this.isEditable = false
      this.$emit("changeEditMode", this.isEditable)
      this.showLoading()

      return this.$services.SC.getParvandehApartment(
        {
          PNidBase: this.value.NidBase,
          PLoadFun: "Base_NosaziCode,Base_Using"
        },
        {
          config: {
            District: this.value.District
          }
        }
      )
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.currentData = this.result.data
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.value.NidBase,
                bizCodeTitle: "NidBase",
                nosaziCode: this.value.nosaziCodeString
              })
            }
            this.isView = true
          }
        })
        .catch((data) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
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
