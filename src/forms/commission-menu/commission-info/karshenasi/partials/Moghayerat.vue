<template>
  <fit>
    <safa-grid
      title="مغایرت آرا"
      fit
      pagination
      :masterDetail="true"
      v-model="votesConflicts"
      cdcName="votesConflicts"
      :columns="votesConflictsColumns"
      :rowGroupPanelShow="'always'"
    />
  </fit>
  <!-- :detailCellRendererParams="detailCellRendererParams" -->
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "مغایرت آرا",
      name: "Moghayerat",
      votesConflicts: [],
      votesConflictsColumns: [
        {
          field: "CI_VoteType",
          title: "نوع رای",
          width: "170px",
          editor: "combo",
          domain: "Commission100"
        },
        {
          field: "VotePriority",
          title: "ترتیب صدور",
          width: "170px"
        },
        {
          field: "CI_VoteType",
          title: "نوع رای",
          width: "170px",
          editor: "combo",
          domain: "Commission100"
        },
        { field: "VoteValue", title: "مقدار رای", width: "170px" },
        { field: "UrbanNidKartablItem", title: "شماره ارجاع", width: "170px" },
        { field: "VoteNo", title: "شماره رای", width: "170px" },
        {
          field: "CI_Commission",
          title: "شماره کمیسیون",
          width: "170px",
          editor: "combo",
          domain: "Commission100"
        },
        {
          field: "CI_CommissionType",
          title: "نوع کمیسیون",
          width: "170px",
          editor: "combo",
          domain: "Commission100"
        },
        {
          field: "CI_PrintType",
          title: "نوع چاپ",
          width: "170px",
          editor: "combo",
          domain: "Commission100"
        },
        { field: "VoteDate", title: "تاریخ رای", width: "170px" },
        { field: "CommissionDate", title: "تاریخ کمیسیون", width: "170px" },
        { field: "Vote_Comments", title: "شرح رای", width: "400px" }
      ].map((c) => ({ ...c, enableRowGroup: true }))
    }
  }
}
</script>
