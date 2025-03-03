<template>
  <form-wrapper :title="title">
    <fit>
      <FormRow>
        <FormControl>
          <safa-combo
            label="تاریخ کمیسیون"
            label-width="80px"
            :options="commissionDates"
            v-model="voteDate"
            cdcname="voteDate"
            source-type="local"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            ciName="CI_Commission"
            domainName="Commission100"
            :value="CI_Commission"
            cdcname="CI_Commission"
            @input="CICommissionChange"
            label="نوع کمیسیون"
            label-width="80px"
            emitValue
          />
        </FormControl>
      </FormRow>
    </fit>

    <template #footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @save="saveData"
        @cancel="isEditable = false"
      >
        <template v-slot:after>
          <btn-delete label="حذف" />
        </template>
      </form-actions>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "گراف عملکرد کمیسیون",
      name: "CommisionGraph",
      formKey: "8afc6975-c373-4bd5-a199-4e74f2ea7953",
      main: true,
      CI_Commission: 0,
      model: {
        // IsActive: false,
        // NIDCommission: "00000000-0000-0000-0000-000000000000",
        // NIDVote: "00000000-0000-0000-0000-000000000000",
        // NidProc: "00000000-0000-0000-0000-000000000000",
        // ISRelapse: false,
        // IsRegion: false,
        // IsdeleteArchive: false,
        // NidAgent: "00000000-0000-0000-0000-000000000000",
        // NidTaskState: "00000000-0000-0000-0000-000000000000",
        // NidUser: "00000000-0000-0000-0000-000000000000",
        // SelectedDate: 0,
      },
      commissionDates: [],
      GraphVoteDate: [],
      voteDate: ""
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    CICommissionChange (val) {
      console.log(this.CI_Commission)
    },
    loadData () {
      this.showLoading()
      this.$services.commissions
        .getGraphVoteDate()
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            const list = []
            list.push(
              ...res.data.GetGraphVoteDateResult.GraphVoteDate.map((item) => {
                let r = {}
                r.ID = item.VoteDate
                r.Title = item.VoteDate
                return r
              })
            )
            this.commissionDates = list
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `بارگذاری اطلاعات در  ${this.title} انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getGraph () {
      this.showLoading()
      const payload = {
        PRequest: {
          CICommission: this.CI_Commission,
          VoteDate: this.voteDate,
          Lable: "كميسيون يك"
        }
      }
      this.$services.commissions
        .getGraph(payload)
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            return res.data.GetGraphResult
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveData () {}
  },
  watch: {
    CI_Commission () {
      this.getGraph()
    }
  }
}
</script>
