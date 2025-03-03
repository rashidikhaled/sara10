<template>
  <form-wrapper :padding="false" title="رای های کمیسیون">
    <safa-status :result="loadCommissionVoteRes" />
    <fit>
      <safa-splitter v-model="splitterModel" class="fit" horizontal margin="0">
        <template v-slot:before>
          <safa-grid
            title="آرا"
            v-model="loadCommissionVote.Commission_Vote"
            cdcName="Commission_Vote"
            helper="commissionVote"
            fit
            m="r"
            height="100%"
            max-height="100%"
            min-height="200px"
            paginate
          />
        </template>
        <template v-slot:after>
          <safa-grid
            title="تخلفات"
            v-model="loadCommissionVote.Commission_Trepass"
            cdcName="Commission_Trepass"
            helper="trepass"
            fit
            m="r"
            height="100%"
            max-height="100%"
            min-height="200px"
            paginate
          />
        </template>
      </safa-splitter>
    </fit>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  name: "CommissionVoteList",
  mixins: [baseFormMixin],
  props: {
    title: String,
    formKey: String,
    name: String,
    value: {
      type: Object,
      default: () => ({})
    },
    baseNosaziCode: Object
  },

  data () {
    return {
      splitterModel: 50,
      loadCommissionVoteRes: null,
      loadCommissionVote: { Commission_Vote: [], Commission_Trepass: [] }
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    async loadData () {
      try {
        this.showLoading()
        const response = await this.$services.SC.loadCommission(
          { pNidCommission: this.value.NidCommission },
          {
            config: {
              District: this.baseNosaziCode.District
            }
          }
        )
        this.loadCommissionVoteRes = this.getResponse(response.data)
        if (this.loadCommissionVoteRes.success) {
          this.loadCommissionVote = this.loadCommissionVoteRes.data
          await this.log({
            action: this.logActions.view,
            bizCode: this.value.NidCommission,
            bizCodeTitle: "NidCommission",
            saveDesc: `بارگذاری جزئیات رای های  کمیسیون با شماره کمیسیون ${this.value.CommissionNo} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
