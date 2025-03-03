<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitter"
      horizontal
      fit
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="امتیازات"
            helper="baseSubscription"
            :m="m"
            v-model="value.Base_SubScription"
            cdcName="Base_SubScription"
            fit
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            title="مساحت زیربنای مشترکات"
            helper="baseSharingInfrastructure"
            :m="m"
            v-model="value.Base_SharingInfrastructure"
            cdcName="Base_SharingInfrastructure"
            fit
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'TabSubscription',
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      horizontalSplitter: 50
    }
  }
}
</script>
