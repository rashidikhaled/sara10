<template>
  <div>
    <safa-tabs
      v-model="activeTab"
      class="fit"
    >
    <template v-slot:tabs>
      <tab-menu
        name="incomeCalculates"
        label="وقایع نگار"
      />

      <tab-menu
        name="calculateMethods"
        label="پارامترها"
      />
    </template>
        <tab-content name="incomeCalculates" :padding="false">
          <UVaghayeNegar :incomeDetailsResults="incomeDetailsResults" />
        </tab-content>

        <tab-content name="calculateMethods" :padding="false">
          <UParameters :incomeDetailsResults="incomeDetailsResults" />
        </tab-content>
    </safa-tabs>
  </div>
</template>

<script>
import UVaghayeNegar from './partials/UVaghayeNegar'
import UParameters from './partials/UParameters'

export default {
  name: 'income-calculator',
  route: 'income/income-calculator',
  title: 'ماشین حساب درآمد',
  components: {
    UVaghayeNegar,
    UParameters
  },
  data () {
    return {
      activeTab: 'incomeCalculates'
    }
  },
  props: { incomeDetailsResults: Object },
  mounted () {},
  methods: {}
}
</script>
