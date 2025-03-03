<template>
  <fit>
    <safa-splitter
      v-model="splitterValue"
      horizontal
      class="fit"
    >
      <template v-slot:before>
        <fit className="q-pb-sm">
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
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit className="q-pt-sm">
          <safa-grid
            title="جهات اربعه"
            helper="baseEdge"
            :m="m"
            v-model="value.Base_Edge"
            cdcName="Base_Edge"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
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
      type: Object
    }
  },
  data () {
    return {
      splitterValue: 50
    }
  }
}
</script>
