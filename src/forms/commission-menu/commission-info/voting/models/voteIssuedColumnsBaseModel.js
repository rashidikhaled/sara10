export default [
  {
    field: "editVote",
    title: "ویرایش رای",
    editor: "action",
    label: "ویرایش رای",
    width: "80px"
  },
  { field: "VotePriority", title: "ترتیب صدور", width: "100px" },
  {
    field: "CI_VoteType",
    title: "نوع رای",
    width: "150px",
    editor: "combo",
    domain: "Commission100"
  },
  {
    field: "CI_VoteTypeDetail", // UniqueName="VoteType"
    title: "کد رای",
    width: "150px",
    editor: "combo",
    domain: "Commission100",
    isHidden: true
  },
  { field: "VoteValue", title: "مقدار رای", width: "200px" },
  { field: "VoteNo", title: "شماره رای", width: "150px" },
  { field: "VoteDate", title: "تاریخ رای", width: "100px" },
  {
    field: "CI_Evaluation",
    title: "ارزیابی دفاتر",
    width: "150px",
    editor: "combo",
    domain: "Commission100"
  },
  {
    field: "IsNote7Action",
    title: "اعمال تبصره 7",
    width: "100px",
    editor: "checkbox"
  },
  { field: "Vote_Comments", title: "شرح رای", width: "600px" }
]
