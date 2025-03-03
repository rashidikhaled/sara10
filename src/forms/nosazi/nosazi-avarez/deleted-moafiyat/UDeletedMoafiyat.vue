<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper :padding="false" title="عملیات معافیت/تخفیف-موارد حذف شده">
      <fit>
        <safa-datatable
          ref="grid"
          :allowCopy="false"
          :allowNewRow="false"
          :allowRemoveRow="false"
          :bordered="false"
          v-model="items"
          :filterable="true"
          :hide-toolbar="true"
          cdcName="dutyExemptionBaseDeletedItems"
          fit
          height="100%"
          helper="dutyExemptionBaseDeletedItems"
          max-height="100%"
          title="معافیت/تخفیف-موارد حذف شده"
          :allowMultipleSelection="false"
        ></safa-datatable>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  route: "nosazi-avarez/deleted-moafiyat",

  mixins: [baseFormMixin],
  data () {
    return {
      title: "عملیات معافیت/تخفیف-موارد حذف شده",
      formKey: "1adf56d7-db8e-49da-b07c-1ea4716d9435",
      name: "UDeletedMoafiyat",
      main: true,
      items: []
    }
  },
  mounted () {
    this.getDutyExemptionBaseDeletedItems()
  },
  methods: {
    getDutyExemptionBaseDeletedItems () {
      this.showLoading()
      this.$services.SB.getDutyExemptionBaseDeletedItems()
        .then(async (response) => {
          if (response.data.ErrorResult.BizErrors.length === 0) {
            this.items = response.data.Duty_ExemptionBase_DeletedItems
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((ex) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
