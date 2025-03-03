<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <fit>
      <safa-status :result="result" />
      <safa-status :result="resultSave" />

      <partial-base-using-tab
        v-model="currentData"
        v-bind="passedProps"
      />
      <form-actions
        :m="mode"
        @edit="handleEdit"
        @save="handleSaveAction"
        @cancel="load"
        editSPId="31205efc-590e-4b41-8763-0c2a412ad67a"
        class="q-pb-sm q-pl-sm"
      >

        <btn-default
          spId="1e036236-022c-4f3c-ab60-cc04c27e6988"
          spCaption="کپی به مجاز پایانکار"
          label="کپی به مجاز پایانکار"
        />

        <btn-default
          spId="3bd2ccbd-976d-4a31-ab36-918139770477"
          spCaption="کپی به مجاز پروانه"
          label="کپی به مجاز پروانه"
        />
      </form-actions>
    </fit>
  </safa-form>
</template>

<script>
import requestModel from './config/requestModel'
import PartialBaseUsingTab from './partials/PartialBaseUsingTab'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  components: {
    PartialBaseUsingTab
  },

  props: {
    value: Object,
    selectedNosaziCode: String
  },

  data () {
    return {
      name: 'BaseBuildingInfoParvandeh',
      formKey: 'd12d6528-a2b3-48e4-9154-ef14eae77d54',
      title: 'شهرسازی- تشکیل پرونده ساختمان ساده',
      isView: false,
      result: null,
      resultSave: null,
      currentTab: 'baseUsing',
      currentData: { ...requestModel },
      tabs: [
        {
          name: 'baseUsing',
          title: 'نوع استفاده'
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
      return this.currentData.Base_Using.map(m => {
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
      this.$services.SC.saveParvandehBuilding(
        {
          PObj: this.currentData,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: null,
            WorkflowGuid: '00000000-0000-0000-0000-000000000000'
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
              bizCode: this.value.NidBase,
              bizCodeTitle: 'nidBase',
              nosaziCode: this.value.nosaziCodeString
            })
            this.showSuccess('ذخیره انجام با موفقیت انجام شد')
            this.load()
          }
        })
        .catch(response => {
          console.log('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
          this.isEditable = false
          this.$emit('changeEditMode', this.isEditable)
        })
    },
    handleEdit () {
      this.isEditable = true
      this.$emit('changeEditMode', this.isEditable)
    },
    load () {
      this.isEditable = false
      this.$emit('changeEditMode', this.isEditable)
      if (!this.value.NidBase) {
        return
      }
      this.showLoading()
      this.$services.SC.getParvandehBuilding(
        {
          PNidBase: this.value.NidBase,
          PLoadFun: 'Base_NosaziCode,Base_Using'
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
                bizCodeTitle: 'NidBase',
                nosaziCode: this.value.nosaziCodeString
              })
            }
            this.isView = true
          }
        })
        .catch(this.serverError())
        .finally(() => {
          this.hideLoading()
        })
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
