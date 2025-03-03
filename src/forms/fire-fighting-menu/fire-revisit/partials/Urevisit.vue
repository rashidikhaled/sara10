<template>
  <fit>
   <safa-grid
      title="لیست بازدید ها"
      helper="revisitListFire"
      v-model="value.Revisit_List"
      cdcName="Revisit_List"
      height="100%"
      max-height="100%"
      min-height="200px"
      fit
      m="r"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :suppressRowClickSelection="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      @row:click="rowClick"
      @row:dblclick="dbClick"
      paginate
      :pageSize ="20"
    />
    <!-- <safa-datatable
      title="لیست بازدید ها"
      helper="revisitListFire"
      v-model="allRevisitList"
      height="100%"
      max-height="100%"
      min-height="200px"
      fit
      m="e"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :addRow="true"
      :deleteRow="false"
      :allowCopy="false"
      @row-click="rowClick"
      @dbclick="dbClick"
      :take="20"
      paginate
      :pageSize ="20"
    /> -->
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          Revisit_List: []
        }
      }
    }
  },
  data () {
    return {
      name: "Urevisit"
    }
  },

  methods: {
    rowClick (e) {
      this.$emit("clickRow", e.data) // row.data
    },

    dbClick (e) {
      debugger
      this.$emit("selectRevisit", e.data)
    }
  }
}
</script>
