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
              label="درصد تراکم لایه خاکریز نهایی"
              v-model="model.AsphaltLabLevel1.LastDykeLayerDensityPercent"
              label-width="150px"
              :label-shrink="true"
              type="number"
              cdcName="LastDykeLayerDensityPercent"
              :m="mode"
            />
          </FormControl>
        </FormRow>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="ضخامت و دانه بندی لایه ماکادم"
              v-model="model.AsphaltLabLevel1.MacadomLayerWidthAndGrading"
              label-width="150px"
              :label-shrink="true"
              type="number"
              cdcName="MacadomLayerWidthAndGrading"
              :m="mode"
            />
          </FormControl>
        </FormRow>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="دانه بندی لایه اساس"
              v-model="model.AsphaltLabLevel1.BasisLayerGrading"
              label-width="150px"
              :label-shrink="true"
              type="number"
              cdcName="BasisLayerGrading"
              :m="mode"
            />
          </FormControl>
        </FormRow>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="ضخامت لایه اساس"
              v-model="model.AsphaltLabLevel1.BasisLayerWidth"
              label-width="150px"
              :label-shrink="true"
              type="number"
              cdcName="BasisLayerWidth"
              :m="mode"
            />
          </FormControl>
        </FormRow>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="درصد تراکم لایه اساس"
              v-model="model.AsphaltLabLevel1.BasisLayerDensityPercent"
              label-width="150px"
              :label-shrink="true"
              type="number"
              cdcName="BasisLayerDensityPercent"
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
  AsphaltLabLevel1: {
    BasisLayerDensityPercent: null,
    BasisLayerGrading: null,
    CreateDate: null,
    CreateTime: null,
    BasisLayerWidth: null,
    LastDykeLayerDensityPercent: null,
    MacadomLayerWidthAndGrading: null,
    NIdProc: "00000000-0000-0000-0000-000000000000"
  }
}

export default {
  mixins: [baseFormMixin],
  props: {},
  data () {
    return {
      name: "UAsphaltLabLevel1",
      title: "آزمایشگاه آسفالت مرحله یک",
      formKey: "2B6F3277-36DB-47C2-AA6E-C45802C31458",
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
        .getAsphaltLabLevel1({
          pRequest: { NidProc: this.selectedRequest.NidProc }
        })
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.model = this.loadObjRes.data
              .GetAsphaltLabLevel1Result?.ClsAsphaltLabLevel1 ?? {
              ...defaultModel
            }
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} نمایش داده شد.`
              })
            }
            this.isView = true
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
      this.model.AsphaltLabLevel1.NIdProc = this.selectedRequest.NidProc
    },
    saveObj () {
      this.showLoading()
      if (this.model.AsphaltLabLevel1.CreateDate === null) {
        this.model.AsphaltLabLevel1.CreateDate = ""
      }
      if (this.model.AsphaltLabLevel1.CreateTime === null) {
        this.model.AsphaltLabLevel1.CreateTime = ""
      }
      const payload = {
        pRequest: {
          ClsAsphaltLabLevel1: this.model,
          NidProc: this.selectedRequest.NidProc
        }
      }
      this.$services.excavation
        .saveClsAsphaltLabLevel1(payload)
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
