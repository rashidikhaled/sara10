<template>
    <fit>
      <safa-securityPanel
        id="8834f77e-af8b-4bc7-9000-abd805340a14"
        caption="اشتراکات"
      >
        <safa-datatable
          v-model="value.Base_SubScription"
          :bordered="false"
          :hideHeader="false"
          :m="m"
          class="q-mb-sm"
          height="auto"
          helper="baseSubscription"
          max-height="200px"
          min-height="100px"
          title="اشتراکات"
        />
      </safa-securityPanel>
      <!-- <safa-securityPanel
        id="e5e9095e-a00b-4084-b7a3-785014e59afc"
        caption="اشتراکات-ویرایش محدود"
      > -->
      <!-- <safa-datatable
        title="اشتراكات"
        height="auto"
        min-height="100px"
        max-height="200px"
        helper="extra_baseSubscription"
        :m="m"
        v-model="value.Base_SubScription"
        :bordered="false"
        class="q-mb-sm"
      /> -->
      <!-- </safa-securityPanel> -->

      <safa-splitter
        v-model="horizontalSplitter"
        class="fit"
        horizontal
        margin="0"
        style="min-height:150px"
      >
        <template v-slot:before>
          <fit>
            <safa-datatable
              v-model="value.Base_ShahrsaziArchive"
              :bordered="false"
              :m="m"
              fit
              height="100%"
              helper="bazdidHouseArchive"
              max-height="100%"
              title="سوابق شهرسازی"
            />
            <q-separator/>
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <q-separator/>
            <safa-datatable
              v-model="value.Base_CommissionHistory"
              :bordered="false"
              :m="m"
              fit
              height="100%"
              helper="baseCommissionHistory"
              max-height="100%"
              title="سوابق کمیسیونها"
            />
          </fit>
        </template>
      </safa-splitter>
    </fit>
</template>

<script>
export default {
  name: 'TabArchive',

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
