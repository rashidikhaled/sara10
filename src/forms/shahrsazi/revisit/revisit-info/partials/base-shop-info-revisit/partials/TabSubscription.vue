<template>
  <safa-form
    id="52189054-a984-47b7-bd89-393db66b9497"
    caption="شهرسازی- بازدید صنفی"
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
            <safa-securityPanel
              id="82c08a00-62ab-416d-b347-e0d1873facbc"
              caption="امتیازات"
              class="fit"
              tag="div"
            >
              <fit>
                <safa-datatable
                  v-model="value.Base_SubScription"
                  cdcName="Base_SubScription"
                  :bordered="false"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseSubscription"
                  max-height="100%"
                  title="امتیازات"
                />
                <q-separator/>
              </fit>
            </safa-securityPanel>
            <safa-securityPanel
              id="4eb082a2-9bea-4ef6-a4f0-d3f6999a62ff"
              caption="امتیازات-ویرایش محدود"
              class="fit"
              tag="div"
            >
              <fit>
                <safa-datatable
                  v-model="value.Base_SubScription"
                  cdcName="Base_SubScription"
                  :bordered="false"
                  :m="m"
                  fit
                  height="100%"
                  helper="extra_baseSubscription"
                  max-height="100%"
                  title="امتیازات"
                />
                <q-separator/>
              </fit>

            </safa-securityPanel>
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <safa-datatable
              v-model="value.Base_SharingInfrastructure"
              cdcName="Base_SharingInfrastructure"
              :bordered="false"
              :m="m"
              fit
              height="100%"
              helper="baseSharingInfrastructure"
              max-height="100%"
              title="مساحت زیربنای مشترکات"
            />
            <q-separator class="q-mb-sm"/>
          </fit>
        </template>
      </safa-splitter>
    </fit>
  </safa-form>
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
