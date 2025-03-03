<template>
  <fit>
    <safa-splitter v-model="sp1" horizontal class="fit" margin="0">
      <template #before>
        <fit>
          <div class="row q-mb-sm" v-if="edit">
            <btn-default
              label="انتخاب مهندسین ناظر"
              @click="isShowModal = true"
              class="q-mb-sm"
            />
          </div>
          <safa-grid
            title="مهندسین ناظر"
            min-height="180px"
            v-model="results.Base_ControllerInfo"
            cdcName="Base_ControllerInfo"
            helper="parvanehMohandesin"
            :m="m"
            fit
          />
        </fit>
      </template>
      <template #after>
        <safa-splitter v-model="sp2" vertical class="fit" margin="0">
          <template #before>
            <fit>
              <safa-datatable
                v-model="results.Base_ShahrsaziArchive"
                cdcName="Base_ShahrsaziArchive"
                helper="parvanehMojavezLastList"
                title=" لیست آخرین مجوزهای اخذ شده"
                min-height="180px"
                fit
              />
            </fit>
          </template>
          <template #after>
            <fit>
              <safa-datatable
                title=" تعهدات"
                v-model="results.Base_Commitment"
                cdcName="Base_Commitment"
                helper="parvanehTahodatd"
                min-height="180px"
                fit
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
    </safa-splitter>

    <safa-popup v-model="isShowModal" title="مهندسین ناظر">
      <FormWrapper title="مهندسین ناظر">
        <PayankarSupervisorEng
          @getSupervisorEng="getSupervisorEng"
          ref="spervisorEng"
        />
        <template #footer>
          <btn-default label="انتخاب" @click="select" />
        </template>
      </FormWrapper>
    </safa-popup>
  </fit>
</template>
<script>
import PayankarSupervisorEng from "./PayankarSupervisorEng"
export default {
  components: { PayankarSupervisorEng },
  data () {
    return {
      sp1: 40,
      sp2: 50,

      isShowModal: false,
      controllerInfo: [],
      baseControllerInfo: [],
      edit: false
    }
  },
  props: {
    results: Object,
    m: String
  },
  methods: {
    getSupervisorEng (value) {
      this.controllerInfo = value
      this.isShowModal = false
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
        this.results.Base_ControllerInfo.push(item)
      )
    },

    select () {
      this.$refs.spervisorEng.select()
    }
  }
}
</script>
