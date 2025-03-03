<template>
  <fit>
    <form-row class="q-mb-sm">
      <ClasseParvandeh
        label="کلاسه پرونده"
        labelWidth="100px"
        v-model="classeCode"
        :m="m"
      ></ClasseParvandeh>

      <form-control className="col-6">
        <text-template
          label="توضیحات"
          ID="4F95BF46-068C-481D-9628-5F5D92F7AFCF"
          v-model="txtDesc"
          cdcName="txtDesc"
          label-width="90px"
          :rows="1"
          :m="m"
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
    <fit>
      <safa-grid
        v-model="value.Legal_RelatedClasse"
        cdcName="Legal_RelatedClasse"
        title="کلاسه ی پرونده"
        ID="3DBB0131-9C10-46B6-9D59-075683E07F65"
        fit
        :m="m"
        paginate
        max-height="100%"
        height="100%"
        minHeight="100%"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="true"
        :columns="columns"
        @row:click="rowClick"
        :suppressRowClickSelection="false"

      />
    </fit>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
const classeCodeDefault = {
  District: 0,
  Region: 0,
  Block: 0,
  House: 0
}
export default {
  mixins: [baseFormMixin],
  props: {
    title: String,
    name: String,
    value: Object,
    m: String
  },
  data () {
    return {
      // name: "UClassesPhysical",
      columns: [
        { field: "Classe", title: "کلاسه پرونده", width: "200px" },
        { field: "Description", title: "توضیحات", width: "auto" }
      ],
      txtDesc: "",
      selectedRow: [],
      classeCode: { ...classeCodeDefault }
    }
  },
  methods: {
    addHandler () {
      const calsseCode = `${this.classeCode.District}-${this.classeCode.Region}-${this.classeCode.Block}-${this.classeCode.House}`
      let tmp = {
        Description: this.txtDesc,
        Classe: calsseCode
      }
      this.value.Legal_RelatedClasse = [...this.value.Legal_RelatedClasse, { ...tmp }]
    },
    editHandler () {
      let rowId = this.selectedRow[0].uniqueId
      const calsseCode = `${this.classeCode.District}-${this.classeCode.Region}-${this.classeCode.Block}-${this.classeCode.House}`
      this.value.Legal_RelatedClasse.map((e) => {
        if (e.uniqueId === rowId) {
          e.Description = this.txtDesc
          e.Classe = calsseCode
        }
      })
    },
    deleteHandler () {
      let rowId = this.selectedRow[0].uniqueId
      let filterdRow = this.value.Legal_RelatedClasse.filter((e) => e.uniqueId !== rowId)
      this.value.Legal_RelatedClasse = filterdRow
    },
    rowClick (e) {
      this.selectedRow = []
      this.selectedRow.push(e.data)
    }
  }

}
</script>
