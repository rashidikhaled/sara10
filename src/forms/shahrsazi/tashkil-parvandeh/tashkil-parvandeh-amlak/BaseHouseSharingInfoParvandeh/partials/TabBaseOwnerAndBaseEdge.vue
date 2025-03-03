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
            helper=shahrsazi.baseOwner
            :m="m"
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            title="مالکین"
            :bordered="false"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>

          <safa-grid
            helper="baseEdge"
            :m="m"
            v-model="value.Base_Edge"
            cdcName="Base_Edge"
            title="جهات اربعه"
            :bordered="false"
            fit
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'TabBaseOwnerAndBaseEdge',

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
