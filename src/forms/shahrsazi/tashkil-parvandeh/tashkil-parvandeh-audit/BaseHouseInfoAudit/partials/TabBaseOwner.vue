<template>
  <fit>
    <safa-splitter v-model="splitterModel" horizontal class="fit" margin="0">
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="مالکین"
            helper="shahrsazi.baseOwner"
            :m="m"
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            fit
            margin="0"
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
            title="جهات اربعه"
            helper="baseEdge"
            :m="m"
            v-model="value.Base_Edge"
            cdcName="Base_Edge"
            fit
            margin="0"
            height="100%"
            min-height="100px"
            :bordered="false"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: "TabBaseOwner",

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
