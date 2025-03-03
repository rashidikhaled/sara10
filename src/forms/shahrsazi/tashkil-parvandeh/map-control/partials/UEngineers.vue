<template>
  <fit>
      <safa-datatable
        v-model="value.Base_ControllerInfo"
        cdcName="Base_ControllerInfo"
        :addRow='false'
        :deleteRow='false'
        :loadingAnimation="false"
        helper="shahrsazi.engineers"
        title="مشخصات مهندسین"
        fit
        :bordered="false"
        max-height="100%"
        height="100%"
        minHeight="100%"
      />

  <!-- <template> -->
    <btn-default
      :disabled="editMode!=='e'"
      color="primary"
      label="انتخاب مهندسین ناظر"
      @click="isShowModal = true"
    />

    <ShowModal
      v-model="isShowModal"
      title="لیست مهندسین ناظر"
    >
      <USupervisorEngineersList
        @loadSelectedEngineers="loadSelectedEngineers"
        @selectRow="selectRow"
      />
    </ShowModal>
     </fit>
<!-- // </template> -->
</template>

<script>
// import ShowModal from 'src/components/ShowModal.vue'
// import USupervisorEngineersList from './USupervisorEngineersList.vue'

export default {
  data () {
    return {
      items: [],
      isShowModal: false,
      selectedRow: {}
    }
  },
  // components: {
  //   ShowModal,
  //   USupervisorEngineersList
  // },
  props: {
    results: Object,
    editMode: {
      type: String,
      default: 'e'
    }
  },
  mounted () {},
  methods: {
    closeModal (e) {
      this.isShowModal = e
    },
    loadSelectedEngineers (e) {
      // console.log('///////////////////////////////////', e[0])

      this.selectedRow = this.normalizeDataItem(e[0])
    },
    selectRow () {
      this.items.push(this.selectedRow)

      this.closeModal()
    },
    normalizeDataItem (dataItem) {
      const norDataItem = {
        UrbanityCode: dataItem.IdentityCode,
        JobAgreement: dataItem.JobAgreementNo,
        MembershipNo: dataItem.MunicipalityCode,
        ControllerName: dataItem.EngName,
        ControllerFamily: dataItem.EngFamily,
        CI_Ability: dataItem.CI_Ability,
        CI_EngStudyField: dataItem.CI_EngStudyField,
        EngBase: '',
        ControllerCode: dataItem.ArchitectureCode,
        CommitmentNo: dataItem.Metraj,
        CommitmentSupervisionDate: dataItem.CommitmentSupervisionDate,
        CommitmentSupervisionNo: dataItem.CommitmentSupervisionNo,
        FloorNo: null
      }

      return norDataItem
    }
  }
}
</script>
