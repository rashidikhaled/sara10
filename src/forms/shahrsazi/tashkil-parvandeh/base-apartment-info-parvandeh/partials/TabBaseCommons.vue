<template>
  <fit>
    <safa-splitter
      v-model="splitterModel"
      horizontal
      fit
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            helper="baseSharingInfrastructure"
            :m="m"
            fit
            height="100%"
            max-height="100%"
            v-model="value.Base_SharingInfrastructure"
            cdcName="Base_SharingInfrastructure"
            title="زیر بنای  مشترکات"
            :bordered="false"
          />
          <q-separator />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <q-separator />
          <safa-datatable
            fit
            height="100%"
            max-height="100%"
            helper="baseSubscription"
            :m="m"
            v-model="value.Base_SubScription"
            cdcName="Base_SubScription"
            title="امتیازات و انشعابات"
            :bordered="false"
          />
          <q-separator class="q-mb-sm" />
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
      splitterModel: 50
    }
  }
}
</script>
