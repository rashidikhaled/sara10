<template>
  <form-wrapper :title="title" vertical>
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            label="درصدی/مبلغ"
            label-width="70px"
            ciName="CI_IncomeValueType"
            domainName="CI_SaraM1"
            v-model="model.discountType"
            cdcName="discountType"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            label="مقدار"
            label-width="70px"
            type="money"
            v-model="model.discountValue"
            cdcName="discountValue"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
          label="تاریخ"
          label-width="70px"
          v-model="model.discountDate"
          cdcName="discountDate"
          />

        </FormControl>
      </FormRow>
      <text-template
        class="q-mb-sm fit"
        label="توضیحات"
        label-width="70px"
        v-model="model.comment"
        formKey="fd2dbd07-471d-4d8c-81c6-6a0ae3e0e654"
        cdcName="comment"
      />
    </fit>
    <form-actions :showEditButton="false">
      <template v-slot:before>
        <btn-save label="تایید" @click="confirm" />
        <btn-cancel label="انصراف" @click="$emit('hide')" />
      </template>
    </form-actions>
  </form-wrapper>
</template>

<script>
export default {
  data () {
    return {
      name: "ReceiptIssuance",
      title: "تخفیف",
      model: {
        discountType: 0,
        discountValue: 0,
        comment: "",
        discountDate: ""
      }
    }
  },
  methods: {
    confirm () {
      debugger
      this.$emit("confirm", this.model)
    }
  }
}
</script>
