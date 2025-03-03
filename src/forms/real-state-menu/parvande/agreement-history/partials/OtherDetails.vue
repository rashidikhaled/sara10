<template>
  <fit>
    <form-row class="q-mb-sm">
      <form-control>
        <safa-combo
          v-model="txtValue"
          source-type="local"
          :options="value.CI_ContractBuy_Other"
          :m="m"
          label-width="100px"
          cdcName="txtValue"
        />
      </form-control>
      <form-control>
        <safa-combo
          v-model="txtValueCombo"
          source-type="local"
          :options="value.CI_ContractBuy_Other_Default"
          :m="m"
          label-width="100px"
          cdcName="txtValueCombo"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label-width="100px"
          v-model="txtDate"
          cdcName="txtDate"
          :m="m"
        />
      </form-control>
    </form-row>
    <div class="q-gutter-x-sm q-ml-auto"></div>
    <!-- helper=agOtherInfoColumns -->
    <safa-grid
      v-model="value.ContractBuy_Other"
      cdcName="ContractBuy_Other"
      title="سایر اطلاعات"
      helper="agOtherInfoColumns"
      paginate
      fit
      :suppressRowClickSelection="false"
      max-height="100%"
      height="400px"
      minHeight="200px"
      :m="m"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      @row:click="rowClick"
    >
      <template #header>
        <div class="q-gutter-sm">
          <q-separator vartical />
          <q-btn
            flat
            size="sm"
            style="max-width: 20px"
            icon="add"
            title="اضافه کردن"
            :disable="m === 'e' ? false : true"
            :class="m === 'e' ? '' : 'readOnly'"
            @click="addHandler"
          />
          <q-btn
            flat
            size="sm"
            style="max-width: 20px"
            icon="edit"
            title="ویرایش کردن"
            :disable="m === 'e' ? false : true"
            :class="m === 'e' ? '' : 'readOnly'"
            @click="editHandler"
          />
          <q-btn
            flat
            size="sm"
            style="max-width: 20px"
            icon="delete"
            title="حذف کردن"
            :disable="m === 'e' ? false : true"
            :class="m === 'e' ? '' : 'readOnly'"
            @click="deleteHandler"
          />
        </div>
      </template>
    </safa-grid>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: Object,
    m: String
  },

  data () {
    return {
      name: "OtherDetails",

      // variables
      txtValue: null,
      txtValueCombo: null,
      txtDate: null,
      txtDescription: null,

      // grid
      // agOtherInfoColumns: [
      //   {
      //     field: "CI_ContractBuy_Other",
      //     title: "کد پارامتر",
      //     width: "200px",
      //     editor: "combo",
      //     domain: "Estate"
      //   },
      //   { field: "Value", title: "مقدار", width: "200px" },
      //   { field: "Date", title: "تاریخ", editor: "date", width: "200px" },
      //   { field: "Description", title: "توضیحات", width: "200px" }
      // ],
      rowGrid: [],
      selectedRow: []
    }
  },
  methods: {
    addRowToGrid () {
      if (this.txtValue || this.txtValueCombo || this.txtDate) {
        this.value.ContractBuy_Other.push({
          CI_ContractBuy_Other: this.txtValue,
          Value: this.txtValueCombo,
          Date: this.txtDate,
          Description: this.txtDescription
        })
      } else {
        this.showError("پارامتری انتخاب نشده است")
      }
    },
    editRowToGrid () {
      const rowId = this.selectedRow[0].uniqueID

      this.value.map((e) => {
        if (e.uniqueID === rowId) {
          e.Description = this.model.txtDesc
        }
      })
    },
    deleteRowToGrid () {
      const rowId = this.selectedRow[0].uniqueID
      const filterdRow = this.value.ContractBuy_Other.filter(
        (e) => e.uniqueID !== rowId
      )
      this.value.ContractBuy_Other = filterdRow
    },
    addHandler () {
      if (this.txtValue || this.txtValueCombo || this.txtDate) {
        const tmp = {
          CI_ContractBuy_Other: this.txtValue,
          Value: this.txtValueCombo,
          Date: this.txtDate,
          Description: this.txtDescription
        }
        this.value.ContractBuy_Other = [
          ...this.value.ContractBuy_Other,
          { ...tmp }
        ]
      } else {
        this.showError("پارامتری انتخاب نشده است")
      }
    },
    editHandler () {
      const rowId = this.selectedRow[0]?.uniqueId

      this.value.ContractBuy_Other.map((e) => {
        if (e.uniqueId === rowId) {
          e.Description = this.txtDescription
        }
      })
    },
    deleteHandler () {
      const rowId = this.selectedRow[0]?.uniqueId
      const filterdRow = this.value.ContractBuy_Other.filter(
        (e) => e.uniqueId !== rowId
      )
      this.value.ContractBuy_Other = filterdRow
    },
    rowClick (e) {
      this.selectedRow = []
      this.selectedRow.push(e.api.getSelectedRows()?.[0])
    }
  }
}
</script>
