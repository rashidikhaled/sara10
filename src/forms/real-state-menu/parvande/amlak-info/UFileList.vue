<template>
  <form-wrapper :title="title" :padding="false" appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255">
    <safa-tabs v-model="activeTabAmlak">
      <template v-slot:tabs>
        <tab-menu name="amlakDirections" label="جهات ملک" />
        <tab-menu name="Specifications" label="مشخصات" />
        <tab-menu name="ownersAndHistories" label="مالکین و سوابق" />
        <tab-menu name="Patern" label="کروکی" />
        <tab-menu name="otherSpecifications" label="سایر مشخصات" />
      </template>

      <!-- first tab -->

      <tab-content name="amlakDirections" title="propertyDirectionsContent">
        <amlakDirections />
      </tab-content>

      <!-- second tab -->
      <tab-content name="Specifications" title="specificationsContent">
        <Specifications />
      </tab-content>

      <!-- third tab -->
      <tab-content name="ownersAndHistories" title="ownersAndHistoriesContent">
        <ownersAndHistories />
      </tab-content>

      <!-- forth tab -->
      <tab-content name="Patern" title="paternContent">
        <Patern />
      </tab-content>

      <!-- fifth tab -->
      <tab-content
        name="otherSpecifications"
        title="otherSpecificationsContent"
      >
        <otherSpecifications />
      </tab-content>
    </safa-tabs>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import amlakDirections from "./partials/amlakDirections"
import Specifications from "./partials/Specifications"
import ownersAndHistories from "./partials/ownersAndHistories"
import Patern from "./partials/Patern"
import otherSpecifications from "./partials/otherSpecifications"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "UFileList",
      title: "اطلاعات ملک",
      formKey: "",
      main: true,
      activeTabAmlak: "amlakDirections",
      getHouseRes: [],
      model: {
        getHouseResult: {}
      }
    }
  },

  components: {
    amlakDirections,
    Specifications,
    ownersAndHistories,
    Patern,
    otherSpecifications
  },
  methods: {
    loadObj () {
      this.showLoading()
      const payload = {
        pNidBase: 4100196228,
        pNidCopy: 0,
        pNidRequest: "be04d126-2e87-4051-b124-74937c709802"
      }

      this.$services.ES.getHouse(payload)
        .then(({ data }) => {
          this.getHouseRes = this.getResponse(data)
          if (this.getHouseRes.success) {
            debugger
            this.model.getHouseResult = this.getHouseRes.data.GetHouseResult
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    }
  },

  mounted () {
    this.loadObj()
  }
}
</script>
