<template>
  <safa-form
    :id="formKey"
    caption="ممیزان -گردش کار"
    appId="7EDDCC78-5BF6-412A-8C2C-8B13CC51F975"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getSurveyorTasksInBlockGroupRes" />
        <safa-status :result="saveSurveyorRes" />
      </template>
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="surveyorList" label="لیست" />
            <tab-menu
              name="surveyorDetails"
              label="اطلاعات ممیز"
              closable
              v-if="showSurveyorDetailsTab"
              @close="closeDetailsTab"
            />
          </template>
          <tab-content name="surveyorList">
            <USurveyorsUList
              ref="surveyorList"
              :name="name"
              :title="title"
              :formKey="formKey"
              :m="mode"
              @showSurveyorDetails="showSurveyorDetails"
            />
          </tab-content>
          <tab-content
            name="surveyorDetails"
            v-if="showSurveyorDetailsTab"
            :padding="false"
          >
            <USurveyorUDetails
              ref="surveyorDetails"
              :name="name"
              :title="title"
              :formKey="formKey"
              :m="mode"
            />
          </tab-content>
        </safa-tabs>
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          @save="saveAction"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          :showEditButton="activeTab == 'surveyorDetails'"
          :showCancelButton="activeTab == 'surveyorDetails'"
          :showSaveButton="activeTab == 'surveyorDetails'"
        >
          <template v-slot:after>
            <btn-new
              label="جدید"
              @click="btnNewSurveyClick"
              v-if="activeTab == 'surveyorList'"
            />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
// Mixins
import baseFormMixin from "src/mixins/baseFormMixin"

// Components
import USurveyorsUList from "./partials/USurveyorsUList"
import USurveyorUDetails from "./partials/USurveyorUDetails"

// Constants
const EMPTY_GUID = "00000000-0000-0000-0000-000000000000"

export default {
  mixins: [baseFormMixin],

  components: { USurveyorsUList, USurveyorUDetails },

  data () {
    return {
      name: "USurveyors",
      title: "ممیزان",
      formKey: "642F18BA-C8AB-4A08-9147-547859E0EA52",
      main: true,

      // Context

      // Responses
      getSurveyorTasksInBlockGroupRes: null,
      saveSurveyorRes: null,

      // Tab
      activeTab: "surveyorList",
      showSurveyorDetailsTab: false
    }
  },
  methods: {
    showSurveyorDetails (data) {
      const self = this
      this.isEditable = false
      this.showSurveyorDetailsTab = true
      this.$nextTick(() => {
        self.activeTab = "surveyorDetails"
        self.$refs.surveyorDetails.loadObj({
          ...data
        })
      })
    },

    btnNewSurveyClick () {
      const self = this
      this.showSurveyorDetailsTab = true
      this.$nextTick(() => {
        self.activeTab = "surveyorDetails"
        self.$refs.surveyorDetails.loadObj({
          NidSurveyor: EMPTY_GUID
        })
      })
    },

    closeDetailsTab () {
      if (this.isEditable) {
        this.showWarning("در حالت ویرایش امکان بستن این پنجره وجود ندارد !")
        return
      }
      this.showSurveyorDetailsTab = false
      this.activeTab = "surveyorList"
      this.isNew = false
    },

    saveAction () {
      if (!this.isValidForm()) return false
      this.$services.SO.saveSurveyor({
        pObj: this.$refs.surveyorDetails.dataContext
      })
        .then(async ({ data }) => {
          this.saveSurveyorRes = this.getResponse(data)
          if (this.saveSurveyorRes.success) {
            this.isEditable = false

            await this.log({
              action: this.logActions.save,
              bizCode: '',
              bizCodeTitle: "",
              saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
            })
            this.showSuccess("ذخیره با موفقیت انجام شد !")

            this.$refs.surveyorDetails.loadObj()
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
