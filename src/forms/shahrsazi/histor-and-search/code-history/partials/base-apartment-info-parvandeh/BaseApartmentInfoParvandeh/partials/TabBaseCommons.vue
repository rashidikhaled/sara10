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
            v-model="value.Base_SharingInfrastructure"
            :m="m"
            fit
            height="100%"
            helper="baseSharingInfrastructure"
            max-height="100%"
            min-height="150px"
            title="زیربنای مشترکات"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            v-model="value.Base_SubScription"
            :m="m"
            fit
            height="100%"
            helper="baseSubscription"
            max-height="100%"
            min-height="150px"
            title="امتیازات و انشعابات"
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
