<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="5FB05A4F-DA31-4202-83D1-D7558D5E965A"
  >
    <form-wrapper :title="title" :padding="false">
      <fit>
        <safa-grid
          v-model="model.CI_Visitor"
          :columns="visitorColumns"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          fit
          paginate
          :m="mode"
          :suppressRowClickSelection="false"
          :insertNewRowBefore="false"
        />
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveData"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "مامورین بازدید",
      formKey: "ceb03b2c-1967-443d-914d-9598371136d3",
      name: "UFireVisitingAgents",
      main: true,

      model: {
        CI_Visitor: []
      },
      visitorColumns: [
        {
          field: "ID",
          title: "کد",
          width: "80px"
        },
        {
          field: "Title",
          title: "نام و نام خانوادگی",
          width: "200px"
        },
        {
          field: "MaxRevisitDay",
          title: "حداکثر تعداد بازدید در روز",
          width: "100px"
        },
        {
          field: "IsActive",
          title: "فعال",
          width: "60px",
          editor: "checkbox"
        }
      ]
    }
  },

  mounted () {
    if (this.selectedRequest) {
      this.loadData()
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
      this.hideSidebar("UFireVisitingAgents")
    }
  },

  methods: {
    async loadData () {
      try {
        this.showLoading()
        const { data } = await this.$services.FireService.getCiVisitor()
        const res = this.getResponse(data)
        if (res.success) {
          if (res.data && res.data.CI_Visitor) {
            this.model = res.data
          }
        } else {
          const err = data.ErrorResult.BizErrors
          for (let i = 0; i < err.length; i++) {
            this.showError(err[i].ErrorTitel)
          }
        }
      } catch (err) {
        console.error("error", err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async saveData () {
      try {
        this.showLoading()
        const { data } = await this.$services.FireService.saveCiVisitor({
          PObj: this.model
        })
        const res = this.getResponse(data)
        if (res.success) {
          this.model = res.data
          this.isEditable = false
          this.showSuccess("ذخیره اطلاعات با موفقیت انجام شد.")
        } else this.showError(res.errors[0].text)
      } catch (err) {
        console.error("error", err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
