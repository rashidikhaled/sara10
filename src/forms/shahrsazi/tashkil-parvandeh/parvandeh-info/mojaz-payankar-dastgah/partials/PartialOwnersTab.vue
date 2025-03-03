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
            title="مالکین"
            fit
          />
        </fit>
      </template>
      <template #after>
        <fit>
          <safa-grid
            :m="m"
            v-model="value.Base_Edge"
            cdcName="Base_Edge"
            height="100%"
            max-height="100%"
            title="جهات اربعه"
            fit
            helper="jahateArbaeMojazPayankarDastgah"
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
