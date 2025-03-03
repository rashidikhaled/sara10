<template>
  <FormWrapper :title="title">
    <template #header>
      <safa-status :result="backRes" />
    </template>
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            label="مرحله"
            label-width="70px"
            sourceType="local"
            :options="taskStateList"
            v-model="nidTaskState"
            cdcName="nidTaskState"
            required
            validation="required"
          />
        </FormControl>
      </FormRow>
      <safa-text
        fit
        type="textarea"
        v-model="desc"
        cdcName="desc"
        label="توضیحات"
        label-width="70px"
        required
        validations="required"
        :rows="6"
      />
    </fit>

    <template #footer>
      <form-actions
        m="e"
        @save="saveBackState"
        @cancel="$emit('hide')"
        saveButtonTitle="برگشت"
      />
    </template>
  </FormWrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],

  props: ["value"],
  data () {
    return {
      name: "PrevStep",
      title: "برگشت مرحله",
      taskStateList: []

      // NidTaskStateNew: null,
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    loadObj () {
      this.showLoading()
      this.taskStateList = []

      const payload = {
        PRequest: {
          NidTaskState: this.selectedCommission.NidTask,
          NidUser: this.getNidUser(),
          NIDCommission: this.selectedNidCommission

          // NIDVote:
          //   this.selectedCommission.NIDVote ||
          //   "00000000-0000-0000-0000-000000000000",
          // NidProc:
          //   this.selectedCommission.NidProc ||
          //   "00000000-0000-0000-0000-000000000000",
          // NidAgent:
          //   this.selectedCommission.NidAgent ||
          //   "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.commissions
        .getListOfTaskState(payload)
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            const result = res.data.GetListOfTaskStateResult
            if (result && result.length > 0) {
              const list = []
              list.push(
                ...result.map((item) => {
                  let r = {}
                  r.ID = item.NidTaskState
                  r.Title = item.TaskTitle
                  return r
                })
              )
              this.taskStateList = list
              this.nidTaskState = list[0].ID
            }
          }
        })
        .catch((res) => {
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    saveBackState () {
      let checkVoteExistance = window.getConfigValue("commission100.disableVoteCheckForBackMethod", false)
      if (!checkVoteExistance && this.selectedCommission.VoteDate && !this.selectedCommission.HasHoghoghi) {
        this.showError("برگشت پرونده بدلیل داشتن رای امکان پذیر نمی باشد")
        return false
      }

      this.backMethod()
    }
  }
}
</script>
