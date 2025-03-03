<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="result" />
      </template>
      <fit>
        <safa-grid
          v-model="blacklistValue"
          :columns="blacklistColumns"
          cdcName="blacklistValue"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          fit
          :hideHeader="true"
          paginate
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "USearchInBlackList",
      formKey: "798B7256-BE74-46EE-882E-EEA35C2B50BD",
      title: "جستجو در لیست کنترلی",
      main: true,
      blacklistColumns: [
        { field: "BlackList", title: "کد لیست کنترلی", width: "120px" },
        { field: "BlackListCode", title: "کد", width: "120px" },
        { field: "BlackListSubject", title: "عنوان", width: "120px" },
        {
          field: "BlackListCause",
          title: "علت ورود به لیست کنترلی",
          width: "120px"
        },
        { field: "RedirectName", title: "نام تابعه", width: "120px" },
        { field: "Region", title: "منطقه", width: "120px" },
        { field: "CompanyName", title: "عوامل اجرایی", width: "120px" },
        { field: "BL_StartDate", title: "تاریخ شروع", width: "120px" },
        { field: "ExpireDate", title: "تاریخ انقضاء", width: "120px" },
        { field: "InBL_Date", title: "تاریخ ایجاد", width: "120px" },
        { field: "InBL_Time", title: "زمان ایجاد", width: "120px" },
        { field: "OutBL_Date", title: "تاریخ خروج", width: "120px" },
        { field: "OutBL_Time", title: "زمان خروج", width: "120px" },
        { field: "InUserName", title: "کاربر ایجاد کننده", width: "120px" },
        { field: "OutUserName", title: "کاربر خارج کننده", width: "120px" },
        { field: "IsDisable", title: "ابطال شده", width: "120px", editor: "checkbox" },
        { field: "BL_Comments", title: "توضیحات", width: "300px" }
      ],
      result: null,
      blacklistValue: []
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    loadObj () {
      this.showLoading()
      const payload = {
        pRequest: {
          PredicateCondition: "",
          Skip: 0,
          Take: 500
        }
      }
      this.$services.excavation
        .searchInBlackList(payload)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.blacklistValue =
              this.result.data.SearchInBlackListResult.SerachInBlackList
            this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `loading ${this.SerachInBlackList}`
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
