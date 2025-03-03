<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title" :padding="false">
      <safa-status :result="result" />
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="InfoEstate" label="اطلاعات ملک" />
            <tab-menu
              name="CostAnalysisForMunicipality"
              label="آنالیز بهای تمام شده برای شهرداری"
            />
          </template>
          <tab-content name="InfoEstate">
            <InfoEstate :m="mode" />
          </tab-content>
          <tab-content name="CostAnalysisForMunicipality">
            <CostAnalysisForMunicipality :m="mode" />
          </tab-content>
        </safa-tabs>
      </fit>

      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="isEditable = false"
        >
          <btn-default label="حذف" @click="deleteObj" />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import CostAnalysisForMunicipality from "./partials/CostAnalysisForMunicipality.vue"
import InfoEstate from "./partials/InfoEstate.vue"
export default {
  mixins: [baseFormMixin],
  components: {
    CostAnalysisForMunicipality,
    InfoEstate
  },
  data () {
    return {
      title: "اطلاعات فروش املاک باقی مانده به پلاک مجاور",
      name: "USaleRemainInfo",
      formKey: "D2DAEBB6-3594-4BF9-BFFF-893C4C545273",
      main: true,

      // variables
      activeTab: "InfoEstate"
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    // "در زمل سرا 8 تمام اسکریپت ها  کامنت شده است"
    loadObj () {
      console.log("load") // "در زمل سرا 8 تمام اسکریپت ها  کامنت شده است"
      console.log("در زمل سرا 8 تمام اسکریپت ها  کامنت شده است")
    },
    deleteObj () {
      console.log("delete") // "در زمل سرا 8 تمام اسکریپت ها  کامنت شده است"
      console.log("در زمل سرا 8 تمام اسکریپت ها  کامنت شده است")
    },
    saveObj () {
      console.log("save") // "در زمل سرا 8 تمام اسکریپت ها  کامنت شده است"
      console.log("در زمل سرا 8 تمام اسکریپت ها  کامنت شده است")
    }
  }
}
</script>
