<template>
  <internal-section
    :class="[backgroundColor]"
    style="position: sticky; bottom: 0; padding: 8px !important; z-index: 11"
    title="تاییدیه رای"
    :defaultShow="false"
    ref="intRef"
    class="commissionVoteOfAgentSection"
  >
    <safa-status :result="getCommissionVoteOfAgentRes" />
    <safa-status :result="saveCommissionVoteOfAgentRes" />
    <div class="flex q-col-gutter-x-md items-center q-mb-sm">
      <safa-combo2
        v-if="comboAgentShow"
        v-model="comboAgent"
        cdcName="comboAgent"
        :options="comboAgentOptions"
        source-type="local"
        @input="comboAgentSelectionChanged"
      />
      <safa-label style="font-size: 11px; width: 120px"
        >یا موافق این رای هستید ؟</safa-label
      >
      <safa-radio
        v-model="isAccept"
        :label="rd1Content"
        :val="1"
        :m="isRd1Enabled ? 'e' : 'r'"
      />
      <safa-radio
        v-model="isAccept"
        :label="rd2Content"
        :val="2"
        :m="isRd2Enabled ? 'e' : 'r'"
      />
      <safa-radio
        v-if="rd3Show"
        v-model="isAccept"
        :label="rd3Content"
        :val="3"
        :m="isRd3Enabled ? 'e' : 'r'"
      />
    </div>
    <div class="q-mb-sm">
      <text-template
        v-model="dataContext.Description"
        cdcName="Description"
        formKey="bf65ef05-ce37-44ee-9823-ec6ae96d40a1"
        label="توضیحات"
        :rows="5"
      />
    </div>

    <btn-default
      label="ذخیره"
      @click="btnSaveClick"
      :disabled="!isBtnSaveEnabled"
    />
  </internal-section>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

