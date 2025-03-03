<template>
  <fit>
    <div
      v-if="m=='e'"
      class="q-pa-sm"
    >
      <btn-default
        label="انتخاب مهندسین ناظر"
        @click="showSupervisorEng"
      />
    </div>
    <safa-datatable
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      helper="baseControllerInfo"
      :m="m"
      v-model="value.Base_ControllerInfo"
      :bordered="false"
      title="مهندسین"
    />
    <q-separator class="q-mb-sm" />
    <ShowModal
      title="مهندسین ناظر"
      v-model="isShowSupervisorEng"
      vertical
    >
      <PartialSupervisorEng
        :formKey="formKey"
        :title="title"
        :name="name"
        @getSupervisorEng="getSupervisorEng"
      />
    </ShowModal>
  </fit>
</template>

<script>
import PartialSupervisorEng from './PartialSupervisorEng'
export default {
  name: 'PartialBaseControllerInfoTab',
  props: {
    m: String,
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
  data () {
    return {
      isShowSupervisorEng: false,
      controllerInfo: null,
      baseControllerInfo: []
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
      this.baseControllerInfo = value.map(x => ({
        CI_EngStudyField: x.CI_StudyField,
        ConfirmDate: x.SaveDate,
        ControllerCode: x.IdentityCode,
        ControllerFamily: x.ControllerFamily,
        ControllerName: x.ControllerName,
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
