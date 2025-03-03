<template>
  <section class="UJobAndNotification">
    <section padding>
      <h1 class="form-title text-h6 q-mb-lg"><span>پروانه اشتغال/صلاحیت</span></h1>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md">
          <UJobGrid :results='results' :isEditable="isEditable" :isChangeResult="isChangeResult" />

          <UQualificationGrid :results='results' :isEditable="isEditable" :isChangeResult="isChangeResult" />
          </div>
        </div>
    </section>
  </section>
</template>

<script>
// import gridMixin from '../../../../mixins/gridMixin'
// import UJobGrid from './UJobAndQualification/UJobGrid'
// import UQualificationGrid from './UJobAndQualification/UQualificationGrid'

export default {
  name: 'job-and-qualification'
  // mixins: [gridMixin],
  // data () {
  //   return {
  //     qualificationItems: [],
  //     editID: 0
  //   }
  // },
  // components: {
  //   UJobGrid,
  //   UQualificationGrid
  // },
  // props: {
  //   results: {},
  //   formEditable: {
  //     type: Boolean,
  //     default: false
  //   },
  //   isEditable: {
  //     type: Boolean,
  //     default: false
  //   },
  //   isChangeResult: String
  // },
  // computed: {
  //   mode: function () {
  //     return this.formEditable ? 'e' : 'r'
  //   },
  //   getDataOnJobGrid () {
  //     // this.results.Eng_JobAgreement

  //     if (
  //       !this.results.Eng_JobAgreement ||
  //       !Array.isArray(this.results.Eng_JobAgreement)
  //     ) {
  //       return []
  //     }
  //     return (
  //       this.results.Eng_JobAgreement &&
  //       this.results.Eng_JobAgreement.map((item, index) => {
  //         if (!item.ID) {
  //           item.ID = index + 1
  //         }

  //         item.inEdit = item.ID === this.editID

  //         return item
  //       })
  //     )
  //   },
  //   getDataOnQualifcationGrid () {
  //     // this.results.Eng_JobAgreement

  //     if (
  //       !this.results.Eng_Competence ||
  //       !Array.isArray(this.results.Eng_Competence)
  //     ) {
  //       return []
  //     }
  //     return (
  //       this.results.Eng_Competence &&
  //       this.results.Eng_Competence.map((item, index) => {
  //         if (!item.ID) {
  //           item.ID = index + 1
  //         }

  //         item.inEdit = item.ID === this.editID

  //         return item
  //       })
  //     )
  //   }
  // },
  // methods: {
  //   edit () {
  //     if (this.editForm === true) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   },
  //   itemChangeForJob: function (e) {
  //     // get grid rows
  //     const data = this.results.Eng_JobAgreement.slice()

  //     // get row index by product id
  //     const index = data.findIndex(d => d.ID === e.dataItem.ID)
  //     // override item
  //     data[index] = { ...data[index], [e.field]: e.value }
  //     // set gridview rows
  //     this.results.Eng_JobAgreement = data
  //     // replace grid cell property
  //     this.$set(e.dataItem, e.field, e.value)
  //   },
  //   itemChangeForQualification: function (e) {
  //     // get grid rows
  //     const data = this.results.Eng_Competence.slice()

  //     // console.log('dta', data)

  //     // get row index by product id
  //     const index = data.findIndex(d => d.ID === e.dataItem.ID)
  //     // override item
  //     data[index] = { ...data[index], [e.field]: e.value }
  //     // set gridview rows
  //     this.results.Eng_Competence = data
  //     // replace grid cell property
  //     this.$set(e.dataItem, e.field, e.value)
  //   },
  //   rowClickForJob: function (e) {
  //     // if (this.edit === true) {
  //     // get current row product id
  //     this.editID = e.dataItem.ID
  //     // set row as editable
  //     this.$set(e.dataItem, 'inEdit', true)
  //     // }
  //   },
  //   rowClickForQualification: function (e) {
  //     // if (this.edit === true) {
  //     // get current row product id
  //     this.editID = e.dataItem.ID
  //     // set row as editable
  //     this.$set(e.dataItem, 'inEdit', true)
  //     // }
  //   },
  //   closeEdit (e) {
  //     if (e.target === e.currentTarget) {
  //       this.editID = null
  //     }
  //   },
  //   addRecord () {
  //     const newRecord = { ID: this.results.Eng_JobAgreement.length + 1 }
  //     const data = this.results.Eng_JobAgreement.slice()
  //     data.unshift(newRecord)
  //     this.results.Eng_JobAgreement = data
  //     this.editID = newRecord.ID
  //   },
  //   deleteRow ({ e, field, dataItem }) {
  //     this.deleteDataItem(this.results.Eng_JobAgreement, dataItem)

  //     // results.Eng_JobAgreement.findIndex()
  //   }
//  }
}
</script>
