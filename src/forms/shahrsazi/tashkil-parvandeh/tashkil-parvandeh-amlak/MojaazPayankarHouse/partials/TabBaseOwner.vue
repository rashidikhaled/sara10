<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitter"
      horizontal
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit >
          <safa-datatable
            title="مالکین"
            helper="shahrsazi.baseOwner"
            :m="m"
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            :addRow="false"
            :deleteRow="false"
            fit
            height="100%"
            max-height="100%"
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
            :m="m"
            v-model="value.Base_Edge"
            cdcName="Base_Edge"
            fit
            height="100%"
            max-height="100%"
            :bordered="false"
            class="q-mb-sm"
          />
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
      horizontalSplitter: 50
    }
  }
}
</script>
