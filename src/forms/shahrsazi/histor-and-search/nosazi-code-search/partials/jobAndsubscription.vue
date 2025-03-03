<template>
  <div>
    <div class="row q-col-gutter-md items-center">
      <div class="col-auto" style="margin-left:42px">اشتراکات</div>
      <div class="col-auto q-gutter-md">
        <safa-checkbox
          v-model="checkBase.checkSubscriptions_water"
          :val="1"
          label="آب"
          cdcName="water"
        />

        <safa-checkbox
          v-model="checkBase.checkSubscriptions_Electricity"
          :val="2"
          label="برق"
          cdcName="Electricity"
        />

        <safa-checkbox
          v-model="checkBase.checkSubscriptions_Gas"
          :val="3"
          label="گاز"
          cdcName="Gas"
        />

        <safa-checkbox
          v-model="checkBase.checkSubscriptions_Phone"
          :val="4"
          label="تلفن"
          cdcName="Phone"
        />
        <safa-checkbox
          v-model="checkBase.checkSubscriptions_All"
          :val="0"
          label="همه اشتراکات"
          cdcName="checkSubscriptions_All"
        />
      </div>
    </div>
    <!-- <safa-group label-width="125px" :margin="false"> -->
    <FormRow class="q-mt-sm" :lg="3" :md="3" :xl="3">
      <FormControl>
        <safa-text
          label=" شماره اشتراک"
          v-model="checkBase.Subscriptions_number"
          cdcName="Subscriptions_number"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام متصدی شغل"
          v-model="Base_JobOwner.OwnerName"
          cdcName="OwnerName"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام واحد شغلی"
          v-model="Base_JobInfo.JobUnitName"
          cdcName="JobUnitName"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-combo2
          label="کد شغلی"
          use-input
          ci-name="CI_JobName"
          domain-name="CI_SaraM1"
          v-model="Base_JobInfo.CI_JobName"
          cdcName="JobName"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام خانوادگی متصدی شغل"
          v-model="Base_JobOwner.OwnerLastName"
          cdcName="OwnerLastName"
          label-width="100px"
        />
      </FormControl>
    </FormRow>
    <!-- </safa-group> -->
  </div>
</template>

<script>
export default {
  name: "job",

  props: {
    m: String,
    checkBase: Object,
    Base_JobOwner: Object,
    Base_JobInfo: Object
  },

  updated () {
    this.$emit("checkBase", this.checkBase)
    this.$emit("baseJobOwner", this.Base_JobOwner)
    this.$emit("base_JobInfo", this.Base_JobInfo)
  }
}
</script>
