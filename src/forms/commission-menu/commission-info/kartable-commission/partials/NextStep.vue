<template>
  <FormWrapper :title="title">
    <fit>  <safa-grid
                pagination
                v-model="nextStateList"
                :columns="gridColumns"
                fit
                :m="mode"
                :bordered="false"
                height="100%"
                min-height="200px"
                max-height="100%"
                filterable
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
                :showRowNumber="true"
                @selection:changed="onSelectionChanged"
              /> </fit>

    <template #footer>
      <form-actions
        m="e"
        @save="sendClick"
        @cancel="$emit('hide')"
        saveButtonTitle="انتخاب"
      />
    </template>
  </FormWrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  props: {
    nextStateList: {
      type: Array,
      required: true
    },
    nextStephandler: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      name: "NextStep",
      title: "ارسال پرونده",
      selectedRow: "",
      gridColumns: [
        {
          field: "IsSelect",
          title: "",
          width: "74px",
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: "right",
          editor: "selection",
          checkboxSelection: true,
          showDisabledCheckboxes: true
        },
        {
          field: "TaskTitle",
          title: "عنوان",
          editable: false,
          width: "250px"
        }
      ]
    }
  },

  methods: {
    onSelectionChanged (params) {
      console.log("params", params.api.getSelectedRows())
      this.selectedRow = params.api.getSelectedRows()
    },
    sendClick () {
      if (this.selectedRow.length === 1) {
        this.nextStephandler("", this.selectedRow, 0)
        this.$emit('hide')
      } else {
        this.showError('لطفا یک ردیف را انتخاب نمایید')
      }
    }
  }
}
</script>