import { uid } from "quasar"
import { currentDate } from "src/utils/index"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],

  props: {
    commissionsSetting: Object,
    // loginHistory: Array,
    title: String,
    formKey: String,
    name: String
  },

  data () {
    return {
      isView: false,

      // Contents
      rd1Content: "موافقم",
      rd2Content: "موافق نیستم",
      rd3Content: "حذف امضاء",
      isAccept: 3,
      isRd1Enabled: true,
      isRd2Enabled: true,
      isRd3Enabled: false,
      rd3Show: false,

      // Models
      commissionVoteOfAgent: {},
      comboAgentOptions: [],
      loginHistory: [],
      dataContext: {},
      comboAgentShow: false,
      isOwener: false,
      comboAgent: 0,
      pNidCommission: "00000000-0000-0000-0000-000000000000",
      backgroundColor: "bg-blue-grey-2",

      // buttons
      isBtnSaveEnabled: true,

      // Responses
      getCommissionVoteOfAgentRes: null,
      saveCommissionVoteOfAgentRes: null,

      // CF
      completed: null
    }
  },

  created () {
    if (
      this.getApplicationParam.hasOwnProperty(
        "ChangeRdlCommissionVoteOfAgentForQom"
      ) &&
      this.getApplicationParam.ChangeRdlCommissionVoteOfAgentForQom
    ) {
      this.rd3Show = true
      this.rd1Content = "درج امضا"
      this.rd2Content = "مخالف"
    }
  },
  mounted () {
    this.onLoadInternalSection()
    this.loginHistory = this.getLoginHistoryUser
  },
  computed: {
    getLoginHistoryUser () {
      return this.$store.getters['commission/getLoginHistoryUser'] || []
    }
  },
  methods: {
    onLoadInternalSection () {
      let div = document.querySelector(
        ".commissionVoteOfAgentSection .int-title.q-mb-sm.flex.q-gutter-x-xs.items-center"
      )
      const self = this
      div.addEventListener("click", function (event) {
        // Check if the target of the event is not the button
        if (!event.target.closest("button")) {
          self.$refs.intRef.isShow = !self.$refs.intRef.isShow
        }
      })
    },
    load (pNidCommission, pNidUser) {
      if (this.loginHistory !== null && this.loginHistory.length > 0) {
        this.comboAgentShow = true
        this.comboAgentOptions = []

        // this.comboAgentOptions.push({ ID: 0, Title: `همه` })
        this.loginHistory.forEach((user, ID) => {
          this.comboAgentOptions.push({
            ...user,
            ID,
            Title: `${user.UserName} / ${user.FirstName} ${user.LastName}`
          })
        })
      }

      this.pNidCommission = pNidCommission
      if (
        this.getApplicationParam.hasOwnProperty("AcceptVoteByAgent") &&
        this.getApplicationParam.AcceptVoteByAgent &&
        this.selectedCommission !== null
      ) {
        this.showLoading()
        const payload = {
          pRequest: {
            CommissionVoteOfAgent: {
              CommissionVoteOfAgent: {
                NidCommission: pNidCommission,
                NidUser: pNidUser
              },
              NidAgent: pNidUser
            }
          }
        }
        this.showLoading()
        this.$services.commissions
          .getCommissionVoteOfAgent(payload)
          .then(async ({ data: args }) => {
            this.getCommissionVoteOfAgentRes = this.getResponse(args)

            if (this.getCommissionVoteOfAgentRes.success) {
              this.commissionVoteOfAgent =
                this.getCommissionVoteOfAgentRes.data.GetCommissionVoteOfAgentResult.CommissionVoteOfAgent.CommissionVoteOfAgent
              this.dataContext = { ...this.commissionVoteOfAgent }

              if (
                this.getApplicationParam.hasOwnProperty(
                  "ChangeRdlCommissionVoteOfAgentForQom"
                ) &&
                this.getApplicationParam.ChangeRdlCommissionVoteOfAgentForQom
              ) {
                this.isRd3Enabled = true
                if (
                  // eslint-disable-next-line eqeqeq
                  (this.commissionVoteOfAgent?.EnumStatusVoteAgent ?? 0) === 0
                    ? this.commissionVoteOfAgent.IsAccept === true
                    : this.commissionVoteOfAgent.EnumStatusVoteAgent === 1
                ) {
                  this.backgroundColor = "bg-green-7" // green
                  this.isAccept = 1
                } else if (
                  // eslint-disable-next-line eqeqeq
                  (this.commissionVoteOfAgent?.EnumStatusVoteAgent ?? 0) === 0
                    ? this.commissionVoteOfAgent.IsAccept === false
                    : this.commissionVoteOfAgent.EnumStatusVoteAgent === 2
                ) {
                  this.backgroundColor = "bg-red-4" // red
                  this.isAccept = 2
                } else if (
                  // eslint-disable-next-line eqeqeq
                  (this.commissionVoteOfAgent?.EnumStatusVoteAgent ?? 0) === 0
                    ? this.commissionVoteOfAgent.IsAccept === false
                    : this.commissionVoteOfAgent.EnumStatusVoteAgent === 3
                ) {
                  this.backgroundColor = "bg-blue-grey-1" // light grey
                  this.isAccept = 3
                }

                if (
                  !this.commissionsSetting.IsEnableEditCommissionVoteOfAgent
                ) {
                  this.isBtnSaveEnabled = false
                }
              } else {
                if (this.commissionVoteOfAgent.IsAccept) {
                  this.isAccept = 1
                  this.backgroundColor = "bg-green-7" // green
                  if (
                    !this.commissionsSetting.IsEnableEditCommissionVoteOfAgent
                  ) {
                    this.isBtnSaveEnabled = false
                  }
                } else {
                  this.backgroundColor = "bg-red-4" // red
                  this.isAccept = 2
                  if (
                    !this.commissionsSetting.IsEnableEditCommissionVoteOfAgent
                  ) {
                    this.isBtnSaveEnabled = false
                  }
                }
              }

              if (
                // eslint-disable-next-line eqeqeq
                this.commissionVoteOfAgent.NidCommissionVoteOfAgent ===
                "00000000-0000-0000-0000-000000000000"
              ) {
                this.isBtnSaveEnabled = true
                this.backgroundColor = "bg-blue-grey-2" // LightGray
                this.isAccept = 1
              } else if (
                this.getCommissionVoteOfAgentRes.data
                  .GetCommissionVoteOfAgentResult.CommissionVoteOfAgent
                  .OwnerCommissionVoteOfAgent !== null
              ) {
                this.isOwener =
                  // eslint-disable-next-line eqeqeq
                  this.getCommissionVoteOfAgentRes.data
                    .GetCommissionVoteOfAgentResult.CommissionVoteOfAgent
                    .OwnerCommissionVoteOfAgent.NidUser ===
                  this.getCommissionVoteOfAgentRes.data
                    .GetCommissionVoteOfAgentResult.CommissionVoteOfAgent
                    .CommissionVoteOfAgent.NidUser
              } else if (
                this.getCommissionVoteOfAgentRes.data
                  .GetCommissionVoteOfAgentResult.CommissionVoteOfAgent
                  .OwnerCommissionVoteOfAgent === null
              ) {
                this.isOwener = true
              }

              if (this.completed !== null) this.completed()
              await this.log({
                action: this.logActions.view,
                bizCode: '',
                bizCodeTitle: '',
                saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
              })
            }
          })
          .catch((error) => {
            console.error(error)
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },

    btnSaveClick () {
      let tmpListAgent = []
      this.commissionVoteOfAgent = {
        NidCommissionVoteOfAgent: uid()
      }
      // eslint-disable-next-line eqeqeq
      if (this.comboAgentShow === true) {
        let tmpSelectedUser =
          this.comboAgent === null ||
          // eslint-disable-next-line eqeqeq
          this.comboAgentOptions[this.comboAgent].FirstName === "همه"
            ? this.loginHistory.filter((f) => f.FirstName !== "همه")
            : this.loginHistory.filter(
              (a) =>
              // eslint-disable-next-line eqeqeq
                a.NidUser === this.comboAgentOptions[this.comboAgent].NidUser
            )

        tmpSelectedUser.forEach((i) => {
          let tmpCommissionVoteOfAgent = {
            NidCommission: this.pNidCommission,
            NidUser: i.NidUser,
            Description: this.dataContext.Description,
            NidCommissionVoteOfAgent: uid(),
            UserName: `${i.FirstName} ${i.LastName}`,
            // eslint-disable-next-line eqeqeq
            IsVoteOwner: i.NidUser === this.getNidUser()
          }

          this.showLoading()
          // eslint-disable-next-line eqeqeq
          if (this.isAccept === 1) {
            this.commissionVoteOfAgent.IsAccept = true
            this.commissionVoteOfAgent.EnumStatusVoteAgent = 1
            //
            tmpCommissionVoteOfAgent.IsAccept = true
            tmpCommissionVoteOfAgent.EnumStatusVoteAgent = 1
            // eslint-disable-next-line eqeqeq
          } else if (this.isAccept === 2) {
            this.commissionVoteOfAgent.IsAccept = false
            this.commissionVoteOfAgent.EnumStatusVoteAgent = 2
            //
            tmpCommissionVoteOfAgent.IsAccept = false
            tmpCommissionVoteOfAgent.EnumStatusVoteAgent = 2
            // eslint-disable-next-line eqeqeq
          } else if (this.isAccept === 3) {
            this.commissionVoteOfAgent.IsAccept = false
            this.commissionVoteOfAgent.EnumStatusVoteAgent = 3
            this.commissionVoteOfAgent.DeleteDate = currentDate()
            //
            tmpCommissionVoteOfAgent.IsAccept = false
            tmpCommissionVoteOfAgent.EnumStatusVoteAgent = 3
            tmpCommissionVoteOfAgent.DeleteDate = currentDate()
          }

          tmpListAgent.push(tmpCommissionVoteOfAgent)
        })

        const payload = {
          pRequest: {
            UserFamily: this.getUserDisplayName(),
            ListCommissionVoteOfAgent: tmpListAgent
          }
        }
        this.showLoading()
        this.$services.commissions
          .saveCommissionVoteOfAgent(payload)
          .then(async ({ data: args }) => {
            this.saveCommissionVoteOfAgentRes = this.getResponse(args)
            if (this.saveCommissionVoteOfAgentRes.success) {
              this.log({
                action: this.logActions.save,
                bizCode: this.pNidCommission,
                bizCodeTitle: "NidCommission",
                saveDesc: `ذخیره اطلاعات فرم ${this.title} انجام گردید.`
              })
              this.load(
                this.pNidCommission,
                // eslint-disable-next-line eqeqeq
                this.comboAgentOptions[this.comboAgent].FirstName !== "همه"
                  ? this.comboAgentOptions[this.comboAgent].NidUser
                  : this.getNidUser()
              )
            }
          })
          .catch((error) => {
            console.error(error)
          })
          .finally(() => {
            this.hideLoading()
          })
      } else this.saveAgent()
    },

    saveAgent () {
      if (
        this.getApplicationParam.hasOwnProperty("AcceptVoteByAgent") &&
        this.getApplicationParam.AcceptVoteByAgent &&
        this.commissionVoteOfAgent !== null
      ) {
        this.showLoading()
        // eslint-disable-next-line eqeqeq
        if (this.isAccept === 1) {
          this.commissionVoteOfAgent.IsAccept = true
          this.commissionVoteOfAgent.EnumStatusVoteAgent = 1
          // eslint-disable-next-line eqeqeq
        } else if (this.isAccept === 2) {
          this.commissionVoteOfAgent.IsAccept = false
          this.commissionVoteOfAgent.EnumStatusVoteAgent = 2
          // eslint-disable-next-line eqeqeq
        } else if (this.isAccept === 3) {
          this.commissionVoteOfAgent.IsAccept = false
          this.commissionVoteOfAgent.EnumStatusVoteAgent = 3
        }
        this.commissionVoteOfAgent.NidUser = this.getNidUser()
        this.commissionVoteOfAgent.NidCommission = this.pNidCommission
        this.commissionVoteOfAgent.IsVoteOwner = this.isOwener
        this.commissionVoteOfAgent.UserName = this.getUserDisplayName()
        this.commissionVoteOfAgent.NidCommissionVoteOfAgent = uid()

        const payload = {
          pRequest: {
            CommissionVoteOfAgent: {
              CommissionVoteOfAgent: { ...this.commissionVoteOfAgent }
            }
          }
        }

        this.$services.commissions
          .saveCommissionVoteOfAgent(payload)
          .then(async ({ data: args }) => {
            this.saveCommissionVoteOfAgentRes2 = this.getResponse(args)

            if (this.saveCommissionVoteOfAgentRes2.success) {
              this.log({
                action: this.logActions.save,
                bizCode: this.pNidCommission,
                bizCodeTitle: "NidCommission",
                saveDesc: `ذخیره اطلاعات فرم ${this.title} انجام گردید.`
              })
              this.load(this.pNidCommission, this.getNidUser())

              await this.$store.dispatch("commission/fetchKartableRows")
            }
          })
          .catch((error) => {
            console.error(error)
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },

    comboAgentSelectionChanged () {
      if (this.comboAgent !== null) {
        this.load(
          this.pNidCommission,
          this.comboAgentOptions[this.comboAgent].NidUser
        )
      }
    }
  },

  watch: {
    isAccept: {
      handler (newValue) {
        // eslint-disable-next-line eqeqeq
        if (newValue === 3) this.isBtnSaveEnabled = true
      }
    },

    loginHistory () {
      this.load(this.selectedNidCommission, this.getNidUser())
    }
  }
}
</script>
