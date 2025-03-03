<template>
  <fit>
    <div class="row q-gutter-sm q-mb-sm">
      <safa-text v-model="name" />
      <div>
        <btn-search @click="searchUser" />
      </div>
    </div>
    <safa-datatable
      helper="UserListDafater"
      height="100%"
      max-height="100%"
      min-height="100%"
      paginate
      fit
      m="e"
      v-model="gridModel"
      :allowMultipleSelection="false"
      @selectedChange="selectedChange"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import PersianDate from "persian-date"

export default {
  mixins: [baseFormMixin],
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    gridModel: []
  },

  data () {
    return {
      selectedRow: null,
      mobileNumber: "",
      name: ""
    }
  },
  methods: {
    search () {
      this.$emit("searchUser", this.name)
    },
    searchUser () {
      if (this.name !== "") {
        this.showLoading()
        let data = {
          from: 1,
          to: 20,
          search: this.name
        }
        this.$services.security
          .userList(data)
          .then(({ data }) => {
            this.result = this.getResponse(data)
            if (this.result.success) {
              this.gridModel = this.result.data.data.list
              this.gridModel.forEach((x) => {
                x.location = "شرکت صفا رایانه"
              })
            }
          })
          .catch((response) => {
            this.showError("  خطا در اتصال")
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    selectedChange (e) {
      this.selectedRow = e.dataItem
      this.mobileNumber = e.dataItem.Mobile
      this.name = e.dataItem.FirstName
    },
    async sendSMS () {
      try {
        if (this.selectedRow === null) {
          this.showError("لطفا یک ردیف انتخاب نمایید")
          return
        }
        const payLoad = {
          pParameter: {
            Text: `${this.name} مدیرمسئول محترم دفتر / شرکت انجمن شرکتهای طراح وناظر ساختمانی مشهد کارشناس بازدید محترم
باسلام ،
نظر به اینکه مقرر است موضوع تخلف احتمالی جنابعالی درخصوص ملک
با کدنوسازی  ${this.selectedRequest.BizCode} به شماره ارجاع  ${this.selectedRequest.NidWorkItem}  درکمیته نظارت بر دفاتر مطرح گردد لذا ضروریست دفاعیه خود
را حداکثر ظرف مدت 3 روز کاری به بازرس محترم منطقه یا واحد نظارت بر دفاتر ارسال نمایید.
در غیر این صورت موضوع در جلسه مطرح و راساً تصمیم گیری خواهد شد.و تبعات احتمالی آن بر عهده جنابعالی می باشد.`,
            Number: this.mobileNumber,
            AppName: "sara10",
            BizCode: this.selectedRequest.BizCode,
            SMSType: "تخلفات دفاتر",
            ScheduleSendDate: new PersianDate().toLocale("en").format("L"),
            UserID: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        }
        const { data } = await this.$services.sendSMS.SendSMS(payLoad)
        const res = this.getResponse(data)
        if (res.success) this.showSuccess("پیام با موفقیت ارسال شد.")
      } catch (err) {
        this.serverError()
        console.log("err", err)
      }
    }
  },
  mounted () {
    this.search()
  }
}
</script>
