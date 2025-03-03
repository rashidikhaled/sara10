<template>
  <fit>
    <div
      v-if="m==='e'"
      class="q-mb-sm"
    >
      <btn-default
        label="انتخاب مهندسین ناظر"
        @click="showSupervisorEng"
      />
    </div>

    <safa-datatable
      helper="baseControllerInfo"
      v-model="value.Base_ControllerInfo"
      title="مهندسین"
      :emptyRowLimit="1"
      fit
      height="100%"
      max-height="100%"
    />
    <safa-popup
      v-model="isShowSupervisorEng"
      title="مهندسین ناظر"
      vertical
    >
      <PartialSupervisorEng
        :formKey="formKey"
        :title="title"
        :name="name"
        @getSupervisorEng="getSupervisorEng"
        ref="engineer"
      />
      <template v-slot:footer>
        <btn-default
          label="انتخاب"
          @click="select"
        />
      </template>
    </safa-popup>
  </fit>
</template>

<script>
import PartialSupervisorEng from './PartialSupervisorEng'
export default {
  name: 'TabEngineer',
  components: { PartialSupervisorEng },
  props: {
    name: {
      type: String,
      default: ""
    },
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isShowSupervisorEng: false
    }
  },
  methods: {
    showSupervisorEng () {
      this.isShowSupervisorEng = true
    },
    getSupervisorEng (value) {
      this.controllerInfo = value
      this.isShowSupervisorEng = false
      this.baseControllerInfo = value.map(x => ({
        CI_EngStudyField: x.CI_StudyField,
        ConfirmDate: x.SaveDate,
        ControllerCode: x.IdentityCode,
        ControllerFamily: x.EngFamily,
        ControllerName: x.EngName,
        JobAgreement: x.JobAgreementNo,
        MembershipNo: x.MunicipalityCode,
        UrbanityCode: x.IdentityCode,
        NidControllerInfo: x.NIdEng
      }))
      this.baseControllerInfo.forEach(item =>
        this.value.Base_ControllerInfo.push(item)
      )
    },
    select () {
      this.$refs.engineer.select()
    }
  }
}
</script>
