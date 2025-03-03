<template>
  <section>
    <div class="row q-col-gutter-md q-my-md">
      <div class="col-12 col-sm-6 col-md-4">
        <safa-combo-enum
          enum-name="EumPoseType"
          label="نوع دستگاه پوز"
          :m="m"
          v-model="selectedPose"
          cdcName="selectedPose"
        />
      </div>
      <UPoseSettingBankShahr
        class="col-12"
        v-if="selectedPose===1"
      />
      <UPoseSettingBankMeli
        class="col-12"
        v-if="selectedPose===2"
      />
      <UPoseSettingBankTejarat
        class="col-12"
        v-if="selectedPose===3"
      />
      <UPoseSettingBankAnsar
        class="col-12"
        v-if="selectedPose===4"
      />
      <UPoseSettingAsanPardakht
        class="col-12"
        v-if="selectedPose===5"
      />
      <UPoseSettingBankMelat
        class="col-12"
        v-if="selectedPose===6"
      />
      <UPoseSettingSamanKish
        class="col-12"
        v-if="selectedPose===7"
      />
      <UPoseSettingIrankish
        class="col-12"
        v-if="selectedPose===8"
      />
      <UPoseSettingPostBank
        class="col-12"
        v-if="selectedPose===9"
      />
    </div>

  </section>
</template>

<script>
import UPoseSettingBankShahr from './UPoseSettingBankShahr'
import UPoseSettingBankMeli from './UPoseSettingBankMeli'
import UPoseSettingBankTejarat from './UPoseSettingBankTejarat'
import UPoseSettingBankAnsar from './UPoseSettingBankAnsar'
import UPoseSettingAsanPardakht from './UPoseSettingAsanPardakht.vue'
import UPoseSettingBankMelat from './UPoseSettingBankMelat'
import UPoseSettingSamanKish from './UPoseSettingSamanKish'
import UPoseSettingIrankish from './UPoseSettingIrankish'
import UPoseSettingPostBank from './UPoseSettingPostBank'
export default {
  data () {
    return {
      selectedPose: null
    }
  },
  props: {
    m: String
  },
  components: {
    UPoseSettingBankShahr,
    UPoseSettingBankMeli,
    UPoseSettingBankTejarat,
    UPoseSettingBankAnsar,
    UPoseSettingAsanPardakht,
    UPoseSettingBankMelat,
    UPoseSettingSamanKish,
    UPoseSettingPostBank,
    UPoseSettingIrankish
  },
  methods: {}
}
</script>
