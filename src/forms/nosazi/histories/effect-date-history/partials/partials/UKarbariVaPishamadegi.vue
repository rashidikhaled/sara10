<template>
  <fit>
    <safa-splitter
      v-model="splitterValue"
      horizontal
      style="min-height:200px"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable2
            v-model="karbariResult"
            :allowMultipleSelection="false"
            :bordered="false"
            :clickable="true"
            :loadingAnimation="false"
            :m="m"
            :selectable="true"
            cdcName="karariInEffectDate"
            helper="nosazi.karariInEffectDate"
            title="کاربری"
          >  <!-- تاریخ ندارد -->
          </safa-datatable2>
          <q-separator/>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <q-separator/>
          <safa-datatable2
            v-model="pishamadegiResult"
            :allowMultipleSelection="false"
            :bordered="false"
            :clickable="true"
            :loadingAnimation="false"
            :m="m"
            :selectable="true"
            cdcName="pishamadegiInEffectDate"
            helper="nosazi.pishamadegiInEffectDate"
            title="پیش آمدگی"
          > <!-- تاریخ ندارد -->
          </safa-datatable2>
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      karbariResult: [],
      pishamadegiResult: [],
      splitterValue: 50
    }
  },
  props: {
    m: String
  }
}
</script>

<style lang="scss" scoped>
</style>
