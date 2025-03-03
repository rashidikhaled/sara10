<template>
  <fit>
    <safa-splitter
      v-model="splitterModel"
      horizontal
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            helper=shahrsazi.baseOwner
            :m="m"
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            title="مالکین"
            :allowCopy="true"
            :copyWithCount="true"
            :deleteRow="true"
            height="100%"
            min-height="100px"
            :bordered="false"
          />
          <q-separator />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <q-separator />
          <safa-grid
            helper="baseEdgeParvandeh"
            :m="m"
            v-model="value.Base_Edge"
            cdcName="Base_Edge"
            title="جهات اربعه"
            height="100%"
            min-height="100px"
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
      splitterModel: 50
    }
  }
}
</script>
