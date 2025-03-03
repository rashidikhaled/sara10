<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <form-wrapper :padding="false" :title="title">
      <template #header>
        <safa-status :result="getCommissionVoteLogResultRes" />
      </template>
      <fit>
        <safa-grid
          pagination
          v-model="dataContext.rowData"
          cdcName="rowData"
          helper="CommissionVoteDeleteLogColumn"
          fit
          m="r"
          height="100%"
          min-height="200px"
          max-height="100%"
          filterable
          :allowMultipleSelection="true"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],

  data () {
    return {
      title: "سوابق رای های حذف شده",
      formKey: "EB1ECDB5-5D2B-4056-92DF-F35AD2255754",
      name: "UCommissionVoteDeleteLog",
      main: true,

      // Context
      dataContext: {
        rowData: []
      },
      // CommissionVoteDeleteLogColumn: [
      //   {
      //     field: 'isSelectedNode',
      //     title: '',
      //     width: '74px',
      //     filterable: true,
      //     lockPosition: true,
      //     pinned: 'right',
      //     editor: 'selection'
      //   },
      //   {
      //     field: "CI_VoteType",
      //     title: "نوع رای",
      //     editor: "ci",
      //     domain: "Commission100"
      //   },
      //   {
      //     field: "StrDate",
      //     title: "تاریخ حذف رای",
      //     width: 125
      //   },
      //   {
      //     field: "StrTime",
      //     title: "ساعت حذف رای",
      //     width: 125
      //   },
      //   {
      //     field: "VoteDate",
      //     title: "تاریخ رای",
      //     width: 130
      //   },
      //   {
      //     field: "VoteNo",
      //     title: "شماره رای"
      //   },
      //   {
      //     field: "NidLog",
      //     title: "NidLog",
      //     width: "auto"
      //   }
      // ],

      // Response
      getCommissionVoteLogResultRes: null
    }
  },

  methods: {
    async loadObj () {
      this.showLoading()
      await this.$services.commissions
        .getCommissionVoteLog({
          pNidCommission: this.selectedNidCommission
        })
        .then(async ({ data }) => {
          this.getCommissionVoteLogResultRes = this.getResponse(data)

          if (this.getCommissionVoteLogResultRes.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedNidCommission,
              bizCodeTitle: "NidCommission",
              nosaziCode: this.selectedCommission?.BizCode ?? '',
              saveDesc: `بارگذاری اطلاعات فرم ${this.title} با شماره ارجاع ${
                this.selectedCommission?.UrbanNidRequest ?? ""
              } انجام گردید.`
            })
            this.dataContext.rowData =
              this.getCommissionVoteLogResultRes.data.GetCommissionVoteLogResult
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },

  async created () {
    if (await this.canOpenWindow()) {
      await this.loadObj()
    }
  }
}
</script>
