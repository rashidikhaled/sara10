<template>
  <fit>
    <FormRow :sm="2" :md="2" :lg="2" :xl="2" class="q-mb-sm">
      <FormControl>
        <safa-text
          v-model="value.Base_JobInfo.JobUnitName"
          :m="m"
          label="نام واحد شغلي"
          label-width="120px"
        />
      </FormControl>
    </FormRow>
    <safa-splitter
      v-model="splitterModel"
      vertical
      class="q-mb-sm"
      margin="0"
      style="min-height: 250px"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="value.Base_JobOwner"
            helper="Base_JobOwner"
            :m="m"
            title="متصدي شغل"
            fit
            min-height="150px"
            height="100%"
            max-height="100%"
            :showRowNumber="false"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
          />
        </fit>
      </template>

      <template v-slot:after>
        <fit>
          <safa-datatable
            v-model="value.Base_JobPollution"
            helper="Base_JobPollution"
            :m="m"
            title="آلودگي هاي شغلي"
            fit
            min-height="150px"
            height="100%"
            max-height="100%"
            :showRowNumber="false"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
          />
        </fit>
      </template>
    </safa-splitter>
    <FormRow :sm="3" :md="3" :lg="3" :xl="3" class="q-mb-sm">
      <FormControl>
        <safa-combo
          v-model="value.Base_JobInfo.CI_BusinessLocaleType"
          :m="m"
          label="نوع محل کسب"
          label-width="120px"
          domainName="Estate"
          ciName="CI_BusinessLocaleType"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Base_JobInfo.FloorDone"
          :m="m"
          label="طبقه وقوع"
          label-width="120px"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          v-model="value.Base_JobInfo.JobActivateDate"
          :m="m"
          label="تاريخ شروع فعاليت"
          label-width="120px"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.Base_JobInfo.CI_DutyYear"
          :m="m"
          label="سال افتتاحيه"
          label-width="120px"
          domainName="Estate"
          ciName="CI_DutyYear"
        />
      </FormControl>

      <FormControl>
        <safa-text
          v-model="value.Base_JobInfo.WorkerCount"
          :m="m"
          label="تعداد كاركنان"
          label-width="120px"
        />
      </FormControl>

      <FormControl>
        <safa-datepicker
          v-model="value.Base_JobInfo.JobDeActivateDate"
          :m="m"
          label="تاريخ پايان فعاليت"
          label-width="120px"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.Base_JobInfo.CI_HoldKind"
          :m="m"
          label="نحوه تصرف استفاده کن"
          label-width="120px"
          domainName="Estate"
          ciName="CI_HoldKind"
        />
      </FormControl>
    </FormRow>
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    m: {
      type: String,
      default: "r"
    }
  },

  data () {
    return {
      splitterModel: 50,
      splitterModel2: 35
    }
  }
}
</script>
