<template>
  <fit>
    <safa-splitter
      v-model="splitterValue"
      horizontal
      class="fit"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="سایر"
            helper="baseOtherEquipment"
            :m="m"
            v-model="value.Base_OtherEquipment"
            fit
            height="100%"
            max-height="100%"
            minHeight="150px"
          />
        </fit>
      </template>
      <template v-slot:after>
        <safa-splitter
          v-model="splitterValue"
          fit
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                title="تاسیسات"
                helper="baseInstallation"
                :m="m"
                v-model="value.Base_Installation"
                fit
                height="100%"
                max-height="100%"
                minHeight="150px"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                v-model="value.Base_ShahrsaziArchive"
                helper="baseShahrsaziArchive"
                title="سوابق شهرسازی"
                height="100%"
                max-height="100%"
                fit
                :m="m"
              ></safa-datatable>
            </fit>
          </template>
        </safa-splitter>
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
      splitterValue: 50
    }
  }
}
</script>
