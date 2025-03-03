<template>
  <fit>
    <safa-grid
      helper="ViolationVoteListOld"
      height="100%"
      max-height="100%"
      min-height="100%"
      paginate
      fit
      v-model="model.ViolationVoteListOld"
      m="r"
      :bordered="false"
      :suppressRowClickSelection="false"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    model: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      name: "OfficePreviousVotes"
      // ViolationVoteListOld: [
      //   {
      //     field: "NidWorkItem",
      //     title: "شماره درخواست",
      //     width: "100px"
      //   },
      //   {
      //     field: "CI_Violation",
      //     title: "عنوان تخلف",
      //     width: "400px",
      //     editor: "combo",
      //     domain: "Analysis"
      //   },
      //   {
      //     field: "Description",
      //     title: "توضیحات",
      //     width: "200px"
      //   },
      //   {
      //     field: "UserNameOffending",
      //     title: "کاربر متخلف",
      //     width: "200px",
      //     editor: "combo",
      //     domain: "Analysis"
      //   },
      //   {
      //     field: "CI_VoteMain",
      //     title: "رای اصلی",
      //     width: "150px",
      //     editor: "combo",
      //     domain: "Analysis"
      //   },
      //   {
      //     field: "CI_VoteSub",
      //     title: "رای فرعی",
      //     width: "150px",
      //     editor: "combo",
      //     domain: "Analysis"
      //   },
      //   {
      //     field: "Date",
      //     title: "تاریخ صدور رای",
      //     width: "100px",
      //     editor: "date"
      //   },
      //   {
      //     field: "ViolationCount",
      //     title: "تعداد تخلف",
      //     width: "100px"
      //   },
      //   {
      //     field: "DescriptionVote",
      //     title: "شرح رای",
      //     width: "100px"
      //   }
      // ]
    }
  }
}
</script>
