<template>
  <fit>
    <safa-datatable
      v-model="formModel.Sh_Agreement_List_PreRevisit"
      cdcName="Sh_Agreement_List_PreRevisit"
      ref="engineer-list-grid"
      name="grid"
      helper="shahrsazi.agreementHistory"
      :allowMultipleSelection="false"
      :hideHeader="true"
      fit
      max-height="100%"
      height="100%"
      minHeight="100%"
      @dbclick="dbclick"
      :bordered="false"
      title="تاریخچه"
    >
    </safa-datatable>
  </fit>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    formModel: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {},
  methods: {
    dbclick (e) {
      this.$emit('dbclick', e.row)
    }
  }
}
</script>
