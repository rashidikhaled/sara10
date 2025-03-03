<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="saveObjRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="دمای مخلوط آسفالتی"
              v-model="model.AsphaltLabLevel2.AsphaltMixHeat"
              label-width="150px"
              :label-shrink="true"
              type="number"
              cdcName="AsphaltMixHeat"
              :m="mode"
            />
          </FormControl>
        </FormRow>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="دانه بندی و درصد قیر مخلوط آسفالت"
              v-model="model.AsphaltLabLevel2.AsphaltMixTarPercentAndGrading"
              label-width="150px"
              :label-shrink="true"
              type="number"
              cdcName="AsphaltMixTarPercentAndGrading"
              :m="mode"
            />
          </FormControl>
        </FormRow>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="ضخامت و تراکم لایه آسفالت"
              v-model="model.AsphaltLabLevel2.AsphaltLayerDensityAndWidth"
              label-width="150px"
              :label-shrink="true"
              type="number"
              cdcName="AsphaltLayerDensityAndWidth"
              :m="mode"
            />
          </FormControl>
        </FormRow>
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          :showNewButton="!isEditable"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
          @newInfo="newClick"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
const defaultModel = {
  AsphaltLabLevel2: {
    AsphaltMixHeat: null,
    AsphaltMixTarPercentAndGrading: null,
    AsphaltLayerDensityAndWidth: null,
    CreateDate: null,
    CreateTime: null,
    NIdProc: "00000000-0000-0000-0000-000000000000"
  }
}

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UAsphaltLabLevel2",
      title: "آزمایشگاه آسفالت مرحله دو",
      formKey: "2B6F6677-36DB-47C2-AA6E-C49878C31458",
      main: true,
      workflowCompatible: true,

      // #variabels
      isView: false,
      model: { ...defaultModel },

      // #services
      loadObjRes: null,
      saveObjRes: null
    }
  },

  mounted () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  },

  methods: {
    loadObj () {
      this.showLoading()
      this.$services.excavation
        .getAsphaltLabLevel2({
          pRequest: { NidProc: this.selectedRequest.NidProc }
        })
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.model = this.loadObjRes.data.getAsphaltLabLevel2Result
              ?.ClsAsphaltLabLevel2 ?? {
              ...defaultModel
            }
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} نمایش داده شد.`
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    newClick () {
      this.isEditable = true
      this.model = { ...defaultModel }
      this.model.AsphaltLabLevel2.NIdProc = this.selectedRequest.NidProc
    },
    saveObj () {
      this.showLoading()
      if (this.model.AsphaltLabLevel2.CreateDate === null) {
        this.model.AsphaltLabLevel2.CreateDate = ""
      }
      if (this.model.AsphaltLabLevel2.CreateTime === null) {
        this.model.AsphaltLabLevel2.CreateTime = ""
      }
      const payload = {
        pRequest: {
          ClsAsphaltLabLevel2: this.model,
          NidProc: this.selectedRequest.NidProc
        }
      }
      this.$services.excavation
        .saveClsAsphaltLabLevel2(payload)
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} ذخیره شد.`
            })
            this.isEditable = false
            this.loadObj()
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
