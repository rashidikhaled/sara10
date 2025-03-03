<template>
  <fit>
    <div class="q-mb-sm" v-if="m === 'e'">
      <btn-default label="انتخاب مهندسین ناظر" @click="showSupervisorEng" />
    </div>

    <safa-datatable
      title="مهندسین"
      helper="baseControllerInfoBaseParking"
      v-model="value.Base_ControllerInfo"
      height="200px"
      class="q-mb-sm"
      :addRow="false"
      :allowCopy="false"
      :deleteRow="true"
      m="e"
    />
    <safa-splitter v-model="verticalSplitter" vertical class="fit" margin="0">
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="منبع تامین پارکینگ"
            helper="baseSupplyParking"
            :m="m"
            v-model="value.Base_SupplyParking"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            title="پارکینگ ها"
            helper="baseParking"
            :m="m"
            v-model="value.Base_Parking"
          />
        </fit>
      </template>
    </safa-splitter>
    <div class="q-mt-sm">
      <div class="row q-col-gutter-x-md q-col-gutter-sm-y-sm">
        <!-- row 1 -->
        <safa-text
          class="col-12 col-md-4 col-sm"
          label="تعداد واحد پارکینگ مورد نیاز"
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingNeedCount"
          type="number"
        />
        <safa-text
          class="col-12 col-md-4 col-sm"
          label="تعداد واحد پارکینگ تامین شده"
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingSupplyCount"
          type="number"
        />
        <safa-text
          class="col-12 col-md-4 col-sm"
          label="کسری وصول شده پارکينگ "
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingGet"
          type="number"
        />
      </div>
    </div>
    <safa-popup v-model="isShowSupervisorEng">
      <PartialSupervisorEng @getSupervisorEng="getSupervisorEng" />
    </safa-popup>
  </fit>
</template>

<script>
import PartialSupervisorEng from "./PartialSupervisorEng"
export default {
  name: "TabBaseParkings",
  components: { PartialSupervisorEng },
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
        CI_EngStudyField: x.CI_StudyField || x.CI_EngStudyField,
        ConfirmDate: x.SaveDate || x.CommitmentSupervisionDate,
        ControllerCode: x.IdentityCode || x.ControllerCode,
        ControllerFamily: x.EngFamily || x.ControllerFamily,
        ControllerName: x.EngName || x.ControllerName,
        JobAgreement: x.JobAgreementNo || x.JobAgreement,
        MembershipNo: x.MunicipalityCode || x.MembershipNo,
        UrbanityCode: x.IdentityCode || x.UrbanityCode,
        NidControllerInfo: x.NIdEng || x.NidEng
      }))
      this.baseControllerInfo.forEach((item) =>
        this.value.Base_ControllerInfo.push(item)
      )
    }
  }
}
</script>
