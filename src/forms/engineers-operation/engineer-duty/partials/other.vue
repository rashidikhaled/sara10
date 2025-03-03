<template>
  <fit>
    <div class="row q-col-gutter-sm">
      <safa-combo
        label="سال تسویه"
        class="col-md-3"
        label-width="70px"
        ciName="CI_Years"
        domainName="engineer"
        v-model="CI_Years_Payoff"
        @input="$emit('CIYearsPayoff', CI_Years_Payoff)"
      />
      <div class="col q-gutter-sm">
        <btn-default
          label="تایید سال تسویه"
          @click="cinfirmPayoffYear"
          spId="fcdd6683-991c-41b8-8a24-647feb88a335"
          spCaption="تایید سال تسویه"
        />
        <btn-default
          label="حذف سال تسویه"
          @click="removePayoffYear"
          spId="b9cfe8d4-85e0-4415-9c8f-237923ef3b31"
          spCaption="حذف سال تسویه"
        />
      </div>
    </div>
    <safa-datatable
      v-model="value.Eng_DutyOddmentAccount"
      helper="dutyOddment"
      :m="m"
      class="q-mt-sm"
      fit
      height="100%"
      max-height="100%"
      min-height="200px"
      :show-selected-checkbox="false"
      :allowMultipleSelection="false"
      @selectedChange="selectedChange"
    />
  </fit>
</template>

<script>
export default {
  props: ["value", "m"],
  data () {
    return {
      name: "Other",
      // dutyOddmentColumns: [
      //   {
      //     field: "CI_EngDutyOddmentType",
      //     title: "نوع بدهکاری / بستانکاری",
      //     editor: "combo",
      //     domain: "engineer",
      //     width: "180px",
      //   },
      //   {
      //     field: "CI_Years",
      //     title: "سال",
      //     width: "180px",
      //     editor: "combo",
      //     domain: "engineer",
      //   },
      //   {
      //     field: "OddmentValue",
      //     title: "مبلغ",
      //     width: "100px",
      //     cell: "grid-money-format",
      //   },
      //   { field: "Comments", title: "توضیحات", width: "300px" },
      // ],
      CI_Years_Payoff: "0"
    }
  },
  methods: {
    selectedChange (row) {
      this.$emit("selectedDutyOddmentAccountRow", { row: row })
    },
    cinfirmPayoffYear () {
      this.showConfirm("آیا از تایید سال تسویه اطمینان دارید؟").onOk(() => {
        this.$emit("changePayoffYear", this.CI_Years_Payoff)
      })
    },
    removePayoffYear () {
      this.showConfirm("آیا از حذف سال تسویه اطمینان دارید؟").onOk(() => {
        this.CI_Years_Payoff = 0
        this.$emit("changePayoffYear", 0)
      })
    }
  }
}
</script>

<style></style>
