<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="شماره"
          label-width="85px"
          m="r"
          v-model="value.Warning.WarningNo"
          cdcName="WarningNo"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع اخطار"
          label-width="85px"
          :m="m"
          domainName="BuildingPolice"
          ciName="CI_WarningType"
          v-model="value.Warning.CI_WarningType"
          :validations="['required', 'number']"
          cdcName="CI_WarningType"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="وضعیت اخطار"
          label-width="85px"
          v-model="value.Warning.EumWarningStatus"
          domainName="BuildingPolice"
          ciName="CI_EumWarningStatus"
          :validations="['required', 'number']"
          cdcName="WarningStatus"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ صدور"
          label-width="85px"
          :m="m"
          v-model="value.Warning.WarningDate"
          cdcName="WarningDate"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label=" مهلت اخطار (برحسب ساعت)"
          label-width="85px"
          :m="m"
          v-model="value.Warning.BreakTime"
          cdcName="BreakTime"
          type="number"
        />
      </FormControl>
      <text-template
        class="col-12"
        label="توضیحات"
        label-width="85px"
        :m="m"
        fit
        :rows="1"
        v-model="value.Warning.Comments"
        formKey="b2917194-1969-4ec8-8caa-1a9ac3df18d7"
        cdcName="Comments"
      />
    </FormRow>
    <safa-tabs v-model="activeTab" :padding="false" fit>
      <template v-slot:tabs>
        <tab-menu name="warningReason" label="علت اخطار" />
        <tab-menu
          name="hokmRequest"
          label="درخواست حکم (ورود-پلمب)"
          v-if="showHokmRequest"
        />
      </template>
      <tab-content name="warningReason">
        <fit>
          <safa-grid
            helper="WarningCauseList"
            title="اخطارها"
            fit
            min-height="100px"
            height="100%"
            max-height="100%"
            v-model="value.Warning_CauseList"
            :m="m"
            :bordered="false"
            cdcName="WarningCauseList"
          />
        </fit>
      </tab-content>
      <tab-content name="hokmRequest">
        <fit class="fit">
          <safa-grid
            helper="WarrantList"
            fit
            min-height="100px"
            height="100%"
            max-height="100%"
            v-model="value.Warrant.WarrantList"
            :m="m"
            :bordered="false"
            title="درخواست حکم"
            cdcName="WarrantList"
          />
        </fit>
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: {
      type: String,
      default: "r"
    },
    showHokmRequest: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeTab: "warningReason"
    }
  }
}
</script>
