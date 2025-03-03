<template>
  <fit>
    <FormRow class="q-my-sm q-pl-sm" :lg="3" :md="3" :xl="3" :sm="2">
      <FormControl>
        <safa-text
          label="محل خدمت دفتر متخلف"
          label-width="100px"
          m="r"
          v-model="model.Request.JobLocationName"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ درخواست"
          label-width="100px"
          m="r"
          v-model="model.Request.Date"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد نوسازی محل تخلف"
          label-width="100px"
          m="r"
          v-model="model.Request.JobLocationNosaziCode"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام شاکی"
          label-width="100px"
          m="r"
          v-model="model.Request.ComplainantName"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="موبایل شاکی"
          label-width="100px"
          m="r"
          v-model="model.Request.ComplainantMobile"
        />
      </FormControl>
    </FormRow>
    <safa-grid
      helper="ViolationVoteList"
      height="100%"
      max-height="100%"
      min-height="100%"
      paginate
      fit
      v-model="model.Request.ViolationVoteList"
      m="e"
      :suppressRowClickSelection="false"
    />
  </fit>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    m: String
  },

  data () {
    return {
      name: "Voting"
      //  دکمه ی آرای قبلی کاربر در سرا8 عملکردی نداشته و به همین علت در خود فرم نیز قبل از تبدیل به گرید جدید عملکردی وجود نداشته و تابعی مربوط به این دکمه نیست
      // به همین علت در هنگام تبدیل به گرید جدید از اونجایی که وجود دکمه به وجود تابع وابسته میباشد این دکمه قرار داده نشده
      // ViolationVoteList: [
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
      //     field: "ViolationCount",
      //     title: "تعداد تخلف",
      //     width: "100px"
      //   },
      //   {
      //     field: "DescriptionVote",
      //     title: "شرح رای",
      //     width: "100px"
      //   },
      //   {
      //     field: "Date",
      //     title: "تاریخ صدور",
      //     width: "100px",
      //     editor: "date"
      //   },
      //   {
      //     field: "Time",
      //     title: "ساعت",
      //     width: "100px"
      //   },
      //   {
      //     field: "OldVotes",
      //     title: "آرای قبلی کاربر",
      //     width: "100px",
      //     editor: "action"
      //   }
      // ]
    }
  }
}
</script>
