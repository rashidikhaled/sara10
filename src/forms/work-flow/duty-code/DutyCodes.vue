<template>
  <safa-form :id="formKey" caption="شهرسازی- تعیین کدهای عوارضی" appId="ace63a06-e835-457d-a1ea-3b477dd9e69b">
    <form-wrapper title="تعیین کدهای عوارضی" :padding="false" vertical>
      <!-- <fit> -->
      <!-- <section> -->
      <!-- <div class="form-title row">تعیین کدهای عوارضی</div> -->
      <formHeader :task-info="taskInfo" />
      <safa-status :result="result"></safa-status>
      <safa-status :result="saveResult"></safa-status>
      <safa-tabs
        v-model="activeTab"
        dense2
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
      >
        <template v-slot:tabs>
          <tab-menu name="showUserab" label="کاربری ها و پیش آمدگی ها" />
          <tab-menu name="showCommentTab" label="توضیحات" />
          <tab-menu name="showAllRequestTab" label="تمامی درخواست ها" />
        </template>
        <!-- <q-separator />
              <q-tab-panels v-model="activeTab" animated > -->
        <tab-content name="showUserab" :padding="false">
          <DutyCodeUser :results="results" :m="mode" />
        </tab-content>
        <tab-content name="showCommentTab" :padding="false">
          <DutyCodeComment :results="results" :m="mode" />
        </tab-content>
        <tab-content name="showAllRequestTab" :padding="false">
          <DutyCodeAllRequest :results="results" />
        </tab-content>
      </safa-tabs>
      <!-- </q-tab-panels> -->
      <!-- </section> -->
      <!-- </fit> -->
      <template v-slot:footer>
        <form-actions
          :m="mode"
          class="col-12 q-my-sm"
          @edit="isEditable = true"
          @save="save"
          @cancel="cancel"
        >
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import DutyCodeUser from "./partials/DutyCodeUser.vue"
import DutyCodeComment from "./partials/DutyCodeComment.vue"
import DutyCodeAllRequest from "./partials/DutyCodeAllRequest.vue"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  route: "/DutyCodes",
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: "تعیین کدهای عوارضی",
      formKey: "3d6678d2-2ea9-4595-a19c-b90d7b7d79b8",
      name: "DutyCodes",
      main: true,
      workflowCompatible: true,
      results: {
        ALLFoul_Front: [],
        ALLFoul_Using: [],
        Foul_Front: [],
        Foul_Info: {},
        Foul_Using: []
      },
      result: null,
      activeTab: "showUserab",
      saveResult: null
    }
  },
  components: {
    DutyCodeUser,
    DutyCodeComment,
    DutyCodeAllRequest
  },
  mounted () {
    if (this.selectedRequest) {
      this.load()
    } else {
      this.showError("لطفا از کارتابل یک ردیف انتخاب نمایید.")
    }
  },
  methods: {
    load () {
      this.showLoading()
      let data = { pNidProc: this.selectedRequest.NidProc }
      this.$services.SC.loadFoul(data, {
        config: {
          District: this.selectedDistrict
        }
      })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc"
            })
          }
        })
        .catch((response) => {
          this.result = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    save () {
      this.showLoading()
      let data = {
        pFoul: this.results,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: "baea57df-4bb2-4ba2-956b-1617ba73a85d",
          WorkflowGuid: "5ca8477d-2a3a-4962-9c63-a8690ff8975c"
        }
      }
      this.$services.SC.saveFoul(data, {
        config: {
          District: this.selectedDistrict
        }
      })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.isEditable = false
            this.showSuccess("عملیات با موفقیت انجام شد.")

            await this.log({
              action: this.logActions.save,
              bizCode: this.results.NidProc,
              bizCodeTitle: "NidProc"
            })

            this.load()
          }
        })
        .catch((response) => {
          this.saveResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cancel () {
      this.load()
      this.isEditable = false
    }
  }
}
</script>
