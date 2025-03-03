<template>
  <fit>
    <FormRow>
      <FormControl>
        <safa-text
          label="رشته تحصیلی"
          label-width="80px"
          v-model="value.studyFieldRel"
          cdcName="studyFieldRel"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شغل"
          label-width="80px"
          v-model="value.job"
          cdcName="job"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="سمت"
          label-width="80px"
          sourceType="local"
          :options="workPositionsOptions"
          v-model="value.workPosition"
          cdcName="workPosition"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="آی پی مجاز"
          label-width="80px"
          v-model="value.allowedIp"
          cdcName="allowedIp"
          :m="m"
        />
        <!--
          required
          validations="required" -->
      </FormControl>
      <div class="fit">
        <text-template
          type="textarea"
          label="آدرس محل کار"
          label-width="80px"
          v-model="value.workAddress"
          cdcName="workAddress"
          :rows="2"
          :m="m"
        />
      </div>
    </FormRow>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      name: "OtherInfo",
      workPositionsOptions: [
        { ID: 1, Title: "کارمند" },
        { ID: 2, Title: "آبدارچی" },
        { ID: 3, Title: "کمک کارشناس" }
      ]
    }
  }
}
</script>
