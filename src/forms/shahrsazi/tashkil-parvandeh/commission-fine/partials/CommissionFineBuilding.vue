<template>
  <fit>
    <safa-status :result="getContrastBuildingRes" />
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo-enum
          label="گروه اول"
          cdcName="eumBaseInfoGroupOtherGroup1"
          enum-name="EumBaseInfoGroup"
          v-model="eumBaseInfoGroupOtherGroup1"
        />
      </FormControl>
      <FormControl>
        <safa-combo-enum
          label="گروه دوم"
          cdcName="eumBaseInfoGroupOtherGroup2"
          enum-name="EumBaseInfoGroup"
          v-model="eumBaseInfoGroupOtherGroup2"
        />
      </FormControl>
    </FormRow>
    <safa-tabs v-model="activeTab" :padding="false">
      <template v-slot:tabs>
        <tab-menu name="using" label="کاربری ها" />
        <tab-menu name="front" label="پیش آمدگی ها" />
        <tab-menu name="contradictionUsing" label="مغایرت کاربری ها" />
        <tab-menu name="contradictionFront" label="مغایرت پیش آمدگی ها" />
      </template>
      <tab-content name="using">
        <CommissionFineBuildingUsing v-model="model" />
      </tab-content>
      <tab-content name="front">
        <CommissionFineBuildingFront v-model="model" />
      </tab-content>
      <tab-content name="contradictionUsing">
        <CommissionFineBuildingContUsing v-model="model" />
      </tab-content>
      <tab-content name="contradictionFront">
        <CommissionFineBuildingContFront v-model="model" />
      </tab-content>
    </safa-tabs>
    <!-- <safa-combo
          sourceType="local"
          :options="category"
          v-model="selectedFirstCategory"
        /> -->
  </fit>
</template>
<script>
import CommissionFineBuildingUsing from "./CommissionFineBuildingUsing"
import CommissionFineBuildingFront from "./CommissionFineBuildingFront"
import CommissionFineBuildingContUsing from "./CommissionFineBuildingContUsing"
import CommissionFineBuildingContFront from "./CommissionFineBuildingContFront"
import baseFormMixin from "src/mixins/baseformMixin"
export default {
  //   props: { value: Object },
  mixins: [baseFormMixin],
  components: {
    CommissionFineBuildingUsing,
    CommissionFineBuildingFront,
    CommissionFineBuildingContUsing,
    CommissionFineBuildingContFront
  },
  data () {
    return {
      activeTab: "using",
      eumBaseInfoGroupOtherGroup1: null,
      eumBaseInfoGroupOtherGroup2: null,
      getContrastBuildingRes: null,
      model: {
        Base_Front_Other: [],
        Base_Front_Revisit: [],
        Base_Using_Other: [],
        Base_Using_Revisit: [],
        Contrast_BuildingFront_Contrast: [],
        Contrast_BuildingFront_Other: [],
        Contrast_BuildingFront_Revisit: [],
        Contrast_BuildingInfo: [],
        Contrast_BuildingUsing_Contrast: [],
        Contrast_BuildingUsing_Other: [],
        Contrast_BuildingUsing_Revisit: [],
        Contrast_Momayezi_Parvandeh_Info: []
      }
    }
  },

  props: {
    nidNosaziCode: String,
    formKey: String,
    title: String,
    name: String
  },
  methods: {
    getConstractBuilding () {
      this.showLoading()
      const payload = {
        pNidProc: this.selectedRequest.NidProc,
        pNidNosaziCode: this.nidNosaziCode,
        pEumBaseInfoGroup_OtherGroup1: this.eumBaseInfoGroupOtherGroup1,
        pEumBaseInfoGroup_OtherGroup2: this.eumBaseInfoGroupOtherGroup2
      }
      this.$services.SC.getContrastBuilding(payload, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          this.getContrastBuildingRes = this.getResponse(data)
          if (this.getContrastBuildingRes.success) {
            this.model = this.getContrastBuildingRes.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc"
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  watch: {
    eumBaseInfoGroupOtherGroup1 () {
      if (
        this.eumBaseInfoGroupOtherGroup1 !== null &&
        this.eumBaseInfoGroupOtherGroup2 !== null
      ) {
        this.getConstractBuilding()
      }
    },
    eumBaseInfoGroupOtherGroup2 () {
      if (
        this.eumBaseInfoGroupOtherGroup1 !== null &&
        this.eumBaseInfoGroupOtherGroup2 !== null
      ) {
        this.getConstractBuilding()
      }
    }
  }
}
</script>
