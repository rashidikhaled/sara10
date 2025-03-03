<template>
  <fit>
    <safa-splitter
      v-model="verticalSplitter"
      horizontal
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="مشخصات مهندسین"
            helper="engineersMojazPyankarDastgah"
            v-model="value.Base_ControllerInfo"
            height="100%"
            max-height="100%"
            fit
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            title="نحوه تامین پارکینگ"
            helper="baseSupplyParking"
            :m="m"
            v-model="value.Base_SupplyParking"
            height="100%"
            max-height="100%"
            fit
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'TabBaseParkings',
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isShowSupervisorEng: false,
      verticalSplitter: 50
    }
  },
  methods: {
    showSupervisorEng () {
      this.isShowSupervisorEng = true
    },
    getSupervisorEng (value) {
      this.controllerInfo = value
      this.isShowSupervisorEng = false
      this.baseControllerInfo = value.map((x) => ({
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
      this.baseControllerInfo.forEach((item) =>
        this.value.Base_ControllerInfo.push(item)
      )
    }
  }
}
</script>
