<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="شماره دبیرخانه"
          v-model="value.ContractBuy_Info.SecretariatNo"
          cdcName="SecretariatNo"
          label-width="100px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ دبیرخانه"
          label-width="100px"
          v-model="value.ContractBuy_Info.SecretariatDate"
          cdcName="SecretariatDate"
          m="r"
        />
      </FormControl>
      <FormControl>
        <btn-default label="ثبت دبیرخانه" @click="submitMailroom" />
      </FormControl>
    </FormRow>
    <template>
    <!-- helper=agApprovalColumns -->
      <safa-grid
        title="تاییدات"
        v-model="value.ApprovalTask_Info"
        helper="agApprovalColumns"
        :suppressRowClickSelection="false"
        fit
        paginate
        cdcName="ApprovalTask_Info"
        m="r"
      />
    </template>
  </fit>
</template>

<script>
export default {
  props: {
    m: { type: String },
    value: { type: Object, default: () => {} }
  },
  data () {
    return {
      name: "SeCretariatApprovals",
      isSubmit: false

      // grid
      // agApprovalColumns: [
      //   {
      //     field: "UserName",
      //     title: "نام کاربر",
      //     width: "100px"
      //   },
      //   {
      //     field: "ActionDate",
      //     title: "تاریخ",
      //     width: "100px",
      //     editor: "date"
      //   },
      //   { field: "ActionTime", title: "ساعت", width: "100px" },
      //   { field: "Comments", title: "توضیحات", width: "400px" }
      // ]
    }
  },
  methods: {
    submitMailroom () {
      if (!this.isSubmit) {
        this.showError("خطا در انجام عملیات")
      }
      this.$emit("saveContractBuySecretariat")
    }
  }
}
</script>
