<template>
<safa-form
    appId="badbf938-ee27-414f-8df4-6fa440f8fa70"
    :id="formKey"
    :caption="title"
  >
  <form-wrapper :title="title" :padding="false">
    <fit>
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu label="اطلاعات ارسال تصادفی" name="randomSendingInfo" />
          <tab-menu label="ارسال تصادفی" name="randomSending" />
        </template>
        <tab-content name="randomSendingInfo" :padding="false">
          <GetRandomSendingInformation
            v-model="model"
            @selectedItem="selectRandomSendingInfo"
          />
        </tab-content>
        <tab-content name="randomSending">
          <GetRandomSending
            v-model="model"
            :lockSendBtn="lockSendBtn"
            :randomSendResult="randomSendResult"
            @send="getRandomSend"
          />
        </tab-content>
      </safa-tabs>
    </fit>

    <template #footer>
      <form-actions :showEditButton="false" :m="mode">
        <template #after>
          <btn-new
            label="ایجاد"
            v-if="activeTab === 'randomSendingInfo'"
            :disable="lockCreateBtn"
            @click="createSendRandom"
          />
          <btn-save
            label="تایید"
            v-if="activeTab === 'randomSendingInfo'"
            :disable="lockRevokeAndConfirmBtn"
            @click="confirmSendRandom"
          />
          <btn-cancel
            label="ابطال"
            v-if="activeTab === 'randomSendingInfo'"
            :disable="lockRevokeAndConfirmBtn"
            @click="revokeSendRandom"
          />
          <btn-default
            label="گزارش"
            v-if="activeTab === 'randomSending'"
            :disable="true"
          />
        </template>
      </form-actions>
    </template>
  </form-wrapper>
</safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import GetRandomSendingInformation from "./partials/getRandomSendingInformation.vue"
import GetRandomSending from "./partials/getRandomSending.vue"

export default {
  components: { GetRandomSendingInformation, GetRandomSending },
  mixins: [baseFormMixin],

  data () {
    return {
      title: "ارسال تصادفی",
      name: "URandomSend",
      formKey: "a3bbde85-75c5-4172-9195-979281179c14",
      main: true,

      activeTab: "randomSendingInfo",
      model: {
        RandomSendGetAll: [],
        SendRandomInfo: []
      },
      randomSendResult: [],
      selectedRandomSendingInfo: null,
      lockRevokeAndConfirmBtn: true,
      lockCreateBtn: false,
      isView: false,
      lockSendBtn: true
    }
  },

  mounted () {
    this.getRandomSendAll()
  },

  methods: {
    getRandomSendAll () {
      this.showLoading()
      const payload = { pFlag: 0 }
      this.$services.commissions
        .getRandomSendAll(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.model = res.data.GetRandomSendAllResult
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: "",
                bizCodeTitle: "",
                saveDesc: `بارگذاری فرم ${this.title} انجام گردید.`
              })
            }
            this.isView = true
            let x = []
            x = this.model.SendRandomInfo.filter(
              (item) => item.IsRevoke === false && item.IsConfirm === false
            )
            this.lockCreateBtn = x.length !== 0
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    createSendRandom () {
      this.showLoading()
      const payload = {
        pSendRandomInfo: {
          CreateNIdUser: this.currentUser.NidUser,
          CreateUserName: this.getUserDisplayName(),
          IsConfirm: false,
          IsRevoke: false,
          NIdSendRandom: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.commissions
        .createSendRandom(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.send,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `ارسال در فرم ${this.title} انجام گردید.`
            })
            this.getRandomSendAll()
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    revokeSendRandom () {
      this.showLoading()
      const payload = { pSendRandomInfo: this.selectedRandomSendingInfo }
      this.$services.commissions
        .revokeSendRandom(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.cancel,
              bizCode: this.selectedRandomSendingInfo.NIdSendRandom,
              bizCodeTitle: "NidCommission",
              saveDesc: `ابطال در فرم ${this.title} انجام گردید.`
            })
            this.selectedRandomSendingInfo = null
            this.lockRevokeAndConfirmBtn = true
            this.getRandomSendAll()
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    confirmSendRandom () {
      this.showLoading()
      const payload = { pSendRandomInfo: this.selectedRandomSendingInfo }
      this.$services.commissions
        .confirmSendRandom(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.confirm,
              bizCode: this.selectedRandomSendingInfo.NIdSendRandom,
              bizCodeTitle: "NidCommission",
              saveDesc: `تایید در فرم ${this.title} انجام گردید.`
            })
            this.selectedRandomSendingInfo = null
            this.lockRevokeAndConfirmBtn = true
            this.getRandomSendAll()
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    getRandomSend ({
      commissionDate,
      commissionType,
      ciCommission,
      randomSendGetAll
    }) {
      if (!this.isValidForm()) return
      const payload = {
        pNidTask: commissionType,
        pNIdSendRandom: this.selectedRandomSendingInfo.NIdSendRandom,
        pCommissionDate: commissionDate,
        pSrvRandomSendGetAll: randomSendGetAll,
        pCi_Commission: ciCommission,
        pFlag: 0
      }
      this.$services.commissions
        .getRandomSend(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            this.randomSendResult = res.data.GetRandomSendResult.RandomSend
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRandomSendingInfo.NIdSendRandom,
              bizCodeTitle: "NIdSendRandom",
              saveDesc: `بارگذاری اطلاعات ارسال در فرم ${this.title} انجام گردید.`
            })
          } else {
            this.showError(res.errors[0].text)
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    selectRandomSendingInfo (val) {
      this.selectedRandomSendingInfo = val
    }
  },

  watch: {
    selectedRandomSendingInfo () {
      if (
        this.selectedRandomSendingInfo.IsRevoke ||
        this.selectedRandomSendingInfo.IsConfirm
      ) {
        this.lockRevokeAndConfirmBtn = true
      } else {
        this.lockRevokeAndConfirmBtn = false
      }

      this.selectedRandomSendingInfo
        ? (this.lockSendBtn = false)
        : (this.lockSendBtn = true)
    }
  }
}
</script>
