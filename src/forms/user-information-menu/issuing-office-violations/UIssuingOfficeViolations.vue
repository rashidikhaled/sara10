<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="b65fe692-0000-40c9-0014-66b8eb0e9e77"
  >
  <FormWrapper :title="title" :padding="false">
    <safa-status :result="result" />
    <fit>
      <safa-tabs fit v-model="currentTab" :padding="false">
        <template v-slot:tabs>
          <tab-menu label="صدور رای" name="Voting" />
          <tab-menu label="آرای قبلی دفاتر" name="OfficePreviousVotes" />
          <!-- <tab-menu label="آرای قبلی کاربر" name="UserPreviousVotes" />
          <tab-menu label="آرشیو" name="Archive" /> -->
        </template>

        <tab-content name="Voting">
          <Voting :model="model" />
        </tab-content>
        <tab-content name="OfficePreviousVotes">
          <OfficePreviousVotes :model="model" />
        </tab-content>
        <tab-content name="UserPreviousVotes"> </tab-content>
        <tab-content name="Archive"> </tab-content>
      </safa-tabs>
    </fit>

    <template v-slot:footer v-if="currentTab === 'Voting'">
      <FormActions :m="mode" :showEditButton="false">
        <template v-slot:after>
          <btn-save label="ثبت" @click="saveObj" />
          <btn-cancel label="خروج" @click="CloseForm" />
          <btn-default label="گزارش" @click="report" />
        </template>
      </FormActions>
    </template>
  </FormWrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Voting from "./partials/Voting.vue"
import OfficePreviousVotes from "./partials/OfficePreviousVotes.vue"

export default {
  mixins: [baseFormMixin],
  components: {
    Voting,
    OfficePreviousVotes
  },

  data () {
    return {
      name: "UIssuingOfficeViolations",
      title: "صدور رای تخلفات دفاتر",
      formKey: 'B65FE692-36EA-0001-0027-66B8EB0E9E77',
      main: true,
      currentTab: "Voting",
      model: {
        Request: {
          JobLocationName: "",
          JobLocationNosaziCode: "",
          Date: "",
          ComplainantName: "",
          ComplainantMobile: "",
          ViolationVoteList: []
        },
        ViolationVoteListOld: []
      },
      result: null
    }
  },
  async created () {
    if (this.selectedRequest) {
      await this.loadObj()
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
      this.hideSidebar("UIssuingOfficeViolations")
    }
  },
  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const payload = { pNidProc: this.selectedRequest.NidProc }
        const { data } = await this.$services.SJ.getViolationRequest(payload)
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.model = this.result.data
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: "bizCode"
          })
        }
      } catch (response) {
        console.error(response)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      try {
        this.showLoading()
        const payload = { pClsViolation: this.model }
        const { data } = await this.$services.SJ.saveViolation(payload)
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.showError("ذخیره با موفقیت انجام شد")
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: "bizCode"
          })
        }
      } catch (response) {
        console.error(response)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    CloseForm () {
      this.hideSidebar("UIssuingOfficeViolations")
    },
    report () {
      const reportPath =
        "/PersonalResource/RptViolationVote"
      const queryParams = {
        NidRequest: this.selectedRequest.NidProc
      }
      this.showReport(reportPath, queryParams)
    }
  }
}
</script>
