<template>
  <safa-tabs v-model="activeTab" class="fit" :padding="false">
    <template v-slot:tabs>
      <tab-menu name="logoGrapher" label="وقایع نگار" />
      <tab-menu name="parameters" label="پارامترها" />
    </template>
    <tab-content name="logoGrapher">
      <fit>
        <safa-datatable
          helper="logoGrapher"
          title="وقایع نگار"
          v-model="logDetail"
          cdcName="logoGrapher"
          hideHeader
          fit
          minHeight="100px"
          height="100%"
          maxHeight="100%"
        />
      </fit>
    </tab-content>
    <tab-content name="parameters">
      <fit>
        <safa-datatable
          helper="parameters"
          v-model="value.IncomeParameters"
          cdcName="IncomeParameters"
          hideHeader
          fit
          minHeight="100px"
          height="100%"
          maxHeight="100%"
          m="r"
        />
      </fit>
    </tab-content>
  </safa-tabs>
</template>

<script>
export default {
  props: ["value", "logDetail"],
  data () {
    return {
      name: "CalculateTabs",
      activeTab: "logoGrapher"
    }
  }
}
</script>
