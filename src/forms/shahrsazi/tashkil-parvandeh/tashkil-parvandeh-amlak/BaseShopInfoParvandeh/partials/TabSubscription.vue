<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitter"
      horizontal
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            helper="baseSubscription"
            :m="m"
            v-model="value.Base_SubScription"
            title="امتیازات"
            :bordered="false"
          />
          <q-separator/>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
           <q-separator/>
          <safa-datatable
            helper="baseSharingInfrastructure"
            :m="m"
            v-model="value.Base_SharingInfrastructure"
            title="مساحت زیربنای مشترکات"
            :bordered="false"
          />
           <q-separator/>
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
