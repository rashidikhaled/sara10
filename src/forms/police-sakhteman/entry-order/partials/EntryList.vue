<template>
  <fit>
    <safa-datatable
      :columns="entryOrdersColumns"
      fit
      height="100%"
      max-height="100%"
      min-height="200px"
      :show-selected-checkbox="false"
      :allowMultipleSelection="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      m="r"
      paginate
      v-model="model.EnterOrderList"
      cdcName="EnterOrderList"
      @dbclick="dbclick"
    />
  </fit>
</template>

<script>
export default {
  props: {
    model: Object
  },
  data () {
    return {
      entryOrdersColumns: [
        { field: "CI_EnterOrderType", title: "نوع عملیات", width: "150px", editor: 'combo', domain: 'BuildingPolice' },
        { field: "EnterOrderNo", title: "شماره دستور ورود", width: "150px" },
        {
          field: "EnterOrderDate",
          title: "تاریخ دستور ورود",
          width: "100px",
          editor: "date"
        },
        { field: "EnterOrderTime", title: "ساعت دستور ورود", width: "100px" },
        { field: "EnterDate", title: "تاریخ ورود", width: "150px", editor: "date" },
        {
          field: "EnterTime",
          title: "ساعت ورود",
          width: "100px"
        },
        { field: "Comments", title: "توضیحات", width: "200px" }
      ]
    }
  },
  methods: {
    dbclick (val) {
      this.$emit('detailsInfo', val.row)
    }
  }
}
</script>
