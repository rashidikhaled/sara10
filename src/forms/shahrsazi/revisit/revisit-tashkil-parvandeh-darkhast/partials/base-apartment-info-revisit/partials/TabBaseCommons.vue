<template>
  <safa-form
    id="fe04cccd-40ab-4328-a5a6-f48b0b793b0a"
    caption="شهرسازی- بازدید آپارتمان"
  >
    <fit>

      <safa-splitter
        v-model="horizontalSplitter"
        class="fit"
        horizontal
        margin="0"
      >
        <template v-slot:before>
          <fit>
            <safa-datatable
              v-model="value.Base_SharingInfrastructure"
              :bordered="false"
              :m="m"
              fit
              height="100%"
              helper="baseSharingInfrastructure"
              max-height="100%"
              title="زیربنای مشترکات"
            />
            <q-separator/>
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <q-separator/>
            <safa-datatable
              v-model="value.Base_SubScription"
              :bordered="false"
              :m="m"
              fit
              height="100%"
              helper="baseSubscription"
              max-height="100%"
              title="امتیازات و انشعابات"
            />
          </fit>
        </template>
      </safa-splitter>
    </fit>
  </safa-form>
</template>

<script>
export default {
  name: 'TabBaseCommons',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    },
    formkey: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      horizontalSplitter: 50
    }
  }
}
</script>
