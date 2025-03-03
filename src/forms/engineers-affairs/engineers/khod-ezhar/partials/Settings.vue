<template>
  <fit>
    <FormRow>
      <FormControl>
        <safa-checkbox
          label="نام و نام خانوادگی"
          :m="m"
          cdcName="IsShowName"
          v-model="model.ClsEngineerTemp.Eng_ShowPublicSetting.IsShowName"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          label="صلاحیت"
          :m="m"
          cdcName="IsShowAbility"
          v-model="model.ClsEngineerTemp.Eng_ShowPublicSetting.IsShowAbility"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          label="پایه"
          :m="m"
          cdcName="IsShowBase"
          v-model="model.ClsEngineerTemp.Eng_ShowPublicSetting.IsShowBase"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          label="فعالیت"
          :m="m"
          cdcName="IsShowStudyField"
          v-model="model.ClsEngineerTemp.Eng_ShowPublicSetting.IsShowStudyField"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          label="رشته تحصیلی"
          :m="m"
          cdcName="IsShowStudyFieldRel"
          v-model="
            model.ClsEngineerTemp.Eng_ShowPublicSetting.IsShowStudyFieldRel
          "
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          label="سهمیه باقی مانده"
          :m="m"
          cdcName="IsShowQtaRemain"
          v-model="model.ClsEngineerTemp.Eng_ShowPublicSetting.IsShowQtaRemain"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          label="سهمیه کل"
          :m="m"
          cdcName="IsShowQta"
          v-model="model.ClsEngineerTemp.Eng_ShowPublicSetting.IsShowQta"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          label="تاریخ انقضاء پروانه اشتغال"
          :m="m"
          cdcName="IsJobAgreementExpireDate"
          v-model="
            model.ClsEngineerTemp.Eng_ShowPublicSetting.IsJobAgreementExpireDate
          "
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          label="نمایش تصویر"
          :m="m"
          cdcName="IsShowPic"
          v-model="model.ClsEngineerTemp.Eng_ShowPublicSetting.IsShowPic"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          label="تلفن همراه"
          :m="m"
          cdcName="IsShowMobile"
          v-model="model.ClsEngineerTemp.Eng_ShowPublicSetting.IsShowMobile"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          label="محل تحصیل"
          :m="m"
          cdcName="IsShowUniversity"
          v-model="model.ClsEngineerTemp.Eng_ShowPublicSetting.IsShowUniversity"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          label="آدرس محل کار"
          :m="m"
          cdcName="IsShowAddressWork"
          v-model="
            model.ClsEngineerTemp.Eng_ShowPublicSetting.IsShowAddressWork
          "
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          label="پست الکترونیکی"
          :m="m"
          cdcName="IsShowEMail"
          v-model="model.ClsEngineerTemp.Eng_ShowPublicSetting.IsShowEMail"
        />
      </FormControl>
    </FormRow>
  </fit>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    m: String,
    formKey: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      name: "Settings"
    }
  }
}
</script>
