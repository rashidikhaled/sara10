<template>
  <fit>
    <div
      class="q-pa-sm"
      v-if="m==='e'"
    >
      <btn-default
        label="انتخاب مهندسین ناظر"
        @click="showSupervisorEng"
      />
    </div>

    <safa-datatable
      helper="baseControllerInfo"
      :m="m"
      v-model="value.Base_ControllerInfo"
      title="مهندسین"
      :emptyRowLimit="1"
      :addRow="false"
      fit
      height="100%"
      max-height="100%"
      :bordered="false"
    />
    <q-separator class="q-mb-sm"/>
    <ShowModal
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
    </ShowModal>
  </fit>
</template>

<script>
import PartialSupervisorEng from './PartialSupervisorEng'
export default {
  name: 'TabEngineer',
  components: { PartialSupervisorEng },
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
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
    },
    formKey: {
      type: String,
      default: '',
      required: true
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
    select () {
      this.$refs.engineer.select()
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
    }
  }
}
</script>
