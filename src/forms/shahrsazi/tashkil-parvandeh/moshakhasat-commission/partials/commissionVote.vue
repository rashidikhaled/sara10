<template>
  <fit>
    <safa-splitter v-model="splitterModel" horizontal class="fit" margin="0">
      <template v-slot:before>
        <fit>
            <!-- helper="commissionDetailsGetVote" -->
          <safa-grid
            :columns="test"
            v-model="value.Commission_Vote"
            cdcName="Commission_Vote"
            title="رأی"
            :m="m"
            fit
            min-height="100px"
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            helper="trepass"
            v-model="value.Commission_Trepass"
            cdcName="Commission_Trepass"
            title="تخلفات"
            :m="m"
            fit
            min-height="100px"
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      name: "commissionVote",
      splitterModel: 50,
      test: [
        {
          field: "CI_CommissionVoteType",
          title: "نوع رأی",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "150px"
        },
        {
          field: "CI_CommissionType",
          title: "نوع کمیسیون",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "150px"
        },
        {
          field: "CI_CommissionVoteTypeDetail",
          title: "جزئیات نوع کمیسیون",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "150px"
        },
        { field: "VoteValue", title: "مقدار رأی", width: "100px" },
        { field: "VoteNo", title: "شماره رأی", width: "100px" },
        { field: "VoteDate", title: "تاریخ رأی", editor: "date", width: "100px" },
        { field: "VoteComments", title: "شرح رأی", width: "300px" },
        { field: "IsConfirm", title: "تأیید", editor: "checkbox", width: "60px" },
        {
          field: "ConfirmDate",
          title: "تاریخ تأیید",
          editor: "date",
          width: "100px"
        },
        { field: "ConfirmComments", title: "توضیحات تأیید", width: "300px" },
        {
          field: "IsSendToDoCommission",
          title: "ارسال به اجرای احکام",
          editor: "checkbox",
          width: "150px"
        },
        {
          field: "DoCommissionComments",
          title: "توضیحات اجرای احکام",
          width: "300px"
        }
      ]
    }
  }
}
</script>
