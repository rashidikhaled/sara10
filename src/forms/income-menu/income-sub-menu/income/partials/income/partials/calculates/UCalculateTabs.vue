<template>
  <safa-tabs
    v-model="activeTab"
    height="100%"
    class="fit"
    :padding="false"
  >
    <template v-slot:tabs>
      <tab-menu
        name="logoGrapher"
        label="وقایع نگار"
      />
      <tab-menu
        name="parameters"
        label="پارامترها"
      />
    </template>
    <tab-content name="logoGrapher">
      <ULogoGrapher :incomeDetailResults="incomeDetailResults" :logDetail="logDetail"/>
    </tab-content>
    <tab-content name="parameters">
      <UParameters :incomeDetailResults="incomeDetailResults" :m="m"/>
    </tab-content>
  </safa-tabs>

</template>

<script>
import ULogoGrapher from './partials/ULogoGrapher'
import UParameters from './partials/UParameters'

export default {
  name: 'income',
  title: 'درآمد',
  components: {
    ULogoGrapher,
    UParameters
  },
  data () {
    return {
      activeTab: 'logoGrapher',
      items: [],
      ShowModal: false
    }
  },
  props: {
    value: Object,
    incomeDetailResults: Object,
    m: String,
    formKey: String,
    logDetail: Array
  },
  mounted () {
    this.items = this.incomeDetailResults.IncomeParameters
  },
  methods: {
    showModal () {
      this.isShowModal = true
    },
    closeModal (e) {
      this.isShowModal = e
    }
  }
}
</script>
