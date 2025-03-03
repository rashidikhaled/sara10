<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitter"
      class="fit"
      horizontal
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            :m="m"
            fit
            height="100%"
            helper=shahrsazi.baseOwner
            max-height="100%"
            title="مالکین"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            v-model="value.Base_Edge"
            cdcName="Base_Edge"
            :m="m"
            fit
            height="100%"
            helper="baseEdge"
            max-height="100%"
            title="جهات اربعه"
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
      horizontalSplitter: 50
    }
  }
}
</script>
