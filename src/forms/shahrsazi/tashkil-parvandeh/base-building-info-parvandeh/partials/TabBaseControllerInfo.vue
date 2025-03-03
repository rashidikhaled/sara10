<template>
  <fit>
    <div v-if="formMode" class="q-pa-sm">
      <btn-default label="انتخاب مهندسین ناظر" @click="showSupervisorEng"/>
    </div>

    <safa-datatable
      class="fit"
      margin="0"
      height="100%"
      max-height="100%"
      min-height="100px"
      v-model="value.Base_ControllerInfo"
      cdcName="Base_ControllerInfo"
      :bordered="false"
      title="مهندسین"
      m="e"
      :addRow="false"
      :deleteRow="true"
      helper="BuildingInfoEngineers"

    />
    <safa-popup
      title="مهندسین ناظر"
      v-model="isShowSupervisorEng"
      vertical
      width="1400px"
    >
      <PartialSupervisorEng
      :baseNosaziCode="baseNosaziCode"
        :formKey="formKey"
        :title="title"
        :name="name"
        @getSupervisorEng="getSupervisorEng"
      />
    </safa-popup>
  </fit>
</template>

<script>
import PartialSupervisorEng from './PartialSupervisorEng'

export default {
  name: 'TabBaseControllerInfo',
  data: function () {
    return {
      formMode: false,
      isShowSupervisorEng: false,
      controllerInfo: null,
      baseControllerInfo: []
    }
  },
  watch: {
    m () {
      if (this.m === 'e') {
        this.formMode = true
      } else {
        this.formMode = false
      }
      return this.formMode
    }
  },
  props: {
    m: String,
    baseNosaziCode: Object,
    value: {
      type: Object,
      default: () => ({})
    },
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  components: {
    PartialSupervisorEng
  },
  methods: {
    showSupervisorEng () {
      this.isShowSupervisorEng = true
    },
    getSupervisorEng (value) {
      this.controllerInfo = value
      this.isShowSupervisorEng = false
      this.baseControllerInfo = value.map((x) => {
        return {
          ...x,
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
        }
      })
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
