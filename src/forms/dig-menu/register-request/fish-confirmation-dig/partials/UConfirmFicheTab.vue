<template>
  <fit>
    <FormRow class="q-mb-sm">
      <div class="col-12 q-gutter-x-lg q-gutter-y-sm flex items-center">
        <safa-radio
          label="حساب فی مابین"
          v-model="value.ClsIncome_Payment.Income_Payment.SysCI_PaymentType"
          style="min-width: 150px"
          size="xs"
          :val="1"
          :m="m"
        />
        <safa-radio
          label="توافقنامه/تفاهمنامه"
          v-model="value.ClsIncome_Payment.Income_Payment.SysCI_PaymentType"
          style="min-width: 150px"
          size="xs"
          :val="2"
          :m="m"
        />
        <safa-radio
          label="تایید پرداخت بانک"
          v-model="value.ClsIncome_Payment.Income_Payment.SysCI_PaymentType"
          style="min-width: 150px"
          size="xs"
          :val="3"
          :m="m"
        />
        <safa-radio
          label="تعهد پرداخت"
          v-model="value.ClsIncome_Payment.Income_Payment.SysCI_PaymentType"
          style="min-width: 150px"
          size="xs"
          :val="4"
          :m="m"
        />
        <safa-radio
          label="سازمانهای شهرداری"
          v-model="value.ClsIncome_Payment.Income_Payment.SysCI_PaymentType"
          style="min-width: 150px"
          size="xs"
          :val="5"
          :m="m"
        />
        <safa-radio
          label="دستگاه پوز"
          v-model="value.ClsIncome_Payment.Income_Payment.SysCI_PaymentType"
          style="min-width: 150px"
          size="xs"
          :val="6"
          :m="m"
        />
      </div>
    </FormRow>
    <template v-if="hanlderShowSection(1)">
      <internal-section
        title="امور مالی شهرداری"
        class="q-my-sm"
        :defaultShow="true"
      >
        <FormRow>
          <FormControl>
            <safa-text
              label="شماره"
              label-width="70px"
              v-model="value.ClsIncome_Payment.Income_Payment.No"
              cdcName="No"
              :m="m"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ"
              label-width="70px"
              v-model="value.ClsIncome_Payment.Income_Payment.Date"
              cdcName="Date"
              :m="m"
            />
          </FormControl>
        </FormRow>
      </internal-section>
      <internal-section
        title="امور مالی شرکت خدماتی"
        class="q-my-sm"
        :defaultShow="true"
      >
        <FormRow>
          <FormControl>
            <safa-text
              label="شماره"
              label-width="70px"
              v-model="value.ClsIncome_Payment.Income_Payment.CompanyNo"
              cdcName="CompanyNo"
              :m="m"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ"
              label-width="70px"
              v-model="value.ClsIncome_Payment.Income_Payment.CompanyDate"
              cdcName="CompanyDate"
              :m="m"
            />
          </FormControl>
        </FormRow>
      </internal-section>
    </template>

    <template v-if="hanlderShowSection(2)">
      <internal-section title="توافقنامه" class="q-my-sm" :defaultShow="true">
        {{ textModel.MessageBargh }}
      </internal-section>
    </template>
    <template v-if="hanlderShowSection(3)">

      <internal-section
        title="تایید پرداخت بانک"
        class="q-my-sm"
        :defaultShow="true"
      >
        <FormRow>
          <FormControl>
            <safa-datepicker
              label="تاریخ پرداخت به بانک"
              label-width="70px"
              v-model="value.ClsIncome_Payment.Income_Payment.Date"
              cdcName="Date"
              :m="m"
            />
          </FormControl>
        </FormRow>
      </internal-section>
    </template>
    <template v-if="hanlderShowSection(4)">
      <internal-section title="تعهد پرداخت" class="q-my-sm" :defaultShow="true">
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-datepicker
              label=" تاریخ شرکت خدماتی"
              label-width="70px"
              v-model="value.ClsIncome_Payment.Income_Payment.CompanyDate"
              cdcName="CompanyDate"
              :m="m"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ"
              label-width="70px"
              v-model="value.ClsIncome_Payment.Income_Payment.Date"
              cdcName="Date"
              :m="m"
            />
          </FormControl>
        </FormRow>
          {{ textModel.MessageBargh }}
      </internal-section>
    </template>
    <template v-if="hanlderShowSection(5)">
      <internal-section
        title="سازمان شهرداری"
        class="q-my-sm"
        :defaultShow="true"
      >
        {{ textModel.ShahrdariTexts }}
      </internal-section>
    </template>
    <template v-if="hanlderShowSection(6)">
      <internal-section
        title="حساب فی مابین"
        class="q-my-sm"
        :defaultShow="true"
      >
        <FormRow>
          <FormControl>
            <safa-datepicker
              label="تاریخ پرداخت"
              label-width="70px"
              v-model="value.ClsIncome_Payment.Income_Payment.Date"
              cdcName="Date"
              :m="m"
            />
          </FormControl>
        </FormRow>
      </internal-section>
    </template>
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: String,
    textModel: Object
  },
  data () {
    return {}
  },
  methods: {
    hanlderShowSection (i) {
      return (
        i === this.value.ClsIncome_Payment.Income_Payment.SysCI_PaymentType
      )
    }
  }
}
</script>
