<template>
  <div class="row q-col-gutter-md q-my-md">
    <div class="col-12 col-sm-6 col-md-4">
      <safa-combo-enum
        v-model="selectedPose"
        :m="m"
        enum-name="EumPoseType"
        label="نوع دستگاه پوز"
      ></safa-combo-enum>
    </div>
    <UPoseSettingBankShahr v-if="selectedPose===1" class="col-12"/>
    <UPoseSettingBankMeli v-if="selectedPose===2" class="col-12"/>
    <UPoseSettingBankTejarat v-if="selectedPose===3" class="col-12"/>
    <UPoseSettingBankAnsar v-if="selectedPose===4" class="col-12"/>
    <UPoseSettingAsanPardakht v-if="selectedPose===5" class="col-12"/>
    <UPoseSettingBankMelat v-if="selectedPose===6" class="col-12"/>
    <UPoseSettingSamanKish v-if="selectedPose===7" class="col-12"/>
    <UPoseSettingPostBank v-if="selectedPose===9" class="col-12"/>
  </div>
</template>

<script>
import UPoseSettingBankShahr from './UPoseSettingBankShahr'
import UPoseSettingBankMeli from './UPoseSettingBankMeli'
import UPoseSettingBankTejarat from './UPoseSettingBankTejarat'
import UPoseSettingBankAnsar from './UPoseSettingBankAnsar'
import UPoseSettingAsanPardakht from './UPoseSettingAsanPardakht.vue'
import UPoseSettingBankMelat from './UPoseSettingBankMelat'
import UPoseSettingSamanKish from './UPoseSettingSamanKish'
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
    UPoseSettingPostBank
  },
  methods: {}
}
</script>
