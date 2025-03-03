<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="90BBA2FE-5569-45B3-9A7B-EB92B3B19CA1"
  >
    <form-wrapper :title="title" :padding="false">
      <fit>
        <safa-status :result="result" />

        <safa-datatable
          v-model="model.Eng_Holidays"
          :columns="vacation"
          :m="mode"
          height="100%"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          fit
          max-height="100%"
          min-height="100%"
          title="اطلاعات مرخصی"
        >
        </safa-datatable>
      </fit>

      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import FormActions from "src/components/FormActions"
export default {
  mixins: [baseFormMixin],
  components: {
    FormActions
  },

  data () {
    return {
      title: "تعطیلات مهندس",
      formKey: "697b70c4-78cb-459c-98f6-df746165e18e",
      name: "UEngineerVacation",
      main: true,
      vacation: [
        {
          field: "HolidayFromDate",
          title: "تاریخ مرخصی از",
          width: "150px",
          editor: "date"
        },
        {
          field: "HolidayToDate",
          title: "تاریخ مرخصی تا",
          width: "150px",
          editor: "date"
        }
      ],
      model: {
        Eng_Holidays: []
      },
      result: null,
      nidEng: "00000000-0000-0000-0000-000000000000"
    }
  },
  methods: {
    loadObj () {
      this.showLoading()
      const payload = {
        pNidEng: this.getNidUser()
        // pNidEng: "06191d4d-8d9d-44fc-9fe8-0756e0cfd984",
      }
      this.$services.eng
        .loadEngineerHolidays(payload)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.model.Eng_Holidays =
              this.result.data.LoadEngineerHolidaysResult.Eng_Holidays
            this.nidEng = this.result.data.LoadEngineerHolidaysResult.NidEng
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveObj () {
      this.showLoading()
      this.model.Eng_Holidays = this.normalizeEngHolidays()
      const payload = {
        pObj: {
          ...this.model,
          NidEng: this.nidEng
        }
      }
      this.$services.eng
        .saveEngineerHolidays(payload)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد.")
            this.isEditable = false
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    normalizeEngHolidays () {
      return this.model.Eng_Holidays.map((m) => {
        return {
          ...m,
          ConfirmNidUser:
            m.ConfirmNidUser || "00000000-0000-0000-0000-000000000000"
        }
      })
    }
  },
  created () {
    this.loadObj()
  }
}
</script>
