<template>
<fit>
  <!-- <div class="col-auto q-ma-sm">
    <btn-default
      label="انتخاب مهندسین ناظر"
      @click="isShowModal = true"
    />
    </div> -->
    <fit>
      <safa-datatable
        v-model="items"
        :addRow='false'
        :deleteRow='false'
        :loadingAnimation="false"
        helper="shahrsazi.engineers"
        title="مشخصات مهندسین"
        height="100%"
        max-height="100%"
        :bordered="false"
      ></safa-datatable>
    </fit>
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
</template>

<script>
import USupervisorEngineersList from './USupervisorEngineersList.vue'

export default {
  data () {
    return {
      items: [],
      isShowModal: false,
      selectedRow: {}
    }
  },
  components: {
    USupervisorEngineersList
  },
  props: {
    value: Object,
    editMode: {
      type: String,
      default: 'e'
    }
  },
  mounted () {
    this.items = this.value.Base_ControllerInfo
  },
  watch: {
    value: function () {
      this.items = this.value.Base_ControllerInfo
    }
  },
  methods: {
    closeModal (e) {
      this.isShowModal = e
    },
    loadSelectedEngineers (e) {
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
    // rowUpdated (e) {
    //   // console.log('////////row updated', e)

    //   this.value.Base_ControllerInfo = e.gridItems
    // }
  }
}
</script>
