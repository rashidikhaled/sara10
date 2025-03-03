<template>
  <fit>
    <div
      v-if="m==='e'"
      class="q-py-sm q-px-sm"
    >
      <btn-default
        label="انتخاب مهندسین ناظر"
        @click="isShowModal = true"
      />
    </div>
    <fit>
      <safa-datatable
        v-model="value.Base_ControllerInfo"
        :addRow="false"
        :bordered="false"
        :deleteRow="false"
        :filterable="true"
        fit
        height="100%"
        helper="baseControllerInfo"
        m="r"
        max-height="100%"
        title="مهندسین"
      />
    </fit>
    <ShowModal
      v-model="isShowModal"
      title="لیست مهندسین ناظر"
      vertical
    >
      <!--      <USupervisorEngineersList-->
      <!--        @loadSelectedEngineers="loadSelectedEngineers"-->
      <!--        @getSupervisorEng="getSupervisorEng"-->
      <!--        ref="engineer"-->
      <!--      />-->

      <USupervisorEngineersList
        ref="engineer"
        @getSupervisorEng="getSupervisorEng"
      />
      <template v-slot:footer>
        <btn-default
          class="btn-default"
          label="انتخاب"
          @click="$refs.engineer.select()"
        />
      </template>
    </ShowModal>
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
    results: Object,
    m: String,
    value: Object
  },
  methods: {
    getSupervisorEng (value) {
      this.controllerInfo = value
      this.isShowModal = false
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
