<template>
  <fit>
    <form-row class="q-mb-sm">
      <form-control>
        <safa-combo
          v-model="cmbContractBuy_Other"
          source-type="local"
          :options="value.CI_ContractBuy_Other"
          :m="m"
          label-width="100px"
          cdcName="cmbContractBuy_Other"
        />
      </form-control>
      <form-control>
        <safa-combo
          v-if="IsCombo"
          v-model="txtValueCombo"
          source-type="local"
          :options="txtValueComboOptions"
          :m="m"
          cdcName="txtValueCombo"
          ref="txtValueCombo"
        />
        <safa-text
          v-else
          label=""
          v-model="txtValue"
          cdcName="txtValue"
          :m="m"
        />
      </form-control>

      <form-control>
        <safa-datepicker
          label-width="100px"
          v-model="txtDate"
          :m="m"
          cdcName="txtDate"
        />
      </form-control>
    </form-row>
    <div class="q-gutter-x-sm q-ml-auto">
      <q-btn
        round
        color="primary"
        cdcName="btnAddParam"
        size="sm"
        icon="add"
        title="اضافه کردن"
        class="q-my-sm"
        :disable="m === 'e' ? false : true"
        :class="m === 'e' ? '' : 'readOnly'"
        @click="addHandler"
      />
      <q-btn
        round
        color="primary"
        size="sm"
        cdcName="btnEditParam"
        icon="edit"
        title="ویرایش کردن"
        class="q-my-sm"
        :disable="m === 'e' ? false : true"
        :class="m === 'e' ? '' : 'readOnly'"
        @click="editHandler"
      />
      <q-btn
        round
        color="primary"
        size="sm"
        cdcName="btnDeleteParam"
        icon="delete"
        title="حذف کردن"
        class="q-my-sm"
        :class="m === 'e' ? '' : 'readOnly'"
        @click="deleteHandler"
      />
    </div>
    <safa-grid
      v-model="value.ContractBuy_Other"
      cdcName="ContractBuy_Other"
      title=" سایر اطلاعات"
      fit
      m="r"
      :suppressRowClickSelection="false"
      paginate
      max-height="100%"
      height="400px"
      minHeight="200px"
      :addRow="true"
      :deleteRow="true"
      :allowCopy="true"
      :columns="columns"
      @row:click="rowClick"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { uid } from 'quasar'

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
      cmbContractBuy_Other: null,
      txtValueCombo: null,
      txtValue: "",
      txtDate: null,
      txtDescription: null,
      IsCombo: true,
      txtValueComboOptions: [],

      // grid
      columns: [
        {
          field: "CI_ContractBuy_Other",
          title: "کد پارامتر",
          width: "200px",
          editor: "combo",
          domain: "Estate"
        },
        { field: "Value", title: "مقدار", width: "200px" },
        { field: "Date", title: "تاریخ", editor: "date", width: "200px" },
        { field: "Description", title: "توضیحات", width: "200px" }
      ],
      rowGrid: [],
      selectedRow: []
    }
  },
  watch: {
    cmbContractBuy_Other () {
      this.IsCombo = false
      if (
        this.IsCombo !== null &&
        this.value.CI_ContractBuy_Other_Default !== null
      ) {
        let q = this.value.CI_ContractBuy_Other_Default.filter((i) => {
          return i.CI_ContractBuy_Other === this.cmbContractBuy_Other
        })
        if (q.length > 0) {
          this.txtValueComboOptions = q
          this.IsCombo = true
        }
      }
    }
  },
  methods: {
    addHandler () {
      if (this.cmbContractBuy_Other || this.txtValueCombo || this.txtDate) {
        const tmp = {
          CI_ContractBuy_Other: this.cmbContractBuy_Other,
          Value: this.txtValueComboOptions.filter(i => i.ID === this.txtValueCombo)[0]?.Title ?? this.txtValue, // this.$ref.txtValueCombo, // this.txtValueCombo,
          Date: this.txtDate,
          Description: this.txtDescription,
          NIdOther: uid(),
          NIdOther_tmp: 0
        }
        this.value.ContractBuy_Other = [
          ...this.value.ContractBuy_Other,
          { ...tmp }
        ]
      } else {
        this.showError("پارامتری انتخاب نشده است")
      }
    },
    editHandler (params) {
      const rowId = this.selectedRow[0].uniqueId

      this.value.CI_ContractBuy_Other.map((e) => {
        if (e.uniqueId === rowId) {
          e.Description = this.model.txtDesc
        }
      })
    },
    deleteHandler () {
      const rowId = this.selectedRow[0].NIdOther
      let filterdRow = this.value.ContractBuy_Other.filter(
        (e) => e.NIdOther !== rowId
      )
      this.value.ContractBuy_Other = filterdRow
    },
    rowClick (e) {
      this.selectedRow = []
      this.selectedRow.push(e.data)
    }
  }
}
</script>
