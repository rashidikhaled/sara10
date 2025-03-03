<template>
  <form-wrapper title="ابطال درخواست">
    <safa-status :result="requstResult" />
    <div>
      <div class="row q-col-gutter-sm">
        <safa-text
          label="شماره ارجاع"
          label-width="80px"
          class="col-6"
          v-model="taskInfo.NidWorkItem"
          cdcNeme="NidWorkItem"
          m="r"
        />
        <safa-text label="تاریخ ارجاع" label-width="80px" class="col-6" m="r" />
      </div>
      <div class="q-my-sm">
        <div class="row q-col-gutter-sm">
          <safa-text
            label="کد"
            label-width="80px"
            class="col-6"
            v-model="taskInfo.BizCode"
            cdcNeme="BizCode"
            m="r"
          />
          <safa-text
            label="موضوع"
            label-width="80px"
            class="col-6"
            v-model="taskInfo.WorkflowTitel"
            cdcNeme="WorkflowTitel"
            m="r"
          />
        </div>
      </div>
      <safa-combo
        label="علت ابطال"
        label-width="80px"
        class="q-mb-sm"
        v-model="revokeReason"
        cdcNeme="revokeReason"
        ciName="CI_GarbageArchiveCause"
        domainName="CI_SaraM1"
      />
      <safa-text
        label="توضیحات"
        label-width="80px"
        type="textarea"
        v-model="comments"
        cdcNeme="comments"
      />
    </div>
    <template v-slot:footer>
      <btn-cancel label="ابطال" @click="handleRevokeClick" />
    </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    taskInfo: Object
  },
  data () {
    return {
      revokeReason: 0,
      comments: "",
      requstResult: null,
      isAllowCancel: false
    }
  },
  mounted () {
    this.checkAllowCancelReq()
  },
  methods: {
    async checkAllowCancelReq () {
      if (this.currentUser.isSysAdmin) {
        this.isAllowCancel = true
      } else if (
        this.selectedRequest.CreatedBy.toLowerCase() ===
        this.currentUser.NidUser.toLowerCase()
      ) {
        this.isAllowCancel = true
      } else {
        const nidGroup =
          window.getConfigValue("esupParams")?.AllowCancelGroupId ?? null
        if (Array.isArray(nidGroup)) {
          for (let i = 0; i < nidGroup.length; i++) {
            if (this.isAllowCancel) return
            await this.userExists(nidGroup[i])
          }
        } else {
          if (nidGroup) {
            await this.userExists(nidGroup)
          } else this.isAllowCancel = false
        }
      }
    },
    async userExists (NidGroup) {
      try {
        this.showLoading()
        const res = await this.$services.security.userExists({
          NidGroup,
          filter: [["NidUser", this.currentUser.NidUser]]
          // search: '',
          // nin: false
        })
        if (res.data.success) {
          this.isAllowCancel = res.data?.data?.exists ?? false
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async handleRevokeClick () {
      if (!this.isAllowCancel) {
        return this.showError("شما مجاز به ابطال این درخواست نمی باشید.")
      }
      this.showLoading()
      try {
        let payLoad = {
          pNidProc: this.taskInfo.NidProc,
          pNidUser: this.getNidUser(),
          pUserName: this.getUserDisplayName(),
          pComments: this.comments,
          pCI_GarbageArchiveCause: this.revokeReason
        }
        const { data } = await this.$services.SC.sendToGarbageKartablNew(
          payLoad,
          { config: { District: this.selectedDistrict } }
        )
        this.requstResult = this.getResponse(data)
        if (this.requstResult.success) {
          this.showError("ابطال درخواست با موفقیت انجام شد.")
          // await this.log({
          //   action: this.logActions.cancel,
          //   bizCode: this.taskInfo.NidProc,
          //   bizCodeTitle: "NidProc",
          //   nidWorkItem: this.taskInfo.NidWorkItem,
          //   nosaziCode: this.taskInfo.BizCode
          // })
          this.$emit("revokeDone")
        }
      } catch (e) {
        this.serverError()
        console.error("error", e)
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
