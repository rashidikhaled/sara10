<template>
  <fit>
    <FormRow class="q-mb-sm" :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
      <FormControl>
        <safa-text
          label="شماره دبیرخانه"
          v-model="value.ContractBuy_Info.SecretariatNo"
          cdcName="SecretariatNo"
          label-width="100px"
          :m="'r'"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ دبیرخانه"
          label-width="100px"
          v-model="value.ContractBuy_Info.SecretariatDate"
          cdcName="SecretariatDate"
          :m="'r'"
        />
      </FormControl>
      <FormControl>
        <btn-default
          label="ثبت دبیرخانه"
          @click="submitMailroom"
          :disabled="btnSaveSecretariatDisabled"
        />
      </FormControl>
    </FormRow>
    <template>
      <safa-grid
        title="تاییدات"
        v-model="value.ApprovalTask_Info"
        :columns="colGrid1"
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
    btnSaveSecretariatDisabled: { type: Boolean },
    value: { type: Object, default: () => {} }
  },
  data () {
    return {
      name: "SeCretariatApprovals",
      isSubmit: false,

      // grid
      colGrid1: [
        {
          field: "UserName",
          title: "نام کاربر",
          width: "100px"
        },
        {
          field: "ActionDate",
          title: "تاریخ",
          width: "100px",
          editor: "date"
        },
        { field: "ActionTime", title: "ساعت", width: "100px" },
        { field: "Comments", title: "توضیحات", width: "400px" }
      ]
    }
  },
  methods: {
    submitMailroom () {
      this.$emit("saveContractBuySecretariat")
    }
  }
}
</script>
