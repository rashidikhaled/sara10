script<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
    <FormWrapper :title="title" :padding="false">
      <safa-status :result="result" />
      <fit>
        <safa-tabs fit v-model="currentTab" :padding="false">
          <template v-slot:tabs>
            <tab-menu label="ثبت درخواست" name="RequestReg" />
            <tab-menu label="آرشیو" name="Archive" />
            <tab-menu label="آرای قبلی دفاتر" name="OfficePreviousVotes" />
          </template>

          <tab-content name="RequestReg">
            <RequestReg
              v-model="model"
              @getOldVotesInfo="getOldViolationVoteByJob"
            />
          </tab-content>
          <tab-content name="OfficePreviousVotes">
            <OfficePreviousVotes v-model="model" />
          </tab-content>
          <tab-content name="Archive">
            <ViolationSendRequestArchive :nosaziCode="baseNosaziCode" />
          </tab-content>
        </safa-tabs>
      </fit>

      <template v-slot:footer v-if="currentTab === 'RequestReg'">
        <FormActions :m="mode" :showEditButton="false">
          <template v-slot:after>
            <btn-save label="ثبت" @click="saveObj" />
          </template>
        </FormActions>
      </template>
    </FormWrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import RequestReg from "./partials/RequestReg.vue"
import OfficePreviousVotes from "./partials/OfficePreviousVotes.vue"
import ViolationSendRequestArchive from "./partials/ViolationSendRequestArchive.vue"

export default {
  mixins: [baseFormMixin],
  components: {
    RequestReg,
    OfficePreviousVotes,
    ViolationSendRequestArchive
  },

  data () {
    return {
      name: "UViolationSendRequest",
      title: "ویرایش تخلفات دفاتر",
      formKey: "b65fe692-36ea-0001-0014-66b8eb0e9e77",
      main: true,
      currentTab: "RequestReg",
      model: {
        Request: {
          JobLocationName: "",
          JobLocationNosaziCode: {
            District: 0,
            Region: 0,
            Block: 0,
            House: 0,
            Building: 0,
            Apartment: 0,
            Shop: 0
          },
          RequestType: 0,
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
      this.baseNosaziCode = this.convertToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.loadObj()
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
      this.hideSidebar("UViolationSendRequest")
    }
  },
  methods: {
    getOldViolationVoteByJob () {
      this.showLoading()
      let payload = {
        pNidJobLocation: this.model.Request.NidJobLocation
      }

      this.$services.SJ.getOldViolationVoteByJob(payload)
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.model.ViolationVoteListOld = res.data.ViolationVoteListOld
          }
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async loadObj () {
      try {
        this.showLoading()
        const payload = {
          pNidProc: this.selectedRequest.NidProc
        }
        const { data } = await this.$services.SJ.getViolationRequest(payload)
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.model = this.result.data
          await this.getOldViolationVoteByJob()
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
        const payload = {
          pClsViolation: { ...this.model }
        }
        const { data } = await this.$services.SJ.saveViolationRequest(payload)
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.showSuccess("ذخیره با موفقیت انجام شد.")
          this.loadObj()
        }
      } catch (response) {
        console.error(response)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
