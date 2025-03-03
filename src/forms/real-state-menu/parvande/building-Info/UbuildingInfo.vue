<template>
  <safa-form
    :id="formKey"
    caption="اطلاعات ساختمان"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title" :padding="false">
      <safa-tabs v-model="activeTabBuilding">
        <template v-slot:tabs>
          <tab-menu name="usagesAndBasefronts" label="کاربریها و پیش آمدگیها" />
          <tab-menu name="buildingSpecifications" label=" مشخصات ساختمان" />
          <tab-menu name="Histories" label="سوابق" />
        </template>

        <!-- first tab -->

        <tab-content name="usagesAndBasefronts" title="controlAndCorbelContent">
          <usagesAndBasefronts />
        </tab-content>

        <!-- second tab -->
        <tab-content
          name="buildingSpecifications"
          title="buildingSpecificationsContent"
        >
          <buildingSpecifications />
        </tab-content>

        <!-- third tab -->
        <tab-content name="Histories" title="HistoriesContent">
          <Histories />
        </tab-content>
      </safa-tabs>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import usagesAndBasefronts from "./partials/usagesAndBasefronts"
import buildingSpecifications from "./partials/buildingSpecifications"
import Histories from "./partials/Histories"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "UbuildingInfo",
      title: "اطلاعات ساختمان",
      formKey: "3BD8A938-C6EA-4BD2-BADF-D4FD32E84C7C",
      main: true,
      activeTabBuilding: "usagesAndBasefronts",

      // service
      getBuildingRes: [],
      model: {
        getBuildingResult: {}
      }
    }
  },

  components: {
    usagesAndBasefronts,
    buildingSpecifications,
    Histories
  },

  methods: {
    loadObj () {
      this.showLoading()
      const payload = {
        pNidBase: 4100196228,
        pNidCopy: 526
      }

      this.$services.ES.getBuilding(payload)
        .then(({ data }) => {
          this.getBuildingRes = this.getResponse(data)
          if (this.getBuildingRes.success) {
            debugger
            this.model.getBuildingResult =
              this.getBuildingRes.data.GetBuildingResult
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
