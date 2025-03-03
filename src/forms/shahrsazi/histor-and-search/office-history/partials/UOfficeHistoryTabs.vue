<template>
  <safa-tabs v-model="activeTab" class="fit">
    <template v-slot:tabs>
      <tab-menu name="request" label="درخواست" />
      <tab-menu name="archive" label="آرشیو" />
    </template>
    <tab-content name="request" title="درخواست">
      <URequest v-model="value" />
    </tab-content>
    <tab-content name="archive" title="آرشیو">
      <UArchive :baseNosaziCode="baseNosaziCode" />
    </tab-content>
  </safa-tabs>
</template>

<script>
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import UArchive from "./partials/UArchive"
import URequest from "./partials/URequest"

export default {
  components: { UArchive, URequest },
  props: { value: Object },

  data () {
    return {
      activeTab: "request",
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },

  watch: {
    value: {
      handler () {
        if (this.value && this.value.NosaziCodeStr) {
          this.baseNosaziCode = convertStringToNosaziCodeObject(
            this.value.NosaziCodeStr
          )
        }
      },
      deep: true
    }
  }
}
</script>
