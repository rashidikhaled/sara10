<template>
  <fit>
    <div class="row">
      <div class="col-12 q-mb-sm">
        <safa-combo-enum
          enum-name="EumPoseType"
          label="نوع دستگاه پوز"
          v-model="value.selectedPose"
          label-width="100px"
          :m="m"
          cdcName="selectedPose"
        />
      </div>
    </div>
    <UPoseSettingBankShahr
      v-if="value.selectedPose === 1"
      :m="m"
      v-model="value.BankShahr"
    />
    <UPoseSettingBankMeli
      v-if="value.selectedPose === 2"
      :m="m"
      v-model="value.BankMelli"
    />
    <UPoseSettingBankTejarat
      v-if="value.selectedPose === 3"
      :m="m"
      v-model="value.BankTejarat"
    />
    <UPoseSettingBankAnsar
      v-if="value.selectedPose === 4"
      :m="m"
      v-model="value.BankAnsar"
    />
    <UPoseSettingAsanPardakht
      v-if="value.selectedPose === 5"
      v-model="value.PoseSettings"
      :m="m"
    />
    <UPoseSettingBankMelat
      v-if="value.selectedPose === 6"
      :m="m"
      v-model="value.BankMelat"
    />
    <UPoseSettingSamanKish
      v-if="value.selectedPose === 7"
      :m="m"
      v-model="value.SamanKish"
    />
    <UPoseSettingIranKish
      v-if="value.selectedPose === 8"
      :m="m"
      v-model="value.IranKish"
    />
    <UPoseSettingPostBank
      v-if="value.selectedPose === 9"
      :m="m"
      v-model="value.PostBank"
    />
  </fit>
</template>

<script>
import UPoseSettingBankShahr from "./partials/UPoseSettingBankShahr"
import UPoseSettingBankMeli from "./partials/UPoseSettingBankMeli"
import UPoseSettingBankTejarat from "./partials/UPoseSettingBankTejarat"
import UPoseSettingBankAnsar from "./partials/UPoseSettingBankAnsar"
import UPoseSettingAsanPardakht from "./partials/UPoseSettingAsanPardakht.vue"
import UPoseSettingBankMelat from "./partials/UPoseSettingBankMelat"
import UPoseSettingSamanKish from "./partials/UPoseSettingSamanKish"
import UPoseSettingPostBank from "./partials/UPoseSettingPostBank"
export default {
  props: {
    m: String,
    value: {
      type: Object,
      default: () => {}
    }
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
  }
}
</script>
