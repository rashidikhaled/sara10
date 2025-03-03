<template>
  <fit>
    <safa-splitter v-model="gridsplitterTop" class="fit" horizontal>
      <template v-slot:before>
        <fit>
          <safa-grid
            v-model="value.Base_ControllerInfo"
            cdcName="Base_ControllerInfo"
            :addRow="false"
            helper="MapControlbaseControllerInfo"
            title="مهندسین"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
            m="e"
          >
            <template #header v-if="m === 'e'">
              <div
                class="flex items-center q-gutter-x-sm q-mr-xs cursor-pointer"
              >
                <btn-default
                  label="انتخاب مهندسین ناظر"
                  @click="isShowModal = true"
                />
                <q-separator vertical />
              </div>
            </template>
          </safa-grid>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter v-model="gridsplitter" class="fit" vertical>
            <template v-slot:before>
              <fit>
                <safa-datatable
                  class="fit"
                  v-model="value.Base_SupplyParking"
                  helper="payankarParking"
                  title="نحوه ی تأمین پارکینگ"
                  height="100%"
                  max-height="100%"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  class="fit"
                  v-model="value.Base_Commitment"
                  helper="payankarTahod"
                  height="100%"
                  max-height="100%"
                  title="تعهدات"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
    </safa-splitter>

    <!-- <ShowModal
      :show="isShowModal"
      title="مهندسین ناظر"
      @onCloseModal="isShowModal = false"
    >
      <PayankarSupervisorEng @getSupervisorEng="getSupervisorEng" />
    </ShowModal> -->
    <safa-popup v-model="isShowModal" title="لیست مهندسین ناظر" vertical>
      <form-wrapper>
        <PartialSupervisorEng
        :selectedDistrict="selectedDistrict"
          @getSupervisorEng="getSupervisorEng"
          ref="engineer"
          :formKey="formKey"
          :title="title"
          :name="name"
        />
        <template v-slot:footer>
          <btn-default label="انتخاب" @click="selectEngineer" />
        </template>
      </form-wrapper>
    </safa-popup>
  </fit>
</template>

<script>
import PartialSupervisorEng from "./PartialSupervisorEng.vue"
export default {
  data () {
    return {
      formMode: false,
      isShowSupervisorEng: false,
      controllerInfo: null,
      baseControllerInfo: [],
      gridsplitter: 50,
      gridsplitterTop: 50,
      isShowModal: false
    }
  },
  props: {
    selectedDistrict: Number,
    value: Object,
    m: String,
    formKey: String,
    title: String,
    name: String
  },
  components: {
    PartialSupervisorEng
  },
  methods: {
    getSupervisorEng (value) {
      this.controllerInfo = value
      this.isShowModal = false
      this.baseControllerInfo = value.map((x) => {
        return {
          ...x,
          ConfirmDate: x.SaveDate,
          ControllerCode: x.IdentityCode,
          ControllerFamily: x.ControllerFamily || x.EngFamily,
          ControllerName: x.ControllerName || x.EngName,
          NidControllerInfo: x.NIdEng
        }
      })
      console.log("baseControllerInfo ", this.baseControllerInfo)
      this.baseControllerInfo.forEach((item) =>
        this.value.Base_ControllerInfo.push(item)
      )

      this.isShowModal = false
    },
    selectEngineer () {
      this.$refs.engineer.select()
    }
  }
}
</script>
