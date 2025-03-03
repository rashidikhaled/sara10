<template>
  <fit>
    <safa-splitter v-model="splitterValue" class="fit" horizontal margin="0">
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="value.Income_OddmentAccount"
            cdcName="Income_OddmentAccount"
            helper="bestankariInBestankariTab"
            m="r"
            title="بستانکاری"
            fit
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            v-model="value.Income_PrePayment"
            cdcName="Income_PrePayment"
            ref="grid"
            name="grid"
            helper="prepayedInBestankaritab"
            m="r"
            title="پرداخت های قبلی"
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
  data () {
    return {
      splitterValue: 50
    }
  },
  props: {
    value: Object
  }
}
</script>
