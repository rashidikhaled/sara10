<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="کد جلسه"
          cdcName="SessionNo"
          v-model="value.Session_Info.SessionNo"
          label-width="100px"
          validations="required"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="دسته بندی جلسه"
          ciName="CI_SessionCategory"
          domainName="Estate"
          label-width="100px"
          cdcName="CI_SessionCategory"
          v-model="value.Session_Info.CI_SessionCategory"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ جلسه"
          label-width="100px"
          cdcName="SessionDate"
          v-model="value.Session_Info.SessionDate"
          validations="required"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-timepicker
          label="ساعت شروع"
          label-width="100px"
          format24h
          cdcName="SessionStartTime"
          v-model="value.Session_Info.SessionStartTime"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مدت به دقیقه"
          label-width="100px"
          cdcName="SessionDuration"
          v-model="value.Session_Info.SessionDuration"
          :m="m"
        />
      </FormControl>
      <safa-text
        label="موضوع جلسه"
        label-width="100px"
        cdcName="SessionSubject"
        class="col-12"
        v-model="value.Session_Info.SessionSubject"
        :m="m"
      />
      <safa-text
        label="مکان جلسه"
        label-width="100px"
        cdcName="SessionPlace"
        class="col-12"
        v-model="value.Session_Info.SessionPlace"
        :m="m"
      />
      <text-template
        label-width="100px"
        cdcName="SessionText"
        :rows="10"
        spId="16F1E91D-69CF-4470-B812-11BF37EBB032"
        label="متن صورتجلسه"
        class="col-12"
        v-model="value.Session_Info.SessionText"
        :m="m"
      />
    </FormRow>
  </fit>
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => {} },
    m: { type: String }
  },

  data () {
    return {
      name: "SessionDetails"
    }
  }
}
</script>
