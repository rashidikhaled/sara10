<template>
  <fit>
    <safa-notice>شرایط ابلاغ قانونی</safa-notice>
    <FormRow>
      <FormControl>
        <safa-combo
          label="عنوان ماده ابلاغ"
          label-width="100px"
          v-model="value.CI_Article"
          domainName="BuildingPolice"
          ciName="CI_Article"
          cdcName="CI_Article"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام و نام خانوادگی تحویل گیرنده"
          label-width="100px"
          v-model="value.RecipientName"
          cdcName="RecipientName"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="سمت"
          label-width="100px"
          v-model="value.Post"
          cdcName="Post"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مامور ابلاغ "
          label-width="100px"
          v-model="value.NotificationOfficer"
          cdcName="NotificationOfficer"
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
      default: () => {}
    },
    m: {
      type: String,
      default: "r"
    }
  }
}
</script>
