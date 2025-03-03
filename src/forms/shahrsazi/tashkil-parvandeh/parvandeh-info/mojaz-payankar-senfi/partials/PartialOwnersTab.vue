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
                helper="owners"
                v-model="value.Base_Owner"
                cdcName="Base_Owner"
                height="100%"
                max-height="100%"
                title="مالکین سرقفلی"
                fit
              />
            </fit>
          </template>
          <template #after>
            <fit>
              <safa-datatable
                helper="baseShahrsaziArchiveHouse"
                :m="m"
                v-model="value.Base_ShahrsaziArchive"
                cdcName="Base_ShahrsaziArchive"
                height="100%"
                max-height="100%"
                title="سوابق شهرسازی"
                fit
              />
            </fit>
          </template>
        </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'PartialOwnersTab',

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
