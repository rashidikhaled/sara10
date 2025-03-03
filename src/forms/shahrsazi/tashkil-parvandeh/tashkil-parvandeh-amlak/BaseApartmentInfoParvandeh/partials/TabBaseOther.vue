<template>
  <fit>
    <safa-splitter
      v-model="verticalSplitter"
      vertical
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit >
          <safa-datatable
            title="سایر"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
            helper="baseOtherEquipment"
            :m="m"
            v-model="value.Base_OtherEquipment"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            title="تاسیسات"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
            helper="baseInstallation"
            :m="m"
            v-model="value.Base_Installation"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'TabBaseOther',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      verticalSplitter: 50
    }
  }
}
</script>
