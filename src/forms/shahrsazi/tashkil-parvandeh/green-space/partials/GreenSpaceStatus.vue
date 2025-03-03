<template>
  <div class="q-pa-sm">
    <FormRow>
      <FormControl>
        <safa-text
          label="شماره ارجاع درخواست شهرسازی"
          label-width="155px"
          v-model="value.Sh_CutTreeOwnRequest.NidWorkItem"
          cdcName="NidWorkItem"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره پرونده در سامانه فضای سبز"
          label-width="155px"
          v-model="value.Sh_CutTreeOwnRequest.CutTreeOwnRequestNo"
          cdcName="CutTreeOwnRequestNo"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ ارسال به سامانه فضای سبز"
          label-width="155px"
          v-model="value.Sh_CutTreeOwnRequest.CreateDate"
          cdcName="CreateDate"
          m="r"
        />
      </FormControl>
      <text-template
        label="وضعیت ثبت درخواست پرونده"
        label-width="155px"
        v-model="requestStatus"
        cdcName="requestStatus"
        m="r"
        class="col-12"
        :rows="5"
      />
      <text-template
        label="وضعیت پرونده"
        label-width="155px"
        v-model="value.Sh_CutTreeOwnRequest.CutTreeOwnTitleDetail"
        cdcName="CutTreeOwnTitleDetail"
        m="r"
        class="col-12"
        :rows="5"
      />
    </FormRow>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    requestStatus () {
      if (this.value.lstSh_CutTreeOwnRequestDetails.length > 0) {
        return "پرونده مورد نظر در سامانه فضای سبز ثبت درخواست و پیگیری شده است."
      } else return "پرونده مورد نظر در سامانه فضای سبز ثبت درخواست شده است."
    }
  }
}
</script>
