<template>
  <fit>
    <div
      class="q-mb-sm"
      v-if="m==='e'"
    >
      <btn-default
        label="انتخاب مهندسین ناظر"
        @click="showSupervisorEng"
      />
    </div>

    <safa-datatable
      title="مهندسین"
      helper="baseControllerInfo"
      :m="m"
      v-model="value.Base_ControllerInfo"
      :addRow="false"
      :deleteRow="true"
      height="200px"
      class="q-mb-sm"
    />
    <safa-splitter
      v-model="verticalSplitter"
      :horizontal="$q.screen.lt.lg"
      class="fit"
      margin="0"
      :min-height="$q.screen.lt.lg ? '300px' : '200px'"
    >
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
      <div class="row q-col-gutter-md">
        <safa-text
          class="col-12 col-sm-4 "
          label="تعداد واحد پارکینگ مورد نیاز"
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingNeedCount"
          type="number"
        />
        <safa-text
          class="col-12 col-sm-4 "
          label="تعداد واحد پارکینگ تامین شده"
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingSupplyCount"
          type="number"
        />
        <safa-text
          class="col-12 col-sm-4 "
          label="کسری وصول شده پارکينگ "
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingGet"
          type="number"
        />

      </div>
    </div>
    <ShowModal
      v-model="isShowSupervisorEng"
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
  name: 'TabBaseParkings',
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
      isShowSupervisorEng: false,
      verticalSplitter: 50
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
