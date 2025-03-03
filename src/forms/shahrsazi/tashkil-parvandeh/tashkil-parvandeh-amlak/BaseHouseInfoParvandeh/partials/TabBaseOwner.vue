<template>
  <fit>
    <safa-splitter
      v-model="gridSplitter"
      class="fit"
      horizontal
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="مالکین"
            helper=shahrsazi.baseOwner
            :m="m"
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
            :bordered="false"
          />
          <q-separator/>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
           <q-separator/>
          <safa-grid
            title="جهات اربعه"
            helper="baseEdge"
            m="r"
            v-model="value.Base_Edge"
            cdcName="Base_Edge"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
            :bordered="false"
          />
           <q-separator class="q-mb-sm"/>
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>
<script>
export default {
  name: 'TabBaseOwner',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      gridSplitter: 50
    }
  }
}
</script>
