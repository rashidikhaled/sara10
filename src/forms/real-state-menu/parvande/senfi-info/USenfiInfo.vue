<template>
  <form-wrapper :title="title" :padding="false" appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255">
    <safa-tabs v-model="activeTabSenfi">
      <template v-slot:tabs>
        <tab-menu name="Specifications" label="مشخصات" />
        <tab-menu name="usageAndCommons" label="کاربری و مشترکات" />
        <tab-menu name="registerPlack" label="پلاک ثبتی" />
        <tab-menu name="commentsAndOthers" label="توضیحات و سایر امکانات" />
        <tab-menu name="jobSpecifications" label="مشخصات شغلی" />
      </template>

      <!-- first tab -->

      <tab-content name="Specifications" title="SpecificationsContent">
        <Specifications />
      </tab-content>

      <!-- second tab -->
      <tab-content name="usageAndCommons" title="usageAndCommonsContent">
        <usageAndCommons />
      </tab-content>

      <!-- third tab -->
      <tab-content name="registerPlack" title="registerPlackContent">
        <registerPlack />
      </tab-content>

      <!-- forth tab -->
      <tab-content name="commentsAndOthers" title="commentsAndOthersContent">
        <commentsAndOthers />
      </tab-content>

      <!-- fifth tab -->
      <tab-content name="jobSpecifications" title="jobSpecificationsContent">
        <jobSpecifications />
      </tab-content>
    </safa-tabs>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Specifications from "./partials/Specifications"
import usageAndCommons from "./partials/usageAndCommons"
import registerPlack from "./partials/registerPlack"
import commentsAndOthers from "./partials/commentsAndOthers"
import jobSpecifications from "./partials/jobSpecifications"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "USenfiInfo",
      title: "اطلاعات صنفی",
      formKey: "E5FA61A9-025E-4550-BC0B-67235C35405A",
      main: true,
      activeTabSenfi: "Specifications",
      GetShopRes: [],
      model: {
        GetShopResult: {}
      }
    }
  },

  components: {
    Specifications,
    usageAndCommons,
    registerPlack,
    commentsAndOthers,
    jobSpecifications
  },

  methods: {
    loadObj () {
      this.showLoading()
      const payload = {
        pNidBase: 4100196220,
        pNidCopy: 0
      }

      this.$services.ES.GetShop(payload)
        .then(({ data }) => {
          this.GetShopRes = this.getResponse(data)
          if (this.GetShopRes.success) {
            debugger
            this.model.GetShopResult = this.GetShopRes.data.GetShopResult
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
