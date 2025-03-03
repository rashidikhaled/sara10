<template>
    <FormRow :lg="3" :md="3" :sm="3" :xl="2">
      <FormControl>
        <safa-text
          v-model="model.pEng.Sh_EngineerInfo.ControllerName"
          :m="m"
          label="نام"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.pEng.Sh_EngineerInfo.ControllerFamily"
          :m="m"
          label="نام خانوادگی"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.pEng.Sh_EngineerInfo.UrbanityCode"
          :m="m"
          label="کد شهرداری"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.pEng.Sh_EngineerInfo.ControllerCode"
          :m="m"
          label="کد نظام معماری"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.pEng.Sh_EngineerInfo.JobAgreement"
          :m="m"
          label="شماره پروانه اشتغال"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.pEng.Sh_EngineerInfo.MembershipNo"
          :m="m"
          label="شماره عضویت نظام مهندسی"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="model.pEng.Sh_EngineerInfo.CI_Ability"
          :m="m"
          ciName="CI_Ability"
          domain="CI_SaraM1"
          label="کد نوع صلاحیت"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.pEng.Sh_EngineerInfo.CommitmentNo"
          :m="m"
          label="میزان زیربنای تعهد شده"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.pEng.Sh_EngineerInfo.EngBase"
          :m="m"
          label="پایه مهندس"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="model.pEng.Sh_EngineerInfo.CI_EngStudyField"
          :m="m"
          ciName="CI_EngStudyField"
          domain="CI_SaraM1"
          label="رشته تحصیلی"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.pEng.Sh_EngineerInfo.CommitmentSupervisionNo"
          :m="m"
          label="شماره تعهد نظارت"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.pEng.Sh_EngineerInfo.MobileNo"
          :m="m"
          label="شماره تلفن همراه"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          v-model="model.pEng.Sh_EngineerInfo.CommitmentSupervisionDate"
          :m="m"
          label="تاریخ تعهد نظارت"
          label-width="100px"
        />
      </FormControl>
    </FormRow>
</template>
<script>
export default {
  props: { model: Object, m: String },
  data () {
    return {}
  }
}
</script>
