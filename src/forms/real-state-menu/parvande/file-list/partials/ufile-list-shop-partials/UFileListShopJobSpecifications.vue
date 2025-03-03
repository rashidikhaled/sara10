<template>
  <fit>

    <div class="row q-col-gutter-sm q-mb-sm">
      <form-control>
        <safa-text
          label="نام واحد شغلی"
          label-width="100px"
          v-model="value.Base_JobInfo.JobUnitName"
          :m="m"
        />
      </form-control>
    </div>

    <div class="row q-col-gutter-sm q-mb-sm">
      <form-control>
        <safa-combo
          label="نوع محل کسب"
          label-width="100px"
          ciName="CI_BusinessLocaleType"
          domainName="Estate"
          v-model="value.Base_JobInfo.CI_BusinessLocaleType"
          :m="m"
        />
      </form-control>
    </div>

    <div class="row q-col-gutter-sm q-mb-sm">
      <form-control>
        <safa-text
          label="طبقه وقوع "
          label-width="100px"
          v-model="value.Base_JobInfo.FloorDone"
          :m="m"
        />
      </form-control>
    </div>

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
  }
}
</script>

<style>
