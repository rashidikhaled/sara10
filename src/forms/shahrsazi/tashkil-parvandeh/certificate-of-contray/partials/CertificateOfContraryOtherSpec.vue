<template>
  <fit>
    <div class="q-mb-sm">
      <div class="row q-col-gutter-sm">
        <safa-custom-text
          type="decimal"
          label="مساحت وضع موجود "
          v-model="results.Base_HouseInfo.CurrentArea"
          :label-width="$q.screen.gt.sm?'auto' :'144px'"
          class="col-12 col-sm-6 col-md-3"
        >
        </safa-custom-text>
        <safa-custom-text
          type="decimal"
          label=" مساحت طبق سند"
          v-model="results.Base_HouseInfo.DocArea"
          :label-width="$q.screen.gt.sm?'auto' :'120px'"
          class="col-12 col-sm-6 col-md-3"
        >
        </safa-custom-text>
        <safa-custom-text
          type="decimal"
          label="مساحت پس از رعایت اصلاحی"
          v-model="results.Base_HouseInfo.AreaAfterEdit"
          :label-width="$q.screen.gt.sm?'auto' :'144px'"
          class="col-12 col-sm-6 col-md-3"
        >
        </safa-custom-text>
        <safa-combo
          label="موقعیت زمین"
          ciName="CI_GeoStatus"
          domainName="CI_SaraM1"
          v-model="results.Base_HouseInfo.CI_GeoStatus"
          :label-width="$q.screen.gt.sm?'auto' :'120px'"
          class="col-12 col-sm-6 col-md-3"
        >
        </safa-combo>
      </div>
    </div>
    <div
      class="q-mb-sm"
      v-if="edit"
    >
      <btn-default
        label="انتخاب مهندسین ناظر"
        size="sm"
        @click="isShowModal = true"
      />
    </div>
    <safa-datatable
        v-model="results.Base_ControllerInfo"
        ref="grid2"
        helper="BuildingInfoEngineers"
        :showSelectedCheckbox="isSelected"
        :allowMultipleSelection ="true"
        @selectedChange="selectedChange"
        fit
        height="100%"
        max-height="100%"
        class="q-mt-sm"
        title="اطلاعات مهندس"
      />
    <safa-popup v-model="isShowModal" title="لیست مهندسین ناظر" vertical>
      <form-wrapper>
        <USupervisorEngineersList
        :baseNosaziCode="baseNosaziCode"
          @getSupervisorEng="getSupervisorEng"
          ref="engineer"
          :formKey="formKey"
          :title="title"
          :name="name"
        />
        <template v-slot:footer>
          <btn-default label="انتخاب" @click="selectEngineer"/>
        </template>
      </form-wrapper>
    </safa-popup>

  </fit>
</template>
<script>
import USupervisorEngineersList from './USupervisorEngineersList.vue'
export default {
  data: function () {
    return {
      isShowModal: false,
      controllerInfo: [],
      baseControllerInfo: [],
      splitterValue: 50
    }
  },
  props: {
    baseNosaziCode: Object,
    results: Object,
    edit: Boolean,
    formKey: String,
    title: String,
    name: String
  },
  components: {
    USupervisorEngineersList
  },
  methods: {
    selectEngineer () {
      this.$refs.engineer.select()
    },
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
        this.results.Base_ControllerInfo.push(item)
      )
    },
    selectEng () {
      this.$refs.engineer.select()
    }
  }
}
</script>
