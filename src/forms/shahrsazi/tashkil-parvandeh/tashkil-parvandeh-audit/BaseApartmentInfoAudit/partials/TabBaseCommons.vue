<template>
  <fit>
    <safa-splitter
      v-model="splitterValue"
      horizontal
      class="fit"
    >
      <template v-slot:before>
        <fit >
          <safa-datatable
            title="زیربنای مشترکات"
            helper="baseSharingInfrastructure"
            :m="m"
            v-model="value.Base_SharingInfrastructure"
            fit
            height="100%"
            max-height="100%"
            minHeight="150px"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit >
          <safa-datatable
            title="امتیازات و انشعابات"
            helper="baseSubscription"
            :m="m"
            v-model="value.Base_SubScription"
            fit
            height="100%"
            max-height="100%"
            minHeight="150px"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'TabBaseCommons',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      splitterValue: 50
    }
  }
}
</script>
