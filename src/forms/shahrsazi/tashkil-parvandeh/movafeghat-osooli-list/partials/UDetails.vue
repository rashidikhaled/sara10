<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <fit>
      <safa-tabs v-model="activeTab" height="100%" class="fit">
        <template v-slot:tabs>
          <tab-menu name="buildingSpecifications" label="مشخصات ساختمان" />
          <tab-menu name="otherSpecifications" label="سایر مشخصات" />
          <tab-menu name="karbariha" label="کاربریها" />
          <tab-menu name="pishamadegiha" label="پیش آمدگیها" />
          <tab-menu name="parking" label="پارکینگ" />
          <tab-menu name="description" label="توضیحات" />
        </template>
        <tab-content name="buildingSpecifications">
          <UBuildingSpecifications :m="m" v-model="value" />
        </tab-content>
        <tab-content name="otherSpecifications">
          <UOtherSpecifications :m="m" v-model="value" />
        </tab-content>
        <tab-content name="karbariha" :padding="false">
          <UKarbariha :m="m" v-model="value" />
        </tab-content>
        <tab-content name="pishamadegiha" :padding="false">
          <UPishAmadegiha :m="m" v-model="value" />
        </tab-content>
        <tab-content name="parking" :padding="false">
          <UParking :m="m" v-model="value" />
        </tab-content>
        <tab-content name="description">
          <UDescription :m="m" v-model="value" />
        </tab-content>
      </safa-tabs>
    </fit>

  </safa-form>
</template>

<script>
import UBuildingSpecifications from "./details-partials/UBuildingSpecifications.vue"
import UOtherSpecifications from "./details-partials/UOtherSpecifications.vue"
import UKarbariha from "./details-partials/UKarbariha.vue"
import UPishAmadegiha from "./details-partials/UPishAmadegiha.vue"
import UParking from "./details-partials/UParking.vue"
import UDescription from "./details-partials/UDescription.vue"
import baseFormMixin from "src/mixins/baseFormMixin.js"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "شهرسازی- جزییات موافقت اصولی",
      formKey: "2f019698-e036-474e-9dc3-28ccdbd188d2",
      activeTab: "buildingSpecifications",
      karbarihaItems: [],
      pishAmadegihaItems: [],
      isGoToEdit: true,
      items: []
    }
  },
  components: {
    UBuildingSpecifications,
    UOtherSpecifications,
    UKarbariha,
    UPishAmadegiha,
    UParking,
    UDescription
  },
  props: {
    value: Object,
    m: String,
    isNew: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (this.isNew) {
      this.engineerInfo.CI_Ability = 0
      this.engineerInfo.CI_EngStudyField = 0
      this.engineerInfo.CommitmentNo = null
      this.engineerInfo.CommitmentSupervisionDate = null
      this.engineerInfo.CommitmentSupervisionNo = null
      this.engineerInfo.ControllerCode = null
      this.engineerInfo.ControllerFamily = null
      this.engineerInfo.ControllerName = null
      this.engineerInfo.EngBase = null
      this.engineerInfo.JobAgreement = null
      this.engineerInfo.MembershipNo = null
      this.engineerInfo.NidEng = ""
      this.engineerInfo.TotalCount = 0
      this.engineerInfo.UrbanityCode = null
    }
  },
  methods: {
  }
}
</script>
