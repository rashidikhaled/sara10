<template>
  <fit>
    <safa-splitter
      v-model="splitterValue"
      fit
      horizontal
      style="min-height:200px"
    >
      <template #before>
            <fit>
              <safa-datatable
                helper="baseShahrsaziArchiveHouse"
                v-model="value.Base_ShahrsaziArchive"
                height="100%"
                max-height="100%"
                title="سوابق شهرسازی"
                fit
                :m="m"
              />
            </fit>
          </template>
          <template #after>
            <fit>
              <safa-datatable
                helper="engineersMojazPyankarDastgah"
                :m="m"
                v-model="value.Base_ControllerInfo"
                height="100%"
                max-height="100%"
                title="مشخصات مهندسین"
                fit
              />
            </fit>
          </template>
        </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'PartialArchiveTab',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      splitterValue: 50
    }
  }
}
</script>
