<template>
  <fit>
    <template>
      <safa-grid
        title="دستور کارها"
        v-model="value.Session_WorkItem"
        helper="Session_WorkItem_Col"
        :suppressRowClickSelection="false"
        fit
        paginate
        cdcName="Session_WorkItem"
        :m="m"
        spId="BF3DAF2E-79EF-449B-90CA-BDE9B2616C76"
      />
    </template>
  </fit>
</template>

<script>
export default {
  props: {
    m: { type: String },
    value: { type: Object, default: () => {} }
  },
  data () {
    return {
      name: "Agendas"
    }
  },
  methods: {}
}
</script>
