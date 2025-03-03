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
            helper="shahrsazi.baseOwner"
            :m="m"
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            title="مالکین"
            :selectable="true"
            :emptyRowLimit="1"
            fit
            height="100%"
            max-height="100%"
            :allowCopy="true"
            :copyWithCount="true"
            :bordered="false"
          />
          <q-separator />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <q-separator />
          <safa-grid
            helper="baseEdge"
            :m="m"
            v-model="value.Base_Edge"
            cdcName="Base_Edge"
            title="جهات اربعه"
            :selectable="false"
            :emptyRowLimit="1"
            fit
            height="100%"
            max-height="100%"
            :bordered="false"
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
      splitterModel: 50
    }
  }
}
</script>
