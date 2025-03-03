<template>
  <fit>
    <safa-splitter
      v-model="verticalSplitter"
      :horizontal="$q.screen.lt.lg"
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="زیربنای مشترکات"
            helper="baseSharingInfrastructure"
            :m="m"
            v-model="value.Base_SharingInfrastructure"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            title="امتیازات و انشعابات"
            helper="baseSubscription"
            :m="m"
            v-model="value.Base_SubScription"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
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
      verticalSplitter: 50
    }
  }
}
</script>
