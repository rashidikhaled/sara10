<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitter"
      class="fit"
      horizontal
      margin="0"
      style="min-height:250px"
    >
      <template v-slot:before>
        <fit>
          <safa-grid
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            :CopyWithCount="true"
            :allowCopy="true"
            :bordered="false"
            :m="m"
            fit
            height="100%"
            helper=agBaseOwnerBazdid
            max-height="100%"
            title="مالکین"
          />
          <q-separator/>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <q-separator/>
          <safa-grid
            v-model="value.Base_Edge"
            cdcName="Base_Edge"
            :bordered="false"
            :m="m"
            fit
            height="100%"
            helper="agBaseEdge"
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
