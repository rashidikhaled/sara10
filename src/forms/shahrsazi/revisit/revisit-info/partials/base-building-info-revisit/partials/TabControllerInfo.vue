<template>
  <fit>
    <div v-if="m === 'e'" class="q-py-sm q-px-sm">
      <btn-default label="انتخاب مهندسین ناظر" @click="isShowModal = true"/>
    </div>
    <fit>
      <safa-datatable
        v-model="value.Base_ControllerInfo"
        cdcName="Base_ControllerInfo"
        :addRow="false"
        :bordered="false"
        :deleteRow="true"
        :filterable="true"
        :m="m"
        fit
        height="100%"
        helper="BuildingInfoEngineers"
        max-height="100%"
        title="مهندسین"
      />
    </fit>
    <safa-popup
      v-model="isShowModal"
      title="لیست مهندسین ناظر"
      vertical
      width="1300px"
    >
      <USupervisorEngineersList
      :baseNosaziCode="baseNosaziCode"
        ref="engineer"
        :formKey="formKey"
        :name="name"
        :title="title"
        @getSupervisorEng="getSupervisorEng"
      />
    </safa-popup>
  </fit>
</template>

<script>
import USupervisorEngineersList from './USupervisorEngineersList.vue'

export default {
  name: 'PartialBaseControllerInfoTab',

  data () {
    return {
      isShowModal: false,
      baseControllerInfo: []
    }
  },
  components: {
    USupervisorEngineersList
  },
  props: {
    baseNosaziCode: Object,
    results: Object,
    m: String,
    value: Object,

    formKey: String,
    title: String,
    name: String
  },
  methods: {
    getSupervisorEng (value) {
      this.controllerInfo = value
      this.isShowModal = false
      this.baseControllerInfo = value.map((x) => ({
        CI_EngStudyField: x.CI_StudyField || x.CI_EngStudyField,
        CommitmentSupervisionDate: x.CommitmentSupervisionDate,
        CommitmentSupervisionNo: x.CommitmentSupervisionNo,
        ControllerFamily: x.ControllerFamily || x.EngFamily,
        ControllerName: x.ControllerName || x.EngName,
        JobAgreement: x.JobAgreementNo || x.JobAgreement,
        MembershipNo: x.MunicipalityCode || x.MembershipNo,
        UrbanityCode: x.IdentityCode || x.UrbanityCode,
        NidControllerInfo: x.NIdEng,
        EngBase: x.EngBase || x.Base,
        CI_Ability: x.CI_Ability
      }))
      this.baseControllerInfo.forEach((item) =>
        this.value.Base_ControllerInfo.push(item)
      )
    }
  }
  // computed: {
  //   hasEngineering () {
  //     // eslint-disable-next-line no-undef
  //     return window.getConfigValue('HasEngineeringSystem')
  //   },
  //   calcDeleteBtn () {
  //     if (this.hasEngineering === 0) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   }
  // }
}
</script>
